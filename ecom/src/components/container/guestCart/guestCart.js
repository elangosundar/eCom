import React, { Component } from 'react';
import ProductCard from '../../presentational/ProductCard/ProductCard';
import './Cart.css';

const sampleCartData = [
  { name: 'Test 1', description: 'Test Product 1', price: 20, id: 1 },
  { name: 'Test 2', description: 'Test Product 2', price: 10, id: 2 },
  { name: 'Test 3', description: 'Test Product 3', price: 30, id: 3 }
];

export default class Cart extends Component {
  render() {
    return (
      <div>
        <div className='cart container'>
          <div className='cart-info container'>
            <h2>Your Cart!</h2>
            <div>
              {sampleCartData.map(product => (
                <ProductCard key={product.id} {...product} />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
