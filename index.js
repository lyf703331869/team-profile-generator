const fs = require("fs");
const inquirer = require("inquirer");
var role = "manager";

const addMember = (role) => {

  switch (role) {
    case "manager":
      info = "office number";
      break;
    case "engineer":
      info = "GitHub username";
      break;
    case "manager":
      info = "school";
      break;
  }

  inquirer
  .prompt([
    {
      type: "input",
      name: "name",
      message: `What is the ${role}'s name?`,
    },
    {
      type: "input",
      name: "id",
      message: `What is the ${role}'s id?`,
    },
    {
      type: "input",
      name: "email",
      message: `What is the ${role}'s email?`,
    },
    {
      type: "input",
      name: "info",
      message: `What is the ${role}'s ${info}}?`,
    },
    {
      type: "list",
      name: "member",
      message: "Which type of team member would you like to add?",
      default: "Use arrow keys",
      choices: [
        "Engineer",
        "Intern",
        "I don't want to add any more team members",
      ],
    },
  ])
  .then((data) => {
      
  })

}
  .then((data) => {
    const filename = `${data.name.toLowerCase().split(" ").join("")}.json`;

    fs.writeFile(filename, JSON.stringify(data, null, "\t"), (err) =>
      err ? console.log(err) : console.log("Success!")
    );
  });
