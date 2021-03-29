const foodsModel = require("../models/foods_model");
const express = require("express");
const router = express.Router();

// Get all foods
router.get("/", async (req, res, next) => {
    try {
        const result = await foodsModel.get();
        return res.json(result);
    } catch (e) {
        return next(e);
    }
});

// Get one food
router.get("/:id", async (req, res, next) => {
    try {
        const result = await foodsModel.getById(req.params.id);
        if (!result) return res.sendStatus(404);
        return res.json(result);
    } catch (e) {
        return next(e);
    }
});

// Create a new food
router.post("/", async (req, res, next) => {
    try {
        const result = await foodsModel.create(req.body);
        if (!result) return res.sendStatus(409);
        return res.status(201).json(result);
    } catch (e) {
        return next(e);
    }
});

// Delete a food
router.delete("/:id", async (req, res, next) => {
    try {
        const result = await foodsModel.delete(req.params.id);
        if (!result) return res.sendStatus(404);
        return res.sendStatus(200);
    } catch (e) {
        return next(e);
    }
});

// Update a food
router.patch("/:id", async (req, res, next) => {
    try {
        const id = req.params.id;
        const data = req.body;

        const doc = await foodsModel.getById(id);
        if (!doc) return res.sendStatus(404);

        // Merge existing fields with the ones to be updated
        Object.keys(data).forEach((key) => (doc[key] = data[key]));

        const updateResult = await foodsModel.update(id, doc);
        if (!updateResult) return res.sendStatus(404);

        return res.json(doc);
    } catch (e) {
        return next(e);
    }
});

// Replace a food
router.put("/:id", async (req, res, next) => {
    try {
        const updateResult = await foodsModel.update(req.params.id, req.body);
        if (!updateResult) return res.sendStatus(404);

        const result = await foodsModel.getById(req.params.id);
        return res.json(result);
    } catch (e) {
        return next(e);
    }
});

module.exports = router;
