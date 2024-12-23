import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LayoutPage from './components/layout';
import HomePage from './components/home';
import CardPage from './components/Cart';
import AddProductPage from './components/addDtae';
import PaymentSuccessPage from './components/success';
import PaymentFailurePage from './components/failed';
import CheckoutPage from './components/ChackOut';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<LayoutPage />}>
          <Route index element={<HomePage />} />
          <Route path='/home' element={<HomePage />} />
          <Route path="/cart" element={<CardPage />} />
          <Route path="/add-product" element={<AddProductPage />} />
          <Route path="/success" element={<PaymentSuccessPage />} />
          <Route path="/failure" element={<PaymentFailurePage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;


// "image":"https://cdn.shopify.com/s/files/1/0564/8826/3854/products/1595_Rose_Gold_1_360x.jpg?v=1704799626"
//4000 0000 0000 9995