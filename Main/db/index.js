const db = require('./connection.js')
const inquirer = require ('inquirer')


const initialQuestions = [
    {
        name: "whatDo",
        message: "What would you like to do next?",
        type: "list",
        choices: [
            "View All Employees",
            "Add Employee",
            "Update Employee Role",
            "View All Roles",
            "Add Role",
            "View All Departments",
            "add Department",
            "Exit"
        ]
    }
];
let viewEmployees = () => {
    db.query("SELECT * FROM employee;", (err, data) => {
        console.table(data);
        askAQ();
    })
};
let viewRoles = () => {
    db.query("SELECT * FROM roles;", (err, data) => {
        console.table(data);
        askAQ();
    })
};
let viewDepartments = () => {
    db.query("SELECT * FROM department;", (err, data) => {
        console.table(data);
        askAQ();
    })
};

const addEmployee = () => {
    db.query('UPDATE employee SET ',(err, results) =>{
        if (err) throw err;

        console.table(results)
    })
}
const addRole = () => {
    db.query('UPDATE roles SET ',(err, results) =>{
        if (err) throw err;

        console.table(results)
    })
}


const askAQ = async () =>{
    const { whatDo } = await inquirer.prompt 
        (initialQuestions);
    switch(whatDo){
        case 'View All Employees':
            viewEmployees()
            break;
        case 'Add Employee':
            addEmployee()
            break;
        case 'Update Employee Role':
            break;
        case 'View All Roles':
            viewRoles()
            break;
        case 'Add Role':
            addRole()
            break;
        case 'View All Departments':
            viewDepartments()
            break;
        case 'Add Departments':
            break;
        case 'Exit':
            console.log("Goodbye!")
            process.end();
            break;
        default:
            console.log("Something went wrong...")
    }
}

askAQ()