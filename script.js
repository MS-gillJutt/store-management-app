// --- DATA --- //
// Dummy data for demonstration purposes
const items = [
    { id: 1, name: 'HP Laptop', category: 'Electronics' },
    { id: 2, name: 'Dell Mouse', category: 'Accessories' },
    { id: 3, name: 'Samsung Monitor', category: 'Electronics' },
    { id: 4, name: 'Logitech Keyboard', category: 'Accessories' },
    { id: 5, name: 'iPhone 13', category: 'Smartphones' },
    { id: 6, name: 'Anker Power Bank', category: 'Accessories' },
    { id: 7, name: 'Sony Headphones', category: 'Audio' },
];

// --- DOM ELEMENTS --- //
const searchBar = document.getElementById('search-bar');
const resultsContainer = document.getElementById('search-results-container');

// --- EVENT LISTENERS --- //
searchBar.addEventListener('input', handleSearch);

// --- FUNCTIONS --- //

/**
 * Handles the input event on the search bar.
 * Filters items based on the search term and updates the display.
 */
function handleSearch(event) {
    const searchTerm = event.target.value.toLowerCase();
    
    // Clear previous results
    resultsContainer.innerHTML = '';

    // Start searching after 2 characters are typed
    if (searchTerm.length >= 2) {
        const filteredItems = items.filter(item => 
            item.name.toLowerCase().includes(searchTerm)
        );
        displayResults(filteredItems);
    }
}

/**
 * Displays the filtered items in the results container.
 * @param {Array} filteredItems - The array of items to display.
 */
function displayResults(filteredItems) {
    if (filteredItems.length === 0) {
        resultsContainer.innerHTML = '<div class="item">No items found.</div>';
        return;
    }

    filteredItems.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.className = 'item';
        itemElement.textContent = `${item.name} (${item.category})`;
        resultsContainer.appendChild(itemElement);
    });
}
