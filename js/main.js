// ============================================
// VARIABLES GLOBALES
// ============================================
let allBusinesses = [];
let currentBusinesses = [];
let currentPage = 1;
const businessesPerPage = 12;

let currentSuggestions = [];
let selectedSuggestionIndex = -1;

// ============================================
// ESPERAR A QUE EL DOM ESTÉ LISTO
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    if (typeof window.businessesData !== 'undefined' && window.businessesData.length > 0) {
        allBusinesses = [...window.businessesData];
    } else if (typeof businesses !== 'undefined' && businesses.length > 0) {
        allBusinesses = [...businesses];
    } else {
        console.error('No se encontraron datos de negocios.');
        showNoBusinessesMessage();
        return;
    }

    currentBusinesses = [...allBusinesses];
    initApp();
});

// ============================================
// INICIALIZAR APLICACIÓN
// ============================================
function initApp() {
    loadFeaturedBusinesses();
    loadBusinessesGrid();
    loadCategoriesFilter();
    setupEventListeners();
    setupAutocomplete();
    hideSpinners();
}

// ============================================
// CARGAR NEGOCIOS DESTACADOS
// ============================================
function loadFeaturedBusinesses() {
    const featuredGrid = document.getElementById('featured-grid');
    if (!featuredGrid) return;
    
    const featured = allBusinesses.filter(b => b.destacado === true).slice(0, 6);
    
    if (featured.length === 0) {
        featuredGrid.innerHTML = '<p class="no-results">No hay negocios destacados</p>';
        return;
    }
    
    featuredGrid.innerHTML = featured.map(business => createBusinessCard(business)).join('');
    attachWhatsAppEvents();
}

// ============================================
// CARGAR GRID PRINCIPAL
// ============================================
function loadBusinessesGrid() {
    const businessesGrid = document.getElementById('businesses-grid');
    if (!businessesGrid) return;
    
    const start = 0;
    const end = currentPage * businessesPerPage;
    const businessesToShow = currentBusinesses.slice(start, end);
    
    if (businessesToShow.length === 0) {
        businessesGrid.innerHTML = '<p class="no-results">No se encontraron resultados.</p>';
        const loadMoreContainer = document.getElementById('load-more-container');
        if (loadMoreContainer) loadMoreContainer.style.display = 'none';
        return;
    }
    
    businessesGrid.innerHTML = businessesToShow.map(business => createBusinessCard(business)).join('');
    updateBusinessesCount();
    
    const loadMoreContainer = document.getElementById('load-more-container');
    if (loadMoreContainer) {
        loadMoreContainer.style.display = (currentBusinesses.length > end) ? 'block' : 'none';
    }
    
    attachWhatsAppEvents();
}

// ============================================
// CREAR TARJETA DE NEGOCIO
// ============================================
function createBusinessCard(business) {
    let imageUrl = 'images/default-business.jpg';

    if (business.imagen && business.imagen.trim() !== "") {
        imageUrl = business.imagen;
    } else if (business.catalogo?.length > 0 && business.catalogo[0].imagen) {
        imageUrl = business.catalogo[0].imagen;
    }
    
    const categoryName = getCategoryName(business.categoria);
    const businessUrl = `negocio.html?id=${business.id}`;
    
    const featuredBadge = business.destacado === true ? 
        '<span class="featured-badge">⭐ DESTACADO</span>' : '';
    
    return `
        <div class="business-card" data-id="${business.id}">
            <a href="${businessUrl}" class="business-card-link">
                <div class="business-card-image-wrapper">
                    <img src="${imageUrl}" alt="${business.nombre}" class="business-card-image" loading="lazy" 
                        onerror="this.src='https://placehold.co/400x300/1f7a7a/white?text=${encodeURIComponent(business.nombre)}'">
                    ${featuredBadge}
                </div>
                <div class="business-card-content">
                    <h3 class="business-card-title">${escapeHtml(business.nombre)}</h3>
                    <div class="business-card-category">${categoryName}</div>
                    <p class="business-card-description">${business.descripcion || ''}</p>
                </div>
            </a>
            <div class="business-card-footer">
                <span class="business-card-location">📍 ${business.ubicacion?.ciudad || 'Cuba'}</span>
                <button class="business-card-whatsapp" data-whatsapp="${business.whatsapp}" data-business="${escapeHtml(business.nombre)}">
                    📱 WhatsApp
                </button>
            </div>
        </div>
    `;
}

// ============================================
// CONFIGURAR EVENT LISTENERS
// ============================================
function setupEventListeners() {
    const categoryFilter = document.getElementById('category-filter');
    const sortFilter = document.getElementById('sort-filter');
    const searchBtn = document.getElementById('search-btn');
    const businessSearch = document.getElementById('business-search');

    // Cuando cambia el select de categoría, limpia los chips activos
    if (categoryFilter) categoryFilter.addEventListener('change', () => {
        document.querySelectorAll('.category-chip').forEach(c => c.classList.remove('active'));
        filterBusinesses();
    });

    if (sortFilter) sortFilter.addEventListener('change', filterBusinesses);
    if (searchBtn) searchBtn.addEventListener('click', searchBusinessesFromHero);
    
    if (businessSearch) {
        businessSearch.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') searchBusinessesFromHero();
        });
    }

    const loadMoreBtn = document.getElementById('load-more-btn');
    if (loadMoreBtn) loadMoreBtn.addEventListener('click', loadMoreBusinesses);

    const backToTopButton = document.getElementById('back-to-top');
    if (backToTopButton) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) backToTopButton.classList.add('visible');
            else backToTopButton.classList.remove('visible');
        });

        backToTopButton.addEventListener('click', function() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // Chips de categoría con estado activo (dorado)
    document.querySelectorAll('.category-chip').forEach(chip => {
        chip.addEventListener('click', function() {
            const wasActive = this.classList.contains('active');

            // Quita active de todos los chips
            document.querySelectorAll('.category-chip').forEach(c => c.classList.remove('active'));

            if (!wasActive) {
                // Activa el chip clickeado
                this.classList.add('active');
                const selectedCat = this.dataset.categoria;
                if (selectedCat && categoryFilter) {
                    categoryFilter.value = selectedCat;
                }
            } else {
                // Si ya estaba activo, lo deselecciona y muestra todo
                if (categoryFilter) categoryFilter.value = 'todas';
            }

            filterBusinesses();
            document.getElementById('todos-los-negocios')?.scrollIntoView({ behavior: 'smooth' });
        });
    });

    const menuToggle = document.getElementById('menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', () => {
            mainNav.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
        
        // Cerrar menú al hacer clic en un enlace
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                mainNav.classList.remove('active');
                menuToggle.classList.remove('active');
            });
        });
    }
}

// ============================================
// FUNCIONES DE FILTRADO
// ============================================
function filterBusinesses() {
    const category = document.getElementById('category-filter')?.value || 'todas';
    const sortBy = document.getElementById('sort-filter')?.value || 'reciente';
    const searchTerm = document.getElementById('business-search')?.value.toLowerCase() || '';
    const zone = document.getElementById('zone-filter')?.value || 'todas';
    
    let filtered = [...allBusinesses];
    
    if (category !== 'todas') {
        filtered = filtered.filter(b => b.categoria === category);
    }
    
    if (zone !== 'todas') {
        filtered = filtered.filter(b => b.zona === zone);
    }
    
    if (searchTerm) {
        filtered = filtered.filter(b => 
            b.nombre.toLowerCase().includes(searchTerm) ||
            (b.descripcion && b.descripcion.toLowerCase().includes(searchTerm))
        );
    }
    
    if (sortBy === 'nombre-asc') filtered.sort((a, b) => a.nombre.localeCompare(b.nombre));
    else if (sortBy === 'nombre-desc') filtered.sort((a, b) => b.nombre.localeCompare(a.nombre));
    else if (sortBy === 'popular') filtered.sort((a, b) => (b.visitas || 0) - (a.visitas || 0));
    else if (sortBy === 'rating') filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    
    currentBusinesses = filtered;
    currentPage = 1;
    loadBusinessesGrid();
}

function searchBusinessesFromHero() {
    filterBusinesses();
    document.getElementById('todos-los-negocios')?.scrollIntoView({ behavior: 'smooth' });
}

function loadMoreBusinesses() {
    currentPage++;
    loadBusinessesGrid();
}

function updateBusinessesCount() {
    const countElement = document.getElementById('businesses-count');
    if (countElement) {
        const total = currentBusinesses.length;
        countElement.textContent = `${total} ${total === 1 ? 'lugar encontrado' : 'lugares encontrados'}`;
    }
}

// ============================================
// WHATSAPP
// ============================================
function attachWhatsAppEvents() {
    document.querySelectorAll('.business-card-whatsapp').forEach(btn => {
        btn.onclick = function(e) {
            e.preventDefault();
            e.stopPropagation();
            const phone = this.dataset.whatsapp;
            const name = this.dataset.business;
            const msg = encodeURIComponent(`Hola, vi a ${name} en LA CARTA y quisiera más información.`);
            window.open(`https://wa.me/${phone}?text=${msg}`, '_blank');
        };
    });
}

// ============================================
// UTILIDADES
// ============================================
function getCategoryName(code) {
    const names = {
        'restaurante': '🍽️ Restaurante',
        'cafeteria': '☕ Cafetería',
        'bar': '🍸 Bar',
        'heladeria': '🍦 Heladería',
        'panaderia': '🥐 Panadería',
        'comida-rapida': '🍔 Comida Rápida'
    };
    return names[code] || '📍 Negocio';
}

function getCategoryIcon(categoria) {
    const icons = {
        'cafeteria': '☕',
        'restaurante': '🍽️',
        'bar': '🍸',
        'heladeria': '🍦',
        'panaderia': '🥐',
        'comida-rapida': '🍔'
    };
    return icons[categoria] || '🏪';
}

function loadCategoriesFilter() {
    const filter = document.getElementById('category-filter');
    if (!filter) return;
    filter.innerHTML = '<option value="todas">Todas las categorías</option>';
    const categories = [...new Set(allBusinesses.map(b => b.categoria))];
    categories.forEach(cat => {
        const opt = document.createElement('option');
        opt.value = cat;
        opt.textContent = getCategoryName(cat);
        filter.appendChild(opt);
    });
}

function hideSpinners() {
    const spinner = document.getElementById('loading-spinner');
    if (spinner) spinner.style.display = 'none';
}

function escapeHtml(str) {
    if (!str) return '';
    const map = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
    return str.replace(/[&<>"']/g, m => map[m]);
}

function showNoBusinessesMessage() {
    const grid = document.getElementById('businesses-grid');
    if (grid) grid.innerHTML = '<p class="no-results">Error al cargar datos.</p>';
}

function highlightText(text, query) {
    if (!query) return text;
    const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    return text.replace(regex, '<span class="suggestion-highlight">$1</span>');
}

// ============================================
// AUTOCOMPLETADO (SOLO BÚSQUEDA POR NOMBRE)
// ============================================
function setupAutocomplete() {
    const searchInput = document.getElementById('business-search');
    const suggestionsContainer = document.getElementById('search-suggestions');
    
    if (!searchInput || !suggestionsContainer) return;
    
    searchInput.addEventListener('input', function(e) {
        const query = e.target.value.toLowerCase().trim();
        
        if (query.length < 2) {
            suggestionsContainer.classList.remove('active');
            return;
        }
        
        const matches = allBusinesses.filter(business => {
            return business.nombre.toLowerCase().includes(query);
        });
        
        currentSuggestions = matches.slice(0, 6);
        selectedSuggestionIndex = -1;
        
        if (currentSuggestions.length === 0) {
            suggestionsContainer.innerHTML = '<div class="no-suggestions">No se encontraron negocios con ese nombre</div>';
            suggestionsContainer.classList.add('active');
            return;
        }
        
        suggestionsContainer.innerHTML = currentSuggestions.map((business, index) => {
            const highlightedName = highlightText(business.nombre, query);
            const categoryIcon = getCategoryIcon(business.categoria);
            
            return `
                <div class="suggestion-item" data-index="${index}" data-id="${business.id}">
                    <div class="suggestion-icon">${categoryIcon}</div>
                    <div class="suggestion-content">
                        <div class="suggestion-name">${highlightedName}</div>
                        <div class="suggestion-category">${getCategoryName(business.categoria)}</div>
                        <div class="suggestion-location">📍 ${business.ubicacion?.ciudad || 'Cuba'}</div>
                    </div>
                    <div class="suggestion-whatsapp">
                        <i class="fab fa-whatsapp"></i>
                    </div>
                </div>
            `;
        }).join('');
        
        suggestionsContainer.classList.add('active');
        
        document.querySelectorAll('.suggestion-item').forEach(item => {
            item.addEventListener('click', function() {
                const businessId = this.dataset.id;
                window.location.href = `negocio.html?id=${businessId}`;
            });
        });
    });
    
    searchInput.addEventListener('keydown', function(e) {
        const items = document.querySelectorAll('.suggestion-item');
        
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            selectedSuggestionIndex = Math.min(selectedSuggestionIndex + 1, items.length - 1);
            updateSelectedSuggestion(items);
        } 
        else if (e.key === 'ArrowUp') {
            e.preventDefault();
            selectedSuggestionIndex = Math.max(selectedSuggestionIndex - 1, 0);
            updateSelectedSuggestion(items);
        }
        else if (e.key === 'Enter') {
            if (selectedSuggestionIndex >= 0 && currentSuggestions[selectedSuggestionIndex]) {
                e.preventDefault();
                const business = currentSuggestions[selectedSuggestionIndex];
                window.location.href = `negocio.html?id=${business.id}`;
            }
        }
        else if (e.key === 'Escape') {
            suggestionsContainer.classList.remove('active');
            searchInput.blur();
        }
    });
    
    document.addEventListener('click', function(e) {
        if (!searchInput.contains(e.target) && !suggestionsContainer.contains(e.target)) {
            suggestionsContainer.classList.remove('active');
        }
    });
}

function updateSelectedSuggestion(items) {
    items.forEach(item => item.classList.remove('selected'));
    if (items[selectedSuggestionIndex]) {
        items[selectedSuggestionIndex].classList.add('selected');
        items[selectedSuggestionIndex].scrollIntoView({ block: 'nearest' });
    }
}