import {useEffect,useState} from 'react';import {useSearchParams,Link} from 'react-router-dom';
import {getServices,getStylists,getAvailability,getProducts,createBooking} from '../api/client';
const steps=['Service','Stylist','Time','Details'];
export default function Book(){
 const [q]=useSearchParams();const [step,setStep]=useState(0);
 const [services,setServices]=useState([]);const [stylists,setStylists]=useState([]);const [wigs,setWigs]=useState([]);const [slots,setSlots]=useState([]);
 const [f,setF]=useState({serviceId:q.get('service')||'',stylistId:'',date:'',time:'',wigId:q.get('wig')||'own',name:'',email:'',phone:''});
 const [done,setDone]=useState(null);const [busy,setBusy]=useState(false);const set=(k,v)=>setF(o=>({...o,[k]:v}));
 useEffect(()=>{getServices().then(setServices);getStylists().then(setStylists);getProducts().then(setWigs);},[]);
 useEffect(()=>{if(f.date&&f.serviceId&&f.stylistId){setSlots([]);getAvailability(f).then(setSlots);}},[f.date,f.stylistId,f.serviceId]);
 const submit=async()=>{setBusy(true);const r=await createBooking({serviceId:f.serviceId,stylistId:f.stylistId,date:f.date,time:f.time,customer:{name:f.name,email:f.email,phone:f.phone},wigId:f.wigId==='own'?null:f.wigId});setBusy(false);setDone(r);};
 if(done)return <section className="sec page"><h1>You are booked.</h1><p>Your reference is <b>{done.reference}</b>. We sent details to {f.email}.</p><Link className="btn" to="/">Back home</Link></section>;
 const ok=[f.serviceId,f.stylistId,f.date&&f.time,f.name&&f.email&&f.phone][step];
 return <section className="sec page narrow"><h1>Book installation</h1><div className="steps">{steps.map((s,i)=><span key={s} className={i<=step?'on':''}>{s}</span>)}</div>
 {step===0&&<div className="opts">{services.map(x=><button key={x.id} className={'opt'+(f.serviceId===x.id?' sel':'')} onClick={()=>set('serviceId',x.id)}><b>{x.name}</b><span>${x.price} / {x.minutes} min</span></button>)}</div>}
 {step===1&&<div className="opts">{stylists.map(x=><button key={x.id} className={'opt'+(f.stylistId===x.id?' sel':'')} onClick={()=>set('stylistId',x.id)}><b>{x.name}</b></button>)}</div>}
 {step===2&&<><input type="date" min={new Date().toISOString().slice(0,10)} value={f.date} onChange={e=>{set('date',e.target.value);set('time','');}}/>
  <div className="slots">{slots.map(s=><button key={s.time} disabled={!s.available} className={'opt'+(f.time===s.time?' sel':'')} onClick={()=>set('time',s.time)}>{s.time}</button>)}</div>{f.date&&!slots.length&&<p className="muted">Loading times...</p>}</>}
 {step===3&&<div className="form"><input placeholder="Full name" value={f.name} onChange={e=>set('name',e.target.value)}/><input type="email" placeholder="Email" value={f.email} onChange={e=>set('email',e.target.value)}/><input placeholder="Phone" value={f.phone} onChange={e=>set('phone',e.target.value)}/>
  <select value={f.wigId} onChange={e=>set('wigId',e.target.value)}><option value="own">I am bringing my own wig</option>{wigs.map(w=><option key={w.id} value={w.id}>{w.name} (${w.price})</option>)}</select></div>}
 <div className="cta">{step>0&&<button className="btn ghost" onClick={()=>setStep(step-1)}>Back</button>}
 {step<3?<button className="btn" disabled={!ok} onClick={()=>setStep(step+1)}>Continue</button>:<button className="btn" disabled={!ok||busy} onClick={submit}>{busy?'Booking...':'Confirm booking'}</button>}</div></section>;}
