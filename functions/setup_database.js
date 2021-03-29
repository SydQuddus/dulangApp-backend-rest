const db = require("./api/database");

async function setupDatabase(req, res, next) {
    // To delete all the collections
    const collections = ["users", "foods"];
    collections.forEach(async (collection) => await deleteCollection(collection));

    // Add documents to the todos collection
    addDocuments("foods", [
        { userid: "KFnEUrZaA7DuZ5xZFl0m", name: "Nasi Bungkus", category: "Cooked", image: "assets/images/nasiBungkus.png", qty: 25, accepted: false },
        { userid: "KFnEUrZaA7DuZ5xZFl0m", name: "Begedil Daging", category: "Snacks", image: "assets/images/begedil.png", qty: 4, accepted: false },
        { userid: "ELuiMMIL3zlSxKHBMXLN", name: "Burger Ramlee", category: "Cooked", image: 'assets/images/burger.png', qty: 15, accepted: false },
        { userid: "ELuiMMIL3zlSxKHBMXLN", name: "Nasi Kerabu", category: "Cooked", image: "assets/images/nasiKerabu.png", qty: 5, accepted: false },
    ]);

    addDocuments("users", [
        { email: "admin@dulang.my", name: "admin", username: "admin", password: "admin", image: null, location: "Shah Alam", distance: 0.8 },
        { email: "syed@dulang.my", name: "Syed", username: "syed", password: "123456", image: null, location: "Shah Alam", distance: 1.8 },
        { email: "imran@dulang.my", name: "Imran", username: "imran", password: "123456", image: null, location: "Johor", distance: 3.0 },
    ]);

    res.send("Setting Up Database.... Done ");
}

async function deleteCollection(collection) {
    const cref = db.firestore.collection(collection);
    const docs = await cref.listDocuments();
    docs.forEach((doc) => doc.delete());
}

function addDocuments(collection, docs) {
    docs.forEach((doc) => db.create(collection, doc));
}

module.exports = setupDatabase;
