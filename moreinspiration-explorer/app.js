/**
 * TRIZ Innovation Explorer — Application Logic
 * Offline-capable innovation database browser with faceted search
 */

(function () {
    'use strict';

    // ─── State ───────────────────────────────────────────────
    const state = {
        innovations: [],
        facets: { industries: [], properties: [], functions: [] },
        filters: { industries: new Set(), properties: new Set(), functions: new Set() },
        searchQuery: '',
        sortBy: 'newest',
        viewMode: 'grid',
        displayCount: 48,
        batchSize: 48,
        filteredInnovations: [],
    };

    // ─── DOM References ──────────────────────────────────────
    const dom = {};

    function cacheDom() {
        dom.loadingOverlay = document.getElementById('loading-overlay');
        dom.loadingBar = document.getElementById('loading-bar');
        dom.app = document.getElementById('app');
        dom.searchInput = document.getElementById('search-input');
        dom.searchClear = document.getElementById('search-clear');
        dom.sidebar = document.getElementById('sidebar');
        dom.mobileMenuBtn = document.getElementById('mobile-menu-btn');
        dom.clearFilters = document.getElementById('clear-filters');
        dom.activeFilters = document.getElementById('active-filters');
        dom.innovationGrid = document.getElementById('innovation-grid');
        dom.emptyState = document.getElementById('empty-state');
        dom.loadMoreContainer = document.getElementById('load-more-container');
        dom.loadMoreBtn = document.getElementById('load-more-btn');
        dom.gridViewBtn = document.getElementById('grid-view-btn');
        dom.listViewBtn = document.getElementById('list-view-btn');
        dom.sortSelect = document.getElementById('sort-select');
        dom.showingCount = document.getElementById('showing-count');
        dom.totalInnovations = document.getElementById('total-innovations');
        dom.totalCount = document.querySelector('#total-count .stat-number');
        dom.filteredCountEl = document.getElementById('filtered-count');
        dom.modalOverlay = document.getElementById('modal-overlay');
        dom.modalBody = document.getElementById('modal-body');
        dom.modalClose = document.getElementById('modal-close');
        dom.resetAll = document.getElementById('reset-all');
        dom.header = document.getElementById('header');

        // Filter containers
        dom.industriesItems = document.getElementById('industries-items');
        dom.propertiesItems = document.getElementById('properties-items');
        dom.functionsItems = document.getElementById('functions-items');
        dom.industriesCount = document.getElementById('industries-count');
        dom.propertiesCount = document.getElementById('properties-count');
        dom.functionsCount = document.getElementById('functions-count');
    }

    // ─── Data Loading ────────────────────────────────────────
    async function loadData() {
        updateLoadingBar(10);

        try {
            const response = await fetch('data/innovations.json');
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            updateLoadingBar(40);

            const data = await response.json();
            updateLoadingBar(60);

            state.innovations = data.innovations || [];
            state.facets = data.facets || { industries: [], properties: [], functions: [] };

            updateLoadingBar(80);
            initializeApp();
            updateLoadingBar(100);

            setTimeout(() => {
                dom.loadingOverlay.classList.add('fade-out');
                dom.app.classList.remove('hidden');
                setTimeout(() => {
                    dom.loadingOverlay.style.display = 'none';
                }, 600);
            }, 300);
        } catch (err) {
            console.error('Failed to load data:', err);
            document.querySelector('.loading-subtitle').textContent =
                'Failed to load data. Ensure innovations.json is in the data/ folder.';
            document.querySelector('.loading-spinner').style.display = 'none';
        }
    }

    function updateLoadingBar(percent) {
        if (dom.loadingBar) {
            dom.loadingBar.style.width = percent + '%';
        }
    }

    // ─── Initialize ──────────────────────────────────────────
    function initializeApp() {
        populateFilters();
        updateStats();
        applyFiltersAndRender();
        bindEvents();
    }

    // ─── Filter Population ───────────────────────────────────
    function populateFilters() {
        renderFilterItems('industries', state.facets.industries, dom.industriesItems);
        renderFilterItems('properties', state.facets.properties, dom.propertiesItems);
        renderFilterItems('functions', state.facets.functions, dom.functionsItems);

        dom.industriesCount.textContent = state.facets.industries.length;
        dom.propertiesCount.textContent = state.facets.properties.length;
        dom.functionsCount.textContent = state.facets.functions.length;
    }

    function renderFilterItems(type, items, container) {
        const sorted = [...items].sort((a, b) => b.count - a.count);
        container.innerHTML = sorted.map(item => `
            <div class="filter-item" data-type="${type}" data-value="${escapeHtml(item.name)}">
                <div class="filter-item-checkbox"></div>
                <span class="filter-item-label">${escapeHtml(item.name)}</span>
                <span class="filter-item-count">${item.count}</span>
            </div>
        `).join('');
    }

    // ─── Stats ───────────────────────────────────────────────
    function updateStats() {
        const total = state.innovations.length;
        dom.totalCount.textContent = total.toLocaleString();
        dom.totalInnovations.textContent = total.toLocaleString();
    }

    // ─── Events ──────────────────────────────────────────────
    function bindEvents() {
        // Search
        let searchTimeout;
        dom.searchInput.addEventListener('input', (e) => {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => {
                state.searchQuery = e.target.value.trim().toLowerCase();
                dom.searchClear.classList.toggle('hidden', !state.searchQuery);
                state.displayCount = state.batchSize;
                applyFiltersAndRender();
            }, 200);
        });

        dom.searchClear.addEventListener('click', () => {
            dom.searchInput.value = '';
            state.searchQuery = '';
            dom.searchClear.classList.add('hidden');
            state.displayCount = state.batchSize;
            applyFiltersAndRender();
        });

        // Filter item clicks
        dom.sidebar.addEventListener('click', (e) => {
            const item = e.target.closest('.filter-item');
            if (item) {
                const type = item.dataset.type;
                const value = item.dataset.value;
                if (state.filters[type].has(value)) {
                    state.filters[type].delete(value);
                    item.classList.remove('active');
                } else {
                    state.filters[type].add(value);
                    item.classList.add('active');
                }
                state.displayCount = state.batchSize;
                applyFiltersAndRender();
                updateActiveFilterTags();
                updateClearButton();
            }
        });

        // Filter group toggles
        document.querySelectorAll('.filter-group-header').forEach(header => {
            header.addEventListener('click', () => {
                const targetId = header.dataset.target;
                const body = document.getElementById(targetId);
                body.classList.toggle('expanded');
            });
        });

        // Filter search inputs
        document.querySelectorAll('.filter-search').forEach(input => {
            input.addEventListener('input', (e) => {
                const filterType = e.target.dataset.filter;
                const query = e.target.value.toLowerCase();
                const container = document.getElementById(filterType + '-items');
                const items = container.querySelectorAll('.filter-item');
                items.forEach(item => {
                    const label = item.querySelector('.filter-item-label').textContent.toLowerCase();
                    item.style.display = label.includes(query) ? '' : 'none';
                });
            });
        });

        // Clear all filters
        dom.clearFilters.addEventListener('click', clearAllFilters);
        if (dom.resetAll) dom.resetAll.addEventListener('click', clearAllFilters);

        // Sort
        dom.sortSelect.addEventListener('change', (e) => {
            state.sortBy = e.target.value;
            state.displayCount = state.batchSize;
            applyFiltersAndRender();
        });

        // View mode
        dom.gridViewBtn.addEventListener('click', () => setViewMode('grid'));
        dom.listViewBtn.addEventListener('click', () => setViewMode('list'));

        // Load more
        dom.loadMoreBtn.addEventListener('click', () => {
            state.displayCount += state.batchSize;
            renderInnovations();
        });

        // Mobile menu
        dom.mobileMenuBtn.addEventListener('click', () => {
            dom.sidebar.classList.toggle('open');
        });

        // Modal close
        dom.modalClose.addEventListener('click', closeModal);
        dom.modalOverlay.addEventListener('click', (e) => {
            if (e.target === dom.modalOverlay) closeModal();
        });
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') closeModal();
        });

        // Innovation card clicks (event delegation)
        dom.innovationGrid.addEventListener('click', (e) => {
            const card = e.target.closest('.innovation-card');
            if (card) {
                const id = parseInt(card.dataset.id, 10);
                const innovation = state.innovations.find(i => i.id === id);
                if (innovation) openModal(innovation);
            }
        });

        // Header scroll effect
        let lastScroll = 0;
        window.addEventListener('scroll', () => {
            const scrolled = window.scrollY > 10;
            dom.header.classList.toggle('scrolled', scrolled);
            lastScroll = window.scrollY;
        }, { passive: true });

        // Close sidebar on content click (mobile)
        dom.innovationGrid.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                dom.sidebar.classList.remove('open');
            }
        });
    }

    // ─── Filter + Render ─────────────────────────────────────
    function applyFiltersAndRender() {
        let filtered = [...state.innovations];

        // Search filter
        if (state.searchQuery) {
            filtered = filtered.filter(inn => {
                const searchFields = [
                    inn.title,
                    inn.description,
                    inn.property,
                    inn.function,
                    ...(inn.industries || [])
                ].filter(Boolean).join(' ').toLowerCase();
                return searchFields.includes(state.searchQuery);
            });
        }

        // Facet filters
        if (state.filters.properties.size > 0) {
            filtered = filtered.filter(inn =>
                inn.property && state.filters.properties.has(inn.property.toLowerCase())
            );
        }

        if (state.filters.functions.size > 0) {
            filtered = filtered.filter(inn =>
                inn.function && state.filters.functions.has(inn.function.toLowerCase())
            );
        }

        if (state.filters.industries.size > 0) {
            filtered = filtered.filter(inn => {
                if (!inn.industries || inn.industries.length === 0) return false;
                return inn.industries.some(ind => state.filters.industries.has(ind.toLowerCase()));
            });
        }

        // Sort
        filtered = sortInnovations(filtered, state.sortBy);

        state.filteredInnovations = filtered;
        renderInnovations();
    }

    function sortInnovations(innovations, sortBy) {
        const sorted = [...innovations];
        switch (sortBy) {
            case 'newest':
                sorted.sort((a, b) => (b.id || 0) - (a.id || 0));
                break;
            case 'oldest':
                sorted.sort((a, b) => (a.id || 0) - (b.id || 0));
                break;
            case 'az':
                sorted.sort((a, b) => (a.title || '').localeCompare(b.title || ''));
                break;
            case 'za':
                sorted.sort((a, b) => (b.title || '').localeCompare(a.title || ''));
                break;
        }
        return sorted;
    }

    function renderInnovations() {
        const innovations = state.filteredInnovations;
        const toShow = innovations.slice(0, state.displayCount);

        // Update counts
        dom.showingCount.textContent = Math.min(state.displayCount, innovations.length).toLocaleString();
        dom.totalInnovations.textContent = innovations.length.toLocaleString();

        // Show/hide empty state
        const hasResults = innovations.length > 0;
        dom.emptyState.classList.toggle('hidden', hasResults);
        dom.innovationGrid.classList.toggle('hidden', !hasResults);
        dom.loadMoreContainer.classList.toggle('hidden', state.displayCount >= innovations.length);

        if (!hasResults) return;

        // Render cards with staggered animation
        const fragment = document.createDocumentFragment();
        toShow.forEach((inn, index) => {
            const card = createCard(inn, index);
            fragment.appendChild(card);
        });

        dom.innovationGrid.innerHTML = '';
        dom.innovationGrid.appendChild(fragment);
    }

    function createCard(innovation, index) {
        const card = document.createElement('div');
        card.className = 'innovation-card';
        card.dataset.id = innovation.id;
        card.style.animationDelay = `${Math.min(index * 15, 400)}ms`;

        const imageUrl = innovation.imageUrl || '';
        const hasImage = imageUrl && imageUrl.length > 0;

        card.innerHTML = `
            <div class="card-image-container">
                ${hasImage
                ? `<img class="card-image" src="${escapeHtml(imageUrl)}" alt="${escapeHtml(innovation.title)}" loading="lazy" onerror="this.parentElement.innerHTML='<div class=\\'card-image-placeholder\\'>💡</div>'">`
                : '<div class="card-image-placeholder">💡</div>'
            }
                ${innovation.property
                ? `<span class="card-property-badge">${escapeHtml(innovation.property)}</span>`
                : ''
            }
            </div>
            <div class="card-body">
                <h3 class="card-title">${escapeHtml(innovation.title)}</h3>
                <div class="card-meta">
                    <span class="card-function">${innovation.function ? escapeHtml(innovation.function) : ''}</span>
                    <span class="card-id">#${innovation.id}</span>
                </div>
            </div>
        `;

        return card;
    }

    // ─── View Mode ───────────────────────────────────────────
    function setViewMode(mode) {
        state.viewMode = mode;
        dom.gridViewBtn.classList.toggle('active', mode === 'grid');
        dom.listViewBtn.classList.toggle('active', mode === 'list');
        dom.innovationGrid.classList.toggle('list-view', mode === 'list');
    }

    // ─── Active Filter Tags ──────────────────────────────────
    function updateActiveFilterTags() {
        const tags = [];
        for (const [type, values] of Object.entries(state.filters)) {
            for (const value of values) {
                tags.push({ type, value });
            }
        }

        dom.activeFilters.innerHTML = tags.map(tag => `
            <span class="filter-tag">
                ${escapeHtml(tag.value)}
                <button data-type="${tag.type}" data-value="${escapeHtml(tag.value)}" aria-label="Remove filter">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M18 6L6 18M6 6l12 12"></path>
                    </svg>
                </button>
            </span>
        `).join('');

        // Bind remove buttons
        dom.activeFilters.querySelectorAll('button').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const { type, value } = btn.dataset;
                state.filters[type].delete(value);

                // Update sidebar checkbox
                const item = dom.sidebar.querySelector(`.filter-item[data-type="${type}"][data-value="${CSS.escape(value)}"]`);
                if (item) item.classList.remove('active');

                state.displayCount = state.batchSize;
                applyFiltersAndRender();
                updateActiveFilterTags();
                updateClearButton();
            });
        });
    }

    function updateClearButton() {
        const hasFilters = Object.values(state.filters).some(set => set.size > 0);
        dom.clearFilters.classList.toggle('hidden', !hasFilters);
    }

    function clearAllFilters() {
        for (const key of Object.keys(state.filters)) {
            state.filters[key].clear();
        }
        dom.sidebar.querySelectorAll('.filter-item.active').forEach(el => el.classList.remove('active'));
        dom.searchInput.value = '';
        state.searchQuery = '';
        dom.searchClear.classList.add('hidden');
        state.displayCount = state.batchSize;
        applyFiltersAndRender();
        updateActiveFilterTags();
        updateClearButton();
    }

    // ─── Modal ───────────────────────────────────────────────
    function openModal(innovation) {
        const imageUrl = innovation.imageUrl || '';
        const hasImage = imageUrl && imageUrl.length > 0;

        dom.modalBody.innerHTML = `
            ${hasImage
                ? `<img class="modal-image" src="${escapeHtml(imageUrl.replace('width=252&height=252', 'width=720&height=450'))}" alt="${escapeHtml(innovation.title)}" onerror="this.style.display='none'">`
                : ''
            }
            <div class="modal-content">
                <h2 class="modal-title">${escapeHtml(innovation.title)}</h2>
                <div class="modal-badges">
                    ${innovation.property
                        ? `<span class="modal-badge badge-property">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
                            </svg>
                            ${escapeHtml(innovation.property)}
                           </span>`
                        : ''
                    }
                    ${innovation.function
                        ? `<span class="modal-badge badge-function">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <circle cx="12" cy="12" r="3"></circle>
                                <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2"></path>
                            </svg>
                            ${escapeHtml(innovation.function)}
                           </span>`
                        : ''
                    }
                    ${(innovation.industries || []).map(ind =>
                        `<span class="modal-badge badge-industry">${escapeHtml(ind)}</span>`
                    ).join('')}
                </div>
                ${innovation.description
                    ? `<div class="modal-description">${escapeHtml(innovation.description)}</div>`
                    : '<div class="modal-description" style="color:var(--text-muted); font-style:italic;">No detailed description available. Visit MoreInspiration.com for full details.</div>'
                }
                <div class="modal-footer">
                    <div>
                        ${innovation.source
                            ? `<span class="modal-source">Source: <a href="${escapeHtml(innovation.source)}" target="_blank" rel="noopener">${escapeHtml(extractDomain(innovation.source))}</a></span>`
                            : ''
                        }
                        ${innovation.dateAdded
                            ? `<span class="modal-date">${escapeHtml(innovation.dateAdded)}</span>`
                            : ''
                        }
                    </div>
                    <a class="modal-link-btn" href="https://www.moreinspiration.com/article/${innovation.id}/${innovation.slug || ''}" target="_blank" rel="noopener">
                        View on MoreInspiration
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3"></path>
                        </svg>
                    </a>
                </div>
            </div>
        `;

        dom.modalOverlay.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        dom.modalOverlay.classList.add('hidden');
        document.body.style.overflow = '';
    }

    // ─── Utilities ───────────────────────────────────────────
    function escapeHtml(str) {
        if (!str) return '';
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    }

    function extractDomain(url) {
        try {
            return new URL(url).hostname.replace('www.', '');
        } catch {
            return url;
        }
    }

    // ─── Init ────────────────────────────────────────────────
    document.addEventListener('DOMContentLoaded', () => {
        cacheDom();
        loadData();
    });
})();
