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
    prompt(allQuestions.concat(engineerQuestion))
        .then(res => {
            employees.push(new Engineer(res.name, res.id, res.email, res.github));
            prompt(anotherEmployee)
                .then((answer) => {
                    console.log(answer);
                    if (answer.addEmployee === 'Yes') {
                        start();
                    } else {
                        writeFile();
                    };
                });
            ;
        });
    ;
};


function internPrompt() {
    prompt(allQuestions.concat(internQuestion))
        .then(res => {
            employees.push(new Intern(res.name, res.id, res.email, res.school));
            prompt(anotherEmployee)
                .then((answer) => {
                    console.log(answer);
                    if (answer.addEmployee === 'Yes') {
                        start();
                    } else {
                        writeFile();
                    };
                });
            ;
        });
    ;
};

function managerPrompt() {
    prompt(allQuestions.concat(managerQuestion))
        .then(res => {
            employees.push(new Manager(res.name, res.id, res.email, res.officeNumber));
            prompt(anotherEmployee)
                .then((answer) => {
                    console.log(answer);
                    if (answer.addEmployee === 'Yes') {
                        start();
                    } else {
                        writeFile();
                    };
                });
            ;
        });
    ;
};


function writeFile() {
    fs.writeFileSync(outputPath, render(employees))
};

start();


