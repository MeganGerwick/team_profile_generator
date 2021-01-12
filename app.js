const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");
const prompt = inquirer.createPromptModule();
const render = require("./lib/htmlRenderer");


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
const employees = [];

//first question 
const openingQuestion = [
    {
        type: 'list',
        name: 'role',
        message: 'What kind of employee are you adding?',
        choices: ['Manager', 'Engineer', 'Intern'],
    },
];
//questions for all employees
const allQuestions = [
    {
        type: 'input',
        name: 'name',
        message: "What is the employee's name?",
    },
    {
        type: 'input',
        name: 'email',
        message: "What is the employee's email?",
    },
    {
        type: 'input',
        name: 'id',
        message: "What is the employee's ID?",
    },
];

//question for engineer
const engineerQuestion = [
    {
        type: 'input',
        name: 'github',
        message: 'What is their github username?',
    },
];

//question for intern
const internQuestion = [
    {
        type: 'input',
        name: 'school',
        message: 'What school do they attend?',
    },
];

//question for manager
const managerQuestion = [
    {
        type: 'input',
        name: 'officeNumber',
        message: 'What is their office number?',
    },
];

//question to add another employee
const anotherEmployee = [
    {
        type: 'list',
        name: 'addEmployee',
        message: 'Would you like to add another employee?',
        choices: ['Yes', 'No'],
    },
];

//function to start application
function start() {
    prompt(openingQuestion)
        .then((res) => {
            switch (res.role) {
                case 'Engineer':
                    engineerPrompt();
                    break;
                case 'Intern':
                    internPrompt();
                    break;
                case 'Manager':
                    managerPrompt();
                    break;
            };
        });
};

// Prompts for each employee type
function engineerPrompt() {
    prompt(allQuestions.concat(engineerQuestion, anotherEmployee))
        .then(res => {
            employees.push(new Engineer(res.name, res.email, res.id, res.github))
            res.anotherEmployee ? start() : writeFile();
        });
};

function internPrompt() {
    prompt(allQuestions.concat(internQuestion, anotherEmployee))
        .then(res => {
            employees.push(new Intern(res.name, res.email, res.id, res.school))
            res.anotherEmployee ? start() : writeFile();
        });
};

function managerPrompt() {
    prompt(allQuestions.concat(managerQuestion, anotherEmployee))
        .then(res => {
            employees.push(new Manager(res.name, res.email, res.id, res.officeNumber))
            res.anotherEmployee ? start() : writeFile();
        });
};


function writeFile() {
    fs.writeFileSync(outputPath, render(employees))
};

start();
// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
