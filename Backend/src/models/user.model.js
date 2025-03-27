const { dbConn } = require("../../config/config");

class User {

  static checkUserexistance(userEmail) {
    console.log("Checking existence for email:", userEmail);

    const query = "SELECT COUNT(*) AS isEmail FROM users WHERE email = ?";
    return new Promise((resolve, reject) => {
      dbConn.query(query, [userEmail], (err, res) => {
        console.log("Error:", err);
        console.log("Result:", res);

        if (err) {
          reject(err);
        } else {
          const isEmail = res && res.length > 0 ? res[0].isEmail : null;
          console.log("isEmail:", isEmail);
          resolve(isEmail);
        }
      });
    });
  }



  static getUsers() {
    const query = "SELECT * FROM users";
    return new Promise((resolve, reject) => {
      dbConn.query(query, [], (err, res) => {
        if (err) reject(err);
        else resolve(res);
      });
    });
  }


  static getUser(email) {
    const query =
      "select id, name, email, password, phone, city, address AS address, role, pic from users where email = ?";
    return new Promise((resolve, reject) => {
      dbConn.query(query, [email], (err, res) => {
        console.log(err, res);
        if (err) reject(err);
        else resolve(res);
      });
    });
  }

  static createUser(userData) {
    const query =
      "insert into users (name,email,password,phone,city,address,role,pic) values (?,?,?,?,?,?,?,?)";
    return new Promise((resolve, reject) => {
      dbConn.query(
        query,
        [
          userData.name,
          userData.userEmail,
          userData.password,
          userData.phone,
          userData.city,
          userData.address,
          userData.role,
          userData.pic
        ],
        (err, res) => {
          console.log(err, res)
          if (err) reject(err);
          else resolve(res);
        }
      );
    });
  }

  static updateUser(userData) {
    const query =
      "update users set name = ?, password =?,phone =?, city = ?, address = ? where id = ?";
    return new Promise((resolve, reject) => {
      dbConn.query(
        query,
        [
          userData.name,
          userData.password,
          userData.phone,
          userData.city,
          userData.address,
          Number(userData.id),
        ],
        (err, res) => {
          console.log(err, res)
          if (err) reject(err);
          else resolve(res);
        }
      );
    });
  }

  static deleteUser(id) {
    const query = "delete FROM users where id = ?";
    return new Promise((resolve, reject) => {
      dbConn.query(query, [Number(id)], (err, res) => {
        if (err) reject(err);
        else resolve(res);
      });
    });
  }



  static getPatients(){
    const query = "SELECT id, name, email,phone, city, address, pic FROM users WHERE role = 'patient'";
    return new Promise((resolve, reject) => {
      dbConn.query(query, [], (err, res) => {
        if (err) reject(err);
        else resolve(res);
      });
    });
  }

  static getCount (){
    const query = "SELECT COUNT(*) AS doctors FROM doctors; SELECT COUNT(*) AS patients FROM users WHERE  ROLE = 'Patient'; SELECT COUNT(*) AS appoinments FROM appointments;"
    return new Promise((resolve, reject ) =>{
      dbConn.query(query, [], (err,res) =>{
        if (err) reject(err);
        else resolve(res);
      });
    });
  }
  static getPatientsByCity(city) {
    const query = "SELECT id, name, email,phone, city, address, pic FROM users WHERE role = 'patient' AND city = ?";
    return new Promise((resolve, reject) => {
      dbConn.query(query, [city], (err, res) => {
        if (err) reject(err);
        else resolve(res);
      });
    });
  }
}




module.exports = User;
