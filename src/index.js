import express from "express";
import configViewengine from "./configs/viewEngine"

const app = express();
const port = 3000;

configViewengine(app);

app.get('/', (req, res) => {
  res.render("test.ejs");
})

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
})