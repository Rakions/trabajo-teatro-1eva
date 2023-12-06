class Asiento {
  constructor(numero, categoria, precio) {
    this.numero = numero;
    this.ocupado = false;
    this.categoria = categoria;
    this.precio = precio;
  }
}

module.exports = Asiento;
