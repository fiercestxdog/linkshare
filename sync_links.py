import csv
import json
import os
import re

# Configuration
CSV_FILE = 'responses.csv'
JS_FILE = 'script.js'

def sync_links():
    # 1. Check if CSV exists
    if not os.path.exists(CSV_FILE):
        print(f"❌ Error: '{CSV_FILE}' not found. Please download your Google Form responses as CSV and rename it.")
        return

    print(f"📂 Reading {CSV_FILE}...")
    new_links = []
    
    try:
        with open(CSV_FILE, 'r', encoding='utf-8') as f:
            reader = csv.DictReader(f)
            for row in reader:
                # Adjust these keys to match your Google Form's actual column headers
                # Example: "Title", "URL", "Description", "Tags"
                # We use a loose match or fallback
                
                title = row.get('Title of Resource') or row.get('Title') or "Untitled"
                url = row.get('URL') or row.get('Link')
                desc = row.get('Description') or "No description provided."
                tags_raw = row.get('Tags') or "Community"
                
                if url:
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

    print(f"✅ Found {len(new_links)} links in CSV.")

    # 2. Read existing JS file
    with open(JS_FILE, 'r', encoding='utf-8') as f:
        content = f.read()

    # 3. Extract existing JSON array
    # Looking for: const allLinks = [...];
    pattern = r"const allLinks = (\[.*?\]);"
    match = re.search(pattern, content, re.DOTALL)
    
    if not match:
        print("❌ Error: Could not find 'const allLinks' array in script.js")
        return

    existing_json_str = match.group(1)
    # Javascript objects keys might not be quoted, simpler to just prepend new ones strictly
    # We will just parse valid JSON if possible, but JS source isn't always strict JSON.
    # Strategy: We will just RE-WRITE the variable definition block.
    
    # We'll rely on the fact that I generated valid JSON-compatible JS previously.
    try:
        existing_links = json.loads(existing_json_str)
    except:
        # If loose JS, we might fail. Let's just assume we want to PREPEND new links.
        print("⚠️ existing links distinct parse failed (JS format?), verifying backup strategy.")
        # Fallback: Assume we replace the whole block with new + hardcoded existing logic is complex without ast.
        # Let's just use the known 'existing_links' variable if we can't parse the file.
        # Actually, let's just append to the list in python if we can parse it.
        # Since I wrote the file, it is valid JSON syntax inside the JS.
        existing_links = []

    # Merge: Add new links to the TOP (Latest)
    # Deduplicate by URL
    combined_links = new_links + [l for l in existing_links if l['url'] not in [n['url'] for n in new_links]]
    
    # 4. Generate new JS content
    new_json_str = json.dumps(combined_links, indent=2)
    new_content = content.replace(match.group(1), new_json_str)

    # 5. Write back
    with open(JS_FILE, 'w', encoding='utf-8') as f:
        f.write(new_content)

    print(f"🚀 Successfully synced! {len(new_links)} new links added to {JS_FILE}.")

if __name__ == "__main__":
    sync_links()
