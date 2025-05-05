const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");
const {validateSignUpData} = require("./utils/validate");
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');


app.use(express.json());
app.use(cookieParser());


app.get('/user', async (req, res) => {

    const firstName = req.body.firstName;

    try {
        const user = await User.findOne ({firstName : firstName});
        res.status(201).send(user);
    }
    catch(err){
        res.send(401).send("Something went wrong")
    }
})

// Feed API - GET /feed - get all the users from the database.s
app.get("/feed", async(req, res) => {

    try{
        const user = await User.find({});
        res.status(200).send(user);     
    }catch(err){
        res.status(400).send("Users not found");
    }

})

app.post("/signup", async (req, res)=> {

console.log(req.body);
try{
    //validation of data
    validateSignUpData(req);

    const {firstName, lastName, emailId, password} = req.body;

    //encrypt the password
    const passwordHash = await bcrypt.hash(password,10);

    //creating a new instance of the user model
    const user = new User({
        firstName,
        lastName,
        emailId,
        password : passwordHash,
    });

    await user.save();
    res.status(201).send("user created");
}
catch(err) {
     res.status(400).send("Error Saving the user: "+ err.message);
    }

//     const userObj = {
//         firstName : "Rudresh",
//         lastName : "Gowda",
//         email : "rudreshnr@outlook.com",
//         password : "rudresh@321",
//     }
// // Creating new instance of a user model
// const user = new User(userObj);
// try {await user.save();
//     res.send("user added successfully");
// } catch(err) {
//     res.status(400).send("Error Saving the user: "+ err.message);
//}
});

app.get("/profile", async(req, res) => {
    const cookies = req.cookies;
    console.log(cookies);
    res.send("reading cookies");
});

app.post("/login", async (req, res)=> {
    try{
        const{emailId, password} = req.body;

        const user = await User.findOne({emailId: emailId})
        if(!user){
            throw new Error("Invalid user");
        }

        const isPassowrdValid = await bcrypt.compare(password, user.password)
        if(isPassowrdValid) {

            // Create a JWT Token
            const token = await jwt.sign({_id : user.id}, "dev@tinder!@#");
            console.log(token);
            // Add the token to cookie and send the response back to the user

            res.cookie("token",token);;
            res.send("User Login Successful");
        }
        else{
            throw new Error("Invalid user");
        }
    }
    catch(err){
        res.status(400).send("Error: "+ err.message);
    }
});

connectDB()
    .then(()=>{
        console.log("Database connection established...");
        app.listen(3000, () => {
            console.log("successfully creaated, listening on 3000");
        });
    })
    .catch((err)=>{
        console.log("Database can not be connected.....");
    })