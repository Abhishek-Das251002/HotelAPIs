const mongoose = require("mongoose")
require("dotenv").config()

const connectionUri = process.env.MONGODB

const connectToDB = async () => {
    await mongoose
    .connect(connectionUri)
    .then(() => {console.log("connected to Database")})
    .catch((error) => {console.log("An error occured while connecting to DB.", error)})
}

module.exports = {connectToDB}