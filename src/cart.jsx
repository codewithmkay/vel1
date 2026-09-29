import {createContext,useContext,useState} from 'react';
const C=createContext();export const useCart=()=>useContext(C);
export function CartProvider({children}){
 const [items,setItems]=useState([]);const [open,setOpen]=useState(false);
 const add=p=>{setItems(i=>i.find(x=>x.id===p.id)?i.map(x=>x.id===p.id?{...x,qty:x.qty+1}:x):[...i,{...p,qty:1}]);setOpen(true);};
 const remove=id=>setItems(i=>i.filter(x=>x.id!==id));const clear=()=>setItems([]);
 const total=items.reduce((s,x)=>s+x.price*x.qty,0);const count=items.reduce((s,x)=>s+x.qty,0);
 return <C.Provider value={{items,add,remove,clear,total,count,open,setOpen}}>{children}</C.Provider>;}
