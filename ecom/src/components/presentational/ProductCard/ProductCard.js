import React, { Component } from 'react';
import { addToCart } from '../../../actions/inventoryActions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './ProductCard.css';

class ProductCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity: '',
      product: '',
      cart: ''
    };
  }
  componentDidMount() {
    this.setState({ product: this.props.name });
  }
  onSubmit = e => {
    e.preventDefault();
    const productInfo = {
      productName: this.props.name,
      price: this.props.price,
      quantity: this.state.quantity
    };
    this.props.addToCart(productInfo);
    console.log(`Added ${this.state.quantity} ${this.state.product}'s to cart`);
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <div>
        <div className='product-card container'>
          <div>
            <p className='product-card label'>{this.props.name}</p>
            <p className='product-card label'>${this.props.price}</p>
            <p className='product-card label'>
              Available Now: {this.props.quantity}
            </p>
            <form action='submit' onSubmit={this.onSubmit}>
              <input
                type='number'
                name='quantity'
                min='1'
                max='100'
                placeholder='1'
                onChange={this.onChange}
                value={this.state.quantity}
              />
              <button type='submit'>Add to Cart</button>{' '}
            </form>
          </div>
        </div>
      </div>
    );
  }
}

ProductCard.propTypes = {
  addToCart: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  cart: state.cart
});

export default connect(
  mapStateToProps,
  { addToCart }
)(ProductCard);
