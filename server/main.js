const express = require("express");
const app = express();
const port = 3000;
const obrasController = require("./Controller/ObrasController");
const userController = require("./Controller/UsersController");
const asientosController = require("./Controller/AsientosController");

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://teatrogaleguista.s3.amazonaws.com/pages/mainPage.html");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.use(express.json());
app.use("/obras", obrasController);
app.use("/users", userController);
app.use("/asientos", asientosController);

app.get("/", (req, res) => {
  res.send();
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
