const Manager = require("../lib/manager");

describe("Manager", () => {
  it("should set a office number value when passed in as a constructor argument", () => {
    const officeNum = "7188888888";
    const man = new Manager(
      "Yafei",
      "123",
      "lyf703331869@gmail.com",
      officeNum
    );
    expect(man.officeNum).toEqual(officeNum);
  });

  describe("officeNumber", () => {
    it("should retrieve the office number", () => {
      const officeNum = "7188888888";
      const man = new Manager(
        "Yafei",
        "123",
        "lyf703331869@gmail.com",
        officeNum
      );

      expect(man.officeNumber()).toEqual(officeNum);
    });
  });
});
