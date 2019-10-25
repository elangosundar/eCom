import React, { Component } from 'react';
import './ProductCard.css';

export default class ProductCard extends Component {
  render() {
    return (
      <div>
        <div className='product-card container'>
          <div>
            <p className='product-card label'>{this.props.name}</p>
            <p className='product-card label'>${this.props.price}</p>
          </div>
        </div>
      </div>
    );
  }
}
