const express = require("express");
const router = express.Router();
const asientoService = require("../Services/AsientoService");

router.get("/", (req, res) => {
  res.send(asientoService.getAllAsientos());
});

router.get("/:id", (req, res) => {
  res.send(asientoService.getAsientoById(req.params.id));
});

module.exports = router;
