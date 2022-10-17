const db = require('./db/connection')
const inquirer = require ('inquirer')

const initialQuestions = [
    {
        name: "whatDo",
        message: "What would you like to do next?",
        type: "list",
        choices: [
            "View all products",
            "Buy a product",
            "Add a new product",
            "Exit"
        ]
    }
];

const addNew = () => {
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
            addNew()
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