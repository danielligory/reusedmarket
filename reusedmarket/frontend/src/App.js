import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import ProductList from './components/ProductList';
import UserRegistration from './pages/UserRegistration';
import UserLogin from './pages/UserLogin';
import BasketPage from './pages/BasketPage';
import AboutUs from './pages/AboutUs';

// Initializing Stripe with a public key.
const stripePromise = loadStripe("pk_test_51P19SCDVOShfpLfUGwR1hg8dqe4BCm3TvkbpXY5q9oH4UBjN30kAuBfhdUAeAA2fWMB6ls38uwwcFBluzH1tEVky002e0RXwp9");

function App() {
  // Base URL for the server.
  const serverBaseUrl = 'http://localhost:5001';

  // Main App component rendering the routing structure and NavBar.
  return (
    <Elements stripe={stripePromise}>
      <Router>
        <div className="App">
          <NavBar serverBaseUrl={serverBaseUrl} />
          <Routes>
            <Route exact path="/" element={<HomePage serverBaseUrl={serverBaseUrl} />} />
            <Route exact path="/about" element={<AboutUs />} />
            <Route exact path="/gaming" element={<ProductList title="Gaming" serverBaseUrl={serverBaseUrl} />} />
            <Route exact path="/electronics" element={<ProductList title="Electronic" serverBaseUrl={serverBaseUrl} />} />
            <Route exact path="/phone" element={<ProductList title="Phone" serverBaseUrl={serverBaseUrl} />} />
            <Route path="/register" element={<UserRegistration />} />
            <Route path="/login" element={<UserLogin />} />
            <Route path="/basket" element={<BasketPage />} />
          </Routes>
        </div>
      </Router>
    </Elements>


  );
}

// HomePage component to display on the root route.
const HomePage = () => {
  return (
    <div>
      <ProductList title="Suggested" />
      <ProductList title="Gaming" />
    </div>
  );
}


export default App;