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

const addEmployee = () => {
    db.query('UPDATE employee SET ',(err, results) =>{
        if (err) throw err;

        console.table(results)
    })
}
const addRole = () => {
    db.query('UPDATE employee SET ',(err, results) =>{
        if (err) throw err;

        console.table(results)
    })
}


const askAQ = async () =>{
    const { whatDo } = await inquirer.prompt 
        (initialQuestions);
    switch(whatDo){
        case 'View All Employees':
            break;
        case 'Add Employee':
            addEmployee()
            break;
        case 'Update Employee Role':
            break;
        case 'View All Roles':
            break;
        case 'Add Role':
            break;
        case 'View All Departments':
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