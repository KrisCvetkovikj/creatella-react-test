import { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

class Spinner extends Component {

  render() {
    return (
      <>
        <Container>
          <Row/>
          <Row>
            <div className="spinner-border" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </Row>
          <Row/>
        </Container>
      </>
    );
  }
}

export default Spinner;