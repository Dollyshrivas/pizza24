import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import "./App.css";
import Cart from "./Cart";

function Home({ pizzas, cart, setCart }) {
  const [selectedPizza, setSelectedPizza] = useState(null);
  const [selectedSize, setSelectedSize] = useState("Medium");

  const totalItems = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const openCustomization = (pizza) => {
    setSelectedPizza(pizza);

    if (pizza.sizes?.Medium) {
      setSelectedSize("Medium");
    } else {
      const firstSize = Object.keys(pizza.sizes || {})[0];
      setSelectedSize(firstSize);
    }
  };

  const addToCart = () => {
    if (!selectedPizza) return;

    const price = selectedPizza.sizes[selectedSize];

    const newItem = {
      ...selectedPizza,
      size: selectedSize,
      selectedPrice: price,
      quantity: 1,
    };

    setCart((currentCart) => [
      ...currentCart,
      newItem,
    ]);

    setSelectedPizza(null);
  };

  return (
    <div className="app">

      {/* NAVBAR */}

      <header className="navbar">

        <Link to="/" className="logo">
          🍕 Pizza<span>24</span>
        </Link>

        <nav>
          <Link to="/">Home</Link>

          <a href="#menu">Menu</a>

          <a
            className="takeaway-link"
            href="#takeaway"
          >
            Takeaway
            <p className="takeaway-text">
              More restaurants
            </p>
          </a>
        </nav>

        <Link
          to="/cart"
          className="cart-button"
        >
          🛒 Cart ({totalItems})
        </Link>

      </header>


      {/* HERO */}

      <section className="hero">

        <div className="hero-content">

          <p className="small-title">
            FRESH • HOT • DELICIOUS
          </p>

          <h1>
            Your favorite pizza,
            <br />
            delivered <span>fast.</span>
          </h1>

          <p className="hero-text">
            Freshly baked pizzas made with delicious
            ingredients and delivered straight to your door.
          </p>

          <button
            className="order-button"
            onClick={() =>
              document
                .getElementById("menu")
                ?.scrollIntoView({
                  behavior: "smooth",
                })
            }
          >
            Order Now 🍕
          </button>

        </div>

        <div className="hero-pizza">
          🍕
        </div>

      </section>


      {/* MENU */}

      <section
        className="menu"
        id="menu"
      >

        <div className="section-heading">
          <p>OUR MENU</p>
          <h2>Popular Pizzas</h2>
        </div>


        {pizzas.length === 0 ? (

          <p className="loading">
            Loading pizzas...
          </p>

        ) : (

          <div className="pizza-grid">

            {pizzas.map((pizza) => (

              <div
                className="pizza-card"
                key={pizza.name}
              >

                <div className="pizza-image">

                  {pizza.image ? (
                    <img
                      src={pizza.image}
                      alt={pizza.name}
                    />
                  ) : (
                    "🍕"
                  )}

                </div>


                <div className="pizza-info">

                  <div className="pizza-category">
                    {pizza.category}
                  </div>

                  <h3>
                    {pizza.name}
                  </h3>

                  <p>
                    {pizza.description}
                  </p>


                  <div className="pizza-bottom">

                    <strong>
                      From ₹
                      {Math.min(
                        ...Object.values(
                          pizza.sizes || {}
                        )
                      )}
                    </strong>

                    <button
                      onClick={() =>
                        openCustomization(pizza)
                      }
                    >
                      Customize
                    </button>

                  </div>

                </div>

              </div>

            ))}

          </div>

        )}

      </section>


      {/* CUSTOMIZATION */}

      {selectedPizza && (

        <div
          className="modal-overlay"
          onClick={() =>
            setSelectedPizza(null)
          }
        >

          <div
            className="modal"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            <button
              className="close-button"
              onClick={() =>
                setSelectedPizza(null)
              }
            >
              ×
            </button>

            <h2>
              {selectedPizza.name}
            </h2>

            <p>
              Choose your pizza size
            </p>


            <div className="size-options">

              {Object.entries(
                selectedPizza.sizes || {}
              ).map(([size, price]) => (

                <button
                  key={size}
                  className={
                    selectedSize === size
                      ? "size-option selected"
                      : "size-option"
                  }
                  onClick={() =>
                    setSelectedSize(size)
                  }
                >
                  <span>{size}</span>

                  <strong>
                    ₹{price}
                  </strong>

                </button>

              ))}

            </div>


            <button
              className="add-cart-modal"
              onClick={addToCart}
            >
              Add to Cart 🛒
            </button>

          </div>

        </div>

      )}


      {/* FOOTER */}

      <footer>

        <Link
          to="/"
          className="logo"
        >
          🍕 Pizza<span>24</span>
        </Link>

        <p>
          Fresh pizza. Fast delivery.
          Happy customers.
        </p>

      </footer>

    </div>
  );
}


function App() {

  const [pizzas, setPizzas] = useState([]);
  const [cart, setCart] = useState([]);

  // GET DATA FROM DJANGO

  useEffect(() => {

    fetch("http://127.0.0.1:8000/api/pizzas/")

      .then((response) => {

        if (!response.ok) {
          throw new Error(
            `HTTP error: ${response.status}`
          );
        }

        return response.json();

      })

      .then((data) => {
        setPizzas(data);
      })

      .catch((error) => {
        console.error(
          "Django API Error:",
          error
        );
      });

  }, []);


  return (

    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={
            <Home
              pizzas={pizzas}
              cart={cart}
              setCart={setCart}
            />
          }
        />

        <Route
          path="/cart"
          element={
            <Cart
              cart={cart}
              setCart={setCart}
            />
          }
        />

      </Routes>

    </BrowserRouter>

  );
}

export default App;
