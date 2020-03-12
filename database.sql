DROP DATABASE IF EXISTS employeesDB;

CREATE DATABASE employeesDB;

USE employeesDB;

CREATE TABLE department(
    id INT AUTO_INCREMENT NOT NULL,
    department VARCHAR(300) NULL,
    PRIMARY KEY(id)
);

CREATE TABLE role(
    id INT AUTO_INCREMENT NOT NULL,
    title VARCHAR(30) NULL,
    salary DECIMAL(10,2) NULL,
    department_id INT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE employee(
    id INT AUTO_INCREMENT NOT NULL,
    first_name VARCHAR(30) NULL,
    last_name VARCHAR(30) NULL,
    role_id INT NULL,
    manager_id INT NULL,
    PRIMARY KEY(id)
);

INSERT INTO department (department)
VALUES ("Sales"), ("Tech support");

INSERT INTO role (title, salary, department_id)
VALUES ("Manager", 15.43, 1), ("manager", 15.43, 2);

INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES ("Larry", "Smith", 2, 1), ("John", "Doe", 1, 1);
