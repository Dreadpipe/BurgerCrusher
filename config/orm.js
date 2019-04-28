const connection = require("./connection");
//Function that I believe converts each value into the appropriate amount of question marks inside each queryString
function printQuestionMarks(num) {
    var arr = [];
    for (var i = 0; i < num; i++) {
        arr.push("?");
    }
    return arr.toString();
};
// Helper function to convert object key/value pairs to SQL syntax
function objToSql(ob) {
    var arr = [];
    // loop through the keys and push the key/value as a string int arr
    for (var key in ob) {
        var value = ob[key];
        // check to skip hidden properties
        if (Object.hasOwnProperty.call(ob, key)) {
            // if string with spaces, add quotations (Lana Del Grey => 'Lana Del Grey')
            if (typeof value === "string" && value.indexOf(" ") >= 0) {
                value = "'" + value + "'";
            }
            // e.g. {name: 'Lana Del Grey'} => ["name='Lana Del Grey'"]
            // e.g. {sleepy: true} => ["sleepy=true"]
            arr.push(key + "=" + value);
        }
    }
    // translate array of strings to a single comma-separated string
    return arr.toString();
}
const orm = {
    selectAll: function (tableName, cb) {
        let queryString = "SELECT * FROM " + tableName + ";";
        connection.query(queryString, function (err, result) {
            if (err) {
                throw err;
            };
            cb(result);
        });
    },
    insertOne: function (tableName, colName, value, cb) {
        let queryString = "INSERT INTO " + tableName;
        queryString += " (" + colName.toString() + ") ";
        queryString += "VALUES (" + printQuestionMarks(value.length) + ") ;";
        console.log(queryString);
        connection.query(queryString, value, function (err, result) {
            if (err) {
                throw err;
            };
            cb(result);
        });
    },
    updateOne: function (tableName, objColValues, condition, dc) {
        let queryString = "UPDATE " + tableName;
        queryString += " SET " + objToSql(objColValues);
        queryString += " WHERE " + condition;
        console.log(queryString);
        connection.query(queryString, function (err, result) {
            if (err) {
                throw err;
            };
            cb(result);
        })
    }
};
module.exports = orm;