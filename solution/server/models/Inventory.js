// Add veggie
// Remove
// Update
// Get all
// Get by Id

const Vegetable = require('../models/Vegetable')

class Inventory {
  constructor() {
    this.vegetables = [];
    this.bread = [];
    this.counterId = 1;
  }

  addItem(itemDetails, type) {
    let itemId = this.counterId;
    this.counterId++;

    if (type === 'vegetable') {
      let name = itemDetails.name
      let unit = itemDetails.unit
      let units = itemDetails.units
      let price = itemDetails.price
      let origin = itemDetails.origin

      // Create vegetable object
      let newVeggie = new Vegetable(itemId, name, units, price, unit, origin)
      this.vegetables.push(newVeggie)

      return newVeggie;
    } else if (type == 'bread') {
      // TODO
      this.bread.push()
    }
  }

  removeItem(itemId, type) {
    if (type === 'vegetable') {
      for (let i = 0; i < this.vegetables.length; i++) {
        let crrItem = this.vegetables[i];
        if (crrItem.id === itemId) {
          this.vegetables.splice(i, 1)
          return crrItem
        }
      }
    } else if (type === 'bread') {
      for (let i = 0; i < this.bread.length; i++) {
        let crrItem = this.bread[i];
        if (crrItem.id === itemId) {
          this.bread.splice(i, 1)
          return crrItem
        }
      }
    }
  }

  getItemById(itemId, type) {
    let arr;

    if (type === 'vegetable') {
      arr = this.vegetables;
    } else if (type === 'bread') {
      arr = this.bread
    }

    for (let i = 0; i < arr.length; i++) {
      let crrItem = arr[i];
      if (crrItem.id === itemId) {
        return crrItem // Found, return it
      }
    }

    return null // Didn't find it
  }

  getAllItemsByType(type) {
    if (type === 'vegetable') {
      return this.vegetables;
    } else if (type == 'bread') {
      return this.bread
    }

    return null
  }

  updateItem() { }

  getAllItems() { }

}

let myInventory = new Inventory()

module.exports = myInventory;

