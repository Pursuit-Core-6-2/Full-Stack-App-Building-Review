class Item {
    constructor(id, type, name, price, units) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.units = units;
        this.arrived_timestamp = new Date().toISOString();
        this.type = type;
    }
}

class Vegetable extends Item {
    constructor (id, name, price, units, origin, unit) {
        super(id, 'vegetable', name, price, units);
        this.origin = origin;
        this.unit = unit;
    }
}

class Bread extends Item {
    constructor (id, name, price, units, bakery, bread_type) {
        super(id, 'bread', name, price, units);
        this.bakery = bakery;
        this.bread_type = bread_type;
    }
}

class Inventory {
    constructor () {
        this.vegetables = {};
        this.bread = {}
        this.idTracker = 0;
    }

    generateId() {
        this.idTracker += 1;
        return this.idTracker;
    }

    addItem(item) {
        let addedItem = null;
        
        if (item.type === 'vegetable') {
            if (!item.name || !item.origin || !item.price || !item.unit || !item.units) {
                return // MISSING INPUTS
            }
            const id = this.generateId();
            addedItem = new Vegetable (id, item.name, item.price, item.units, item.origin, item.unit);
            this.vegetables[id] = addedItem;
        }
        if (item.type === 'bread') {
            if (!item.name || !item.price || !item.units || !item.bakery || !item.bread_type) {
                return // MISSING INPUTS
            }
            const id = this.generateId();
            addedItem = new Bread(id, item.name, item.price, item.units, item.bakery, item.bread_type);
            this.bread[id] = addedItem;
        }
        return addedItem;
    }

    updateItem(itemId, data) {
        let updatedItem = null;
        if (this.vegetables[itemId]) {
            if (data.name) {
                this.vegetables[itemId].name = data.name;
            }
            if (data.origin) {
                this.vegetables[itemId].origin = data.origin;
            }
            if (data.price) {
                this.vegetables[itemId].price = data.price;
            }
            if (data.unit) {
                this.vegetables[itemId].unit = data.unit;
            }
            if (data.units) {
                this.vegetables[itemId].units = data.units;
            }
            updatedItem = this.vegetables[itemId]
        }
        if (this.bread[itemId]) {
            if (data.name) {
                this.bread[itemId].name = data.name;
            }
            if (data.price) {
                this.bread[itemId].price = data.price;
            }
            if (data.units) {
                this.bread[itemId].units = data.units;
            }
            if (data.bakery) {
                this.bread[itemId].bakery = data.bakery;
            }
            if (data.bread_type) {
                this.bread[itemId].bread_type = data.bread_type;
            }
            updatedItem = this.bread[itemId]
        }
        return updatedItem;
    }

    removeItem(itemId) {
        let deletedItem = null;
        if (this.vegetables[itemId]) {
            deletedItem = this.vegetables[itemId];
            delete this.vegetables[itemId]
        }
        if (this.bread[itemId]) {
            deletedItem = this.bread[itemId];
            delete this.bread[itemId]
        }
        return deletedItem;
    }

    getAllItems() {
        let allItems = [];    
        for (let veggies in this.vegetables) {
            allItems.push(this.vegetables[veggies])
        }
        for (let item in this.bread) {
            allItems.push(this.bread[item])
        }
        return allItems;
    }

    getItemsByType(itemType) {
        let allItems = [];
        if (itemType === 'vegetable') {
            for (let veggies in this.vegetables) {
                allItems.push(this.vegetables[veggies])
            }
        }
        if (itemType === 'bread') {
            for (let item in this.bread) {
                allItems.push(this.bread[item])
            }
        }
        return allItems;
    }

    getItemById(id) {
        if (this.vegetables[id]) {
            return [this.vegetables[id]];
        }
        if (this.bread[id]) {
            return [this.bread[id]];
        }
        return []// ITEM WITH THE GIVEN ID DOESN'T EXIST
    }
}


let myInventory = new Inventory()
module.exports = myInventory;