
const sql = require("mssql");

// SQL Server configuration
var config = {
    "user": "sa", // Database username
    "password": "Altaf@sons1234", // Database password
    "server": "HP\\SQLSERVER1", // Server IP address
    "database": "Fullname", // Database name
    "options": {
        "encrypt": false // Disable encryption
    }
}

// Connect to SQL Server
const ConnectMSSQL = ()=>{
    try {
        sql.connect(config, err => {
            if (err) {
                throw err;
            }
            console.log("Connection Successful!");
        });
    } catch (error) {
        console.log(error)
    }
}

module.exports = ConnectMSSQL

