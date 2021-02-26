import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import { Row } from 'react-bootstrap';
import Product from '../product/Product';
import Advertisement from '../advertisement/advertisement';

class ProductList extends Component {

  render() {

    return (
      <Container>
        <Row>
          {this.props.products && this.props.products.map((product, index) => {
            return product.isAd ? <Advertisement key={product.id}/> : <Product key={product.id} product={product}/>
          })}
        </Row>
      </Container>
    );
  }
}

export default ProductList;
