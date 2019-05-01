// Import the ORM to create functions that will interact with the database. The burger.js file contains all the methods to modify our ORM for use with the burgers database

// The Model component corresponds to all the data-related logic that the user works with. This can represent either the data that is being transferred between the View and Controller components or any other business logic-related data. For example, a Customer object will retrieve the customer information from the database, manipulate it and update it data back to the database or use it to render data

var orm = require("../config/orm.js");

var burger = {
    selectAll: function (cb) {
        orm.selectAll("burgers", function (res) {
            //This cb is sent into our burgers_controller file
            cb(res);
        });
    },
    // The variables cols and vals are arrays.
    insertOne: function (cols, vals, cb) {
        orm.insertOne("burgers", cols, vals, function (res) {
            cb(res);
        });
    },
    updateOne: function (objColVals, condition, cb) {
        orm.updateOne("burgers", objColVals, condition, function (res) {
            cb(res);
        });
    },
    // Delete unnecessary!  Uncomment to add
    // deleteAll: function (cb) {
    //     orm.deleteAll("burgers", function (res) {
    //         cb(res);
    //     });
    // }
};

// Export the database functions for the controller (burgers_Controller.js).
module.exports = burger;