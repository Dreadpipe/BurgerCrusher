// Dependencies
const express = require("express");

const router = express.Router();

// Import the model (burgerModel.js) to use its database functions.
const burger = require("../models/burger");

// ROUTES (default "/" = GET, selectAll = GET, insertOne = POST, updateOne = PUT)
app.get("/", function(req, res) {
    res.json(path.join(__dirname, "public/index.html"));
  });
// DEFAULT - SELECT ALL?
router.get("/", function (req, res) {
    burger.selectAll(function (data) {
        var hbsObject = {
            burger: data
        };
        console.log(hbsObject);
        res.render("index", hbsObject);
    });
});
// INSERT ONE
router.post("/api/burgers", function (req, res) {
    burger.insertOne([
        "burger_name"
    ], [
        req.body.name
    ], function (result) {
        // Send back the ID of the new quote
        res.json({
            id: result.insertId
        });
    });
});

// UPDATE ONE
router.put("/api/burgers/:id", function (req, res) {
    var condition = "id = " + req.params.id;

    console.log("condition", condition);

    burger.updateOne({
        crushed: true
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