const express = require('express');
const cors = require('cors');

const port = 3129;

const app = express();

app.use(cors());

app.use(express.json())
app.use(express.urlencoded({
    extended: true
}));

app.listen(port, () => {
    console.log("listening on port :", port);
})

// VEGETABLES ROUTE
const vegetableRouter = require('./Routers/vegetableRouter');
app.use('/inventory/vegetable', vegetableRouter);

// BREAD ROUTE
const breadRouter = require('./Routers/breadRouter');
app.use('/inventory/bread', breadRouter);

// GETTING ALL INVENTORY
const inventory = require('../Models/Inventory')
app.get('/inventory/all', (request, response) => {
    let allItems = inventory.getAllItems();
    if (allItems.length) {
        response.json({
            status: 'success',
            message: allItems
        })
    } else (
        response.json({
            status: 'failed',
            message: 'Inventory is empty'
        })
    )
})