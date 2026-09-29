import {useEffect,useRef} from 'react';import {Link} from 'react-router-dom';import gsap from 'gsap';import {ScrollTrigger} from 'gsap/ScrollTrigger';
import {useCart} from '../cart';
export const useGsap=(fn,deps=[])=>{const ref=useRef();useEffect(()=>{const c=gsap.context(()=>fn(ref.current),ref);return()=>c.revert();},deps);return ref;};
export const reveal=()=>ScrollTrigger.batch('.rv',{start:'top 92%',once:true,onEnter:els=>gsap.to(els,{opacity:1,y:0,stagger:.1,duration:.8,ease:'power3.out'})});
export function Card({p}){const {add}=useCart();
 return <div className="card rv"><Link to={'/product/'+p.id} className="art" style={{background:`linear-gradient(160deg,${p.tone[0]},${p.tone[1]})`}}><span>{p.length}"</span></Link>
 <div className="row"><div><b>{p.name}</b><p className="muted">{p.texture}, {p.color}</p></div><b>${p.price}</b></div><button className="btn ghost" onClick={()=>add(p)}>Add to bag</button></div>;}
