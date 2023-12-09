const obraService = require("./ObraService");

const asientoService = {
  getAllAsientos: (id_obra) => {
    let obra = obraService.getObraById(id_obra);
    return obra[0].asientos;
  },
  getAsientoById: (id_obra, id_asiento) => {
    let obra = obraService.getObraById(id_obra);
    let asiento = obra[0].asientos.filter((asiento) => {
      if (asiento.numero === id_asiento) {
        return asiento;
      }
    });
    return asiento[0];
  },
};

module.exports = asientoService;
