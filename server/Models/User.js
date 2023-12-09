const { v4: uuidv4 } = require("uuid");

class User {
  constructor(nombre, email, contra, entradas) {
    this.id = uuidv4();
    this.nombre = nombre;
    this.email = email;
    this.contra = contra;
    this.entradasCompradas = entradas;
  }
}

module.exports = User;
