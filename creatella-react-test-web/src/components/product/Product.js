import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import { Col } from 'react-bootstrap';
import moment from 'moment';

class Product extends Component {

  render() {
    const { id, size, price, date, face } = this.props.product;

    const formatDate = (date) => {
      if (moment(date).isBefore(moment(moment.now()).subtract(1, 'week'))) {
        return moment(date).format('DD MMM yyyy HH:mm');
      } else {
        return moment(date).fromNow();
      }
    }

    return (
      <Col xs={3} key={id}>
        <Card className="text-center" style={{ width: '250px', height: '200px' }}>
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