const fs = require("fs");
const path = require("path");
const Obra = require("../Models/Obra");
const Asiento = require("../Models/Asiento");

const obrasFilePath = path.join(__dirname, "../Data/obras.json");

var listaObras = [];

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
    return getObrasFromJSON();
  },
  getObraById: (id) => {
    return getObrasFromJSON().filter((obra) => {
      return obra.id === id;
    });
  },
  getObrasByNombre: (nombre) => {
    return getObrasFromJSON().filter((obra) => {
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
    for (let index = 0; index < 63; index++) {
      listaAsientos.push(new Asiento(index, 5));
    }
    obra.asientos = listaAsientos;
    listaAsientos = getObrasFromJSON();
    listaObras.push(obra);
    saveObrasToJson(listaObras);
  },
  updateObraNombre: (id, nombre) => {
    let obras = getObrasFromJSON();
    const index = obras.findIndex((obra) => {
      obra.id.toLowerCase() === id.toLowerCase();
    });
    obras[index].nombre = nombre;

    saveObrasToJson(obras);
  },
  updateObraDescripcion: (id, descripcion) => {
    let obras = getObrasFromJSON();
    const index = obras.findIndex((obra) => {
      obra.id.toLowerCase() === id.toLowerCase();
    });
    obras[index].descripcion = descripcion;
    saveObrasToJson(obras);
  },
  updateObraCategoria: (id, categoria) => {
    let obras = getObrasFromJSON();
    const index = obras.findIndex((obra) => {
      obra.id.toLowerCase() === id.toLowerCase();
    });
    obras[index].categoria = categoria;
    saveObrasToJson(obras);
  },
  deleteObra: (id) => {
    let obras = getObrasFromJSON();
    const index = obras.findIndex((obra) => {
      obra.id === id;
    });
    obras.splice(index, 1);
    saveObrasToJson(obras);
  },
  makeCompra: function (id_obra, id_asiento) {
    let obras = this.getAllObras();
    obras.map((obra) => {
      if (obra.id === id_obra) {
        obra.asientos.map((asiento) => {
          if (asiento.numero === id_asiento) {
            asiento.ocupado = true;
          }
        });
      }
    });
    saveObrasToJson(obras);
  },
};

listaObras = getObrasFromJSON();
module.exports = obraService;
