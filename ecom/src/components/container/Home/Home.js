import React, { Component } from 'react';
import { pullInventory } from '../../../actions/inventoryActions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ProductCard from '../../presentational/ProductCard/ProductCard';
import './Home.css';

class Home extends Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {
    this.props.pullInventory();
  }

  componentDidUpdate() {
    console.log(this.props.inventory);
  }

  render() {
    if (this.props.inventory.length !== 0) {
      return (
        <div className='home container'>
          <div className='home-products container'>
            {this.props.inventory.length
              ? this.props.inventory.map(product => (
                  <ProductCard key={product.id} {...product} />
                ))
              : null}
          </div>
        </div>
      );
    } else {
      return (
        <div className='home container'>
          <h1 className='no-inventory'>inventory is empty....</h1>
        </div>
      );
    }
  }
}

Home.propTypes = {
  pullInventory: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  inventory: state.inventory
});

export default connect(
  mapStateToProps,
  { pullInventory }
)(Home);
