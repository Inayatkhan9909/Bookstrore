const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const dbConnect = require("./config/dbConnect");
const { RegisterController, LoginController } = require("./Controllers/userController")
require("dotenv").config();
const port = process.env.PORT;
const exphbs = require('express-handlebars');
const app = express();
dbConnect();
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
app.get('/', (req, res) => { res.send("hello World") });
app.get('/home', (req, res) => { res.render('home') });
app.get('/books', (req, res) => { res.render('books') });
app.get('/login', (req, res) => { res.render('login') })
app.get("/register", (req, res) => { res.render("register") });

//Post routes
//post routes
app.post("/register", RegisterController);
app.post("/login", LoginController);


app.listen(port, () => {
  console.log(`Server is Working on port: ${port}`);
});