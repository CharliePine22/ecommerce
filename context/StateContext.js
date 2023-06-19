import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';

const Context = createContext();

export const StateContext = ({ children }) => {
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantities, setTotalQuantities] = useState(0);
  const [quantity, setQuantity] = useState(1);

  let foundProduct;
  let index;

  const onAdd = (product, quantity, option) => {
    if (product.sizes && !option) {
      toast.error('Please select an option before adding to cart!');
      return;
    }

    const checkProductInCart = cartItems.find(
      (item) => item._id === product._id
    );

    setTotalPrice((prevPrice) => prevPrice + product.price * quantity);
    setTotalQuantities((prevTotal) => prevTotal + quantity);

    if (checkProductInCart) {
      console.log(cartItems);
      const updatedCartItems = cartItems.map((cartItem) => {
        if (cartItem._id === product.__id)
          return {
            ...cartItem,
            quantity: cartItem.quantity + quantity,
            option,
          };
      });

      setCartItems(updatedCartItems);
      localStorage.setItem('cart', JSON.stringify(updatedCartItems));
    } else {
      product.quantity = quantity;
      setCartItems([...cartItems, { ...product, option }]);
      localStorage.setItem(
        'cart',
        JSON.stringify([...cartItems, { ...product, option }])
      );
    }
    toast.success(`${product.name} added to the cart`);
  };

  const onRemove = (product) => {
    foundProduct = cartItems.find((item) => item._id === product._id);
    const newCartItems = cartItems.filter((item) => item._id !== product._id);
    setTotalPrice(
      (prevTotal) => prevTotal - foundProduct.price * foundProduct.quantity
    );
    setTotalQuantities((prevTotal) => prevTotal - foundProduct.quantity);
    setCartItems(newCartItems);
    localStorage.setItem('cart', newCartItems);
  };

  const toggleCartItemQuantity = (id, value) => {
    foundProduct = cartItems.find((item) => item._id === id);
    index = cartItems.findIndex((product) => product._id === id);
    const newCartItems = cartItems.filter((item) => item._id !== id);

    if (value == 'inc') {
      setCartItems([
        ...newCartItems,
        { ...foundProduct, quantity: foundProduct.quantity + 1 },
      ]);
      setTotalPrice((prevTotal) => prevTotal + foundProduct.price);
      setTotalQuantities((prevTotal) => prevTotal + 1);
    } else if (value == 'dec') {
      if (foundProduct.quantity > 1) {
        setCartItems([
          ...newCartItems,
          { ...foundProduct, quantity: foundProduct.quantity - 1 },
        ]);
        setTotalPrice((prevTotal) => prevTotal - foundProduct.price);
        setTotalQuantities((prevTotal) => prevTotal - 1);
      }
    }
  };

  const increaseQuantity = () => {
    setQuantity((prev) => (prev += 1));
  };

  const decreaseQuantity = () => {
    setQuantity((prev) => {
      if (prev == 1) return 1;
      else return (prev -= 1);
    });
  };

  const resetQuantity = () => {
    setQuantity(0);
  };

  return (
    <Context.Provider
      value={{
        showCart,
        setShowCart,
        cartItems,
        setCartItems,
        totalPrice,
        setTotalPrice,
        totalQuantities,
        setTotalQuantities,
        toggleCartItemQuantity,
        quantity,
        increaseQuantity,
        decreaseQuantity,
        resetQuantity,
        onAdd,
        onRemove,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useStateContext = () => useContext(Context);
