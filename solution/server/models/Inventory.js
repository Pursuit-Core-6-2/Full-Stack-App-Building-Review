// Add veggie
// Remove
// Update
// Get all
// Get by Id

class Inventory {
  constructor() {
    this.vegetables = [];
    this.bread = [];
  }

  addItem(item) {
    if (item.type === 'vegetable') {
      this.vegetables.push(item)
    } else if (item.type == 'bread') {
      this.bread.push(item)
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

let item1 = {
  id: 1,
  type: 'bread',
  name: 'Bagel'
}

let item2 = {
  id: 2,
  type: 'vegetable',
  name: 'Spinach'
}

let item3 = {
  id: 3,
  type: 'vegetable',
  name: 'Carrot'
}

myInventory.addItem(item1)
myInventory.addItem(item2)
myInventory.addItem(item3)

// Remove Spinach
// let removedItem = myInventory.removeItem(2, 'vegetable')
// console.log('removedItem', removedItem)

module.exports = myInventory;

