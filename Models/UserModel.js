const mongoose = require("mongoose");

const User = mongoose.model("User",{
    firstname:String,
    lastname:String,
    username:{type:String,require:true,unique:true},
    email:{type:String,require:true,unique:true},
    password:String

});

module.exports = User