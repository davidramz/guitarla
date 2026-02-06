import { useState, useEffect, useMemo } from "react";
import { db } from "../data/db";

export function useCart(){


  const initialCart = () =>
    localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart"))
      : [];

  const [data, setData] = useState([]);
  const [cart, setCart] = useState(initialCart);
  const MAX_ITEMS = 5;

  useEffect(() => {
    setData(db);
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  function addToCart(item) {
    const existe = cart.find((p) => p.id === item.id);
    if (existe) {
      setCart(
        cart.map((product) =>
          product.id === item.id && product.quantity < MAX_ITEMS
            ? { ...product, quantity: product.quantity + 1 }
            : product,
        ),
      );
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  }

  function incrementItemToCart(item) {
    setCart(
      cart.map((p) =>
        p.id === item.id && p.quantity < MAX_ITEMS
          ? { ...p, quantity: p.quantity + 1 }
          : p,
      ),
    );
  }

  function decrementItemToCart(item) {
    setCart(
      cart
        .map((p) => (p.id === item.id ? { ...p, quantity: p.quantity - 1 } : p))
        .filter((p) => p.quantity > 0),
    );
  }

  function deleteItemToCart(item) {
    setCart((prevCart) => prevCart.filter((p) => p.id !== item.id));
  }

  function deleteCart() {
    setCart([]);
  }

  const isEmptyCart = useMemo(() => cart.length === 0, [cart]);
  const totalCart = useMemo(
    () => cart.reduce((acc, item) => acc + item.quantity * item.price, 0),
    [cart],
  );

    return {
        data,
        cart,
        addToCart,
        incrementItemToCart,
        decrementItemToCart,
        deleteItemToCart,
        deleteCart,
        isEmptyCart,
        totalCart
    }
}
