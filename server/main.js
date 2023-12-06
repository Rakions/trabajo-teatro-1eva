const express = require("express");
const app = express();
const port = 3000;
const obrasController = require("./Controller/ObrasController");

app.use(express.json());
app.use("/obras", obrasController);

app.get("/", (req, res) => {
  res.send();
});

app.listen(port, () => {
  console.log("Server started on port: " + port);
});
