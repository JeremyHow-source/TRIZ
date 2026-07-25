# TRIZ Innovation Explorer

A premium, offline-capable web application for exploring **4,900+ real-world innovations** categorized using the TRIZ (Theory of Inventive Problem Solving) methodology.

## 🌐 Live Demo

Visit the deployed app: **[TRIZ Innovation Explorer](https://jeremyhow-source.github.io/TRIZ/moreinspiration-explorer/)**

## ✨ Features

- **4,900+ Innovation Examples** — Browse real-world innovations from MoreInspiration.com
- **Faceted Search** — Filter by Industry (45), Property (60+), and Function (150+)
- **Full-Text Search** — Search across titles, descriptions, and categories
- **Multiple Views** — Grid and list view modes
- **Sorting** — Sort by newest, oldest, or alphabetically
- **Detail Modal** — Click any card to see full details with links to original source
- **Responsive Design** — Works on desktop, tablet, and mobile
- **Offline Capable** — All data stored in a local JSON file
- **Dark Theme** — Premium glassmorphism design with micro-animations

## 🏗️ Architecture

```
moreinspiration-explorer/
├── index.html          # Main HTML application
├── styles.css          # Premium dark theme CSS
├── app.js              # Application logic (vanilla JS)
├── scraper.py          # Python scraper for data extraction
├── data/
│   └── innovations.json  # Complete innovation database
└── README.md
```

## 🔧 Data Extraction

The innovation data is extracted from [MoreInspiration.com](https://www.moreinspiration.com) using the included Python scraper.

### Running the Scraper

```bash
# Install dependencies (auto-installs if missing)
pip install requests beautifulsoup4

# Run the scraper
python scraper.py
```

The scraper:
1. Extracts all facets (Industries, Properties, Functions) from the search page
2. Crawls all listing pages to get card-level data for ~4,961 innovations
3. Fetches detail pages for descriptions, functions, and sources

## 📊 TRIZ Categories

### Industries (45 categories)
Electronics, Gadgets, Food & Beverage, Technologies, Household, Materials, Automotive, Healthcare, Energy, Environment, and more.

### Properties
System structure properties like: completely flexible, coordinated, different components, one or more joints, segmented solid, using intelligent feedback, etc.

### Functions (150+)
Innovation functions like: add a new function, improve user safety, reduce energy cost, increase cleaning power, save energy or add energy management, etc.

## 🚀 Deployment

### GitHub Pages
1. Push this directory to your GitHub repository
2. Enable GitHub Pages in Settings → Pages → Deploy from branch
3. The app will be available at `https://username.github.io/TRIZ/moreinspiration-explorer/`

### Local Server
```bash
# Python
python -m http.server 8000

# Node.js  
npx serve .
```

## 📝 Credits

- **Data Source**: [MoreInspiration.com](https://www.moreinspiration.com) by [ΔULIVE](https://www.aulive.com)
- **TRIZ Methodology**: Theory of Inventive Problem Solving by Genrich Altshuller
