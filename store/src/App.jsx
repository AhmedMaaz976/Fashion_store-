import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';

// Import components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './components/Home';
import Women from './components/Women';
import Men from './components/Men';
import Kids from './components/Kids';
import Dresses from './components/Dresses';
import Tops from './components/Tops';
import Bottoms from './components/Bottoms';
import Outerwear from './components/Outerwear';
import Sale from './components/Sale';
import WomenSale from './components/WomenSale';
import MenSale from './components/MenSale';
import KidsSale from './components/KidsSale';
import NewIn from './components/NewIn';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import ProductDetail from './components/ProductDetail';
import Search from './components/Search';
import Account from './components/Account';
import Wishlist from './components/Wishlist';
import Login from './components/Login';
import Register from './components/Register';

// Import styles
import './App.css';
import './styles.css';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <div className="App">
            <Navbar />
            <main>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/women" element={<Women />} />
                <Route path="/men" element={<Men />} />
                <Route path="/kids" element={<Kids />} />
                <Route path="/dresses" element={<Dresses />} />
                <Route path="/tops" element={<Tops />} />
                <Route path="/bottoms" element={<Bottoms />} />
                <Route path="/outerwear" element={<Outerwear />} />
                <Route path="/sale" element={<Sale />} />
                <Route path="/women-sale" element={<WomenSale />} />
                <Route path="/men-sale" element={<MenSale />} />
                <Route path="/kids-sale" element={<KidsSale />} />
                <Route path="/new-in" element={<NewIn />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/search" element={<Search />} />
                <Route path="/account" element={<Account />} />
                <Route path="/wishlist" element={<Wishlist />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;