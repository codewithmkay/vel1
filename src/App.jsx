import {useEffect,useRef} from 'react';
import {BrowserRouter,Routes,Route,Link,NavLink,useLocation} from 'react-router-dom';
import gsap from 'gsap';import {ScrollTrigger} from 'gsap/ScrollTrigger';import Lenis from 'lenis';
import {CartProvider,useCart} from './cart';
import Home from './pages/Home';import {Shop,Product} from './pages/Shop';import Install from './pages/Install';import Book from './pages/Book';import Checkout from './pages/Checkout';
gsap.registerPlugin(ScrollTrigger);
function Scroll(){const {pathname}=useLocation();
 useEffect(()=>{window.scrollTo(0,0);const t=setTimeout(()=>ScrollTrigger.refresh(),400);return()=>clearTimeout(t);},[pathname]);return null;}
function Chrome(){
 const bar=useRef(),cur=useRef();const {count,setOpen}=useCart();
 useEffect(()=>{
  const lenis=new Lenis();lenis.on('scroll',ScrollTrigger.update);
  const tick=t=>lenis.raf(t*1000);gsap.ticker.add(tick);gsap.ticker.lagSmoothing(0);
  const up=()=>gsap.set(bar.current,{scaleX:window.scrollY/(document.body.scrollHeight-innerHeight||1)});
  const mv=e=>gsap.to(cur.current,{x:e.clientX,y:e.clientY,duration:.25});
  lenis.on('scroll',up);window.addEventListener('mousemove',mv);
  return()=>{gsap.ticker.remove(tick);lenis.destroy();window.removeEventListener('mousemove',mv);};},[]);
 return <><div className="bar" ref={bar}/><div className="cursor" ref={cur}/>
 <header className="nav"><Link to="/" className="logo">velora</Link>
  <nav><NavLink to="/shop">Shop</NavLink><NavLink to="/installation">Installation</NavLink><NavLink to="/book" className="pill">Book</NavLink>
  <button onClick={()=>setOpen(true)}>Bag ({count})</button></nav></header></>;}
function Drawer(){const {items,remove,total,open,setOpen}=useCart();
 return <><div className={'veil'+(open?' on':'')} onClick={()=>setOpen(false)}/><aside className={'drawer'+(open?' on':'')}>
  <div className="row"><h3>Your bag</h3><button onClick={()=>setOpen(false)}>Close</button></div>
  {!items.length&&<p className="muted">Your bag is empty. Find a wig in the shop.</p>}
  {items.map(i=><div className="row line" key={i.id}><span>{i.name} x{i.qty}</span><span>${i.price*i.qty} <button onClick={()=>remove(i.id)}>Remove</button></span></div>)}
  {!!items.length&&<><div className="row big"><span>Total</span><span>${total}</span></div><Link className="btn" to="/checkout" onClick={()=>setOpen(false)}>Checkout</Link></>}</aside></>;}
export default function App(){return <BrowserRouter><CartProvider><Scroll/><Chrome/><Drawer/>
 <main><Routes><Route path="/" element={<Home/>}/><Route path="/shop" element={<Shop/>}/><Route path="/product/:id" element={<Product/>}/>
 <Route path="/installation" element={<Install/>}/><Route path="/book" element={<Book/>}/><Route path="/checkout" element={<Checkout/>}/></Routes></main>
 <footer className="foot"><div><b className="logo">velora</b><p className="muted">Human hair wigs and expert installation.</p></div>
 <div><Link to="/shop">Shop</Link><Link to="/installation">Installation</Link><Link to="/book">Book</Link></div></footer></CartProvider></BrowserRouter>;}
