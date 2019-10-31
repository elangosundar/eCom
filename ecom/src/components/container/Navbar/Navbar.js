import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import './Navbar.css';

class Navbar extends Component {
  render() {
    return (
      <div className='nav container'>
        <div className='desktop-nav'>
          <Link className='nav-link' to='/'>
            Home
          </Link>
          <Link className='nav-link' to='/cart'>
            Cart
          </Link>
          <Link className='nav-link' to='/login'>
            Login
          </Link>
        </div>
      </div>
    );
  }
}
export default withRouter(Navbar);
