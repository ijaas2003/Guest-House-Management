// This is for the Schema and PreProcess the Data 
const mongoose = require('mongoose');
const { isEmail, isAlpha, isStrongPassword, isInt } = require('validator');
const bcrypt  = require('bcrypt')

// This is the Schema
const OwnerInformation = new mongoose.Schema({
    Email: {
        type: String,
        required:[ true, "Please Enter the Email"],
        unique: true,
        validate:[ isEmail, "Please Enter the valid email"],
    },
    Name:{
        type: String,
        required : [true, "Please Enter the Name"],
        validate: [isAlpha, "Please Enter the valid Name"]
    },
    PhoneNumber:{
        type: String,
        required : [true, "Please Enter the Number"],
        minlength:[10, "Must Contain 10 Digits"],
        maxlength:[10, "Must Contain 10 Digits"],
        validate: [isInt, "Number Contains 0-9"],
    },
    Password:{
        type: String,
        required: [ true, "Please enter the Password" ],
        minlength: [ 6, "Please Enter above 6 length of password"],
        validate : [isStrongPassword, "Please Enter the valid Password with(a-z,A-Z,12..,!#@$)"]
    },

});

// This is Very important to encrypt the Password and save in DataBase

OwnerInformation.pre('save', async function(next){
    console.log("PreProcess the data", this);
    const salt = await bcrypt.genSalt();
    this.Password = await bcrypt.hash(this.Password, salt);
    next();
    console.log("PreProcess the data", this);
});




const Owner = mongoose.model("OwnerInformation", OwnerInformation);
module.exports = Owner;