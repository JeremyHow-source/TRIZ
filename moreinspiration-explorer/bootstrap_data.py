"""
Quick bootstrap script - extract initial data from the already-fetched HTML
to create an initial innovations.json so the web app works immediately.
"""
import json
import os
import re

DATA_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "data")
JSON_PATH = os.path.join(DATA_DIR, "innovations.json")
CONTENT_MD_PATH = r"C:\Users\Jerome\.gemini\antigravity-cli\brain\7945cac8-b34f-4230-a904-7ba2688e99b8\.system_generated\steps\12\content.md"

BASE_URL = "https://www.moreinspiration.com"

def main():
    os.makedirs(DATA_DIR, exist_ok=True)

    # Skip if full data already exists
    if os.path.exists(JSON_PATH):
        with open(JSON_PATH, "r", encoding="utf-8") as f:
            existing = json.load(f)
        if len(existing.get("innovations", [])) > 100:
            print(f"Full data already exists with {len(existing['innovations'])} innovations. Skipping.")
            return

    print("Reading cached search page HTML...")
    with open(CONTENT_MD_PATH, "r", encoding="utf-8") as f:
        content = f.read()

    # Extract facets using regex (avoids BeautifulSoup dependency)
    facets = {"industries": [], "properties": [], "functions": []}

    # Industries: /Search?t=name
    for match in re.finditer(r'/Search\?t=([^"]+)"[^>]*>\s*<span class="chk"></span>\s*<span>([^<]+)</span>\s*<span class="count">\((\d+)\)</span>', content):
        name = match.group(2).strip()
        count = int(match.group(3))
        facets["industries"].append({"name": name, "count": count})

    # Properties: /Search?p=name
    for match in re.finditer(r'/Search\?p=([^"]+)"[^>]*>\s*<span class="chk"></span>\s*\n?\s*<span>([^<]+)</span>\s*<span class="count">\((\d+)\)</span>', content):
        name = match.group(2).strip()
        count = int(match.group(3))
        facets["properties"].append({"name": name, "count": count})

    # Functions: /Search?f=name
    for match in re.finditer(r'/Search\?f=([^"]+)"[^>]*>\s*<span class="chk"></span>\s*\n?\s*<span>([^<]+)</span>\s*<span class="count">\((\d+)\)</span>', content):
        name = match.group(2).strip()
        count = int(match.group(3))
        facets["functions"].append({"name": name, "count": count})

    print(f"Facets: {len(facets['industries'])} industries, {len(facets['properties'])} properties, {len(facets['functions'])} functions")

    # Extract innovation cards from the listing
    innovations = []
    # Pattern: /article/ID/slug in links, followed by title in h5
    card_pattern = re.compile(
        r'<div class="item">\s*'
        r'<a href="/article/(\d+)/([\w\-]+)">\s*'
        r'<img src="([^"]*)"[^>]*alt="([^"]*)"[^>]*/>\s*'
        r'</a>\s*'
        r'<div class="title">\s*'
        r'<img src="[^"]*"[^>]*alt="([^"]*)"[^>]*/>\s*'
        r'<a href="/article/\d+/[\w\-]+">\s*'
        r'<h5>([^<]+)</h5>',
        re.DOTALL
    )

    for match in card_pattern.finditer(content):
        inv_id = int(match.group(1))
        slug = match.group(2)
        img_src = match.group(3)
        img_alt = match.group(4)
        prop = match.group(5).strip()
        title = match.group(6).strip()

        # Fix image URL
        if img_src.startswith("/"):
            img_src = BASE_URL + img_src

        innovations.append({
            "id": inv_id,
            "slug": slug,
            "title": title,
            "imageUrl": img_src,
            "imageAlt": img_alt,
            "property": prop,
            "description": "",
            "function": "",
            "industries": [],
            "source": "",
            "dateAdded": ""
        })

    print(f"Extracted {len(innovations)} innovations from cached page")

    data = {"facets": facets, "innovations": innovations}
    with open(JSON_PATH, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2, ensure_ascii=False)

    print(f"Saved to {JSON_PATH}")

if __name__ == "__main__":
    main()
