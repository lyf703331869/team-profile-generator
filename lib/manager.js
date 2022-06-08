const Employee = require("./employee");

class Manager extends Employee {
  constructor(name, id, email, officeNum) {
    super(name, id, email);
    this.officeNum = officeNum;
  }

  officeNumber() {
    return this.officeNum;
  }

  getRole() {
    return "Manager";
  }
}

module.exports = Manager;
