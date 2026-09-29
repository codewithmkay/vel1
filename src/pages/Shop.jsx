import {useEffect,useState} from 'react';import {useParams,Link} from 'react-router-dom';
import {getProducts,getProduct} from '../api/client';import {reveal,Card} from './parts';import {useCart} from '../cart';
export function Shop(){
 const [ps,setPs]=useState([]);const [tex,setTex]=useState('All');const [len,setLen]=useState('All');const [sort,setSort]=useState('');
 useEffect(()=>{getProducts().then(setPs);},[]);useEffect(()=>{setTimeout(reveal,50);},[ps,tex,len,sort]);
 let list=ps.filter(p=>(tex==='All'||p.texture===tex)&&(len==='All'||(len==='Short'?p.length<=14:len==='Medium'?p.length>14&&p.length<=22:p.length>22)));
 if(sort==='lo')list=[...list].sort((a,b)=>a.price-b.price);if(sort==='hi')list=[...list].sort((a,b)=>b.price-a.price);
 return <section className="sec page"><h1>Shop wigs</h1>
 <div className="filters"><select value={tex} onChange={e=>setTex(e.target.value)}>{['All','Straight','Wavy','Curly'].map(x=><option key={x}>{x}</option>)}</select>
 <select value={len} onChange={e=>setLen(e.target.value)}>{['All','Short','Medium','Long'].map(x=><option key={x}>{x}</option>)}</select>
 <select value={sort} onChange={e=>setSort(e.target.value)}><option value="">Featured</option><option value="lo">Price: low to high</option><option value="hi">Price: high to low</option></select></div>
 <div className="grid">{list.map(p=><Card key={p.id+tex+len+sort} p={p}/>)}</div>{!list.length&&<p className="muted">No wigs match. Clear a filter.</p>}</section>;}
export function Product(){
 const {id}=useParams();const [p,setP]=useState();const {add}=useCart();useEffect(()=>{getProduct(id).then(setP);},[id]);
 if(!p)return <section className="sec page"><p className="muted">Loading...</p></section>;
 return <section className="sec page split"><div className="art tall" style={{background:`linear-gradient(160deg,${p.tone[0]},${p.tone[1]})`}}/>
 <div><h1>{p.name}</h1><h3>${p.price}</h3><p className="muted">{p.desc}</p>
 <ul className="specs"><li>Length: {p.length}"</li><li>Texture: {p.texture}</li><li>Color: {p.color}</li><li>Lace: {p.lace}</li></ul>
 <div className="cta"><button className="btn" onClick={()=>add(p)}>Add to bag</button><Link className="btn ghost" to={'/book?wig='+p.id}>Add installation</Link></div></div></section>;}
