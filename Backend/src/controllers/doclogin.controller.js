// doclogin controller

const docModule = require("../models/doc.model");

async function docLogin(req, res) {
  const docEmail = req.body.docEmail;
  const docPassword = req.body.docPassword;

  if (!docEmail || !docPassword)
    return res.status(404).send({ error: "information missing" });

  const isdocEmail = await docModule.checkDocexistance(docEmail);
  if (!isdocEmail || isdocEmail === 0)
    return res.status(404).send({ error: "doc is not registered" });

  const docData = await docModule.getDoctor(docEmail);

  const email = docData[0].docEmail;
  const password = docData[0].docPassword;

  if (email === docEmail && password === docPassword) {
    res.send({ message: "Login Successfull!!" });
  } else {
    return res.status(404).send({ error: "Invalid Email or password" });
  }

}

module.exports = { docLogin };

