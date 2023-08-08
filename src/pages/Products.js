import React, { useState } from 'react';
import DATA from '../Data/Data';
import CartItemModal from '../components/CartItemModal';
import { useCartContext } from '../Context/CartContext'; // Import the useCartContext

const Products = () => {
  const { cart,setCart } = useCartContext();
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
  
    const openModal = (item) => {
      setModalOpen(true);
      setSelectedItem(item);
    };
  
    const closeModal = () => {
      setModalOpen(false);
      setSelectedItem(null);
    };
  
    const handleQuantityChange = (itemId, change) => {
      setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === itemId ? { ...item, quantity: item.quantity + change } : item
      )
    );
    };
  
    const handleRemoveItem = (itemId) => {
      setCart((prevCart) => prevCart.filter((item) => item.id !== itemId));
    };
  
    const cardItem = (item) => {
      return (
        <div className="card my-5 py-4" key={item.id} style={{ width: '18rem' }}>
          <img src={item.img} className="card-img-top" alt={item.title} />
          <div className="card-body text-center">
            <h5 className="card-title">{item.title}</h5>
            <p className="card-text">{item.description}</p> {/* Display the description here */}
            <p className="lead">${item.price}</p>
            <button className="btn btn-outline-primary" onClick={() => openModal(item)}>
              Add to Cart
            </button>
          </div>
        </div>
      );
    };
  
    const handleCartUpdate = () => {
      // Function to notify the parent component (App) that the cart has been updated
    };  
  
    return (
      <div>
        <div className="container py-5">
          <div className="row">
            <div className="col-12 text-center">
              <h1 className="display-4">Products</h1>
              <hr />
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row justify-content-around">
            {DATA.map(cardItem)}
          </div>
        </div>
        {selectedItem && (
          <CartItemModal
            isOpen={modalOpen}
            onClose={closeModal}
            item={selectedItem}
            quantity={(cart.find((cartItem) => cartItem.id === selectedItem.id) || {}).quantity || 0}
            onQuantityChange={handleQuantityChange}
            onRemoveItem={handleRemoveItem}
            setCart={setCart}
            onCartUpdate={handleCartUpdate}
          />
        )}
      </div>
    );
  };
  
  export default Products;
  