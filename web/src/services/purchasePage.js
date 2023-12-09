const asientosSeleccionados = localStorage.getItem("asientos");
const id = localStorage.getItem("id");

async function createUser() {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var numerosArray = asientosSeleccionados.split(",");
  const idPelicula = id;

  const entradas = numerosArray.map((numero) => {
    return {
      numero: parseInt(numero, 10),
      pelicula: idPelicula,
    };
  });

  var raw = JSON.stringify({
    nombre: document.getElementById("name").value,
    email: document.getElementById("email").value,
    contra: 123,
    entradas: entradas,
  });

  console.log(raw);

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "manual",
  };

  fetch("http://localhost:3000/users", requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.log("error", error));
}

async function makeCompra(id_asiento) {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  id_asiento = parseInt(id_asiento, 10);

  var raw = JSON.stringify({
    id_obra: id,
    id_asiento: id_asiento,
  });

  var requestOptions = {
    method: "PUT",
    headers: myHeaders,
    body: raw,
    redirect: "manual",
  };

  try {
    const response = await fetch("http://localhost:3000/obras/compra", requestOptions);

    if (!response.ok) {
      throw new Error(
        `Error al realizar la compra para el asiento ${id_asiento}. Código de estado: ${response.status}`
      );
    }

    const result = await response.text();
    return JSON.parse(result);
  } catch (error) {
    console.error("Error en makeCompra para el asiento", id_asiento, ":", error.message);
    throw error;
  }
}

async function comprar() {
  var numerosArray = asientosSeleccionados.split(",");
  const promesasCompras = numerosArray.map((numero) => makeCompra(numero));

  try {
    const resultados = await Promise.all(promesasCompras);
    createUser();
  } catch (error) {
    console.error("Error al realizar las compras:", error);
  }
}

document.querySelector(".purchase_buttons_purchase").addEventListener("click", () => {
  comprar();
});
