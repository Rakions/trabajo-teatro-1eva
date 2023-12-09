const listaObra = document.querySelector(".mainPage_functionsList");

function getObras() {
  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  fetch("http://localhost:3000/obras", requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.log("error", error));
}
getObras();
