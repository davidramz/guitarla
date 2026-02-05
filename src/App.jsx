import "./App.css";
import Header from "./components/Header";
import Guitar from "./components/Guitar";
import { db } from "./data/db";
import { useEffect, useState } from "react";
function App() {
  const [data, setData] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    setData(db);
  });

  function addToCart(item) {
    const indiceItemExiste = cart.findIndex(
      (product) => product.id === item.id,
    );
    if (indiceItemExiste >= 0) {
      const updateCart = [...cart];
      updateCart[indiceItemExiste].quantity++;
      setCart(updateCart);
    } else {
      item.quantity = 1;
      setCart((prevCart) => [...prevCart, item]);
    }
  }

  function removeToCart(item) {
    const removeUpdateCart = [...cart];
    if (item.quantity <= 1) {
      let deletedItemCart = removeUpdateCart.filter(
        (element) => element.id !== item.id,
      );
      setCart(deletedItemCart);
    } else {
      const indiceToRemoveItem = cart.findIndex(
        (product) => product.id === item.id,
      );
      if (indiceToRemoveItem >= 0) {
        removeUpdateCart[indiceToRemoveItem].quantity--;
        setCart(removeUpdateCart);
      }
    }
  }
  function deleteItemToCart(item) {
    const cartToDelete = [...cart];
    const cartAfterDelete = cartToDelete.filter((p) => p.id !== item.id);
    setCart(cartAfterDelete);
  }

  return (
    <>
      <Header
        cart={cart}
        addToCart={addToCart}
        removeToCart={removeToCart}
        deleteItemToCart={deleteItemToCart}
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
