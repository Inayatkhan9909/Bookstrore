const mongoose = require("mongoose");
const { stringify } = require("uuid");

const Singlebook = mongoose.model("Singlebook",{

    bookname:{type:String,require:true,unique:true},
    description:String,
    price:String,
    quantity:[Number],
    addtocartUser:string,
    buyuser:string

});

module.exports = Singlebook