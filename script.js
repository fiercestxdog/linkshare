// Categories: AI, Software, Management, Health & Fitness
const CATEGORIES = ["All", "AI", "Software", "Management", "Health & Fitness"];

const allFiles = [
  {
    "name": "Engineering Peak Running Performance",
    "path": "files/Engineering_Peak_Running_Performance.pdf",
    "type": "PDF",
    "icon": "📕",
    "categories": ["Health & Fitness"]
  },
  {
    "name": "Poetry And Plumbing",
    "path": "files/Poetry_and_Plumbing.pdf",
    "type": "PDF",
    "icon": "📕",
    "categories": ["Management"]
  },

  {
    "name": "Federal AI Landscape 2025",
    "path": "files/Federal_AI_Landscape_2025.pdf",
    "type": "PDF",
    "icon": "\ud83d\udcd5",
    "categories": ["AI"]
  },
  {
    "name": "Signal Noise Mastery",
    "path": "files/Signal_Noise_Mastery.pdf",
    "type": "PDF",
    "icon": "\ud83d\udcd5",
    "categories": ["Management"]
  },
  {
    "name": "The AI Arms Race Escalates",
    "path": "files/The_AI_Arms_Race_Escalates.pdf",
    "type": "PDF",
    "icon": "\ud83d\udcd5",
    "categories": ["AI"]
  },
  {
    "name": "The Docling Local RAG Stack",
    "path": "files/The_Docling_Local_RAG_Stack.pdf",
    "type": "PDF",
    "icon": "\ud83d\udcd5",
    "categories": ["Software"]
  },
  {
    "name": "The Human Side of AI Adoption",
    "path": "files/The_Human_Side_of_AI_Adoption.pdf",
    "type": "PDF",
    "icon": "\ud83d\udcd5",
    "categories": ["AI", "Management"]
  },
  {
    "name": "The Rise of Autonomous Systems",
    "path": "files/The_Rise_of_Autonomous_Systems.pdf",
    "type": "PDF",
    "icon": "\ud83d\udcd5",
    "categories": ["AI"]
  }
];

const allLinks = [
  {
    "title": "Claude Code is awesome!",
    "url": "https://www.lennysnewsletter.com/p/everyone-should-be-using-claude-code",
    "description": "Everyone should check out Claude Code",
    "tags": ["Tutorial", "Claude"],
    "icon": "\ud83c\udd95",
    "categories": ["AI", "Software"]
  },
  {
    "title": "Model Collapse",
    "url": "https://sderosiaux.substack.com/p/internet-is-eating-itself-whats-next",
    "description": "AI generated content is taking over the internet",
    "tags": ["AI News"],
    "icon": "\ud83c\udd95",
    "categories": ["AI"]
  },
  {
    "title": "Claude Code Workflow Reveal",
    "url": "https://venturebeat.com/technology/the-creator-of-claude-code-just-revealed-his-workflow-and-developers-are",
    "description": "Insights from the creator of Claude Code on high-efficiency developer workflows.",
    "tags": ["Dev", "Claude"],
    "icon": "\ud83e\udd16",
    "categories": ["AI", "Software"]
  }
];

document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('link-grid');
    const searchInput = document.getElementById('search-input');
    const categoryFilter = document.getElementById('category-filter');

    let activeCategory = 'All';

    // Initial render
    renderLinks(allLinks);
    if (typeof allFiles !== 'undefined') {
        renderFiles(allFiles);
    }

    // Category Filter Click Handler
    categoryFilter.addEventListener('click', (e) => {
        const btn = e.target.closest('.category-btn');
        if (!btn) return;

        // Update active state
        categoryFilter.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        activeCategory = btn.dataset.category;
        applyFilters();
    });

    // Combined filter function
    function applyFilters() {
        const term = searchInput.value.toLowerCase();

        // Filter Links
        const filteredLinks = allLinks.filter(link => {
            const matchesSearch = link.title.toLowerCase().includes(term) ||
                link.description.toLowerCase().includes(term) ||
                link.tags.some(tag => tag.toLowerCase().includes(term));
            const matchesCategory = activeCategory === 'All' ||
                (link.categories && link.categories.includes(activeCategory));
            return matchesSearch && matchesCategory;
        });
        renderLinks(filteredLinks);

        // Filter Files
        const filteredFiles = allFiles.filter(file => {
            const matchesSearch = file.name.toLowerCase().includes(term) ||
                file.type.toLowerCase().includes(term);
            const matchesCategory = activeCategory === 'All' ||
                (file.categories && file.categories.includes(activeCategory));
            return matchesSearch && matchesCategory;
        });
        renderFiles(filteredFiles);

        // Filter Podcasts
        const podcastItems = document.querySelectorAll('.podcast-item');
        podcastItems.forEach(item => {
            const title = (item.dataset.title || '').toLowerCase();
            const tags = (item.dataset.tags || '').toLowerCase();
            const category = item.dataset.category || '';
            const matchesSearch = title.includes(term) || tags.includes(term);
            const matchesCategory = activeCategory === 'All' || category === activeCategory;
            item.style.display = (matchesSearch && matchesCategory) ? 'block' : 'none';
        });

        // Filter Notebooks
        const notebookItems = document.querySelectorAll('.notebook-item');
        notebookItems.forEach(item => {
            const text = (item.dataset.title || item.textContent).toLowerCase();
            const category = item.dataset.category || '';
            const matchesSearch = text.includes(term);
            const matchesCategory = activeCategory === 'All' || category === activeCategory;
            item.style.display = (matchesSearch && matchesCategory) ? 'block' : 'none';
        });
    }

    // Render Function
    function renderLinks(links) {
        grid.innerHTML = '';
        links.forEach(link => {
            const card = document.createElement('div');
            card.className = 'glass-card p-6 flex flex-col h-full relative group';
            
            card.innerHTML = `
                <div class="flex items-center justify-between mb-4">
                    <div class="text-4xl">${link.icon || '🔗'}</div>
                    <button class="copy-btn text-slate-400 hover:text-white transition-colors" title="Copy URL" onclick="copyToClipboard('${link.url}', this)">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                    </button>
                </div>
                <h3 class="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                    <a href="${link.url}" target="_blank" class="hover:underline">${link.title}</a>
                </h3>
                <p class="text-slate-300 text-sm mb-4 flex-grow">${link.description}</p>
                <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-auto gap-2">
                    <div class="flex flex-wrap gap-2">
                        ${link.tags.map(tag => `<span class="tag-badge text-xs px-2 py-1 rounded-full">${tag}</span>`).join('')}
                    </div>
                </div>
            `;
            grid.appendChild(card);
        });
    }

    function renderFiles(files) {
        const fileList = document.getElementById('file-list');
        if (!fileList) return;
        
        fileList.innerHTML = '';
        files.forEach(file => {
            const li = document.createElement('li');
            li.className = "flex items-center justify-between group cursor-pointer p-2 rounded hover:bg-white/5 transition-colors";
            li.innerHTML = `
                <a href="${file.path}" target="_blank" class="flex items-center gap-3 w-full">
                    <div class="bg-red-500/20 p-2 rounded text-red-400 text-xl">
                        ${file.icon}
                    </div>
                    <div class="flex flex-col">
                        <span class="text-sm text-gray-200 group-hover:text-white font-medium">${file.name}</span>
                        <span class="text-[10px] text-slate-500">${file.type} • Shared Resource</span>
                    </div>
                </a>
                <a href="${file.path}" download class="text-slate-600 hover:text-cyan-400 px-2">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                </a>
            `;
            fileList.appendChild(li);
        });
    }

    // Search Filtering - uses combined filter function
    searchInput.addEventListener('input', () => {
        applyFilters();
    });
});

// Copy to Clipboard (Global for inline onclick)
window.copyToClipboard = (text, btn) => {
    navigator.clipboard.writeText(text).then(() => {
        const originalHTML = btn.innerHTML;
        btn.innerHTML = `<span class="text-green-400 font-bold text-xs">Copied!</span>`;
        setTimeout(() => {
            btn.innerHTML = originalHTML;
        }, 1500);
    });
};