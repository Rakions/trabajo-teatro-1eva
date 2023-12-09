async function getObras(){const e=await fetch("http://localhost:3000/obras",{method:"GET",redirect:"follow"}),n=await e.text();return JSON.parse(n)}async function cargarObras(){const e=await getObras(),n=document.querySelector(".mainPage_functionsList");n.innerHTML="",e.map(e=>{n.innerHTML+=`\n      <a href="seats.html">\n        <div class="function">\n          <img src="../assets/images/function_prueba.jpg" alt="" />\n          <div>\n              <h2>${e.nombre}</h2>\n              <p>${e.descripcion}</p>\n          </div>\n          <input type="hidden" id="id_obra" value="${e.id}"/>\n        </div>\n      </a>`}),document.querySelectorAll(".function").forEach(e=>{e.addEventListener("click",()=>{const n=e.querySelector("#id_obra").value;localStorage.removeItem("id"),localStorage.setItem("id",n)})})}cargarObras();let id="";async function getObraById(){const e="http://localhost:3000/obras/"+(id=localStorage.getItem("id")),n=await fetch(e,{method:"GET",redirect:"follow"});return await n.json()}async function getAsientoPorId(e){const n={id_obra:id=localStorage.getItem("id"),id_asiento:e};var t={method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(n),redirect:"follow"};const o=await fetch("http://localhost:3000/asientos",t);return await o.json()}var asientosSeleccionados=[];async function cargarAsientos(){const e=await getObraById(),n=e[0].asientos,t=document.querySelector(".seats_functionInfo");t.innerHTML="",t.innerHTML+=`\n    <div class="function">\n      <img src="../assets/images/function_prueba.jpg" alt="" />\n      <div>\n        <h2>${e[0].nombre}</h2>\n        <p>${e[0].descripcion}</p>\n      </div>\n      <input type="hidden" id="id_obra" value="${e[0].id}"/>\n    </div>`;const o=document.querySelector(".seats_all_seats_image");n.map(e=>{o.innerHTML+=`<button class="seat" id="${e.numero}" value='${e.precio}'></button>`});let a=0;const i=document.querySelector(".selected_seats_total > h2");o.querySelectorAll(".seat").forEach(e=>{const t=parseInt(e.id,10),o=n.find(e=>e.numero===t);o.ocupado?(e.style.backgroundColor="red",e.disabled=!0):e.addEventListener("click",()=>{const n=parseInt(e.id,10);asientosSeleccionados.includes(n)?(asientosSeleccionados.splice(asientosSeleccionados.indexOf(n),1),e.style.backgroundColor="var(--color-principal)",a-=o.precio):(asientosSeleccionados.push(n),e.style.backgroundColor="#62ae00",a+=o.precio),actualizarLista(),i.innerHTML="Total: "+a+"€"})})}function actualizarLista(){const e=document.querySelector(".selected_seats_list");e.innerHTML="",asientosSeleccionados.forEach(async n=>{const t=await getAsientoPorId(n);e.innerHTML+=`\n      <li class="selected_seats_item">\n        <div>Asiento: ${t.numero}</div>\n        <div>\n          <p>${t.precio+"€"}</p>\n          <button onclick="eliminarAsiento(${t.numero})">X</button>\n        </div>\n      </li>\n    `})}function eliminarAsiento(e){asientosSeleccionados=asientosSeleccionados.filter(n=>n!==e);const n=document.getElementById(e);n&&(n.style.backgroundColor="var(--color-principal)"),actualizarLista()}cargarAsientos();