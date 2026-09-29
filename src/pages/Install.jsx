import {useEffect,useState} from 'react';import {Link} from 'react-router-dom';import {getServices} from '../api/client';import {reveal} from './parts';
const faq=[['How long does an install take?','Between 75 and 150 minutes depending on the service.'],['Can I bring my own wig?','Yes. Choose "bringing my own" when you book.'],['How long does an install last?','Usually 4 to 6 weeks with normal care.']];
export default function Install(){
 const [s,setS]=useState([]);const [v,setV]=useState(50);useEffect(()=>{getServices().then(d=>{setS(d);setTimeout(reveal,80);});},[]);
 return <section className="sec page"><h1>Installation</h1><p className="muted">Pick a service, then book a time that suits you.</p>
 <div className="grid three">{s.map(x=><div className="card rv" key={x.id}><b>{x.name}</b><p className="muted">{x.desc}</p><div className="row"><span>{x.minutes} min</span><b>${x.price}</b></div><Link className="btn ghost" to={'/book?service='+x.id}>Book this</Link></div>)}</div>
 <h2>Before and after</h2><div className="ba"><div className="b"/><div className="a" style={{clipPath:`inset(0 ${100-v}% 0 0)`}}/><input type="range" value={v} onChange={e=>setV(e.target.value)} aria-label="Before and after slider"/></div>
 <h2>Questions</h2>{faq.map(([q,a])=><details key={q}><summary>{q}</summary><p className="muted">{a}</p></details>)}</section>;}
