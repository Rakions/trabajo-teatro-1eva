const express = require("express");
const router = express.Router();
const obraService = require("../Services/ObraService");

router.get("/", (req, res) => {
  res.send(obraService.getAllObras());
});

router.get("/:id", (req, res) => {
  res.send(obraService.getObraById(req.params.id));
});

router.get("/nombre/:nombre", (req, res) => {
  res.send(obraService.getObrasByNombre(req.params.nombre.trim()));
});

router.get("/categoria/:categoria", (req, res) => {
  res.send(obraService.getObraByCategoria(req.params.categoria));
});

router.post("/", (req, res) => {
  const { nombre, descripcion, categoria } = req.body;
  res.send(obraService.createObra(nombre, descripcion, categoria));
});

router.put("/", (req, res) => {
  const { id, nombre } = req.body;
  res.send(obraService.updateObraNombre(id, nombre));
});

module.exports = router;
