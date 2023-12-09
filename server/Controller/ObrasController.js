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

router.put("/nombre", (req, res) => {
  const { id, nombre } = req.body;
  res.send(obraService.updateObraNombre(id, nombre));
});

router.put("/descripcion", (req, res) => {
  const { id, descripcion } = req.body;
  res.send(obraService.updateObraDescripcion(id, descripcion));
});

router.put("/categoria", (req, res) => {
  const { id, categoria } = req.body;
  res.send(obraService.updateObraCategoria(id, categoria));
});

router.put("/compra", (req, res) => {
  const { id_obra, id_asiento } = req.body;
  console.log(id_obra, id_asiento);
  res.send(obraService.makeCompra(id_obra, id_asiento));
});

router.delete("/", (req, res) => {
  const id = req.body.id;
  console.log(id);
  res.send(obraService.deleteObra(id));
});

module.exports = router;
