const jwt = require("jsonwebtoken");
const User = require("../Models/UserModel");
const bcrypt = require("bcrypt")
require("dotenv").config();
const secretKey = process.env.SECRET_KEY

const RegisterController = async (req, res) => {
    try {

        const { username, email, password } = req.body;
        if (username != "" && email != "" && password != "") {
            const user = await User.findOne({ email });
            console.log(user)
            if (!user) {
                const encryptPass = await bcrypt.hash(password, 10);
                if (encryptPass) {
                    const newUser = await new User({ username, email, password: encryptPass });
                    const updateUser = await newUser.save();
                    if (updateUser) {
                        res.redirect('/login');
                    }
                    else {
                        res.render('register', { message: "Registration failed" });
                    }
                }
                else {
                    res.render('register', { message: "Password error" });
                }
            }
            else {
                res.render('register', { message: "User already exists" });
            }
        }
        else {
            res.render('register', { message: "All Credintials required" });
        }
    }
    catch (error) {
        console.log(error);
        res.render('register', { message: "Something went wrong" });
    }
}

const LoginController = async (req, res) => {
    try {

        const { email, password } = req.body;

        if (email != "" && password != "") {

            let user = await User.findOne({ email })

            if (user) {
                const verifyPass = await bcrypt.compare(password, user.password)
                if (verifyPass) {
                    const token = jwt.sign({ userId: user._id }, secretKey)

                    res.cookie('token', token, {
                        httpOnly: true,
                        maxAge: 24 * 60 * 60 * 1000,
                        //secure: true,     //https
                    });

                    res.render('home', { username: user.username })
                }
                else {
                    res.render('login', { message: "PassWord Incorrect!" })
                }
            }
            else {
                res.render('login', { message: "User not Found!" })
            }
        }
        else {
            res.render('login', { message: "All Credentails required" })
        }
    }
    catch (error) {
        console.log(error);
        res.render('register', { message: "Something went wrong" });
    }
}



module.exports = { RegisterController, LoginController }