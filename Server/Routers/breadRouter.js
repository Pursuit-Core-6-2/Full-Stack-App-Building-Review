const inventory = require('../../Models/Inventory');

const express = require('express');
const breadRouter = express.Router();

//breadRouter.get('/', (request, response) => {response.send('Bread ok')})

const getAllItems = (request, response) => {
    let list = inventory.getItemsByType('bread');

    if (list.length) {
        response.json({
            status: 'success',
            message: list
        })
    } else {
        response.json({
            status: 'failed',
            message: `This inventory is empty`
        })
    }
}

const addItem = (request, response) => {
    let newItem = {
        type: (request.body.type).toLowerCase(),
        name: (request.body.name).toLowerCase(),
        price: parseFloat(request.body.price).toFixed(2),
        units: parseFloat(request.body.units).toFixed(2),
        bakery: (request.body.bakery).toLowerCase(),
        bread_type: (request.body.bread_type).toLowerCase()
    }
    let addedItem = inventory.addItem(newItem);
    if (addItem) {
        response.json({
            status: 'success',
            message: addedItem
        })
    } else {
        response.json({
            status: 'failed',
            message: 'missing data to add item, all fields are required'
        })
    }
}


const getItemById = (request, response) => {
    let productID = parseInt(request.params.itemID);
    let item = inventory.getItemById(productID);
    if (item.length && item[0].type === 'bread') {
        response.json({
            status: 'success',
            message: item
        })
    } else {
        response.json({
            status: 'failed',
            message: `The entered id doesn't exist`
        })
    }
}

const updateItem = (request, response) => {
    let productID = parseInt(request.params.itemID);
    let data = {};
    if (request.body.name) {
        data.name = (request.body.name).toLowerCase();
    }
    if (request.body.price) {
        data.price = parseFloat(request.body.price).toFixed(2);
    }
    if (request.body.units) {
        data.units = parseFloat(request.body.units).toFixed(2);
    }
    if (request.body.bakery) {
        data.bakery = (request.body.bakery).toLowerCase();
    }
    if (request.body.bread_type) {
        data.bread_type = (request.body.bread_type).toLowerCase();
    }

    let updatedItem = inventory.updateItem(productID, data);
    if (updatedItem) {
        response.json({
            status: 'success',
            message: updatedItem
        })
    } else {
        response.json({
            status: 'failed',
            message: `The entered id doesn't exist`
        }) 
    }
}

const deleteItem = (request, response) => {
    let productID = parseInt(request.params.itemID);
    let deletedItem = inventory.removeItem(productID);
    if (deletedItem) {
        response.json({
            status: 'success',
            message: deletedItem
        })
    } else {
        response.json({
            status: 'failed',
            message: `The entered id doesn't exist`
        }) 
    }
}


// Get all bread in inventory
breadRouter.get('/', getAllItems);

// Add bread to inventory
breadRouter.post('/', addItem);

// Get bread by id
breadRouter.get('/:itemID', getItemById);

// Update bread
breadRouter.patch('/:itemID', updateItem);

// Delete bread
breadRouter.delete('/:itemID', deleteItem)


module.exports = breadRouter;