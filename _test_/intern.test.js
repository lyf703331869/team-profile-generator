const Intern = require("../lib/intern");

describe("Intern", () => {
  it("should set a school value when passed in as a constructor argument", () => {
    const school = "Columbia";
    const int = new Intern("Yafei", "123", "lyf703331869@gmail.com", school);
    expect(int.school).toEqual(school);
  });

  describe("getSchool", () => {
    it("should retrieve the school name", () => {
      const school = "Columbia";
      const int = new Intern("Yafei", "123", "lyf703331869@gmail.com", school);

      expect(int.getSchool()).toEqual(school);
    });
  });
});
