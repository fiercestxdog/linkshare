# LinkShare Portal 🚀

A curated collection of essential resources, tools, and inspiration. Hosted on GitHub Pages with real-time chat and submission capabilities.

## 🧱 Project Structure
- `index.html`: Main layout (Tailwind CSS + Glassmorphism). Features a **3-Column Dashboard Design**:
    - **Left**: Latest Curated Links (Synced from Google Forms).
    - **Center**: Intelligence Notebooks & Shared Files (Synced from local `files/` folder).
    - **Right**: Live Chat (Crisp Widget).
- `style.css`: Custom animations and neon styling.
- `script.js`: Dynamic rendering engine. Link and File data is injected here by the sync script.
- `files/`: Directory for shared documents (PDFs, images).
- `sync_links.py`: Automation engine that fetches Google Form responses and indexes the `files/` directory.

## 🛠️ Deployment Workflow

The project is fully automated via `workspace/launchers/deploy_links.bat`.

1. **Add Links**: Submit via the [Google Form](https://docs.google.com/forms/d/e/1FAIpQLSdBURZDdQEDA-9RMTPv3NzrtSOGxSByCj4mj8a8lqZ0L3ELcQ/viewform?usp=header).
2. **Add Files**: Drop any PDF/Image into the `files/` folder.
3. **Sync & Push**: Run `.\workspace\launchers\deploy_links.bat` from your terminal.
4. **Verify**: Site updates automatically at [https://fiercestxdog.github.io/linkshare/](https://fiercestxdog.github.io/linkshare/).

## 🔮 Future Roadmap
- [x] Push to GitHub and enable Pages.
- [x] Implement local sync for documents and links.
- [ ] Full Cloud Automation (Google Apps Script -> GitHub API).
- [ ] Add more curated notebooks.