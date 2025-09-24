# 🕷️ Sitemap Crawler – Edzy.ai  

This project is a **backend crawler service** for analyzing the link structure of Edzy.ai (or any website with a sitemap).  
It crawls pages from a sitemap, extracts outgoing links, classifies them as **internal** or **external**, and identifies **incoming links** for each page.  
It also summarizes the **most linked-to pages** across the site.  

---

## 📌 Features  

- ✅ Crawl all pages listed in a sitemap  
- ✅ Extract outgoing links from each page  
- ✅ Classify links as internal or external  
- ✅ Identify incoming links for each page  
- ✅ Find top N most linked pages  
- ✅ Store crawl data (HTML, links, metadata) in MongoDB  
- ✅ REST API endpoints to query linking information  

---

## ⚙️ Tech Stack  

- **Node.js + Express** → API backend  
- **MongoDB + Mongoose** → Data storage  
- **Axios** → Fetch HTML content  
- **Cheerio** → Parse and extract links from HTML  
- **Bruno** → API testing (alternative to Postman)  

---

## 🚀 Installation  

Clone the repository:  

```bash
git clone <your-repo-url>
cd backend

npm install

in you .env add it
PORT=3000
MONGO_URI=mongodb://localhost:27017/edzycrawler
SITEMAP_URL=https://www.edzy.ai/sitemap.xml

Start the server
tsc -b
node dist/index.js

