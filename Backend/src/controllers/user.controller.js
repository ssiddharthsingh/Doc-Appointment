const userModel = require("../models/user.model");

async function getUsers(req, res) {
  await userModel.getUsers().then((result) => {
    if (result) {
      res.send(result);
    } else res.status(500).send({ error: "Internal Server Error." });
  });
}


// get patients

async function getPatients(req, res) {
  const { city } = req.query;

  // If a city is provided, filter patients by that city, otherwise get all patients
  const patients = city
    ? await userModel.getPatientsByCity(city)
    : await userModel.getPatients();

  try {
    res.send(patients);
  } catch (error) {
    console.error("Error fetching patients:", error);
    res.status(500).send({ error: "Internal Server Error." });
  }
}


async function getUser(req, res) {
  const email = req.query.email;
  await userModel.getUser(email).then((result) => {
    if (result) {
      if (result.length > 0) res.send(result);
      else res.send({ message: `${email} not found` });
    } else res.status(500).send({ error: "Internal Server Error." });
  });
}

async function getCount(req, res) {
  await userModel.getCount().then((result) => {
    if (result) {
      res.send(result);
    } else res.status(500).send({ error: "Internal Server Error." });
  });
}

async function createUser(req, res) {
  const userData = req.body;
console.log(userData)
  if (
    !userData.name ||
    !userData.userEmail ||
    !userData.password ||
    !userData.phone ||
    !userData.city ||
    !userData.address ||
    !userData.pic ||
    !userData.role
  )
    return res.status(404).send({ error: "information missing" });

  const isEmail = await userModel.checkUserexistance(userData.userEmail);
  if (isEmail || isEmail > 0 )
    return res.status(404).send({ error: "User is already registered" });

  await userModel
    .createUser(userData)
    .then(() => {
      res.send({ message: `User Data inserted.` });
    })
    .catch((err) => {
      console.log(err, "error while saving data");
      return res.status(500).send({ error: "Internal Server Error." });
    });
}

async function updateUser(req, res) {
  const userData = req.body;
  console.log('userData',userData)
  if (
    userData.id <= 0 ||
    !userData.name ||
    !userData.password ||
    !userData.phone ||
    !userData.address ||
    !userData.role ||
    !userData.email
  )
    return res.status(404).send({ error: "information missing" });

  const isEmail = await userModel.checkUserexistance(userData.email);
  if (!isEmail || isEmail === 0 )
    return res.status(404).send({ error: "User is not registered" });

  await userModel
    .updateUser(userData)
    .then(() => {
      res.send({ message: `User Data updated.` });
    })
    .catch((err) => {
      console.log(err, "error while updating data");
      return res.status(500).send({ error: "Internal Server Error." });
    });
}

async function deleteUser(req, res) {
  const userEmail = req.query.email;
  const id = req.query.id;
  
  const email = await userModel.checkUserexistance(userEmail);
  if (!email || id === 0 )
    return res.status(404).send({ error: "User is not registered" });

  await userModel
    .deleteUser(id)
    .then(() => {
      res.send({ message: `User Data deleted.` });
    })
    .catch((err) => {
      console.log(err, "error while deleting data");
      return res.status(500).send({ error: "Internal Server Error." });
    });
}



module.exports = { getUsers, getUser, createUser, updateUser, deleteUser, getPatients, getCount };

