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
                viewDepartment();
                break;
            case "View roles":
                viewRole();
                break;
            case "View employees":
                viewEmployee();
                break;
            case "Update employee roles":
                updateEmployee();
                break;
            case "exit":
                connection.end();
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
function viewDepartment(){
    connection.query("SELECT * FROM department", function(err,res){
        if(err) throw err;
        console.table('departments', table.getTable(res))
        inquirer.prompt({
            name: "Enter",
            message: "Press any key to return",
            type: "input"
        }).then(function(){
            menu();
        })
    })
}

function viewRole(){
    connection.query("SELECT role.id, title, salary, department.name FROM role LEFT JOIN department ON role.department_id = department.id", function(err,res){
        if(err) throw err;
        console.table('Roles', table.getTable(res))
        inquirer.prompt({
            name: "Enter",
            message: "Press any key to return",
            type: "input"
        }).then(function(){
            menu();
        })
    })
}

function viewEmployee(){
    connection.query("SELECT employee.id, first_name, last_name, role.title, manager_id FROM employee LEFT JOIN role ON role.id = employee.role_id", function(err,res){
        if(err) throw err;
        console.table('Roles', table.getTable(res))
        inquirer.prompt({
            name: "Enter",
            message: "Press any key to return",
            type: "input"
        }).then(function(){
            menu();
        })
    })
}
// Needs work. Figure out how to link user id to the arrays
function updateEmployee(){
    connection.query("SELECT first_name, last_name FROM employee", function(err,res){
        const array = [];
        res.forEach(function(id){
            array.push(id.first_name +  " " + id.last_name);
        })
        inquirer.prompt({
            name: "response",
            type: "list",
            message:"Select employee",
            choices: array
        }).then(function(response){
            inquirer.prompt([
                {
                    name: "role",
                    message: "What is their role ID?",
                    type: "input"
                },
                {
                    name: "manager",
                    message: "What is their manager's ID?",
                    type: "input"
                }
            ]).then(function(res){
                connection.query("UPDATE employee SET ? WHERE ?", [{
                    role_id: res.role,
                    manager_id: res.manager
                },
                {
                    name:response.response
                }
            ], function(err,res){
                    menu();
                })
            })
        })
    })

}