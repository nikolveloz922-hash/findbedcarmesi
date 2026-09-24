
/* FINDBED CARMESÍ — SCRIPT PRINCIPAL
 La búsqueda se ejecuta ÚNICAMENTE al pulsar Buscar Disponibilidad.
 Estados Ciudades Zonas se mantienen en locationsData.
*/
const API_URL="https://TU-WORKER.workers.dev";
const locationsData={
"Amazonas":{"Puerto Ayacucho":["Centro","Av. Orinoco","Av. 23 de Enero"]},
"Anzoátegui":{"Lechería":["Av. Principal","El Morro","Cerro El Morro"],"Puerto La Cruz":["Paseo Colón","Centro","Av. Municipal"],"Barcelona":["Centro","Nu"Apure":{"San Fernando de Apure":["Centro","Paseo Libertador","Biruaca"]},
"Aragua":{"Maracay":["Las Delicias","El Castaño","Base Aragua","La Soledad","Centro","San Jacinto"],"Cagua":["Centro","Corinsa"],"Turmero":["Centro","Inte"Barinas":{"Barinas":["Alto Barinas","Centro","Av. Cuatricentenaria"]},
"Bolívar":{"Puerto Ordaz":["Alta Vista","Unare","Chilemex"],"Ciudad Bolívar":["Paseo Orinoco","Casco Histórico"]},
"Carabobo":{"Valencia":["Viñedo","Prebo","El Trigal","Naguanagua","Mañongo","Zona Industrial","Centro"],"Puerto Cabello":["Casco Histórico","Quizandal","P"Cojedes":{"Tinaquillo":["Centro","Av. Miranda","Zona Industrial","Buenos Aires","San Josecito"],"San Carlos":["Centro Histórico","Av. Bolívar","San Rafae"Delta Amacuro":{"Tucupita":["Centro","Av. Manamo"]},
"Distrito Capital":{"Caracas":["Altamira","Las Mercedes","La Castellana","Chacao","Sabana Grande","El Recreo","Plaza Venezuela","Capitolio"]},
"Falcón":{"Punto Fijo":["Centro","Zona Libre","Judibana"],"Coro":["Casco Colonial","Av. Independencia"],"Chichiriviche":["Centro","Playa Sur","Zona de Emb"Guárico":{"San Juan de los Morros":["Centro","Aguas Termales"],"Calabozo":["Centro Histórico"]},
"Lara":{"Barquisimeto":["Este / Nueva Segovia","Centro","Cabudare"],"Carora":["Centro Histórico"]},
"Mérida":{"Mérida":["Centro","Av. Las Américas","La Hechicera","Chorros de Milla"]},
"Miranda":{"Los Teques":["Centro","San Antonio de los Altos","Carrizal"],"Guarenas / Guatire":["Nueva Casarapa","Castillejo"],"Higuerote":["Centro","Puert"Monagas":{"Maturín":["Tipuro","Juanico","Centro"]},
"Nueva Esparta":{"Porlamar / Pampatar":["Pampatar","Costa Azul","Av. 4 de Mayo","Playa el Agua"]},
"Portuguesa":{"Acarigua / Araure":["Centro Acarigua","Centro Araure","Llano Mall"],"Guanare":["Centro"]},
"Sucre":{"Cumaná":["Centro","San Luis"],"Carúpano":["Centro"]},
"Táchira":{"San Cristóbal":["Barrio Obrero","Pueblo Nuevo","Centro"],"San Antonio del Táchira":["Centro"]},
"Trujillo":{"Valera":["Centro","Las Acacias","La Puerta"],"Trujillo":["Casco Central"]},
"La Guaira":{"Catia La Mar / Maiquetía":["Zona Aeropuerto","Caraballeda","Catia La Mar"]},
"Yaracuy":{"San Felipe":["Centro","Av. Yaracuy","Independencia"],"Yaritagua":["Centro"]},
"Zulia":{"Maracaibo":["Bella Vista","5 de Julio","El Milagro","Santa Lucía"],"Cabimas":["Centro"]}
};
const DEMO_HOTELS=[
{id:"royal",name:"Hotel Carmesí Royal",category:"Hotel",level:"Alta Gama",state:"Carabobo",city:"Valencia",zone:"Viñedo",normal:80,price:70,deposit:10,roo{id:"posada",name:"Posada Express Carmesí",category:"Hotel",level:"Económica",state:"Cojedes",city:"Tinaquillo",zone:"Centro",normal:25,price:25,deposit:4];
let hotels=[],category="Hotel",level="",selectedHotel=null,selectedRoom=null,timerId=null,reservation=null;
const $=id=>document.getElementById(id), $$=s=>[...document.querySelectorAll(s)];
function esc(s){return String(s??"").replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#39;"}[m]))}
function money(n){return "USD $"+Number(n||0).toFixed(2)}
function show(id){$$('.step').forEach(x=>x.classList.remove('active'));$(id).classList.add('active');scrollTo(0,0)}
function msg(text,type=""){const e=$("search-message");e.textContent=text;e.className="notice "+type}
function fillLocations(){const e=$("estado");Object.keys(locationsData).sort((a,b)=>a.localeCompare(b,"es")).forEach(s=>e.insertAdjacentHTML("beforeend",`async function loadHotels(){try{const r=await fetch(API_URL+"/api/hotels");if(!r.ok)throw 0;const d=await r.json();hotels=d.hotels||DEMO_HOTELS;hotels=hotfunction setupPills(){[...$$('#cat-buttons .pill')].forEach(b=>b.onclick=()=>{$$('#cat-buttons .pill').forEach(x=>x.classList.remove('selected'));b.classLfunction renderHotels(){const s=$("estado").value,c=$("ciudad").value,z=$("zona").value;const arr=hotels.filter(h=>h.category===category&&(!level||h.levelfunction openHotel(id){selectedHotel=hotels.find(h=>String(h.id)===String(id));if(!selectedHotel)return;const gallery=selectedHotel.gallery?.length?selectfunction prepareRoom(){const opts=[{name:"Matrimonial",cap:2},{name:"Sencilla",cap:1},{name:"Suite VIP",cap:4}];$("room-list").innerHTML=opts.map((r,i)=>`function nightCount(){const a=new Date($("checkin").value+"T00:00:00"),b=new Date($("checkout").value+"T00:00:00");const n=Math.ceil((b-a)/86400000);returfunction updateSummary(){if(!selectedHotel)return;const n=nightCount(),total=n*selectedHotel.price;$("room-summary").innerHTML=`<strong>${n||0} noche${n==async function createReservation(){const n=nightCount();if(!selectedHotel||!n)throw Error("Revisa las fechas.");const body={hotelId:selectedHotel.id,checkasync function beginPayment(){try{selectedRoom=document.querySelector('input[name="room"]:checked')?.value;if(!selectedRoom)throw Error("Selecciona una hafunction startTimer(){clearInterval(timerId);let left=900;const tick=()=>{$("timer").textContent=`${String(Math.floor(left/60)).padStart(2,"0")}:${String(function fileData(file){return new Promise((res,rej)=>{const r=new FileReader();r.onload=()=>res(r.result);r.onerror=rej;r.readAsDataURL(file)})}
async function submitPayment(e){e.preventDefault();const status=$("pay-status"),file=$("pay-file").files[0];status.textContent="Comprobando rápidamente…";async function adminLogin(){try{const r=await fetch(API_URL+"/api/admin/login",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringfunction adminHeaders(){return {"Content-Type":"application/json","Authorization":"Bearer "+sessionStorage.getItem("findbed_admin")}}
function renderAdmin(){$("admin-hotels").innerHTML=hotels.map(h=>`<div class="summary-row"><span>${esc(h.name)} — ${esc(h.city)}</span><button data-del="$async function saveHotel(e){e.preventDefault();try{const body={name:$("h-name").value,category:$("h-cat").value,level:$("h-level").value,state:$("h-state"async function delHotel(id){if(!confirm("¿Eliminar este alojamiento?"))return;try{const r=await fetch(API_URL+"/api/admin/hotels/"+encodeURIComponent(id),document.addEventListener("click",e=>{const d=e.target.closest("[data-del]");if(d)delHotel(d.dataset.del)});
document.addEventListener("DOMContentLoaded",async()=>{fillLocations();setupPills();await loadHotels();$("checkin").onchange=updateSummary;$("checkout").o
