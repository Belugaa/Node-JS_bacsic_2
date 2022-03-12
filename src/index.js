import express from "express";
import configViewengine from "./configs/viewEngine";
import initWebRoute from "./routes/web";
// import connection from "./configs/connectDB";

require('dotenv').config();

const app = express();
const port = process.env.PORT;

const bodyParser = require('body-parser');
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

// setup view engine
configViewengine(app);

// setup Router
initWebRoute(app);


app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
})