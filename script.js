document.addEventListener('DOMContentLoaded', () => {
    const newOrderBtn = document.getElementById('new-order-btn');
    const addItemBtn = document.getElementById('add-item-btn');

    newOrderBtn.addEventListener('click', () => {
        alert('Starting a new order...');
    });

    addItemBtn.addEventListener('click', () => {
        alert('Navigating to add new item page...');
    });
});
