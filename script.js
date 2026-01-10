const allLinks = [
  {
    "title": "Model Collapse",
    "url": "https://sderosiaux.substack.com/p/internet-is-eating-itself-whats-next",
    "description": "AI generated content is taking over the internet",
    "tags": [
      "Latest AI News/Breakthroughs"
    ],
    "icon": "\ud83c\udd95"
  },
  {
    "title": "Claude Code Workflow Reveal",
    "url": "https://venturebeat.com/technology/the-creator-of-claude-code-just-revealed-his-workflow-and-developers-are",
    "description": "Insights from the creator of Claude Code on high-efficiency developer workflows.",
    "tags": [
      "AI",
      "Dev",
      "Claude"
    ],
    "icon": "\ud83e\udd16"
  }
];

document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('link-grid');
    const searchInput = document.getElementById('search-input');

    // Initial render
    renderLinks(allLinks);

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
                <div class="flex flex-wrap gap-2 mt-auto">
                    ${link.tags.map(tag => `<span class="tag-badge text-xs px-2 py-1 rounded-full">${tag}</span>`).join('')}
                </div>
            `;
            grid.appendChild(card);
        });
    }

    // Search Filtering
    searchInput.addEventListener('input', (e) => {
        const term = e.target.value.toLowerCase();
        const filtered = allLinks.filter(link => 
            link.title.toLowerCase().includes(term) || 
            link.description.toLowerCase().includes(term) ||
            link.tags.some(tag => tag.toLowerCase().includes(term))
        );
        renderLinks(filtered);
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