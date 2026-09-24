backend/worker.js
const ORIGIN="https://nikolveloz922-hash.github.io";
const MODEL="Qwen/Qwen2.5-VL-7B-Instruct";
const json=(x,s=200)=>new Response(JSON.stringify(x),{status:s,headers:{"content-type":"application/json","access-control-allow-origin":ORIGIN,"access-control-allow-function cors(r){return r}
async function sign(text,secret){let k=await crypto.subtle.importKey("raw",new TextEncoder().encode(secret),{name:"HMAC",hash:"SHA-256"},false,["sign"]);let b=await async function session(password,env){if(password!==env.ADMIN_PASSWORD)return null;let exp=Date.now()+86400000, p=`${exp}`;return p+"."+await sign(p,env.SESSION_SECREasync function valid(req,env){let h=req.headers.get("authorization")||"",t=h.replace("Bearer ",""),[p,s]=t.split(".");return p&&s&&Number(p)>Date.now()&&s===await sifunction code(){return "CB-"+crypto.randomUUID().replaceAll("-","").slice(0,10).toUpperCase()}
export default {async fetch(req,env){
 if(req.method==="OPTIONS")return new Response("",{headers:{"access-control-allow-origin":ORIGIN,"access-control-allow-headers":"content-type,authorization","access- let u=new URL(req.url);
 try{
 if(u.pathname==="/api/hotels"&&req.method==="GET"){let r=await env.DB.prepare("SELECT * FROM hotels WHERE active=1 ORDER BY name").all();return json(r.results.map( if(u.pathname==="/api/reservations"&&req.method==="POST"){let b=await req.json();let h=await env.DB.prepare("SELECT * FROM hotels WHERE id=? AND active=1").bind(b. if(u.pathname.startsWith("/api/reservations/")&&u.pathname.endsWith("/quick-check")&&req.method==="POST"){
 let id=u.pathname.split("/")[3],f=await req.formData(),ref=String(f.get("reference")||"").trim(),file=f.get("proof");
 if(!ref||!file)return json({decision:"RECHAZADO",reason:"Faltan datos"},400);
 // Revisión rápida del comprobante. No tiene acceso al banco: no se presenta como prueba bancaria.
 let ai="REVISAR",reason="Sin análisis"; 
 if(env.HF_TOKEN){
 let bytes=new Uint8Array(await file.arrayBuffer());let b64=btoa(String.fromCharCode(...bytes));
 let r=await fetch("https://router.huggingface.co/v1/chat/completions",{method:"POST",headers:{Authorization:`Bearer ${env.HF_TOKEN}`,"content-type":"application/ if(r.ok){let j=await r.json();let t=j.choices?.[0]?.message?.content||"";let m=t.match(/\{[\s\S]*\}/);if(m){try{let x=JSON.parse(m[0]);ai=x.decision;reason=x.rea }
 if(ai!=="APROBADO")return json({decision:"RECHAZADO",reason:reason||"No se pudo comprobar rápidamente."});
 await env.DB.prepare("UPDATE reservations SET status='proof_received',payment_reference=? WHERE id=?").bind(ref,id).run();
 return json({decision:"APROBADO",reason:"Comprobante legible y coherente."})
 }
 if(u.pathname.startsWith("/api/reservations/")&&u.pathname.endsWith("/confirm")&&req.method==="POST"){let id=u.pathname.split("/")[3],b=await req.json();let c=b.co if(u.pathname==="/api/admin/login"&&req.method==="POST"){let b=await req.json(),s=await session(b.password,env);return s?json({session:s}):json({error:"unauthorize if(u.pathname==="/api/admin/hotels"&&await valid(req,env)){if(req.method==="GET"){let r=await env.DB.prepare("SELECT * FROM hotels ORDER BY name").all();return jso return json({error:"not_found"},404)
 }catch(e){return json({error:"server_error",detail:String(e)},500)}
}};
