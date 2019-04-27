// Dependencies
var express = require("express");

var router = express.Router();

// Import the model (burgerModel.js) to use its database functions.
var burger = require("../models/burgerModel");

// ROUTES (default "/" = GET, selectAll = GET, insertOne = POST, updateOne = PUT)

// DEFAULT - SELECT ALL?
router.get("/", function (req, res) {
    cat.all(function (data) {
        var hbsObject = {
            cats: data
        };
        console.log(hbsObject);
        res.render("index", hbsObject);
    });
});
// INSERT ONE
router.post("/api/cats", function (req, res) {
    cat.create([
        "name", "sleepy"
    ], [
        req.body.name, req.body.sleepy
    ], function (result) {
        // Send back the ID of the new quote
        res.json({
            id: result.insertId
        });
    });
});

// UPDATE ONE
router.put("/api/cats/:id", function (req, res) {
    var condition = "id = " + req.params.id;

    console.log("condition", condition);

    cat.update({
        sleepy: req.body.sleepy
    }, condition, function (result) {
        if (result.changedRows == 0) {
            // If no rows were changed, then the ID must not exist, so 404
            return res.status(404).end();
        } else {
            res.status(200).end();
        }
    });
});
// Exports
module.exports = router;