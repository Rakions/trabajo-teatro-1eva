const express = require("express");
const router = express.Router();
const userService = require("../Services/UserService");

router.get("/", (req, res) => {
  res.send(userService.getAllUsers());
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  res.send(userService.getUserById(id));
});

router.post("/", (req, res) => {
  const { nombre, email, contra, entradas } = req.body;
  res.send(userService.createUser(nombre, email, contra, entradas));
});

router.delete("/:id", (req, res) => {
  const id = req.body.id;
  res.send(userService.deleteUser(id));
});

module.exports = router;
