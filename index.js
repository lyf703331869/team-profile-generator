const fs = require("fs");
const inquirer = require("inquirer");
const Employee = require("./lib/employee");
const Engineer = require("./lib/engineer");
const Manager = require("./lib/manager");
const Intern = require("./lib/intern");
var role = "manager";
var info = "office number";
const allMembers = [];
const allMembersCard = [];

function start() {
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
        message: `What is the ${role}'s ${info}?`,
      },
    ])
    .then((answers) => {
      const name = answers.name;
      const id = answers.id;
      const email = answers.email;
      const info = answers.info;
      if (role === "manager") {
        member = new Manager(name, id, email, info);
      } else if (role === "engineer") {
        member = new Engineer(name, id, email, info);
      } else {
        member = new Intern(name, id, email, info);
      }
      allMembers.push(member);
      createTeam();
    });
}

function createTeam() {
  inquirer
    .prompt([
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
    .then((userChoice) => {
      switch (userChoice.member) {
        case "Engineer":
          role = "engineer";
          info = "GitHub username";
          start();
          break;
        case "Intern":
          role = "intern";
          info = "school";
          start();
          break;
        default:
          console.log(allMembers);
          fs.writeFile("teamProfile.html", generateHTML(allMembers), (err) =>
            err
              ? console.error(err)
              : console.log(
                  "You have successfully generated a team profile html page!"
                )
          );
      }
    });
}

const generateCard = (allMembers) => {
  for (let i = 0; i < allMembers.length; i++) {
    switch (allMembers[i].getRole()) {
      case "Manager":
        info = `Office number: ${allMembers[i].officeNumber()}`;
        break;
      case "Engineer":
        info = `GitHub: <a href="https://github.com/${allMembers[
          i
        ].getGithub()}" target="blank">${allMembers[i].getGithub()}</a>`;
        break;
      case "Intern":
        info = `School: ${allMembers[i].getSchool()}`;
        break;
    }
    const memberCard = `
    <div class="card text-white m-3 lg-3 shadow bg-white" style="width: 18rem">
      <div class="card-body bg-primary" style="height: 6rem">
        <h5 class="card-title">${allMembers[i].getName()}</h5>
        <h5 class="card-title">${allMembers[i].getRole()}</h5>
      </div>
      <div class="p-2" style="height: 13rem">
      <ul class="list-group m-2 text-dark bg-light list-group-flush">
        <li class="list-group-item">ID: ${allMembers[i].getId()}</li>
        <li class="list-group-item">Email: ${allMembers[i].getEmail()}</li>
        <li class="list-group-item">${info}</li>
      </ul>
      </div>
    </div>
    `;
    allMembersCard.push(memberCard);
  }
  return allMembersCard.join("");
};

const generateHTML = (allMembers) => {
  return `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Team Profile Generator! | Quick access to your employee info</title>
    <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.1/dist/css/bootstrap.min.css"
    />
  </head>
  <body class="bg-light">
    <header>
      <div class="jumbotron jumbotron-fluid bg-danger text-white">
        <div class="container">
          <h2 class="display-4 style-bolder text-center">My Team</h2>
        </div>
      </div>
    </header>
    <main
      class="container row m-auto d-flex justify-content-around align-items-center memberCard"
    >${generateCard(allMembers)}
    </main>
  </body>
</html>
`;
};

start();
