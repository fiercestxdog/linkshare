# LinkShare Portal

A curated collection of essential resources, tools, and inspiration. Hosted on GitHub Pages with real-time chat and submission capabilities.

**Live Site**: https://fiercestxdog.github.io/linkshare/

## Project Structure

```
link_share_portal/
├── index.html          # Main layout (Tailwind CSS + Glassmorphism)
├── style.css           # Custom animations and neon styling
├── script.js           # Dynamic rendering engine
├── sync_links.py       # Automation engine for Google Form + file indexing
└── files/
    ├── *.pdf           # Shared documents
    └── audio/          # Audio briefings (mp3)
```

## Features

### 3-Column Dashboard Design
- **Left Column**: Latest Curated Links (synced from Google Forms)
- **Center Column**: Intelligence & Files
  - Notebooks widget (NotebookLM links)
  - Shared Files widget (PDFs auto-indexed)
  - Audio Briefings widget (mp3 playback)
- **Right Column**: Live Chat (Crisp Widget)

### Audio Briefings Section
Added 2026-01-15. Converted from m4a to mp3 using ffmpeg for smaller file sizes.

| Audio File | Description | Size |
|------------|-------------|------|
| `Autonomous_AI_Agents.mp3` | Planning and Acting Now | 16MB |
| `Jobs_Musk_OLeary_Signal.mp3` | Focus on Signal | 16MB |
| `Prompting_Reasoning_Bias.mp3` | Boosts Reasoning but Reveals Bias | 13MB |

**Conversion**: m4a → mp3 @ 128kbps (89MB → 45MB total, 50% reduction)

## Deployment

### Automated (Scheduler)
The scheduler automatically syncs to GitHub daily at **7:00 AM**.

**Sync task** (`tools/scheduler/scheduler_engine.py`):
- Copies: `index.html`, `script.js`, `style.css`
- Syncs entire `files/` directory (PDFs + audio)
- Commits and pushes to `temp_linkshare/` → GitHub

### Manual Deployment
```bash
# Option 1: Run the launcher
workspace\launchers\deploy_links.bat

# Option 2: Manual sync
python projects/link_share_portal/sync_links.py
cd temp_linkshare
git add . && git commit -m "Update" && git push
```

## Adding Content

### Add Links
Submit via the [Google Form](https://docs.google.com/forms/d/e/1FAIpQLSdBURZDdQEDA-9RMTPv3NzrtSOGxSByCj4mj8a8lqZ0L3ELcQ/viewform)

### Add Files (PDFs, Images)
Drop files into `projects/link_share_portal/files/`

### Add Audio
1. Convert to mp3 if needed: `ffmpeg -i input.m4a -b:a 128k output.mp3`
2. Place in `projects/link_share_portal/files/audio/`
3. Add HTML5 audio player to `index.html`:
```html
<div class="audio-item p-3 rounded-xl bg-slate-800/50 border border-slate-700">
    <div class="flex items-center gap-3 mb-2">
        <span class="text-2xl">🎧</span>
        <div class="flex-1">
            <span class="font-bold text-cyan-400 text-sm block">Title</span>
            <span class="text-[10px] text-slate-500">Subtitle</span>
        </div>
    </div>
    <audio controls class="w-full h-8">
        <source src="files/audio/filename.mp3" type="audio/mpeg">
    </audio>
</div>
```

## GitHub Repository

- **Source**: `C:\python\projects\link_share_portal\`
- **Sync Repo**: `C:\python\temp_linkshare\`
- **Remote**: https://github.com/fiercestxdog/linkshare
- **GitHub Pages**: https://fiercestxdog.github.io/linkshare/

## Roadmap

- [x] Push to GitHub and enable Pages
- [x] Implement local sync for documents and links
- [x] Add audio briefings section with mp3 playback
- [x] Automated daily GitHub sync via scheduler (7:00 AM)
- [ ] Full cloud automation (Google Apps Script → GitHub API)
- [ ] Add more curated notebooks
- [ ] Crisp chat integration
