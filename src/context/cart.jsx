import { useState } from "react";
import { createContext } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
   const [cart, setCart] = useState([]);

   const addToCart = product => {
      // Check if the product is already in the cart
      const productInCartIndex = cart.findIndex(item => item.id === product.id);
      console.log(productInCartIndex);

      // Forma 1: structuredClone
      if (productInCartIndex >= 0) {
         const newCart = structuredClone(cart);
         newCart[productInCartIndex].quantity += 1;
         return setCart(newCart);
      }

      // producto no esta en el carrito
      setCart(prevState => ([
         ...prevState,
         {
            ...product,
            quantity: 1
         }
      ]));
   }

   const removeFromCart = (product) => {
      setCart(prevState => prevState.filter(item => item.id !== product.id))
   }

   const clearCart = () => {
      setCart([]);
   }

   return <CartContext.Provider value={{
      cart,
      addToCart,
      clearCart,
      removeFromCart
   }}>
      {children}
   </CartContext.Provider>
}