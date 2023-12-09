let id = "";

async function getObraById() {
  id = localStorage.getItem("id");
  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  const url = "http://localhost:3000/obras/" + id;
  const response = await fetch("http://localhost:3000/obras/" + id, requestOptions);
  const result = await response.text();
  return JSON.parse(result);
}

async function cargarAsientos() {
  const obra = await getObraById();
  const functionInfo = document.querySelector(".seats_functionInfo");
  functionInfo.innerHTML = "";
  functionInfo.innerHTML += `
        <div class="function">
          <img src="../assets/images/function_prueba.jpg" alt="" />
          <div>
              <h2>${obra[0].nombre}</h2>
              <p>${obra[0].descripcion}</p>
          </div>
          <input type="hidden" id="id_obra" value="${obra.id}"/>
        </div>`;

  const asientosHTML = document.querySelector(".seats_all_seats_image");
  const asientos = obra[0].asientos;
  asientos.map((asiento) => {
    asientosHTML.innerHTML += `<button class="seat" value='${asiento.numero}'></button>`;
  });

  var asientosSeleccionados = [];
  const botones = asientosHTML.querySelectorAll(".seat");
  botones.forEach((boton) => {
    boton.addEventListener("click", () => {
      if (
        boton.style.backgroundColor !== "#62ae00" &&
        !asientosSeleccionados.includes(boton.value)
      ) {
        asientosSeleccionados.push(boton.value);
        boton.style.backgroundColor = "#62ae00";
      } else {
        boton.style.backgroundColor = "var(--color-principal)";
        asientosSeleccionados.splice(asientosSeleccionados.indexOf(boton.value), 1);
      }
    });
  });
}

cargarAsientos();
