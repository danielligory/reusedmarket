import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './styles/App.css';
import NavBar from './components/NavBar';
import ProductList from './components/ProductList';

import Home from './pages/Home';
import Gaming from './pages/Gaming';
import Electronics from './pages/Electronics';
import About from './pages/About';

function App() {
  return (
    <div className="App">
      <NavBar/>
      <Switch>
        <Route path='/' exact component={Home}/>
        <Route path='/gaming' exact component={Gaming} />
        <Route path='/electronics' exact component={Electronics}/>
        <Route path='about' exact component={About}/>
      </Switch>
      <ProductList />
    </div>
  );
}

export default App;
