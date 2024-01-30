import React, { Children, createContext, useContext, useState } from 'react'
export const cartContext=createContext()
 
export const CartProvider=({children})=>
{
    const [details,setDetails]=useState()
    return (
        <cartContext.Provider value={{details,setDetails}}>
            {children}
        </cartContext.Provider>
    )
    
}
export const useCartDetails=()=>useContext(cartContext)
