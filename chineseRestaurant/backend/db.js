const sql = require('mssql/msnodesqlv8');

const config = {
    server: '(LocalDb)\\MSSQLLocalDB',
    database: 'ChineseRestaurant',
    driver: 'msnodesqlv8',
    options: {
        trustedConnection: true,
    },
};


const poolPromise = new sql.ConnectionPool(config)
    .connect()
    .then(async (pool) => {
        console.log('Connected to MS SQL Server');

        // Create the 'ChineseRestaurant' database if it does not exist
        const createDatabaseQuery = `IF NOT EXISTS (SELECT * FROM sys.databases WHERE name = 'ChineseRestaurant')
                                        CREATE DATABASE ChineseRestaurant;`;
        await pool.request().query(createDatabaseQuery);

        // Switch to the 'ChineseRestaurant' database
        pool.config.database = 'ChineseRestaurant';
        await pool.connect();

        // Create the 'MenuItems' table if it does not exist
        const createTableQuery = `IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'MenuItems')
                                    CREATE TABLE MenuItems (
                                        id INT PRIMARY KEY,
                                        title NVARCHAR(255) NOT NULL,
                                        description NVARCHAR(255) NOT NULL
                                    );`;
        await pool.request().query(createTableQuery);

        console.log('Database and tables initialized');
        return pool;
    })
    .catch((err) => console.log('Database connection failed:', err));

async function getAllMenuItems() {
    try {
        const pool = await poolPromise;
        const request = new sql.Request(pool);
        const result = await request.query('SELECT * FROM MenuItems');
        return result.recordset;
    } catch (error) {
        console.error('Error fetching all menu items:', error);
        throw error;
    }
}
    

async function getMenuItemById(id) {
    try {
        const pool = await poolPromise;
        const request = new sql.Request(pool);
        request.input('id', sql.Int, id);
        const result = await request.query('SELECT * FROM MenuItems WHERE Id = @id');
        return result.recordset[0];
    } catch (error) {
        console.error('Error fetching menu item by id:', error);
        throw error;
    }
}

async function addMenuItem(menuItem) {
    try {
        const pool = await poolPromise;
        const request = new sql.Request(pool);
        request.input('id', sql.Int, menuItem.id);
        request.input('title', sql.NVarChar, menuItem.title);
        request.input('description', sql.NVarChar, menuItem.description);
        const result = await request.query('INSERT INTO MenuItems (Id, Title, Description) OUTPUT INSERTED.* VALUES (@id, @title, @description)');
        return result.recordset[0];
    } catch (error) {
        console.error('Error adding menu item:', error);
        throw error;
    }
}


async function deleteMenuItem(id) {
    try {
        const pool = await poolPromise;
        const request = new sql.Request(pool);
        request.input('id', sql.Int, id);
        const result = await request.query('DELETE FROM MenuItems WHERE Id = @id');
        return result.rowsAffected[0] > 0;
    } catch (error) {
        console.error('Error deleting menu item:', error);
        throw error;
    }
}

async function updateMenuItem(id, updatedMenu) {
    try {
        const pool = await poolPromise;
        const request = new sql.Request(pool);
        request.input('id', sql.Int, id);
        request.input('title', sql.NVarChar, updatedMenu.title);
        request.input('description', sql.NVarChar, updatedMenu.description);
        const result = await request.query('UPDATE MenuItems SET Title = @title, Description = @description WHERE Id = @id');
        return result.rowsAffected[0] > 0;
    } catch (error) {
        console.error('Error updating menu item:', error);
        throw error;
    }
}

module.exports = {
    sql,
    poolPromise,
    getAllMenuItems,
    getMenuItemById,
    addMenuItem,
    deleteMenuItem,
    updateMenuItem
};

