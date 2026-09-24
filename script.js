0001 const locationsData = {
0002 "Amazonas": {
0003 "Puerto Ayacucho": ["Centro","Av. Orinoco","Av. 23 de Enero"]
0004 },
0005 "Anzoátegui": {
0006 "Lechería": ["Av. Principal","El Morro","Cerro El Morro"],
0007 "Puerto La Cruz": ["Paseo Colón","Centro","Av. Municipal"],
0008 "Barcelona": ["Centro","Nueva Barcelona"],
0009 "El Tigre": ["Centro","Av. España"]
0010 },
0011 "Apure": {
0012 "San Fernando de Apure": ["Centro","Paseo Libertador","Biruaca"]
0013 },
0014 "Aragua": {
0015 "Maracay": ["Las Delicias","El Castaño","Base Aragua","La Soledad","Centro","San Jacinto"],
0016 "Cagua": ["Centro","Corinsa"],
0017 "Turmero": ["Centro","Intercomunal"]
0018 },
0019 "Barinas": {
0020 "Barinas": ["Alto Barinas","Centro","Av. Cuatricentenaria"]
0021 },
0022 "Bolívar": {
0023 "Puerto Ordaz": ["Alta Vista","Unare","Chilemex"],
0024 "Ciudad Bolívar": ["Paseo Orinoco","Casco Histórico"]
0025 },
0026 "Carabobo": {
0027 "Valencia": ["Viñedo","Prebo","El Trigal","Naguanagua","Mañongo","Zona Industrial","Centro"],
0028 "Puerto Cabello": ["Casco Histórico","Quizandal","Patanemo"],
0029 "Guacara": ["Centro","Ciudad Alianza"]
0030 },
0031 "Cojedes": {
0032 "Tinaquillo": ["Centro","Av. Miranda","Zona Industrial","Buenos Aires","San Josecito"],
0033 "San Carlos": ["Centro Histórico","Av. Bolívar","San Rafael"]
0034 },
0035 "Delta Amacuro": {
0036 "Tucupita": ["Centro","Av. Manamo"]
0037 },
0038 "Distrito Capital": {
0039 "Caracas": ["Altamira","Las Mercedes","La Castellana","Chacao","Sabana Grande","El Recreo","Plaza Venezuela","Capitolio"]
0040 },
0041 "Falcón": {
0042 "Punto Fijo": ["Centro","Zona Libre","Judibana"],
0043 "Coro": ["Casco Colonial","Av. Independencia"],
0044 "Chichiriviche": ["Centro","Playa Sur","Zona de Embarcaderos"]
0045 },
0046 "Guárico": {
0047 "San Juan de los Morros": ["Centro","Aguas Termales"],
0048 "Calabozo": ["Centro Histórico"]
0049 },
0050 "Lara": {
0051 "Barquisimeto": ["Este / Nueva Segovia","Centro","Cabudare"],
0052 "Carora": ["Centro Histórico"]
0053 },
0054 "Mérida": {
0055 "Mérida": ["Centro","Av. Las Américas","La Hechicera","Chorros de Milla"]
0056 },
0057 "Miranda": {
0058 "Los Teques": ["Centro","San Antonio de los Altos","Carrizal"],
0059 "Guarenas / Guatire": ["Nueva Casarapa","Castillejo"],
0060 "Higuerote": ["Centro","Puerto Francés","Carenero"]
0061 },
0062 "Monagas": {
0063 "Maturín": ["Tipuro","Juanico","Centro"]
0064 },
0065 "Nueva Esparta": {
0066 "Porlamar / Pampatar": ["Pampatar","Costa Azul","Av. 4 de Mayo","Playa el Agua"]
0067 },
0068 "Portuguesa": {
0069 "Acarigua / Araure": ["Centro Acarigua","Centro Araure","Llano Mall"],
0070 "Guanare": ["Centro"]
0071 },
0072 "Sucre": {
0073 "Cumaná": ["Centro","San Luis"],
0074 "Carúpano": ["Centro"]
0075 },
0076 "Táchira": {
0077 "San Cristóbal": ["Barrio Obrero","Pueblo Nuevo","Centro"],
0078 "San Antonio del Táchira": ["Centro"]
0079 },
0080 "Trujillo": {
0081 "Valera": ["Centro","Las Acacias","La Puerta"],
0082 "Trujillo": ["Casco Central"]
0083 },
0084 "La Guaira": {
0085 "Catia La Mar / Maiquetía": ["Zona Aeropuerto","Caraballeda","Catia La Mar"]
0086 },
0087 "Yaracuy": {
0088 "San Felipe": ["Centro","Av. Yaracuy","Independencia"],
0089 "Yaritagua": ["Centro"]
0090 },
0091 "Zulia": {
0092 "Maracaibo": ["Bella Vista","5 de Julio","El Milagro","Santa Lucía"],
0093 "Cabimas": ["Centro"]
0094 }
0095 };
0096
0097
0098 /* ============================================================
0099 FINDBED CARMESÍ — SCRIPT UNIFICADO
0100 ============================================================
0101 IMPORTANTE:
0102 1. Se conserva locationsData: Estados Ciudades Zonas.
0103 2. Esta lógica se une con la versión rápida de reservas.
0104 3. NO colocar aquí contraseñas, tokens de Telegram ni HF_TOKEN.
0105 4. API debe apuntar al Cloudflare Worker.
0106 ============================================================ */
0107
0108 const API = "https://TU-WORKER.workers.dev";
0109
0110 let hotels = [];
0111 let selected = null;
0112 let selectedRoom = null;
0113 let reservation = null;
0114 let category = "Hotel";
0115 let timerId = null;
0116
0117 const $ = id => document.getElementById(id);
0118
0119 function show(id){
0120 document.querySelectorAll(".screen").forEach(x => x.classList.remove("active"));
0121 const target = $(id);
0122 if(target) target.classList.add("active");
0123 window.scrollTo(0,0);
0124 }
0125
0126 function money(n){
0127 return "$" + Number(n || 0).toFixed(2);
0128 }
0129
0130 function esc(s){
0131 return String(s ?? "").replace(/[&<>"']/g, m => ({
0132 "&":"&amp;","<":"&lt;",">":"&gt;",
0133 '"':"&quot;","'":"&#039;"
0134 }[m]));
0135 }
0136
0137 /* ---------- ESTADOS / CIUDADES / ZONAS ---------- */
0138
0139 function fillLocationSelectors(){
0140 const estado = $("estado");
0141 const ciudad = $("ciudad");
0142 const zona = $("zona");
0143 if(!estado || !ciudad || !zona) return;
0144
0145 estado.innerHTML =
0146 '<option value="">Todos los estados</option>' +
0147 Object.keys(locationsData)
0148 .map(x => `<option value="${esc(x)}">${esc(x)}</option>`)
0149 .join("");
0150
0151 ciudad.innerHTML = '<option value="">Todas las ciudades</option>';
0152 zona.innerHTML = '<option value="">Todas las zonas</option>';
0153
0154 estado.onchange = () => {
0155 const cities = Object.keys(locationsData[estado.value] || {});
0156 ciudad.innerHTML =
0157 '<option value="">Todas las ciudades</option>' +
0158 cities.map(x => `<option value="${esc(x)}">${esc(x)}</option>`).join("");
0159 zona.innerHTML = '<option value="">Todas las zonas</option>';
0160 renderHotels();
0161 };
0162
0163 ciudad.onchange = () => {
0164 const zones = (locationsData[estado.value] || {})[ciudad.value] || [];
0165 zona.innerHTML =
0166 '<option value="">Todas las zonas</option>' +
0167 zones.map(x => `<option value="${esc(x)}">${esc(x)}</option>`).join("");
0168 renderHotels();
0169 };
0170
0171 zona.onchange = renderHotels;
0172 }
0173
0174 /* ---------- HOTELES ---------- */
0175
0176 async function loadHotels(){
0177 try{
0178 const r = await fetch(API + "/api/hotels");
0179 if(!r.ok) throw new Error("API");
0180 hotels = await r.json();
0181 }catch(e){
0182 hotels = [{
0183 id:"demo",
0184 name:"Hotel Carmesí Royal",
0185 category:"Hotel",
0186 state:"Carabobo",
0187 city:"Valencia",
  0188 zone:"Viñedo",
0189 normalPrice:80,
0190 findbedPrice:70,
0191 deposit:10,
0192 rooms:4,
0193 photo:"hotel1_piscina.jpg",
0194 description:"Hotel de prueba FindBed Carmesí.",
0195 gallery:[
0196 "hotel1_piscina.jpg",
0197 "hotel1_habitacion.jpg",
0198 "hotel1_bano.jpg",
0199 "hotel1_restaurante.jpg"
0200 ],
0201 roomName:"Matrimonial",
0202 capacity:2
0203 }];
0204 }
0205 renderHotels();
0206 }
0207
0208 function renderHotels(){
0209 const box = $("hotels");
0210 if(!box) return;
0211
0212 const s = $("estado")?.value || "";
0213 const c = $("ciudad")?.value || "";
0214 const z = $("zona")?.value || "";
0215
0216 const arr = hotels.filter(h =>
0217 (h.category || "Hotel") === category &&
0218 (!s || h.state === s) &&
0219 (!c || h.city === c) &&
0220 (!z || h.zone === z)
0221 );
0222
0223 box.innerHTML = arr.map(h => `
0224 <article class="card">
0225 <img src="${esc(h.photo || "")}" alt="${esc(h.name || "")}">
0226 <div class="inside">
0227 <span class="badge">${esc(h.category || "Hotel")}</span>
0228 <h3>${esc(h.name)}</h3>
0229 <p>■ ${esc(h.city)}, ${esc(h.zone)}</p>
0230 <p><span class="price">${money(h.findbedPrice)}</span> FindBed</p>
0231 <p>■ ${h.rooms || 0} habitaciones</p>
0232 <button class="primary" onclick="openHotel('${esc(h.id)}')">
0233 Reservar ahora
0234 </button>
0235 </div>
0236 </article>
0237 `).join("") ||
0238 "<div class='panel'>No hay alojamientos con esos filtros.</div>";
0239 }
0240
0241 function openHotel(id){
0242 selected = hotels.find(h => String(h.id) === String(id));
0243 if(!selected) return;
0244
0245 if($("hotelImg")) $("hotelImg").src = selected.photo || "";
0246 if($("hotelCat")) $("hotelCat").textContent = selected.category || "Hotel";
0247 if($("hotelName")) $("hotelName").textContent = selected.name || "";
0248 if($("hotelLocation"))
0249 $("hotelLocation").textContent =
0250 `■ ${selected.state}, ${selected.city}, ${selected.zone}`;
0251 if($("hotelDesc")) $("hotelDesc").textContent = selected.description || "";
0252
0253 if($("hotelGallery")){
0254 $("hotelGallery").innerHTML = (selected.gallery || []).map(x =>
0255 `<img src="${esc(x)}" alt="Galería">`
0256 ).join("");
0257 }
0258
0259 if($("rooms")){
0260 $("rooms").innerHTML = `
0261 <h3>Habitaciones</h3>
0262 <div class="room">
0263 <div>
0264 <b>${esc(selected.roomName || "Matrimonial")}</b><br>
0265 ■ ${selected.capacity || 2} personas ·
0266 Disponibles: ${selected.rooms || 0}
0267 </div>
0268 <button class="ghost" onclick="chooseRoom()">Elegir</button>
0269 </div>
0270 `;
0271 }
0272
0273 show("detail");
0274 }
0275
0276 function chooseRoom(){
0277 selectedRoom = {
0278 name: selected?.roomName || "Matrimonial",
0279 capacity: selected?.capacity || 2
0280 };
0281
0282 if($("bookingSummary")){
0283 $("bookingSummary").innerHTML =
0284 `<b>${esc(selected.name)}</b><br>` +
0285 `${esc(selectedRoom.name)} · ${selectedRoom.capacity} personas`;
0286 }
0287
0288 setDates();
0289 updateTotal();
0290 show("booking");
0291 }
0292
0293 /* ---------- FECHAS / CÁLCULO ---------- */
0294
0295 function setDates(){
0296 const a = $("checkin");
0297 const b = $("checkout");
0298 if(!a || !b) return;
0299
0300 const d = new Date();
0301 a.value = d.toISOString().slice(0,10);
0302 d.setDate(d.getDate() + 1);
0303 b.value = d.toISOString().slice(0,10);
0304 }
0305
0306 function nights(){
0307 const a = new Date($("checkin")?.value);
0308 const b = new Date($("checkout")?.value);
0309 if(Number.isNaN(a.getTime()) || Number.isNaN(b.getTime())) return 1;
0310 return Math.max(1, Math.ceil((b-a)/86400000));
0311 }
0312
0313 function updateTotal(){
0314 if($("total"))
0315 $("total").textContent = money((selected?.findbedPrice || 0) * nights());
0316 }
0317
0318 /* ---------- RESERVA ---------- */
0319
0320 async function reserve(){
0321 if(!selected) return;
0322
0323 const body = {
0324 hotelId: selected.id,
0325 checkin: $("checkin")?.value,
0326 checkout: $("checkout")?.value,
0327 guests: Number($("guests")?.value || 1),
0328 room: selectedRoom?.name || "Matrimonial"
0329 };
0330
0331 try{
0332 const r = await fetch(API + "/api/reservations", {
0333 method:"POST",
0334 headers:{"content-type":"application/json"},
0335 body:JSON.stringify(body)
0336 });
0337
0338 if(!r.ok) throw new Error("No se pudo crear la reserva");
0339 reservation = await r.json();
0340
0341 startTimer();
0342 if($("payInfo"))
0343 $("payInfo").textContent =
0344 `${selected.name} · ${selectedRoom?.name || "Habitación"} · ${money(selected.findbedPrice)}`;
0345
0346 show("payment");
0347 }catch(e){
0348 alert("No se pudo iniciar la reserva. Revisa la conexión.");
0349 }
0350 }
0351
0352 /* ---------- TEMPORIZADOR 15 MINUTOS ---------- */
0353
0354 function startTimer(){
0355 clearInterval(timerId);
0356 let left = 900;
0357
0358 const tick = () => {
0359 const el = $("timer");
0360 if(el){
0361 const m = String(Math.floor(left/60)).padStart(2,"0");
0362 const s = String(left%60).padStart(2,"0");
0363 el.textContent = `${m}:${s}`;
0364 }
0365
0366 if(left <= 0){
0367 clearInterval(timerId);
0368 if($("payStatus"))
0369 $("payStatus").textContent = "El tiempo de reserva terminó.";
0370 return;
0371 }
0372 left--;
0373 };
   0374
0375 tick();
0376 timerId = setInterval(tick,1000);
0377 }
0378
0379 /* ---------- COMPROBANTE / IA ---------- */
0380 /*
0381 La IA solo revisa legibilidad y coherencia del comprobante.
0382 NO se debe afirmar que una imagen demuestra que el dinero llegó
0383 al banco. Para verificación real hace falta una fuente bancaria/API.
0384 */
0385
0386 async function pay(){
0387 if(!reservation) return;
0388
0389 const file = $("proof")?.files?.[0];
0390 if(!file){
0391 if($("payStatus")) $("payStatus").textContent =
0392 "Sube el comprobante para revisarlo.";
0393 return;
0394 }
0395
0396 if($("payBtn")) $("payBtn").disabled = true;
0397 if($("payStatus")) $("payStatus").textContent =
0398 "Comprobando rápidamente…";
0399
0400 try{
0401 const form = new FormData();
0402 form.append("proof", file);
0403
0404 const r = await fetch(
0405 API + "/api/reservations/" + reservation.id + "/quick-check",
0406 {method:"POST",body:form}
0407 );
0408
0409 const result = await r.json();
0410
0411 if(result.decision !== "APROBADO"){
0412 if($("payStatus")) $("payStatus").textContent =
0413 result.reason || "No se pudo comprobar el comprobante.";
0414 return;
0415 }
0416
0417 const confirmBody = {
0418 name:$("name")?.value || "Cliente",
0419 cedula:$("cedula")?.value || "",
0420 phone:$("phone")?.value || "",
0421 reference:$("reference")?.value || ""
0422 };
0423
0424 const c = await fetch(
0425 API + "/api/reservations/" + reservation.id + "/confirm",
0426 {
0427 method:"POST",
0428 headers:{"content-type":"application/json"},
0429 body:JSON.stringify(confirmBody)
0430 }
0431 );
0432
0433 const data = await c.json();
0434
0435 if(!c.ok || !data.code) throw new Error("confirm");
0436
0437 if($("code")) $("code").textContent = data.code;
0438 if($("receipt"))
0439 $("receipt").innerHTML =
0440 `<p><b>${esc(selected.name)}</b></p>` +
0441 `<p>■ ${esc(selected.city)}, ${esc(selected.zone)}</p>` +
0442 `<p>Referencia: ${esc(confirmBody.reference || "N/D")}</p>`;
0443
0444 clearInterval(timerId);
0445 show("confirmed");
0446
0447 }catch(e){
0448 if($("payStatus"))
0449 $("payStatus").textContent =
0450 "No se pudo completar la comprobación. Inténtalo nuevamente.";
0451 }finally{
0452 if($("payBtn")) $("payBtn").disabled = false;
0453 }
0454 }
0455
0456 /* ---------- CATEGORÍAS ---------- */
0457
0458 function setupCategories(){
0459 document.querySelectorAll(".chip").forEach(b => {
0460 b.onclick = () => {
0461 document.querySelectorAll(".chip")
0462 .forEach(x => x.classList.remove("active"));
0463 b.classList.add("active");
0464 category = b.dataset.cat || "Hotel";
0465 renderHotels();
0466 };          
  0467 });
0468 }
0469
0470 /* ---------- ADMIN ---------- */
0471
0472 async function adminLogin(){
0473 try{
0474 const r = await fetch(API + "/api/admin/login",{
0475 method:"POST",
0476 headers:{"content-type":"application/json"},
0477 body:JSON.stringify({
0478 password:$("adminPass")?.value || ""
0479 })
0480 });
0481
0482 if(!r.ok) throw new Error("login");
0483
0484 const j = await r.json();
0485 localStorage.setItem("fb_session",j.session);
0486 await renderAdmin();
0487 show("admin");
0488 }catch(e){
0489 if($("loginStatus"))
0490 $("loginStatus").textContent =
0491 "Contraseña incorrecta o backend no configurado.";
0492 }
0493 }
0494
0495 async function renderAdmin(){
0496 const token = localStorage.getItem("fb_session");
0497 if(!token) return;
0498
0499 const r = await fetch(API + "/api/admin/hotels",{
0500 headers:{authorization:"Bearer " + token}
0501 });
0502
0503 if(!r.ok) return;
0504
0505 const a = await r.json();
0506
0507 if($("adminHotels")){
0508 $("adminHotels").innerHTML = a.map(h => `
0509 <div class="room">
0510 <b>${esc(h.name)}</b>
0511 <span>${esc(h.city || "")} · ${money(h.findbed_price)}</span>
0512 </div>
0513 `).join("");
0514 }
0515 }
0516
0517 async function addHotel(){
0518 const token = localStorage.getItem("fb_session");
0519 if(!token) return;
0520
0521 const body = {
0522 name:$("aName")?.value,
0523 category:$("aCat")?.value,
0524 state:$("aState")?.value,
0525 city:$("aCity")?.value,
0526 zone:$("aZone")?.value,
0527 normalPrice:+($("aNormal")?.value || 0),
0528 findbedPrice:+($("aFindbed")?.value || 0),
0529 deposit:+($("aDeposit")?.value || 0),
0530 rooms:+($("aRooms")?.value || 0),
0531 photo:$("aPhoto")?.value || ""
0532 };
0533
0534 const r = await fetch(API + "/api/admin/hotels",{
0535 method:"POST",
0536 headers:{
0537 "content-type":"application/json",
0538 authorization:"Bearer " + token
0539 },
0540 body:JSON.stringify(body)
0541 });
0542
0543 if(r.ok){
0544 alert("Hotel guardado");
0545 await renderAdmin();
0546 }
0547 }
0548
0549 /* ---------- ARRANQUE ---------- */
0550
0551 document.addEventListener("DOMContentLoaded",() => {
0552 fillLocationSelectors();
0553 setupCategories();
0554 loadHotels();
0555
0556 $("reserveBtn")?.addEventListener("click",reserve);
0557 $("checkin")?.addEventListener("change",updateTotal);
0558 $("checkout")?.addEventListener("change",updateTotal);
0559 $("payBtn")?.addEventListener("click",pay);
  0560
0561 document.querySelectorAll(".back").forEach(b =>
0562 b.addEventListener("click",() => show(b.dataset.back))
0563 );
0564
0565 $("adminBtn")?.addEventListener("click",() => show("adminLogin"));
0566 $("loginBtn")?.addEventListener("click",adminLogin);
0567 $("addHotelBtn")?.addEventListener("click",addHotel);
0568
0569 $("logoutBtn")?.addEventListener("click",() => {
0570 localStorage.removeItem("fb_session");
0571 show("welcome");
0572 });
0573
0574 $("newBtn")?.addEventListener("click",() => show("search"));
0575 });
