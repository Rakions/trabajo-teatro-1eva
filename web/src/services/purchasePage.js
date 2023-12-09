const asientosSeleccionados = localStorage.getItem("asientos");
const id = localStorage.getItem("id");

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
  };

  try {
    const response = await fetch("http://localhost:3000/obras/compra", requestOptions);
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
  } catch (error) {
    console.error("Error al realizar las compras:", error);
  }
}

document.querySelector(".purchase_buttons_purchase").addEventListener("click", () => {
  const email = document.getElementById("email").value;
  localStorage.setItem("email", email);
  comprar();
});
