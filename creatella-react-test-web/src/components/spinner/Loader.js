import { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Spinner from 'react-bootstrap/Spinner';

class Loader extends Component {

  render() {
    return (
      <>
        <Container>
          <Row/>
          <Row>
            <Spinner animation="border" role="status">
              <span className="sr-only">Loading...</span>
            </Spinner>
          </Row>
          <Row/>
        </Container>
      </>
    );
  }
}

export default Loader;