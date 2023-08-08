import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import CartModal from './CartModal';
import Login from './Login';
import Signup from './Signup'
import { useCartContext } from '../Context/CartContext';

const Navbar = () => {
  const { cart, setCart, loggedInUsername, setLoggedInUsername } = useCartContext();
  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);
  const [showModal, setShowModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const handleRemoveItem = (itemId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== itemId)); // prevCart: This is the previous state of cart containing all the items in the cart.
  };

  const updateQuantity = (itemId, change) => {
    setCart((prevCart) =>
      prevCart.map((item) => {
        if (item.id === itemId) {
          const newQuantity = item.quantity + change;
          if (newQuantity <= 0) {
            handleRemoveItem(itemId); // Call the handleRemoveItem function to remove the item from the cart
            return item;
          }
          return { ...item, quantity: newQuantity };
        } else {
          return item;
        }
      })
    );
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid py-2">
          <NavLink className="navbar-brand fw-bold" to="/">
            E-MART
          </NavLink>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-3 mb-lg-0">
              <li className="nav-item">
                <NavLink className="nav-link" aria-current="page" to="/">
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/products">
                  Products
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/about">
                  About
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/contact">
                  Contact
                </NavLink>
              </li>
            </ul>
            {isLoggedIn ? (
              <>
            {loggedInUsername && (
              <div className="d-flex align-items-center ms-3">
                <p className="mb-0 me-2 fw-bolder fs-4">Hello, {loggedInUsername}!</p>

              </div>
            )};
            <button
            className="btn btn-outline-primary ms-auto"
            onClick={() => {
              
              setIsLoggedIn(false);
              setLoggedInUsername(null);
        
            }}
          >
            Logout
          </button>
          </>
            ): (
              <>
                <Login setLoggedInUsername={setLoggedInUsername} setIsLoggedIn={setIsLoggedIn} setShowModal={setShowModal}/>
                <Signup />
              </>
            )}

            <button className="btn btn-outline-primary ms-2" onClick={toggleModal}>
              <span className="fa fa-shopping-cart me-1"></span>Cart
              {cartItemCount > 0 && <span className="cart-badge">({cartItemCount})</span>}
            </button>
          </div>
        </div>
      </nav>

      {showModal && (
        <CartModal
          cart={cart}
          onClose={toggleModal}
          onQuantityChange={updateQuantity}
          onRemoveItem={handleRemoveItem}
        />
      )}
    </>
  );
};

export default Navbar;
