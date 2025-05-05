const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
    firstName : {
        type : String,
        required : true,
        minLength: 4,
        maxLength : 50
    },

    lastName : {
        type: String
    },

    emailId : {
        type : String,
        lowerCase : true,
        required : true,
        unique : true,
        trim : true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("invalid Email Address: "+ value);
            }
        }
    },
     password : {
        type : String
     },

     gender : {
        type : String
     }
})

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;