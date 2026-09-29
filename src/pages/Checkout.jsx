import {useState} from 'react';import {Link} from 'react-router-dom';import {useCart} from '../cart';import {createOrder} from '../api/client';
export default function Checkout(){
 const {items,total,clear}=useCart();const [f,setF]=useState({name:'',email:'',address:''});const [inst,setInst]=useState(false);const [done,setDone]=useState();const [busy,setBusy]=useState(false);
 const grand=total+(inst?90:0);
 const go=async()=>{setBusy(true);const r=await createOrder({items:items.map(i=>({id:i.id,qty:i.qty,price:i.price})),customer:f,installation:inst,total:grand});setBusy(false);clear();setDone(r);};
 if(done)return <section className="sec page"><h1>Order placed.</h1><p>Order <b>{done.orderId}</b>. {inst&&<>Now <Link to="/book">pick your installation time</Link>.</>}</p></section>;
 if(!items.length)return <section className="sec page"><h1>Checkout</h1><p className="muted">Your bag is empty.</p><Link className="btn" to="/shop">Shop wigs</Link></section>;
 return <section className="sec page narrow"><h1>Checkout</h1>{items.map(i=><div className="row line" key={i.id}><span>{i.name} x{i.qty}</span><span>${i.price*i.qty}</span></div>)}
 <div className="form"><input placeholder="Full name" value={f.name} onChange={e=>setF({...f,name:e.target.value})}/><input type="email" placeholder="Email" value={f.email} onChange={e=>setF({...f,email:e.target.value})}/><input placeholder="Shipping address" value={f.address} onChange={e=>setF({...f,address:e.target.value})}/>
 <label className="chk"><input type="checkbox" checked={inst} onChange={e=>setInst(e.target.checked)}/> Add Classic Install (+$90)</label></div>
 <div className="row big"><span>Total</span><span>${grand}</span></div><button className="btn" disabled={busy||!f.name||!f.email||!f.address} onClick={go}>{busy?'Placing...':'Place order'}</button></section>;}
