import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import { Col } from 'react-bootstrap';

class Product extends Component {

  render() {
    const { id, size, price, date, face } = this.props.product;

    /**
     * Formats date for product.
     * Show formatted date if over 7 days from now, else print days difference.
     * @param date
     * @returns {string|*}
     */
    const formatDate = (date) => {
      const productDate = new Date(date);
      let currentDate = new Date();
      currentDate.setDate(currentDate.getDate() - 7);
      if (productDate < currentDate) {
        return productDate.toGMTString();
      } else {
        const daysDiff = Math.round((productDate.getTime() - currentDate.getTime()) / (1000 * 3600 * 24));
        return `${daysDiff} days ago`;
      }
    }

    return (
      <Col xs={3} key={id}>
        <Card className="text-center" style={{ width: '250px', height: '250px' }}>
          <Card.Body>
            <Card.Title style={{ fontSize: size }}>{face}</Card.Title>
            <Card.Text>Price: ${price}</Card.Text>
            <Card.Text>Size:{size}</Card.Text>
            <Card.Subtitle>{formatDate(date)}</Card.Subtitle>
          </Card.Body>
        </Card>
      </Col>
    );
  }
}

export default Product;