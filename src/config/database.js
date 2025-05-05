const mongoose = require("mongoose");

const connectDB = async () => {
    mongoose.connect(
    "mongodb+srv://rudrer:UewGjWldzqiNpBqB@cluster0.tj3p6sn.mongodb.net/devTinder"
  );
}

module.exports = connectDB;
