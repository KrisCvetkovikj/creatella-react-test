import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import { Col, Row } from 'react-bootstrap';
import moment from 'moment';
import Card from 'react-bootstrap/Card';

class ProductList extends Component {

  render() {

    let formatDate = (date) => {
      if (moment(date).isBefore(moment(moment.now()).subtract(1, 'week'))) {
        return moment(date).format('DD MMM yyyy HH:mm');
      } else {
        return moment(date).fromNow();
      }
    }

    return (
      <Container>
        <Row>
          {this.props.products && this.props.products.map((product, index) => {
            return (
              <Col xs={3} key={product.id}>
                <Card className="text-center" style={{ width: '250px', height: '200px' }}>
                  <Card.Body>
                    <Card.Title style={{ fontSize: product.size }}>{product.face}</Card.Title>
                    <Card.Text>Price: ${product.price}</Card.Text>
                    <Card.Text>Size:{product.size}</Card.Text>
                    <Card.Subtitle>{formatDate(product.date)}</Card.Subtitle>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    );
  }

}

export default ProductList;
