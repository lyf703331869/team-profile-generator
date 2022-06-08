const Employee = require("../lib/employee");

describe("Employee", () => {
  it("should set a name value when passed in as a constructor argument", () => {
    const name = "Yafei";
    const emp = new Employee(name);
    expect(emp.name).toEqual(name);
  });

  it("should set a id value when passed in as a constructor argument", () => {
    const id = "123";
    const emp = new Employee("Yafei", id);
    expect(emp.id).toEqual(id);
  });

  it("should set an email value when passed in as a constructor argument", () => {
    const email = "lyf703331869@gmail.com";
    const emp = new Employee("Yafei", "123", email);
    expect(emp.email).toEqual(email);
  });

  describe("getName", () => {
    it("should retrieve the name from an employee object", () => {
      const name = "Yafei";
      const emp = new Employee(name);

      expect(emp.getName()).toEqual(name);
    });
  });

  describe("getId", () => {
    it("should retrieve the id from an employee object", () => {
      const id = "123";
      const emp = new Employee("Yafei", id);

      expect(emp.getId()).toEqual(id);
    });
  });

  describe("getEmail", () => {
    it("should retrieve the email from an employee object", () => {
      const email = "lyf703331869@gmail.com";
      const emp = new Employee("Yafei", "123", email);

      expect(emp.getEmail()).toEqual(email);
    });
  });

  describe("getRole", () => {
    it("should retrieve the employee's role", () => {
      const role = "Employee";
      const emp = new Employee("Yafei", "123", "lyf703331869@gmail.com");

      expect(emp.getRole()).toEqual(role);
    });
  });
});
