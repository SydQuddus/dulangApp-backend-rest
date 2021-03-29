const database = require("../database");

// Here, we are implementing the class with Singleton design pattern

class FoodModel {
    constructor() {
        if (this.instance) return this.instance;
        FoodModel.instance = this;
    }

    get() {
        return database.getList("foods");
    }

    getById(id) {
        return database.get("foods", id);
    }

    create(food) {
        return database.create("foods", food);
    }

    delete(id) {
        return database.delete("foods", id);
    }

    update(id, food) {
        return database.set("foods", id, food);
    }
}

module.exports = new FoodModel();
