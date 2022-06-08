const fs = require("fs");
const inquirer = require("inquirer");
const Employee = require("./lib/employee");
const Engineer = require("./lib/engineer");
const Manager = require("./lib/manager");
const Intern = require("./lib/intern");
var role = "manager";
const allMembers = [];
const allMembersCard = [];

const addMember = (role) => {
  switch (role) {
    case "manager":
      info = "office number";
      break;
    case "engineer":
      info = "GitHub username";
      break;
    case "intern":
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
        message: `What is the ${role}'s ${info}?`,
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
    .then((response) => {
      if (response.member === "Engineer") {
        saveResponse(response, role);

        role = "engineer";
        addMember(role);
      } else if (response.member === "Intern") {
        saveResponse(response, role);
        role = "intern";
        addMember(role);
      } else {
        saveResponse(response, role);
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
};

saveResponse = (response, role) => {
  delete response.member;
  allMembers.push(response);
  response.role = role;
};

const renderMemberCard = (allMembers) => {
  for (let i = 0; i < allMembers.length; i++) {
    switch (allMembers[i].role) {
      case "manager":
        role = "Manager";
        info = "Office number: ";
        break;
      case "engineer":
        role = "Engineer";
        info = "GitHub: ";
        break;
      case "intern":
        role = "Intern";
        info = "School: ";
        break;
    }
    const memberCard = `
    <div class="card text-white m-3 lg-3 shadow bg-white" style="width: 18rem">
      <div class="card-body bg-primary" style="height: 6rem">
        <h5 class="card-title">${allMembers[i].name}</h5>
        <h5 class="card-title">${role}</h5>
      </div>
      <div class="p-2" style="height: 13rem">
      <ul class="list-group m-2 text-dark bg-light list-group-flush">
        <li class="list-group-item">ID: ${allMembers[i].id}</li>
        <li class="list-group-item">Email: ${allMembers[i].email}</li>
        <li class="list-group-item">${info}${allMembers[i].info}</li>
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
    >${renderMemberCard(allMembers)}
    </main>
  </body>
</html>
`;
};

addMember(role);
