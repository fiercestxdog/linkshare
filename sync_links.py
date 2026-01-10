import csv
import json
import os
import re
import sys
import argparse
import urllib.request

# Configuration
CSV_FILE = 'responses.csv'
JS_FILE = 'script.js'

def download_csv(url):
    print(f"⬇️ Downloading CSV from Google Sheets...")
    try:
        with urllib.request.urlopen(url) as response:
            data = response.read().decode('utf-8')
            with open(CSV_FILE, 'w', encoding='utf-8') as f:
                f.write(data)
        print("✅ Download complete.")
        return True
    except Exception as e:
        print(f"❌ Failed to download CSV: {e}")
        return False

def sync_links():
    # Parse Arguments
    parser = argparse.ArgumentParser(description="Sync Google Form responses to LinkShare Portal")
    parser.add_argument("--url", help="Public Google Sheets CSV URL to download")
    args = parser.parse_args()

    # Change to script directory to ensure relative paths work
    script_dir = os.path.dirname(os.path.abspath(__file__))
    os.chdir(script_dir)

    # Download if URL provided
    if args.url:
        if not download_csv(args.url):
            return

    # 1. Check if CSV exists
    if not os.path.exists(CSV_FILE):
        print(f"❌ Error: '{CSV_FILE}' not found.")
        print("   Run with --url \"<YOUR_GOOGLE_SHEET_CSV_URL>\" or place responses.csv manually.")
        return

    print(f"📂 Reading {CSV_FILE}...")
    new_links = []
    
    try:
        with open(CSV_FILE, 'r', encoding='utf-8') as f:
            reader = csv.DictReader(f)
            for row in reader:
                # Map Google Form headers to our data structure
                title = row.get('A Quick Headline/Summary (Optional)') or "Untitled"
                url = row.get('The Link (Required)')
                desc = row.get('Why are you sharing this link cool? (Optional)') or "No description provided."
                tags_raw = row.get('What kind of AI content is this?') or "Community"
                
                if url:
                    # Filter out the placeholder/instructional text from titles if any
                    if title == "Untitled" and url:
                        title = url.split('/')[-1] # Fallback to URL part
                    
                    tags = [t.strip() for t in tags_raw.split(',')]
                    new_links.append({
                        "title": title,
                        "url": url,
                        "description": desc,
                        "tags": tags,
                        "icon": "🆕"
                    })
    except Exception as e:
        print(f"❌ Error parsing CSV: {e}")
        return

    if not new_links:
        print("⚠️ No links found in CSV.")
        return

    # 2. Read existing JS file
    if not os.path.exists(JS_FILE):
        print(f"❌ Error: {JS_FILE} not found in {os.getcwd()}")
        return

    with open(JS_FILE, 'r', encoding='utf-8') as f:
        content = f.read()

    # 3. Extract existing JSON array
    pattern = r"const allLinks = (\[.*?\]);"
    match = re.search(pattern, content, re.DOTALL)
    
    if not match:
        print("❌ Error: Could not find 'const allLinks' array in script.js")
        return

    existing_json_str = match.group(1)
    
    try:
        existing_links = json.loads(existing_json_str)
    except:
        existing_links = []

    # Merge: Filter out duplicates
    # We want to know how many *actual* new links we added
    existing_urls = {l['url'] for l in existing_links}
    truly_new_links = [l for l in new_links if l['url'] not in existing_urls]
    
    if not truly_new_links:
        print("✨ No new links to add (all duplicates).")
        return

    # Add new links to the TOP
    combined_links = truly_new_links + existing_links
    
    # 4. Generate new JS content
    new_json_str = json.dumps(combined_links, indent=2)
    new_content = content.replace(match.group(1), new_json_str)

    # 5. Write back
    with open(JS_FILE, 'w', encoding='utf-8') as f:
        f.write(new_content)

    print(f"🚀 Successfully synced! {len(truly_new_links)} new links added to {JS_FILE}.")

if __name__ == "__main__":
    sync_links()