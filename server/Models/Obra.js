const { v4: uuidv4 } = require("uuid");

class Obra {
  constructor(nombre, descripcion, categoria) {
    this.id = uuidv4();
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.categoria = categoria;
  }
}

module.exports = Obra;
