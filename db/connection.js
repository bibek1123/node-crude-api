const mongoose = require("mongoose");
const {
  MONGODB
} = require('../config/config')


const dbConfigure = `${MONGODB.DB_USERNAME}${MONGODB.DB_PASSWORD}`
const dConnection = `${MONGODB.DB_CONNECTION}://${dbConfigure}${MONGODB.DB_HOST}${MONGODB.DB_PORT}/${MONGODB.DB_DATABASE}`;

mongoose.connect(dConnection, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
// TODO: Remove debug in production

mongoose.set("debug", false);
var db = mongoose.connection;

db.once("open", () => {
  console.log("Connection Successful");
});

db.on("error", () => {
  console.log("Error in Connect Mongo");
});
 module.exports = db