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
                addDepartment();
                break;
            case "Add role":
                addRole();
                break;
            case "Add employee":
                addEmployee();
                break;
            case "View departments":
            case "View roles":
            case "View employees":
            case "Update employee roles":
            case "exit":
                connection.end();
                break;
        }
    })
}
// Add a new department to the database
function addDepartment(){
    inquirer.prompt({
        name: "name",
        type: "input",
        message: "Department name:"
    }).then(function(response){
        connection.query("INSERT INTO department SET ?",
        {
            name: response.name
        })
        inquirer.prompt({
            name: "response",
            type: "list",
            message: "Add another department?",
            choices: ["Yes", "No"]
        }).then(function(response){
            if (response.response === "Yes"){
                addDepartment();
            }
            else{
                menu();
            }
        })
    })
}
// Add a new department to the database
function addRole(){
    inquirer.prompt([
        {
        name: "title",
        type: "input",
        message: "Role title:"
        },
        {
            name: "salary",
            type: "input",
            message: "Salary:"
        },       
        {
            name: "department",
            type: "input",
            message: "Department id:"
        }
        ]).then(function(response){
        connection.query("INSERT INTO role SET ?",
        {
            title: response.title,
            salary: response.salary,
            department_id: response.department
        })
        inquirer.prompt({
            name: "response",
            type: "list",
            message: "Add another role?",
            choices: ["Yes", "No"]
        }).then(function(response){
            if (response.response === "Yes"){
                addRole();
            }
            else{
                menu();
            }
        })
    })
}// Add a new department to the database
function addEmployee(){
    inquirer.prompt([
        {
            name: "firstName",
            type: "input",
            message: "Employee first name:"
        },
        {
            name: "lastName",
            type: "input",
            message: "Employee last name:"
        },
        {
            name: "roleID",
            type: "input",
            message: "Employee role ID:"
        },
        {
            name: "managerID",
            type: "input",
            message: "Manager ID:"
        },

    ]).then(function(response){
        connection.query("INSERT INTO employee SET ?",
        {
            first_name: response.firstName,
            last_name: response.lastName,
            role_id: response.roleID,
            manager_id: response.managerID
        })
        inquirer.prompt({
            name: "response",
            type: "list",
            message: "Add another employee?",
            choices: ["Yes", "No"]
        }).then(function(response){
            if (response.response === "Yes"){
                addEmployee();
            }
            else{
                menu();
            }
        })
    })
}