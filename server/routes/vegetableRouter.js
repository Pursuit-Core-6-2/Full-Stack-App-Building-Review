/*

/inventory/vegetable
- POST [DONE]
- GET [DONE]
/inventory/vegetable/<veg_id>
- GET [DONE]
- PATCH [DONE]
- DELETE [DONE]

*/


const express = require('express')
const myInventory = require('../models/Inventory')

const router = express.Router();

// Attending requests arriving at /inventory/vegetable

router.get('/', (req, res) => {
  let allVeggies = myInventory.getAllItemsByType('vegetable')
  res.json(allVeggies)
})

router.post('/', (req, res) => {
  // id, name, units, price, unit, origin
  let itemDetails = req.body
  console.log('POST req.body', req.body)
  let newVeggie = myInventory.addItem(itemDetails, 'vegetable') // Add vegetable to the inventory

  if (newVeggie) {
    res.json(newVeggie)
  } else {
    res.status(409)
    res.json({
      message: "Error adding veggie. Duplicate names are not allowed"
    })
  }
})

router.patch('/:id', (req, res) => {
  let newDetails = req.body;
  let id = parseInt(req.params.id)

  console.log('newDetails', newDetails)

  let updatedItem = myInventory.updateItem(id, newDetails, 'vegetable')
  res.json(updatedItem)
})

router.delete('/:id', (req, res) => {
  let id = parseInt(req.params.id)

  let removedItem = myInventory.removeItem(id, 'vegetable')
  res.json(removedItem)
})

router.get('/:id', (req, res) => {
  let id = parseInt(req.params.id)
  let veggie = myInventory.getItemById(id, 'vegetable');
  res.json(veggie)
})

// Add a route to delete an item of the inventory
// use the inventory method removeItem(). Listen for a DELETE method request
module.exports = router;
