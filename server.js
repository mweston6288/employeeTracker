const mysql = require("mysql");
const inquirer = require("inquirer");
const table = require ("console.table");
const ascii = require("figlet");

// Connect to the SQL database
const connection = mysql.createConnection({
    host: "localhost",

    port: 3306,
    user: "root",
    password: "",
    database: "employeesDB"
});
// Values that stores strings for department, role, and manager names
let departments = [];
let roles = [];
let managers = [];

connection.connect(function(err){
    if (err) throw err;
    printIntro();
});

function printIntro(){
    console.log(ascii.textSync("Employee Tracker"));
    menu();
}

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
        name: "department",
        type: "input",
        message: "Department name:"
    }).then(function(response){
        connection.query("INSERT INTO department SET ?",
        {
            department: response.department
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
    departments = [];
    connection.query("SELECT * FROM department", function(err,res){
        res.forEach(function(department){
            departments.push(department.id + " " + department.department);
        })
    })
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
            type: "list",
            message: "Department:",
            choices: departments
        }
        ]).then(function(response){
          const departmentID = response.department.split(" ")  
        connection.query("INSERT INTO role SET ?",
        {
            title: response.title,
            salary: response.salary,
            department_id: departmentID[0]
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
    roles = [];
    connection.query("SELECT role.id, title, salary, department.department FROM role LEFT JOIN department ON role.department_id = department.id", function(err, response){
        response.forEach(function(role){
            roles.push(role.id + " " + role.title+ " " +role.department)
        })
    })
    managers = [];
    connection.query("SELECT employee.id, first_name, last_name, department.department, role.title FROM employee LEFT JOIN role JOIN department ON role.department_id = department.id ON employee.role_id = role.id Where role.title = 'manager'",
    function(err,res){
        res.forEach(function(employee){
            managers.push(employee.id + " " + employee.first_name + " "+employee.last_name + " "+employee.department);
        })        
    })
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
            type: "list",
            message: "Employee role:",
            choices: roles
        },
        {
            name: "managerID",
            type: "list",
            message: "Manager:",
            choices: managers
        },

    ]).then(function(response){
        const roleID = response.roleID.split(" ");
        const managerID = response.managerID.split(" ");
        connection.query("INSERT INTO employee SET ?",
        {
            first_name: response.firstName,
            last_name: response.lastName,
            role_id: roleID[0],
            manager_id: managerID[0]
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
    connection.query("SELECT role.id, title, salary, department.department FROM role LEFT JOIN department ON role.department_id = department.id", function(err,res){
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
    connection.query(`SELECT employee.id, first_name as "first name", last_name as "last name", role.title, department.department, manager_id FROM employee LEFT JOIN role JOIN department ON department.id = role.department_id ON role.id = employee.role_id`, function(err,res){
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
    roles = [];
    connection.query("SELECT role.id, title, salary, department.department FROM role LEFT JOIN department ON role.department_id = department.id", function(err, response){
        response.forEach(function(role){
            roles.push(role.id + " " + role.title+ " " +role.department)
        })
    })
    managers = [];
    connection.query("SELECT employee.id, first_name, last_name, department.department, role.title FROM employee LEFT JOIN role JOIN department ON role.department_id = department.id ON employee.role_id = role.id Where role.title = 'manager'",
    function(err,res){
        res.forEach(function(employee){
            managers.push(employee.id + " " + employee.first_name + " "+employee.last_name + " "+employee.department);
        })        
    })
    connection.query("SELECT employee.id, first_name, last_name FROM employee", function(err,res){
        const array = [];
        res.forEach(function(id){
            array.push(id.id + " " + id.first_name +  " " + id.last_name);
        })
        inquirer.prompt({
            name: "response",
            type: "list",
            message:"Select employee",
            choices: array
        }).then(function(response){
            const empID = response.response.split(" ");
            inquirer.prompt([
                {
                    name: "role",
                    message: "What is their role?",
                    type: "list",
                    choices: roles
                },
                {
                    name: "manager",
                    message: "Who is their manager?",
                    type: "list",
                    choices: managers
                }
            ]).then(function(res){
                const roleID = res.role.split(" ");
                const managerID = res.manager.split(" ");
                connection.query("UPDATE employee SET ? WHERE ?", [{
                    role_id: roleID[0],
                    manager_id: managerID[0]
                },
                {
                    id:empID[0]
                }
            ], function(err,res){
                    menu();
                })
            })
        })
    })

}