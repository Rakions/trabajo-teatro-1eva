let id = "";

async function getObraById() {
  id = localStorage.getItem("id");
  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  const url = "http://localhost:3000/obras/" + id;
  const response = await fetch(url, requestOptions);
  const result = await response.json();
  return result;
}

async function getAsientoPorId(ID_asiento) {
  id = localStorage.getItem("id");
  const bodyData = {
    id_obra: id,
    id_asiento: ID_asiento,
  };
  var requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(bodyData),
    redirect: "follow",
  };

  const url = "http://localhost:3000/asientos";
  const response = await fetch(url, requestOptions);
  const result = await response.json();
  return result;
}

var asientosSeleccionados = [];

async function cargarAsientos() {
  const obra = await getObraById();
  const asientos = obra[0].asientos;

  const functionInfo = document.querySelector(".seats_functionInfo");
  functionInfo.innerHTML = "";
  functionInfo.innerHTML += `
    <div class="function">
      <img src="../assets/images/function_prueba.jpg" alt="" />
      <div>
        <h2>${obra[0].nombre}</h2>
        <p>${obra[0].descripcion}</p>
      </div>
      <input type="hidden" id="id_obra" value="${obra[0].id}"/>
    </div>`;

  const asientosHTML = document.querySelector(".seats_all_seats_image");

  asientos.map((asiento) => {
    asientosHTML.innerHTML += `<button class="seat" id="${asiento.numero}" value='${asiento.precio}'></button>`;
  });

  let totalPrecioAsientos = 0;
  const precioTotal = document.querySelector(".selected_seats_total > h2");

  const botones = asientosHTML.querySelectorAll(".seat");
  botones.forEach((boton) => {
    const numeroAsiento = parseInt(boton.id, 10);
    const asientoCorrespondiente = asientos.find((asiento) => asiento.numero === numeroAsiento);

    if (asientoCorrespondiente.ocupado) {
      boton.style.backgroundColor = "red";
      boton.disabled = true;
    } else {
      boton.addEventListener("click", () => {
        const numeroAsiento = parseInt(boton.id, 10);

        if (!asientosSeleccionados.includes(numeroAsiento)) {
          asientosSeleccionados.push(numeroAsiento);
          boton.style.backgroundColor = "#62ae00";
          totalPrecioAsientos += asientoCorrespondiente.precio;
        } else {
          asientosSeleccionados.splice(asientosSeleccionados.indexOf(numeroAsiento), 1);
          boton.style.backgroundColor = "var(--color-principal)";
          totalPrecioAsientos -= asientoCorrespondiente.precio;
        }
        actualizarLista();
        precioTotal.innerHTML = "Total: " + totalPrecioAsientos + "€";
      });
    }
  });
}

function actualizarLista() {
  const listaAsientos = document.querySelector(".selected_seats_list");
  listaAsientos.innerHTML = "";

  asientosSeleccionados.forEach(async (asiento) => {
    const infoAsiento = await getAsientoPorId(asiento);

    listaAsientos.innerHTML += `
      <li class="selected_seats_item">
        <div>Asiento: ${infoAsiento.numero}</div>
        <div>
          <p>${infoAsiento.precio + "€"}</p>
          <button onclick="eliminarAsiento(${infoAsiento.numero})">X</button>
        </div>
      </li>
    `;
  });
}

function eliminarAsiento(id_asiento) {
  asientosSeleccionados = asientosSeleccionados.filter((asiento) => asiento !== id_asiento);

  const boton = document.getElementById(id_asiento);
  if (boton) {
    boton.style.backgroundColor = "var(--color-principal)";
  }

  actualizarLista();
}

cargarAsientos();
