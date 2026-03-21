// --- DATA --- //
const items = [
    { id: 1, name: 'HP Laptop Pro', category: 'Electronics' },
    { id: 2, name: 'Dell UltraSharp Monitor', category: 'Monitors' },
    { id: 3, name: 'Logitech MX Master 3', category: 'Accessories' },
    { id: 4, name: 'Samsung T7 SSD 1TB', category: 'Storage' },
    { id: 5, name: 'Apple MacBook Air', category: 'Electronics' },
    { id: 6, name: 'Anker USB-C Hub', category: 'Accessories' },
    { id: 7, name: 'Sony WH-1000XM4', category: 'Audio' },
    { id: 8, name: 'Bose QuietComfort Earbuds', category: 'Audio' },
    { id: 9, name: 'LG 27-Inch 4K Monitor', category: 'Monitors' },
    { id: 10, name: 'WD My Passport 2TB', category: 'Storage' },
];

// --- DOM ELEMENTS --- //
const searchBar = document.getElementById('search-bar');
const categoryFiltersContainer = document.getElementById('category-filters');
const itemsGridContainer = document.getElementById('items-grid-container');

// --- STATE --- //
let currentFilter = 'All';

// --- INITIALIZATION --- //

document.addEventListener('DOMContentLoaded', () => {
    populateCategories();
    displayItems();
});

// --- EVENT LISTENERS --- //

searchBar.addEventListener('input', displayItems);

// --- FUNCTIONS --- //

/**
 * Creates category filter buttons based on the items data.
 */
function populateCategories() {
    const categories = ['All', ...new Set(items.map(item => item.category))];
    
    categories.forEach(category => {
        const button = document.createElement('button');
        button.className = 'filter-btn';
        button.textContent = category;
        if (category === 'All') {
            button.classList.add('active');
        }
        button.addEventListener('click', () => setFilter(category));
        categoryFiltersContainer.appendChild(button);
    });
}

/**
 * Sets the current category filter and updates the displayed items.
 * @param {string} category - The category to filter by.
 */
function setFilter(category) {
    currentFilter = category;
    // Update active button style
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.toggle('active', btn.textContent === category);
    });
    displayItems();
}

/**
 * Filters and displays items based on the current search term and category filter.
 */
function displayItems() {
    const searchTerm = searchBar.value.toLowerCase();

    // 1. Filter by category
    const categoryFiltered = items.filter(item => 
        currentFilter === 'All' || item.category === currentFilter
    );

    // 2. Filter by search term
    const finalFiltered = categoryFiltered.filter(item => 
        item.name.toLowerCase().includes(searchTerm)
    );

    renderItems(finalFiltered);
}

/**
 * Renders the given items to the items grid.
 * @param {Array} itemsToDisplay - The array of item objects to display.
 */
function renderItems(itemsToDisplay) {
    itemsGridContainer.innerHTML = ''; // Clear existing items

    if (itemsToDisplay.length === 0) {
        itemsGridContainer.innerHTML = '<p>No items match your criteria.</p>';
        return;
    }

    itemsToDisplay.forEach(item => {
        const card = document.createElement('div');
        card.className = 'item-card';
        card.innerHTML = `
            <div class="card-content">
                <h3 class="item-name">${item.name}</h3>
                <span class="item-category">${item.category}</span>
            </div>
        `;
        itemsGridContainer.appendChild(card);
    });
}
