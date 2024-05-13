var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database:"bookstore",
});

const dbConntectSQL = async() =>{
    try {
        con.connect(function(err) {
            if (err) throw err;
            console.log("Connected!");
          });
    } 
    catch (error) {
        console.log("Connection error");
    }
}


module.exports = {dbConntectSQL,con}
