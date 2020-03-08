const mysql = require("mysql");
const inquirer = require("inquirer");
const table = require ("console.table");

const connection = mysql.connection({
    host: "localhost",

    port: 3306,
    user: "root",
    password: "",
    database: "employeesDB"
});

connection.connect(function(err){
    if (err) throw err;
})