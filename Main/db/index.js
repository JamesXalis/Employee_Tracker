const db = require('./connection.js')
const inquirer = require ('inquirer')


const initialQuestions = [
    {
        name: "whatDo",
        message: "What would you like to do next?",
        type: "list",
        choices: [
            "View All Employees",
            "Add An Employee",
            "Update An Employee Role",
            "View All Roles",
            "Add A Role",
            "View All Departments",
            "Add A Department",
            "Exit"
        ]
    }
];
const employeeAddition =[
    {
        name: "firstName",
        message:"What is their first name?"
},
    {
        name: "lastName",
        message:"What is their last name?"
},
    {
        name: "role",
        type: "list",
        message:"What is their role?",
        choices:[]
},
    {
        type: "list",
        name: "whichManager",
        message: "Who is the manager of the current employee",
        choices:[]
},
]
const roleAddition =[
    {
        name: "roleTitle",
        message:"What is the title of the role?"
},
    {
        type: "list",
        name: "department_id",
        message:"What department is the role in?",
        choices:[]
},
    {
        name: "salary",
        message:"What is the salary for this role?",
},
]


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

let addEmployee = () => {
    db.query("SELECT * FROM roles;", (err, data) => {
        employeeAddition[2].choices = data.map((element) => ({value: element.id, name: element.title}))
        db.query("SELECT * FROM employee;", (err, data) => {
            employeeAddition[3].choices = data.map((element) => ({value: element.id, name: element.first_name+" "+element.last_name}));
            employeeAddition[3].choices.push({value: null, name: "None"});
            inquirer.prompt(employeeAddition)
            .then((response) => {
                db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?);`, 
                [response.firstName, response.lastName, response.role, response.whichManager], 
                (err, data) => {
                    if (err) throw err;
                    console.log("\n-----------------------------------------\n")
                    console.log("New employee has been successfully added!")
                    console.log("\n-----------------------------------------\n")
                    askAQ();
                })
            })
        })
    })
};
let addRole = () => {
    db.query("SELECT * FROM department;", (err, data) => {
        roleAddition[1].choices = data.map((element) => ({value: element.id, name: element.title}));
        inquirer.prompt(roleAddition)
        .then((response) => {
            db.query(`INSERT INTO roles (title, department_id, salary) VALUES (?,?,?);`, 
            [response.roleTitle, response.department_id, response.salary], 
            (err, data) => {
                console.log("\n-----------------------------------------\n")
                console.log("New role has been successfully added!")
                console.log("\n-----------------------------------------\n")
                askAQ();
            })
        })
    })
};

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