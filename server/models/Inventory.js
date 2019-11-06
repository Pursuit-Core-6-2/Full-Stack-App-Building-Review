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

  getItemByName(name, type) {
    let filteredInventory;

    if (type === 'vegetable') {
      filteredInventory = this.vegetables.filter((veg) => {
        return veg.name === name
      })

      return filteredInventory[0]

    } else if (type === 'bread') {
      // TODO
      // this.vegetables.filter()
    }
  }

  addItem(itemDetails, type) {

    // Check if item of same name already exists
    let item = this.getItemByName(itemDetails.name, type)
    if (item) {
      console.log('ITEM ALREADY EXISTS', item)
      return null;
    }

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

  /*
  { units: 20, price: 5.25 }
  */
  updateItem(id, newDetails, type) {
    console.log(id, type)
    let item = this.getItemById(id, type)
    console.log(item)

    for (let property in newDetails) {
      item[property] = newDetails[property]
    }

    return item;
  }

  getAllItems() { }

}

let myInventory = new Inventory()

module.exports = myInventory;

