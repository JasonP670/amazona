const models = require("./models");
const User = models.User;
const User_address = models.User_address;

User.create({
  name: "Allie",
  email: "allie@email.com",
  password: "1234",
  isAdmin: false,
})
  .then((newUser) => {
    console.log(newUser.get());
  })
  .catch((err) => {
    console.log(`Error while creating user: ${err}`);
  });

User_address.create([
  {
    user_id: 21,
    full_name: "Allie P",
    address_line1: "179 S 1125 W",
    city: "Springville",
    postal_code: "84663",
    country: "USA",
  },
])
  .then((newAddress) => {
    console.log(newAddress);
  })
  .catch((err) => {
    console.log(`Error creating new address: ${err}`);
  });
