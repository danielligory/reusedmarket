import './styles/App.css';
import NavBar from './components/NavBar';
import ProductList from './components/ProductList';
import UserRegistration from './pages/UserRegistration';
import UserLogin from './pages/UserLogin';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BasketPage from './pages/BasketPage';

function App() {
  const serverBaseUrl = 'http://localhost:5001';
  return (
    <Router>
      <div className="App">
        <NavBar serverBaseUrl={serverBaseUrl}/>
        <Routes>
          <Route exact path="/" element={<HomePage serverBaseUrl={serverBaseUrl} />} />
          <Route exact path="/gaming" element={<ProductList title="Gaming" serverBaseUrl={serverBaseUrl} />} />
          <Route exact path="/electronics" element={<ProductList title="Electronics" serverBaseUrl={serverBaseUrl} />} />
          <Route path="/register" element={<UserRegistration />} />
          <Route path="/login" element={<UserLogin />} />
          <Route path="/basket" element={<BasketPage />} />
        </Routes>
      </div>
    </Router>

  );
}

const HomePage = () => {
  return (
    <div>
      <ProductList title="Suggested" />
      <ProductList title="Gaming" />
    </div>
  );
}


export default App;