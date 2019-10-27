/*

/inventory/vegetable
- POST
- GET [DONE]
/inventory/vegetable/<veg_id>
- GET
- PATCH
- DELETE

*/


const express = require('express')
const myInventory = require('../models/Inventory')

const router = express.Router();

router.get('/', (req, res) => {
  let allVeggies = myInventory.getAllItemsByType('vegetable')
  res.json(allVeggies)
})

router.get('/:id', (req, res) => {
  let id = parseInt(req.params.id)
  let veggie = myInventory.getItemById(id, 'vegetable');
  res.json(veggie)
})

module.exports = router;
