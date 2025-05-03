const express = require("express");
const app = express();


app.use("/hello", (req,res) => {
    res.send("Hello From Server side");
});

app.use("/test", (req,res) => {
    res.send("This is test page");
});

app.use("/", (req,res) => {
    res.send("Welcome to dashboard");
});


app.listen(3000, () => {
    console.log("successfully creaated, listening on 3000");
});