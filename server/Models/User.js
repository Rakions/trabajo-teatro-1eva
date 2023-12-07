class User {
  constructor(nombre, email, contra) {
    this.nombre = nombre;
    this.email = email;
    this.contra = contra;
    this.entradasCompradas = [];
  }
}

module.exports = User;
