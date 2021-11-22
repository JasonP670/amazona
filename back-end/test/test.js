var assert = require("assert");
const { createUser } = require("../contexts/users");

describe("Users Context", function () {
  describe("createUser()", function () {
    it("create a new user", async function () {
      const user = await createUser({
        name: "jim",
        email: "jim@email.com",
        rawPassword: "1234",
      });
      assert.equal(user.name, "jim");
      assert.equal(user.email, "jim@email.com");
      assert.notEqual(user.password, "1234");
    });
  });
});
