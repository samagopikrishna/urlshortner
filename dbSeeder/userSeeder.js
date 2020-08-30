require("../dbConfig/config");
const User = require("../models/user1");

const saveUser = async () => {
  const newUser = new User({
      email:"ranjithr@gmail.com",
    first_name: "Ranjith",
    last_name: "Reddy",
    password:"test1",
    status:"active"
  });

  try {
    const result = await newUser.save()
    console.log(result);
  } catch (e) {
    console.error(e);
  }
};

saveUser();