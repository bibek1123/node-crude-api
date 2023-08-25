
const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });
const { PORT } = require('./config/config');
const authenticate = require("./middleware/authenticate");
const util = require("./utils/messages");
const validate = require("./middleware/validate");

require("./db/connection");
global.util = util;
global.authenticate = authenticate;
global.validate = validate;

app.use(express.json());
app.use(require("./router/user"));

app.listen(PORT, () => {
  console.log(`Server is running at PORT ${PORT}`);
});
