/**
 * Event listener for DOMContentLoaded.
 * Fetches menu items once the DOM is fully loaded and parsed.
 */
document.addEventListener('DOMContentLoaded', function () {
    fetchMenuItems();
});

/**
 * Fetches menu items from the server and updates the menu list.
 */
function fetchMenuItems() {
    fetch('http://localhost:3000/menu')
        .then(response => response.json())
        .then(data => {
            updateMenuList(data);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}

/**
 * Updates the menu list in the DOM with the provided menu items.
 * @param {Object} menuItems - The menu items to be displayed.
 */
function updateMenuList(menuItems) {
    const menuList = document.getElementById('menu-list');
    menuList.innerHTML = '';

    for (const id in menuItems) {
        const menuItem = menuItems[id];
        const listItem = document.createElement('li');
        listItem.textContent = `${menuItem.title}: ${menuItem.description}`;
        menuList.appendChild(listItem);
    }
}

// Get reference to the add button and add a click event listener
const addButton = document.getElementById('add-button');
addButton.addEventListener('click', function () {
    const id = parseInt(document.getElementById('id-input').value);
    const title = document.getElementById('title-input').value;
    const description = document.getElementById('description-input').value;

    const newMenuItem = {
        id: id,
        title: title,
        description: description
    };

    /**
     * Sends a POST request to add a new menu item to the server.
     * Updates the menu list upon successful addition.
     */
    fetch('http://localhost:3000/menu', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newMenuItem),
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            fetchMenuItems();
        })
        .catch(error => {
            console.error('Error adding new item:', error);
        });
});
