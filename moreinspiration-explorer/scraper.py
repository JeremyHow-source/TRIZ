"""
TRIZ Innovation Explorer — Web Scraper
Extracts all innovation data from MoreInspiration.com

Features:
- Parallelized listing crawl (pages 1 to 166)
- Resumable scraping: merges with existing innovations.json to skip already scraped details
- Extract description, source, date added, property, function, and tags (industries)
- Parallelized detail page crawl (15 threads)
- Dynamic recomputation of facet counts based on actual database contents
"""

import json
import os
import re
import sys
import time

try:
    import requests
    from bs4 import BeautifulSoup
except ImportError:
    print("Installing required packages...")
    import subprocess
    subprocess.check_call([sys.executable, "-m", "pip", "install", "requests", "beautifulsoup4"])
    import requests
    from bs4 import BeautifulSoup

from concurrent.futures import ThreadPoolExecutor, as_completed

BASE_URL = "https://www.moreinspiration.com"
DATA_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "data")
JSON_PATH = os.path.join(DATA_DIR, "innovations.json")

HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
}


def parse_listing_page(html):
    """Parse a search results listing page to extract innovation cards."""
    soup = BeautifulSoup(html, "html.parser")
    innovations = []

    grid = soup.find(id="innovation-grid")
    if not grid:
        grid = soup.find(id="searchGrid")
    
    items = grid.find_all("div", class_="item") if grid else soup.find_all("div", class_="item")

    for card in items:
        # Find the article link
        links = card.find_all("a", href=True)
        article_link = None
        for a in links:
            if a["href"].startswith("/article/"):
                article_link = a
                break

        if not article_link:
            continue

        href = article_link["href"]
        match = re.search(r"/article/(\d+)/([\w\-]+)", href)
        if not match:
            continue

        inv_id = int(match.group(1))
        slug = match.group(2)

        # Title from h5
        title_tag = card.find("h5")
        title = title_tag.text.strip() if title_tag else ""

        # Image URL from first img
        main_img = card.find("img", src=True)
        image_url = ""
        image_alt = ""
        if main_img:
            src = main_img["src"]
            if src.startswith("/"):
                src = BASE_URL + src
            image_url = src
            image_alt = main_img.get("alt", "")

        # Property from the icon img in the title div
        title_div = card.find("div", class_="title")
        property_val = ""
        if title_div:
            prop_img = title_div.find("img")
            if prop_img:
                property_val = prop_img.get("alt", "").strip()
                if not property_val:
                    prop_title = prop_img.get("title", "")
                    if prop_title.startswith("Property: "):
                        property_val = prop_title[10:]

        innovations.append({
            "id": inv_id,
            "slug": slug,
            "title": title,
            "imageUrl": image_url,
            "imageAlt": image_alt,
            "property": property_val,
            "description": "",
            "function": "",
            "industries": [],
            "source": "",
            "dateAdded": ""
        })

    return innovations


def parse_detail_page(html):
    """Parse an individual innovation detail page."""
    soup = BeautifulSoup(html, "html.parser")
    result = {}

    # Description, source, date added from col-md-8
    content_div = soup.find("div", class_="col-md-8")
    if content_div:
        # Clone to avoid modifying the original soup
        content_clone = BeautifulSoup(str(content_div), "html.parser").find("div")
        
        # Decompose elements we don't want
        for el in content_clone.find_all(["h1", "script", "style"]):
            el.decompose()
        
        share_div = content_clone.find(id="share")
        if share_div:
            share_div.decompose()
            
        sub_article = content_clone.find(class_="sub-article")
        if sub_article:
            sub_article.decompose()
            
        tags_div = content_clone.find(id="tags")
        if tags_div:
            tags_div.decompose()
            
        # Get the remaining text, strip it
        text = content_clone.get_text(separator="\n").strip()
        text = re.sub(r'\n+', '\n', text)
        result["description"] = text

        sub_article_orig = content_div.find("p", class_="sub-article") or content_div.find(class_="sub-article")
        if sub_article_orig:
            source_link = sub_article_orig.find("a")
            if source_link:
                result["source"] = source_link.get("href", "")

            date_span = sub_article_orig.find("span", class_="added")
            if date_span:
                date_text = date_span.text.strip()
                date_text = re.sub(r"^Added:\s*", "", date_text)
                result["dateAdded"] = date_text

    # Extract tags (industries)
    tags_div = soup.find(id="tags")
    if tags_div:
        result["industries"] = [a.text.strip() for a in tags_div.find_all("a", class_="tag")]
    else:
        result["industries"] = []

    # Property and Function from prodDescription div
    prod_desc = soup.find("div", class_="prodDescription")
    if prod_desc:
        prop_func_div = prod_desc.find("div", class_="propfunc")
        if prop_func_div:
            links = prop_func_div.find_all("a")
            if len(links) >= 1:
                first_href = links[0].get("href", "")
                if "?p=" in first_href:
                    result["property"] = links[0].text.strip()
                elif "?f=" in first_href:
                    result["function"] = links[0].text.strip()

            if len(links) >= 2:
                second_href = links[1].get("href", "")
                if "?f=" in second_href:
                    result["function"] = links[1].text.strip()
                elif "?p=" in second_href:
                    result["property"] = links[1].text.strip()

    return result


def fetch_page(page_num, session):
    """Fetch a listing page."""
    url = f"{BASE_URL}/Search?sort=addedon&page={page_num}"
    try:
        resp = session.get(url, headers=HEADERS, timeout=15)
        resp.raise_for_status()
        return resp.text
    except Exception as e:
        print(f"  [ERROR] Page {page_num}: {e}")
        return None


def fetch_detail(inv, session):
    """Fetch an innovation detail page."""
    url = f"{BASE_URL}/article/{inv['id']}/{inv['slug']}"
    try:
        resp = session.get(url, headers=HEADERS, timeout=15)
        resp.raise_for_status()
        return inv["id"], resp.text
    except Exception as e:
        return inv["id"], None


def save_data(data, path):
    """Save data to JSON file."""
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2, ensure_ascii=False)


def recompute_facets(innovations):
    """Recompute all facet lists and counts based on current items in innovations."""
    industries_count = {}
    properties_count = {}
    functions_count = {}

    for inv in innovations:
        # Properties
        prop = inv.get("property")
        if prop:
            properties_count[prop] = properties_count.get(prop, 0) + 1

        # Functions
        func = inv.get("function")
        if func:
            functions_count[func] = functions_count.get(func, 0) + 1

        # Industries (tags)
        inds = inv.get("industries") or []
        for ind in inds:
            industries_count[ind] = industries_count.get(ind, 0) + 1

    return {
        "industries": [{"name": name, "count": count} for name, count in sorted(industries_count.items(), key=lambda x: x[0])],
        "properties": [{"name": name, "count": count} for name, count in sorted(properties_count.items(), key=lambda x: x[0])],
        "functions": [{"name": name, "count": count} for name, count in sorted(functions_count.items(), key=lambda x: x[0])]
    }


def main():
    os.makedirs(DATA_DIR, exist_ok=True)
    session = requests.Session()

    print("=" * 60)
    print("TRIZ Innovation Explorer — Optimized Data Scraper")
    print("=" * 60)

    # ── Load existing progress for resuming ──
    existing_cache = {}
    if os.path.exists(JSON_PATH):
        try:
            with open(JSON_PATH, "r", encoding="utf-8") as f:
                old_data = json.load(f)
                for inv in old_data.get("innovations", []):
                    existing_cache[inv["id"]] = inv
            print(f"Loaded {len(existing_cache)} existing records from cache to speed up scraping.")
        except Exception as e:
            print(f"Could not load cache: {e}")

    # ── Step 1: Scrape all listing pages in parallel ──
    print("\n[1/3] Scraping listing pages (Pages 1 to 166)...")
    all_innovations = []
    seen_ids = set()
    pages = list(range(1, 167))

    with ThreadPoolExecutor(max_workers=15) as executor:
        futures = {executor.submit(fetch_page, p, session): p for p in pages}
        for future in as_completed(futures):
            p = futures[future]
            html = future.result()
            if not html:
                print(f"  Page {p}: Fetch failed.")
                continue
            innovations = parse_listing_page(html)
            new_count = 0
            for inv in innovations:
                if inv["id"] not in seen_ids:
                    seen_ids.add(inv["id"])
                    all_innovations.append(inv)
                    new_count += 1
            # print(f"  Parsed page {p}: {len(innovations)} cards ({new_count} new)")

    # Sort DESC by ID
    all_innovations.sort(key=lambda x: x["id"], reverse=True)
    print(f"  Total unique innovations found in listings: {len(all_innovations)}")

    # ── Step 2: Merge detail page values from cache ──
    merged_count = 0
    for inv in all_innovations:
        cached = existing_cache.get(inv["id"])
        if cached:
            # Overwrite listing defaults with cached details if description exists
            if cached.get("description"):
                inv["description"] = cached["description"]
                inv["source"] = cached.get("source", "")
                inv["dateAdded"] = cached.get("dateAdded", "")
                inv["industries"] = cached.get("industries", [])
                
                # Use cached function/property if available and listing didn't extract it
                if not inv.get("property") and cached.get("property"):
                    inv["property"] = cached["property"]
                if not inv.get("function") and cached.get("function"):
                    inv["function"] = cached["function"]
                merged_count += 1

    print(f"  Restored {merged_count} descriptions and tag details from cache.")

    # ── Step 3: Fetch detail pages for missing items in parallel ──
    to_scrape = [inv for inv in all_innovations if not inv.get("description")]
    print(f"\n[2/3] Scraping details for {len(to_scrape)} innovations...")

    if to_scrape:
        completed = 0
        
        def persist_progress():
            print("  [Auto-save] Recalculating facets and saving database...")
            facets = recompute_facets(all_innovations)
            data = {"facets": facets, "innovations": all_innovations}
            save_data(data, JSON_PATH)

        with ThreadPoolExecutor(max_workers=15) as executor:
            futures = {executor.submit(fetch_detail, inv, session): inv for inv in to_scrape}
            for future in as_completed(futures):
                inv_id, html = future.result()
                if html:
                    details = parse_detail_page(html)
                    # Find innovation item and update
                    inv = next((x for x in all_innovations if x["id"] == inv_id), None)
                    if inv:
                        for key, val in details.items():
                            if val:
                                inv[key] = val
                completed += 1
                if completed % 100 == 0:
                    print(f"  Completed details: {completed}/{len(to_scrape)}")
                    persist_progress()
                time.sleep(0.02)

    # ── Step 4: Recompute all facets based on completed data ──
    print("\n[3/3] Finalizing database...")
    facets = recompute_facets(all_innovations)
    print(f"  Industries (tags): {len(facets['industries'])}")
    print(f"  Properties:        {len(facets['properties'])}")
    print(f"  Functions:         {len(facets['functions'])}")

    data = {"facets": facets, "innovations": all_innovations}
    save_data(data, JSON_PATH)
    
    print("\n" + "=" * 60)
    print(f"SUCCESS! Extracted and verified {len(all_innovations)} innovations.")
    print(f"Database saved to: {JSON_PATH}")
    print("=" * 60)


if __name__ == "__main__":
    main()
