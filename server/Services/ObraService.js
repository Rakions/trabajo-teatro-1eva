const fs = require("fs");
const path = require("path");
const Obra = require("../Models/Obra");
const Asiento = require("../Models/Asiento");

const obrasFilePath = path.join(__dirname, "../data/obras.json");

function getObrasFromJSON() {
  try {
    const obrasData = fs.readFileSync(obrasFilePath, "utf-8");
    return JSON.parse(obrasData);
  } catch (error) {
    console.error("Error al cargar obras desde el archivo JSON:", error.message);
    return [];
  }
}

function saveObrasToJson(listaObras) {
  try {
    fs.writeFileSync(obrasFilePath, "[]");
    fs.writeFileSync(obrasFilePath, JSON.stringify(listaObras, null, 2), "utf-8");
    console.log("Obras guardadas correctamente en el archivo JSON.");
  } catch (error) {
    console.error("Error al guardar obras en el archivo JSON:", error.message);
  }
}

const obraService = {
  getAllObras: () => {
    return listaObras;
  },
  getObraById: (id) => {
    return listaObras.filter((obra) => {
      return obra.id === id;
    });
  },
  getObrasByNombre: (nombre) => {
    return listaObras.filter((obra) => {
      return (
        obra.nombre.toLowerCase().replace(/\s/g, "") ===
        nombre.trim().toLowerCase().replace(/\s/g, "")
      );
    });
  },
  getObraByCategoria: (categoria) => {
    return listaObras.filter((obra) => {
      return obra.categoria.toLowerCase() === categoria.toLowerCase();
    });
  },
  createObra: (nombre, descripcion, categoria) => {
    let obra = new Obra(nombre, descripcion, categoria);
    let listaAsientos = [];
    for (let index = 0; index <= 63; index++) {
      listaAsientos.push(new Asiento(index));
    }
    obra.asientos = listaAsientos;
    listaObras.push(obra);
    saveObrasToJson(listaObras);
  },
  updateObraNombre: (id, nombre) => {
    let obras = getObrasFromJSON();
    obras.forEach((obra) => {
      if (obra.id.toLowerCase() === id.toLowerCase()) {
        obra.nombre = nombre;
      }
    });
    saveObrasToJson(obras);
  },
  updateObraDescripcion: (id, descripcion) => {
    let obras = getObrasFromJSON();
    obras.forEach((obra) => {
      if (obra.id.toLowerCase() === id.toLowerCase()) {
        obra.descripcion = descripcion;
      }
    });
    saveObrasToJson(obras);
  },
  updateObraCategoria: (id, categoria) => {
    let obras = getObrasFromJSON();
    obras.forEach((obra) => {
      if (obra.id.toLowerCase() === id.toLowerCase()) {
        obra.categoria = categoria;
      }
    });
    saveObrasToJson(obras);
  },
  // makeCompra: function (id_obra, id_asiento) {
  //   let obras = this.getAllObras();
  //   console.log(obras);
  //   obras.map((obra) => {
  //     if (obra.id === id_obra) {
  //       obra.asientos.map((asiento) => {
  //         if (asiento.numero === id_asiento) {
  //           asiento.ocupado = true;
  //         }
  //       });
  //     }
  //   });
  //   saveObrasToJson(obra);
  // },
};

var listaObras = getObrasFromJSON();

// obraService.makeCompra("ab08d8fe-d2d3-4e44-ab29-4c95047a09b2", 0);

module.exports = obraService;
