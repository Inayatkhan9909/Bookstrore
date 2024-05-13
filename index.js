const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const dbConnect = require("./config/dbConnect");
const {dbConntectSQL} = require("./config/dbConntectSQL")
const ConnectMSSQL = require("./config/dbConnectMSSQL")
const { RegisterController, LoginController } = require("./Controllers/userController");
const {regis,log} = require("./Controllers/testController");
const Addbook = require("./Controllers/AdminController");
const multerMid = require("./Middlewares/Multer");
require("dotenv").config();
const port = process.env.PORT;
const exphbs = require('express-handlebars');
const app = express();
//  dbConnect();
dbConntectSQL();
// ConnectMSSQL();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser())


app.engine('hbs', exphbs.engine({
  defaultLayout: 'main',
  extname: '.hbs'
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, "public")));


//get routes 
app.get('/', (req, res) => { res.render('home') });
app.get('/home', (req, res) => { res.render('home') });
app.get('/profile', (req, res) => { res.render('profile') });
app.get('/books', (req, res) => { res.render('books') });
// app.get('/login', (req, res) => { res.render('login') })
// app.get("/register", (req, res) => { res.render("register") });
app.get("/regis", (req, res) => { res.render("regis") });
app.get("/log", (req, res) => { res.render("log") });


app.get("/addbook", (req, res) => { res.render("Addbook") });

//Post routes
// app.post("/register", RegisterController);
app.post("/regis", regis);
app.post("/log", log);
// app.post("/login", LoginController);

 app.post("/addbook",multerMid, Addbook);


app.listen(port, () => {
  console.log(`Server is Working on port: ${port}`);
});