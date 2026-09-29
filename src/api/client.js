// All backend calls live here. Set VITE_USE_MOCK=false and VITE_API_URL to go live. See API.md
const MOCK=import.meta.env.VITE_USE_MOCK!=='false';
const BASE=import.meta.env.VITE_API_URL||'/api';
const wait=(d,ms=250)=>new Promise(r=>setTimeout(()=>r(d),ms));
async function http(path,opts={}){const r=await fetch(BASE+path,{headers:{'Content-Type':'application/json'},...opts});if(!r.ok)throw new Error('Request failed: '+r.status);return r.json();}
const P=(id,name,price,length,texture,color,lace,tone)=>({id,name,price,length,texture,color,lace,tone,image:`/products/${id}.jpg`,desc:`${length}" ${texture.toLowerCase()} ${color.toLowerCase()} wig, 100% human hair, ${lace} lace, pre-plucked hairline.`});
const PRODUCTS=[P('1','Nova Straight',289,24,'Straight','Jet Black','HD Lace Front',['#2b2540','#7c5cff']),P('2','Halo Body Wave',329,26,'Wavy','Natural Brown','13x4 Lace Front',['#3a2a24','#c99a7a']),
P('3','Vesper Bob',199,12,'Straight','Honey Blonde','5x5 Closure',['#5a4630','#f0c987']),P('4','Aura Curls',349,20,'Curly','Espresso','HD Lace Front',['#241a1a','#8a5a44']),
P('5','Ember Layers',309,22,'Wavy','Copper','13x4 Lace Front',['#4a2214','#ff8a4c']),P('6','Ice Queen',379,28,'Straight','Platinum','HD Lace Front',['#2e3550','#dfe6ff']),
P('7','Cloud Coils',259,16,'Curly','Jet Black','5x5 Closure',['#18161f','#5b54a8']),P('8','Silk Pixie',169,8,'Straight','Burgundy','5x5 Closure',['#3a0f26','#c2416f'])];
const SERVICES=[{id:'classic',name:'Classic Install',price:90,minutes:90,desc:'Secure, natural lace melt and hairline blend.'},
{id:'custom',name:'Custom Cut & Style',price:140,minutes:150,desc:'Install plus a cut, layers and styling made for your face shape.'},
{id:'revamp',name:'Revamp',price:75,minutes:75,desc:'Wash, deep condition, re-band and restyle a wig you already own.'}];
const STYLISTS=[{id:'any',name:'Any available'},{id:'mia',name:'Mia'},{id:'zara',name:'Zara'},{id:'jo',name:'Jo'}];
export const getProducts=()=>MOCK?wait(PRODUCTS):http('/products');
export const getProduct=id=>MOCK?wait(PRODUCTS.find(p=>p.id===id)):http('/products/'+id);
export const getServices=()=>MOCK?wait(SERVICES):http('/services');
export const getStylists=()=>MOCK?wait(STYLISTS):http('/stylists');
export const getAvailability=({serviceId,stylistId,date})=>{
 if(!MOCK)return http(`/availability?serviceId=${serviceId}&stylistId=${stylistId}&date=${date}`);
 const seed=[...(date+stylistId)].reduce((a,c)=>a+c.charCodeAt(0),0);
 return wait(['09:00','10:30','12:00','13:30','15:00','16:30'].map((time,i)=>({time,available:(seed+i*7)%3!==0})));};
export const createBooking=b=>MOCK?wait({reference:'VEL-'+Math.random().toString(36).slice(2,8).toUpperCase(),...b},700):http('/bookings',{method:'POST',body:JSON.stringify(b)});
export const createOrder=o=>MOCK?wait({orderId:'ORD-'+Math.random().toString(36).slice(2,8).toUpperCase(),...o},700):http('/orders',{method:'POST',body:JSON.stringify(o)});
