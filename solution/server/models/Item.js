// Write the class Item
// An instance of the class Item should have
// the following properties:
// id, name, units, arrived_at, type and price

class Item {
  constructor(id, name, units, type, price) {
    this.id = id;
    this.name = name;
    this.units = units;
    this.type = type;
    this.price = price;

    let currentDate = new Date();
    this.arrived_at = currentDate.toISOString();
  }
}

module.exports = Item;
