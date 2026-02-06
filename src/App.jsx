import "./App.css";
import Header from "./components/Header";
import Guitar from "./components/Guitar";
import { db } from "./data/db";
import { useEffect, useState } from "react";
function App() {
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

  return (
    <>
      <Header
        cart={cart}
        addToCart={addToCart}
        incrementItemToCart={incrementItemToCart}
        decrementItemToCart={decrementItemToCart}
        deleteItemToCart={deleteItemToCart}
        deleteCart={deleteCart}
      />
      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>
        <div className="row mt-5">
          {data.map((item) => (
            <Guitar key={item.id} item={item} addToCart={addToCart} />
          ))}
        </div>
      </main>

      <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
          <p className="text-white text-center fs-4 mt-4 m-md-0">
            GuitarLA - Todos los derechos Reservados
          </p>
        </div>
      </footer>
    </>
  );
}

export default App;
