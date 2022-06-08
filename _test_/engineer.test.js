const Engineer = require("../lib/engineer");

describe("Engineer", () => {
  it("should set a github value when passed in as a constructor argument", () => {
    const github = "lyf703331869";
    const eng = new Engineer("Yafei", "123", "lyf703331869@gmail.com", github);
    expect(eng.github).toEqual(github);
  });

  describe("getGithub", () => {
    it("should retrieve the github username", () => {
      const github = "lyf703331869";
      const eng = new Engineer(
        "Yafei",
        "123",
        "lyf703331869@gmail.com",
        github
      );

      expect(eng.getGithub()).toEqual(github);
    });
  });
});
