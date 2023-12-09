const { v4: uuidv4 } = require("uuid");

class Obra {
  constructor(nombre, descripcion, categoria, image_url) {
    this.id = uuidv4();
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.image = image_url;
    this.categoria = categoria;
  }
}

module.exports = Obra;
