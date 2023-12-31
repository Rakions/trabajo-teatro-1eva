const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;
const obrasController = require("./Controller/ObrasController");
const userController = require("./Controller/UsersController");
const asientosController = require("./Controller/AsientosController");

app.use(cors())
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
