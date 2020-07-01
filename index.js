// npm packages and file(s) required 
const fs = require("fs");
const axios = require("axios");
const inquirer = require("inquirer");
const generateMarkdown = require("./generateMarkdown")


// prompt function to capture user data and github information
function userPrompt() {
    return inquirer.prompt([
        {
            type: "input",
            message: "Please enter your GitHub username",
            name: "username"
        },
        {
            type: "input",
            message: "Please enter your Project Title",
            name: "title"
        },
        {
            type: "input",
            message: "Please enter your Project Description",
            name: "description"
        },
        
        {
            type: "input",
            message: "What command should be run to install dependencies?",
            name: "install",
            default: "npm i"
        },
        {
            type: "input",
            message: "Please enter usage instructions",
            name: "usage"
        },
        {
            type: "list",
            message: "What kind of license should your project have?",
            name: "license",
            choices: ["MIT", "APACHE 2.0", "GPL 3.0", "BSD 3", "None"]
        },
        {
            type: "input",
            message: "Enter collaborators, if any, with links to their github profile",
            name: "collab"
        },
        {
            type: "input",
            message: "Please enter testing requirements?",
            name: "testing"
        },
        {
            type: "input",
            message: "Please enter your email address?",
            name: "email"
        },
        {
            type: "input",
            message: "Please enter your github image url?",
            name: "picture"
        }

    ])

        // use response to get url data 
        .then(res => {
            // generateMarkdown(response)
            const userName = res.username;
            const queryUrl = `https://api.github.com/users/${userName}`;

            if (res) {
                
                console.log("Success!", res);
                // console.log(res)
            } else if (res === "") {
                console.log("You forgot to enter your User Name!");
            }

            // make request with user name
            axios.
                get(queryUrl)
                .then((response) => {

                    console.log("Response from axios call:", response.data)

                })
                // catches and handle error
                .catch((error) => {

                    console.log(error);

                })

            // create write file function to generate readme file
                const readMe = generateMarkdown(res);
                fs.writeFile("README.md", readMe, function(err) {
                    if (err) {
                        throw err;
                    }
                    console.log(`Congratulation, you have successfully generated your README.md file ${readMe}`)
                });
            
        });
};

// create initialize function  
async function init() {
    console.log("How are you?")

    try {
        const res = await userPrompt();
    }
    catch (error) {
        console.log(error);
    };
};

init();

