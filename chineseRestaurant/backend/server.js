const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./db')

const app = express();
app.use(bodyParser.json());
app.use(cors());

// GET request to retrieve data from the server
app.get('/menu', async (req, res) => {
    try {
        const menuItems = await db.getAllMenuItems();
        res.json(menuItems);
    } catch (error) {
        console.error('Error fetching menu items:', error.message, error.stack);
        res.status(500).json({ message: 'Failed to fetch menu items', error: { message: error.message, stack: error.stack } });
    }
});


// Get specified item from the server.
app.get('/menu/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const menuItem = await db.getMenuItemById(id);
        if (menuItem) {
            res.json(menuItem);
        } else {
            res.status(404).json({ message: 'Menu item not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch menu item', error });
    }
});

// POST Request to add new items
app.post('/menu', async (req, res) => {
    try {
        const menu = req.body;

        // Validate request body
        if (!menu || !menu.hasOwnProperty("title") || !menu.hasOwnProperty("description")) {
            return res.status(400).json({message: 'Invalid request body. Title and description are required.'});
        }

        const newMenuItem = await db.addMenuItem(menu);
        res.status(201).json({ message: 'Item has been added successfully', menuItem: newMenuItem });
    }
    catch (error) {
        res.status(500).json({message: 'Failed to add item', error});
    }
});

// DELETE request 
app.delete('/menu/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const deleted = await db.deleteMenuItem(id);
        if (deleted) {
            res.status(200).json({ message: 'Item deleted successfully'});
        } else {
            res.status(404).json({ message: 'Menu item not found'});
        }
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete item', error });
    }
});

// PUT request to update a menu item.
app.put('/menu/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    const updatedMenu = req.body;

    // Check if the request body has valid properties and correct data types
    const validProperties = ['title', 'description'];
    for (const prop in updatedMenu) {
        if (!validProperties.includes(prop) || (prop === 'title' && typeof updatedMenu.title !== 'string') || (prop === 'description' && typeof updatedMenu.description !== 'string')) {
            return res.status(400).json({ message: 'Invalid request format. Must include only title and description.' });
        }
    }

    try {
        const updated = await db.updateMenuItem(id, updatedMenu);
        if (updated) {
            res.status(200).json({ message: 'Item updated successfully' });
        } else {
            res.status(404).json({ message: 'Menu item not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Failed to update item', error });
    }
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
