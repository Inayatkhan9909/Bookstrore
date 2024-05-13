const { con } = require("../config/dbConntectSQL");
const { v4: uuidv4 } = require('uuid');
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
require("dotenv").config();
const secretKey = process.env.SECRET_KEY

const regis = async (req, res) => {
  try {

    const { name, email, password } = req.body;
    if (name != "" && email != "" && password != "") {

      const encryptPass = await bcrypt.hash(password, 10);
      const id = uuidv4();
      const values = [id, name, email, encryptPass]
      const Query = `INSERT INTO users VALUES (?,?,?,?)`;

      await con.query(Query, values, (err, result) => {
        if (err) {
          console.log(err);
        }
        // res.json(result)
        res.redirect('/log')
      });
    }
    else {
      res.render('regis', { message: "All credintials required" });
    }
  }
  catch (error) {
    console.log(error);
    res.render('regis', { message: "Something went wrong" });

  }
}

const log = async (req, res) => {
  try {

    const { email, password } = req.body;

    if (email != "" && password != "") {
      const values = [email, password]
      const Query = `SELECT * FROM users WHERE email = ?`;

      await con.query(Query, values, async(err, result) => {
        if (err) {
          console.log(err);
        }
      
        if (result != undefined && result.length > 0) {
          const verifyPass = await bcrypt.compare(password, result[0].password)
          if (verifyPass) {
            const token = jwt.sign({ userId: result[0].id }, secretKey)

            res.cookie('token', token, {
              httpOnly: true,
              maxAge: 24 * 60 * 60 * 1000,
           
            });
            res.redirect('/home')
          }
          else {
            res.render('log', { message: "PassWord Incorrect!" })
          }
        }
        else {
          res.render('log', { message: "user not found" })
        }
      });


    }
    else {
      res.render('log', { message: "All Credentails required" })
    }

  } catch (error) {
    console.log(error);
    res.render('log', { message: "Something went wrong" });
  }
}

module.exports = { regis, log }
