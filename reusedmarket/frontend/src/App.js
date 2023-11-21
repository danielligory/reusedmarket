import './styles/App.css';
import NavBar from './components/NavBar';
import ProductList from './components/ProductList';
import UserRegistration from './pages/UserRegistration';
import UserLogin from './pages/UserLogin';


function App() {
  return (
    <div className="App">
      <NavBar/>
      <ProductList />
      <UserRegistration />
      <UserLogin />
    </div>
  );
}

export default App;
