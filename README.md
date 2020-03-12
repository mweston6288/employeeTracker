## employeeTracker

## Purpose
Keep track of basic employee information such as names, roles, and salaries


## Setup
In your terminal, go to the directory where employeeTracker is stored.
Type "npm install" to install all dependencies.
Type "node server.js" to begin.

## How to Use
On run, the terminal will give you 8 options:
* Add Department
* Add Role
* Add Employee
* View Departments
* View Roles
* View Employees
* Update Employee Roles
* Exit

Use the arrow keys to select which option you want.

# Add Department/Role/Employee
Use these options to add to the database. Depending on what you chose, you will be 
prompted for the following:

Department:
* Name of department:

Role:
* Title
* Salary
* Associated Department (Select from the list of departments)

Employee:
* First name
* Last Name
* Role (Select from the list of roles)
* Manager (Select from the list of managers)

# View Department/Role/Employee
Use to check the databases

Department:
* Displays the unique ID and name of each department

Role:
* Displays the unique ID, title, salary and associated department

Employee:
* Displays the unique ID, name, role, and manager's ID

# Update Employee Role
Allows you to change the role and manager of an employee.

Select the employee from the provided list. You will then be prompted for the role and 
manager.

#Exit
Exit the program
