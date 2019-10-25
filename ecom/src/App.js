import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Switch, Route } from 'react-router-dom';
import Navbar from './components/container/Navbar/Navbar';
import Home from './components/container/Home/Home';
import About from './components/container/About/About';
import Cart from './components/container/Cart/Cart';

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/cart' component={Cart} />
          <Route exact path='/about' component={About} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
