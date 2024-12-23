import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom'; 

const CardPage = () => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(storedCart);
  }, []);

 
  const removeProduct = (index) => {
    const updatedCart = cart.filter((_, i) => i !== index);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  
  const incrementQuantity = (index) => {
    const updatedCart = [...cart];
    updatedCart[index].quantity = (updatedCart[index].quantity || 1) + 1;
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

 
  const decrementQuantity = (index) => {
    const updatedCart = [...cart];
    if (updatedCart[index].quantity > 1) {
      updatedCart[index].quantity = updatedCart[index].quantity - 1;
      setCart(updatedCart);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
    }
  };

  return (
    <div>
      <h1>Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Image</th>
                <th>Name</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>
                    <img src={item.image} alt={item.name} style={{ width: '50px', height: '50px' }} />
                  </td>
                  <td>{item.name}</td>
                  <td>${item.price}</td>
                  <td>
                    <Button variant="outline-primary" onClick={() => decrementQuantity(index)}>-</Button>
                    {item.quantity || 1}
                    <Button variant="outline-primary" onClick={() => incrementQuantity(index)}>+</Button>
                  </td>
                  <td>${(item.price * (item.quantity || 1)).toFixed(2)}</td>
                  <td>
                    <Button variant="danger" onClick={() => removeProduct(index)}>Remove</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Link to="/checkout" state={{ cart }}><Button variant="success">Proceed to Checkout</Button></Link>
        </>
      )}
    </div>
  );
};

export default CardPage;




