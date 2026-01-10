# LinkShare Portal 🚀

A curated collection of essential resources, tools, and inspiration. Hosted on GitHub Pages with real-time chat and submission capabilities.

## 🧱 Project Structure
- `index.html`: Main layout (Tailwind CSS + Glassmorphism). Now features a **3-Column Dashboard Design**:
    - **Left**: Latest Curated Links.
    - **Center**: Live Chat (Crisp Widget).
    - **Right**: Intelligence Notebooks & Shared Files.
- `style.css`: Custom animations and neon styling.
- `script.js`: Dynamic link rendering. Data is embedded directly for zero-config deployment.
- `files/`: Directory for shared documents (PDFs, etc.).
- `sync_links.py`: Helper script to merge Google Form CSV exports into `script.js`.

## 🛠️ Setup Instructions

### 1. Hosting on GitHub Pages
1. Create a new repository on GitHub.
2. Push the files in this directory to the `main` branch.
3. Go to **Settings** -> **Pages**.
4. Set the source to **Deploy from a branch** and select `main` (root folder).
5. Your site will be live at `https://<your-username>.github.io/<repo-name>`.

### 2. Google Form (Submissions)
- The "Submit Link" button points to [your custom form](https://docs.google.com/forms/d/e/1FAIpQLSdBURZDdQEDA-9RMTPv3NzrtSOGxSByCj4mj8a8lqZ0L3ELcQ/viewform?usp=header).
- To view results, check the "Responses" tab in your Google Forms dashboard.

### 3. Crisp Chat (Live Discussion)
1. Sign up for a free account at [Crisp.chat](https://crisp.chat).
2. Get your setup script from **Website Settings**.
3. Paste the script into `index.html` at the marked location (bottom of file).

### 4. Updating Content
- **Links**: Edit the `allLinks` array in `script.js`.
- **Files**: Add PDFs to the `files/` folder and update the HTML in `index.html`.
- **Notebooks**: Edit the HTML in the "Intelligence Notebooks" widget.

### 5. Updating Links (Semi-Automated)
1. Go to your Google Form -> **Responses** -> **View in Sheets**.
2. **File** -> **Download** -> **Comma Separated Values (.csv)**.
3. Save the file as `responses.csv` in this project folder.
4. Run the sync script:
   ```bash
   python sync_links.py
   ```
5. The script will automatically add new submissions to the top of the list in `script.js`.
6. Commit and push the changes to GitHub.

## 🔮 Future Roadmap
- [ ] **Full Automation**: Implement Google Apps Script to auto-commit new submissions to GitHub via API (eliminating the manual CSV step).
- [ ] Push to GitHub and enable Pages.
- [ ] Paste actual Crisp Chat snippet.
- [ ] Add more links to `links.json`.