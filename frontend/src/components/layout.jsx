import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { FaShoppingCart, FaPlusCircle } from 'react-icons/fa';  // Import relevant icons

const LayoutPage = () => {
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">Ecommerce Website</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/home">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/cart">
              <FaShoppingCart style={{ marginRight: '8px' }} /> Cart
            </Nav.Link>
            <Nav.Link as={Link} to="/add-product">
              <FaPlusCircle style={{ marginRight: '8px' }} /> Add Product
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <Outlet />
    </>
  );
};

export default LayoutPage;

