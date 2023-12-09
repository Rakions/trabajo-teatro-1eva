async function getObras() {
  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  const response = await fetch("http://localhost:3000/obras", requestOptions);
  const result = await response.text();
  return JSON.parse(result);
}

async function getObrasCategoria(categoria) {
  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  const response = await fetch(
    "http://localhost:3000/obras/categoria/" + categoria,
    requestOptions
  );
  const result = await response.text();
  cargarObrasFiltro(JSON.parse(result));
}

async function cargarObrasFiltro(obras) {
  const listaObras = document.querySelector(".mainPage_functionsList");
  console.log(obras);
  listaObras.innerHTML = "";
  obras.map((obra) => {
    listaObras.innerHTML += `
      <a href="seats.html">
        <div class="function">
          <img src="../assets/images/function_prueba.jpg" alt="" />
          <div>
              <h2>${obra.nombre}</h2>
              <p>${obra.descripcion}</p>
          </div>
          <input type="hidden" id="id_obra" value="${obra.id}"/>
        </div>
      </a>`;
  });
}

async function cargarObras(categoria) {
  const obras = await getObras();
  const listaObras = document.querySelector(".mainPage_functionsList");

  listaObras.innerHTML = "";
  obras.map((obra) => {
    listaObras.innerHTML += `
      <a href="seats.html">
        <div class="function">
          <img src="${obra.image}" alt="" />
          <div>
              <h2>${obra.nombre}</h2>
              <p>${obra.descripcion}</p>
          </div>
          <input type="hidden" id="id_obra" value="${obra.id}"/>
        </div>
      </a>`;
  });

  const obrasHTML = document.querySelectorAll(".function");
  obrasHTML.forEach((obra) => {
    obra.addEventListener("click", () => {
      const id_obra = obra.querySelector("#id_obra").value;
      localStorage.removeItem("id");
      localStorage.setItem("id", id_obra);
    });
  });
}

cargarObras();

localStorage.clear();
