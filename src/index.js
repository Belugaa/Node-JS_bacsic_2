import express from "express";
import configViewengine from "./configs/viewEngine";
import initWebRoute from "./routes/web";
// import cors from cors;
// import connection from "./configs/connectDB";
const cors = require('cors')

require('dotenv').config();

const app = express();
const port = process.env.PORT;

const bodyParser = require('body-parser');
app.use(cors());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
// app.use(cors());
// setup view engine
configViewengine(app);

// setup Router
initWebRoute(app);


app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
})