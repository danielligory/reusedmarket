import './styles/App.css';
import NavBar from './components/NavBar';
import ProductList from './components/ProductList';
import UserRegistration from './pages/UserRegistration';


function App() {
  return (
    <div className="App">
      <NavBar/>
      <ProductList />
      <UserRegistration />
    </div>
  );
}

export default App;
