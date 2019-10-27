const Item = require('./Item');

class Vegetable extends Item {
  constructor(id, name, units, price, unit, origin) {
    super(id, name, units, "vegetable", price);
    this.unit = unit;
    this.origin = origin;
  }
}

module.exports = Vegetable;
