import "./App.css";

function Cart({ cart, setCart }) {
  const totalItems = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const totalPrice = cart.reduce(
    (total, item) =>
      total + item.selectedPrice * item.quantity,
    0
  );

  const increaseQuantity = (index) => {
    setCart((currentCart) =>
      currentCart.map((item, i) =>
        i === index
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const decreaseQuantity = (index) => {
    setCart((currentCart) =>
      currentCart
        .map((item, i) =>
          i === index
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeItem = (index) => {
    setCart((currentCart) =>
      currentCart.filter((_, i) => i !== index)
    );
  };

  return (
    <div className="cart-page">

      <div className="cart-page-header">
        <p>YOUR ORDER</p>
        <h1>Shopping Cart</h1>
        <span>{totalItems} items</span>
      </div>

      {cart.length === 0 ? (

        <div className="empty-cart-page">
          <div className="empty-cart-icon">
            🍕
          </div>

          <h2 className="your-cart-text">Your cart is empty</h2>

          <p>
            Add some delicious pizzas to get started.
          </p>

          <a href="/">
            Browse Menu
          </a>
        </div>

      ) : (

        <div className="cart-layout">

          {/* ITEMS */}

          <div className="cart-page-items">

            {cart.map((item, index) => (

              <div
                className="cart-page-item"
                key={index}
              >

                <div className="cart-page-image">
                  🍕
                </div>

                <div className="cart-page-details">

                  <h2>
                    {item.name}
                  </h2>

                  <p>
                    {item.size} · ₹{item.selectedPrice}
                  </p>

                  <div className="quantity-controls">

                    <button
                      onClick={() =>
                        decreaseQuantity(index)
                      }
                    >
                      −
                    </button>

                    <span>
                      {item.quantity}
                    </span>

                    <button
                      onClick={() =>
                        increaseQuantity(index)
                      }
                    >
                      +
                    </button>

                  </div>

                </div>

                <div className="cart-item-price">

                  <strong>
                    ₹
                    {item.selectedPrice *
                      item.quantity}
                  </strong>

                  <button
                    onClick={() =>
                      removeItem(index)
                    }
                  >
                    Remove
                  </button>

                </div>

              </div>

            ))}

          </div>


          {/* SUMMARY */}

          <div className="order-summary">

            <h2>
              Order Summary
            </h2>

            <div>
              <span>
                Items
              </span>

              <strong>
                {totalItems}
              </strong>
            </div>

            <div>
              <span>
                Subtotal
              </span>

              <strong>
                ₹{totalPrice}
              </strong>
            </div>

            <div>
              <span>
                Delivery
              </span>

              <strong>
                FREE
              </strong>
            </div>

            <hr />

            <div className="summary-total">

              <span>
                Total
              </span>

              <strong>
                ₹{totalPrice}
              </strong>

            </div>

            <button
              className="checkout-button"
              onClick={() =>
                alert("Checkout coming next!")
              }
            >
              Proceed to Checkout
            </button>

          </div>

        </div>

      )}

    </div>
  );
}

export default Cart;