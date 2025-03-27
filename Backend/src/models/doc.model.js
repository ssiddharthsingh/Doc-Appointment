const { dbConn } = require("../../config/config");

class Doc {

    static checkDocexistance(docEmail) {
        console.log("Checking existence for email:", docEmail);

        const query = "SELECT COUNT(*) AS isdocEmail FROM doctors WHERE docEmail = ?";
        return new Promise((resolve, reject) => {
            dbConn.query(query, [docEmail], (err, res) => {
                console.log("Error:", err);
                console.log("Result:", res);

                if (err) {
                    reject(err);
                } else {
                    const isdocEmail = res && res.length > 0 ? res[0].isdocEmail : null;
                    console.log("isdocEmail:", isdocEmail);
                    resolve(isdocEmail);
                }
            });
        });
    }

    static getDoctors() {
        const query = "SELECT * FROM doctors";
        return new Promise((resolve, reject) => {
            dbConn.query(query, [], (err, res) => {
                if (err) reject(err);
                else resolve(res);
            });
        });
    }

    static getDoctor(docEmail) {
        const query =
            "SELECT * FROM doctors WHERE docEmail = ?";
        return new Promise((resolve, reject) => {
            dbConn.query(query, [docEmail], (err, res) => {
                console.log(err, res);
                if (err) reject(err);
                else resolve(res);
            });
        });
    }

    static getDoctorsByCityAndSpeciality(docCity, docof) {
        const query = "SELECT * FROM doctors WHERE docCity = ? AND docof = ?";
        return new Promise((resolve, reject) => {
            dbConn.query(query, [docCity, docof], (err, res) => {
                if (err) reject(err);
                else resolve(res);
            });
        });
    }

    static createDoctor(docData) {
        const query =
            "insert into doctors (docName,docEmail,docPassword,docPhone,docCity,docAddress,docExp,docQuali,docof,pic,role,fee) values (?,?,?,?,?,?,?,?,?,?,?,?)";
        return new Promise((resolve, reject) => {
            dbConn.query(
                query, [
                    docData.docName,
                    docData.docEmail,
                    docData.docPassword,
                    docData.docPhone,
                    docData.docCity,
                    docData.docAddress,
                    docData.docExp,
                    docData.docQuali,
                    docData.docof,
                    docData.pic,
                    docData.role,
                    docData.fee
                ],
                (err, res) => {
                    if (err) reject(err);
                    else resolve(res);
                }
            );
        });
    }

    static updateDoctor(docData) {
        const query =
            "update doctors set docName = ?, docPhone = ?, docCity = ?, docAddress = ?, docExp = ?, docQuali = ?, docof = ?, pic = ?, fee = ? where docEmail = ?";
        return new Promise((resolve, reject) => {
            dbConn.query(
                query, [
                    docData.docName,
                    docData.docPhone,
                    docData.docCity,
                    docData.docAddress,
                    docData.docExp,
                    docData.docQuali,
                    docData.docof,
                    docData.pic,
                    docData.docEmail,
                    docData.fee
                ],
                (err, res) => {
                    if (err) reject(err);
                    else resolve(res);
                }
            );
        });
    }

    static deleteDoctor(docEmail) {
        const query = "delete from doctors where id = ?";
        return new Promise((resolve, reject) => {
            dbConn.query(query, [docEmail], (err, res) => {
                if (err) reject(err);
                else resolve(res);
            });
        });
    }


}

module.exports = Doc;