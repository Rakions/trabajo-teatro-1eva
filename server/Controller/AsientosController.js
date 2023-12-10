const express = require("express");
const router = express.Router();
const asientoService = require("../Services/AsientoService");

router.get("/:id", (req, res) => {
  res.send(asientoService.getAllAsientos(req.params.id));
});

router.post("/", (req, res) => {
  const { id_obra, id_asiento } = req.body;
  res.send(asientoService.getAsientoById(id_obra, id_asiento));
});

module.exports = router;
