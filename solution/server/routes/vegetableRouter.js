/*

/inventory/vegetable
- POST [DONE]
- GET [DONE]
/inventory/vegetable/<veg_id>
- GET [DONE]
- PATCH
- DELETE

*/


const express = require('express')
const myInventory = require('../models/Inventory')
const Vegetable = require('../models/Vegetable')

const router = express.Router();

// Attending requests arriving at /inventory/vegetable

router.get('/', (req, res) => {
  let allVeggies = myInventory.getAllItemsByType('vegetable')
  res.json(allVeggies)
})

router.post('/', (req, res) => {
  // id, name, units, price, unit, origin
  let itemDetails = req.body

  let newVeggie = myInventory.addItem(itemDetails, 'vegetable') // Add vegetable to the inventory
  res.json(newVeggie)
})

router.get('/:id', (req, res) => {
  let id = parseInt(req.params.id)
  let veggie = myInventory.getItemById(id, 'vegetable');
  res.json(veggie)
})

module.exports = router;
