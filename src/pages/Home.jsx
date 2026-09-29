import {useEffect,useState} from 'react';import {Link} from 'react-router-dom';import gsap from 'gsap';
import {getProducts} from '../api/client';import {useGsap,reveal,Card} from './parts';
const words=['100% human hair','Lace front','Pre-plucked','Free shipping','Expert install'];
const reviews=[['Amara','The lace melted into my skin. Nobody could tell.'],['Tasha','Booked, installed and styled in one afternoon.'],['Keisha','Best bob I have owned. Worth every penny.'],['Lena','Mia cut it to my face shape. Perfect.']];
export default function Home(){
 const [ps,setPs]=useState([]);useEffect(()=>{getProducts().then(setPs);},[]);
 const ref=useGsap(()=>{
  gsap.from('.hl span',{yPercent:110,stagger:.15,duration:1.1,ease:'power4.out',delay:.2});
  gsap.timeline({scrollTrigger:{trigger:'.hero',start:'top top',end:'+=90%',scrub:true,pin:true}})
   .to('.hero-img',{clipPath:'inset(14% 20% round 36px)',scale:1.08},0).to('.hero-txt',{yPercent:-40,opacity:0},0);
  gsap.to('.marq div',{xPercent:-50,repeat:-1,duration:22,ease:'none'});
  const t=document.querySelector('.track');
  if(t.children.length)gsap.to(t,{x:()=>-(t.scrollWidth-innerWidth+80),ease:'none',scrollTrigger:{trigger:'.show',start:'top top',end:()=>'+='+t.scrollWidth,scrub:true,pin:true,invalidateOnRefresh:true}});
  document.querySelectorAll('[data-n]').forEach(el=>{const o={v:0};gsap.to(o,{v:+el.dataset.n,duration:2,ease:'power2.out',scrollTrigger:{trigger:el,start:'top 90%',once:true},onUpdate:()=>el.textContent=Math.round(o.v).toLocaleString()});});
  reveal();},[ps.length]);
 return <div ref={ref}>
 <section className="hero"><div className="hero-img" style={{backgroundImage:'url(/hero.jpg)'}}/>
  <div className="hero-txt"><h1><div className="hl"><span>Hair that</span></div><div className="hl"><span>arrives before</span></div><div className="hl"><span>you do.</span></div></h1>
  <div className="cta"><Link className="btn light" to="/shop">Shop the drop</Link><Link className="btn light ghost" to="/book">Book installation</Link></div></div></section>
 <div className="marq"><div>{[...words,...words,...words,...words].map((w,i)=><span key={i}>{w}</span>)}</div></div>
 <section className="sec"><h2 className="rv">Featured wigs</h2><div className="grid">{ps.slice(0,4).map(p=><Card key={p.id} p={p}/>)}</div></section>
 <section className="show"><div className="track">{ps.map(p=><Link to={'/product/'+p.id} key={p.id} className="slide" style={{background:`linear-gradient(160deg,${p.tone[0]},${p.tone[1]})`}}><b>{p.name}</b><span>{p.texture} / {p.length}"</span></Link>)}</div></section>
 <section className="sec split"><div><h2 className="rv">Buy it. Have it installed.</h2><p className="muted rv">Book a stylist to install, cut and style your wig. Bring your own or pick one from us.</p><Link className="btn rv" to="/installation">See installation</Link></div>
  <div className="stats"><div className="rv"><b data-n="12000">0</b><p className="muted">wigs sold</p></div><div className="rv"><b data-n="4800">0</b><p className="muted">installs booked</p></div><div className="rv"><b data-n="98">0</b><p className="muted">% five-star</p></div></div></section>
 <section className="sec"><h2 className="rv">What clients say</h2><div className="revs">{reviews.map(([n,t])=><blockquote className="rv" key={n}><p>{t}</p><cite>{n}</cite></blockquote>)}</div></section>
 <section className="sec big-cta"><h2 className="rv">Your next look is one booking away.</h2><Link className="btn rv" to="/book">Book installation</Link></section></div>;}
