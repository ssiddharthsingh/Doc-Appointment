const userModule = require("../models/user.model");

async function userLogin(req, res) {
  const userEmail = req.body.email;
  const userPassword = req.body.password;

  if (!userEmail || !userPassword)
    return res.status(404).send({ error: "information missing" });

  const isEmail = await userModule.checkUserexistance(userEmail);
  if (!isEmail || isEmail === 0)
    return res.status(404).send({ error: "User is not registered" });

  const userData = await userModule.getUser(userEmail);

  const email = userData[0].email;
  const password = userData[0].password;

  if (email === userEmail && password === userPassword) {
    res.send({ message: "Login Successfull!!" });
  } else {
    return res.status(404).send({ error: "Invalid user or password" });
  }

}

module.exports = { userLogin };
