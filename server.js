const mysql = require("mysql");
const inquirer = require("inquirer");
const table = require ("console.table");

// Connect to the SQL database
const connection = mysql.createConnection({
    host: "localhost",

    port: 3306,
    user: "root",
    password: "",
    database: "employeesDB"
});

connection.connect(function(err){
    if (err) throw err;
    menu();
})
// Prompt user with a menu
function menu(){
    inquirer.prompt({
        name: "response",
        type: "list",
        message: "What do you want to do?",
        choices: [
            "Add department",
            "Add role",
            "Add employee",
            "View departments",
            "View roles",
            "View employees",
            "Update employee roles",
            "exit"
        ]
    }).then(function(answer){
        switch(answer.response){
            case "Add department":
            case "Add role":
            case "Add employee":
            case "View departments":
            case "View roles":
            case "View employees":
            case "Update employee roles":
            case "exit":
                connection.end();
                break;
        }
        console.log(answer.response)
    })
}