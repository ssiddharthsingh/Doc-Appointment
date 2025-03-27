const docModel = require('../models/doc.model');

async function getDoctors(req, res) {
    // const userData = req.body; // req.query
    await docModel.getDoctors().then(result => {
        if (result) {
            res.send(result);
        } else res.status(500).send({ error: 'Internal Server Error.' });
    });
}

async function getDoctor(req, res) {
    const email = req.query.email;
    await docModel.getDoctor(email).then(result => {
        if (result) {
            if (result.length > 0) res.send(result);
            else res.send({ message: `${email} not found` });
        } else res.status(500).send({ error: 'Internal Server Error.' });
    });
}

async function getDoctorsByCityAndSpeciality(req, res) {
    const { docCity, docof } = req.query;
    await docModel.getDoctorsByCityAndSpeciality(docCity, docof).then(result => {
        if (result) {
            res.send(result);
        } else res.status(500).send({ error: 'Internal Server Error.' });
    });
}


async function createDoctor(req, res) {
    const docData = req.body;
    console.log(docData)
    if (
        !docData.docName ||
        !docData.docPhone ||
        !docData.docCity ||
        !docData.docAddress ||
        !docData.docof ||
        !docData.docExp ||
        !docData.docQuali ||
        !docData.docEmail ||
        !docData.docPassword ||
        !docData.fee ||
        !docData.pic
    )
        return res.status(404).send({ error: "information missing" });

    const isEmail = await docModel.checkDocexistance(docData.docEmail);
    if (isEmail || isEmail > 0)
        return res.status(404).send({ error: "User is already registered" });

    await docModel
        .createDoctor(docData)
        .then(() => {
            res.send({ message: `User Data inserted.` });
        })
        .catch((err) => {
            console.log(err, "error while saving data");
            return res.status(500).send({ error: "Internal Server Error." });
        });
}

async function updateDoctor(req, res) {
    const docData = req.body;
    await docModel.updateDoctor(docData).then(result => {
        if (result) {
            res.send(result);
        } else res.status(500).send({ error: 'Internal Server Error.' });
    });
}

async function updateDoctor(req, res) {
    const docData = req.body;
    console.log('docData', docData)
    if (
        docData.id <= 0 ||
        !docData.docName ||
        !docData.docPhone ||
        !docData.docCity ||
        !docData.docAddress ||
        !docData.docOf ||
        !docData.docExp ||
        !docData.docQuali ||
        !docData.docEmail ||
        !docData.docPassword ||
        !docData.fee ||
        !docData.pic
    )
        return res.status(404).send({ error: "information missing" });

    const isEmail = await docModel.checkDocexistance(docData.email);
    if (!isEmail || isEmail === 0)
        return res.status(404).send({ error: "doc is not registered" });

    await docModel
        .updateDoctor(docData)
        .then(() => {
            res.send({ message: `doc Data updated.` });
        })
        .catch((err) => {
            console.log(err, "error while updating data");
            return res.status(500).send({ error: "Internal Server Error." });
        });
}

async function deleteDoctor(req, res) {
    const docEmail = req.query.email;
    const id = req.query.id;
    
    const email = await docModel.checkDocexistance(docEmail);
    if (!email || id === 0 )
      return res.status(404).send({ error: "Doc is not registered" });
  
    await docModel
      .deleteDoctor(id)
      .then(() => {
        res.send({ message: `User Data deleted.` });
      })
      .catch((err) => {
        console.log(err, "error while deleting data");
        return res.status(500).send({ error: "Internal Server Error." });
      });
  }

module.exports = {
    getDoctors,
    getDoctor,
    createDoctor,
    updateDoctor,
    deleteDoctor,
    getDoctorsByCityAndSpeciality,
};