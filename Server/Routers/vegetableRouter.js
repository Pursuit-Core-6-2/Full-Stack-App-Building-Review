const inventory = require('../../Models/Inventory');

const express = require('express');
const vegetableRouter = express.Router();

//vegetableRouter.get('/', (request, response) => {response.send('inventory ok')})


const getAllItems = (request, response) => {
    let list = inventory.getItemsByType('vegetable');

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
        origin: (request.body.origin).toLowerCase(),
        unit: (request.body.unit).toUpperCase()
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
    if (item.length && item[0].type === 'vegetable') {
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
    if (request.body.origin) {
        data.origin = (request.body.origin).toLowerCase();
    }
    if (request.body.unit) {
        data.unit = (request.body.unit).toUpperCase();
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


// Get all vegetable in inventory
vegetableRouter.get('/', getAllItems);

// Add vegetable to to inventory
vegetableRouter.post('/', addItem);

// Get vegetable by id
vegetableRouter.get('/:itemID', getItemById);

// Update vegetable
vegetableRouter.patch('/:itemID', updateItem);

// Delete vegetable
vegetableRouter.delete('/:itemID', deleteItem)


module.exports = vegetableRouter;