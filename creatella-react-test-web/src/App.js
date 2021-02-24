import './App.css';
import ProductList from './components/product-list/ProductList';
import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { SORT_TYPE } from './constants/sort-type';
import ProductItemService from './services/product.service';
import Form from 'react-bootstrap/Form';
import { MDBSpinner } from 'mdbreact';
import Spinner from './components/spinner/Spinner';

class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      products: [],
      page: 0,
      sort: SORT_TYPE.ID,
      loading: true
    }
  }

  componentDidMount() {
    this.getProducts(SORT_TYPE.ID);
  }

  getProducts(option) {
    const value = option.target ? option.target.value : SORT_TYPE.id;
    this.setState({ sort: value, loading: true });
    const { page } = this.state;
    ProductItemService.getAll(page, value).then(response => this.setState({ products: response.data, loading: false }));
  }

  render() {

    return (
      <div>
        <Container>
          <Row>
            <Form>
              <Form.Group controlId="exampleForm.ControlSelect1">
                <Form.Label>Sort</Form.Label>
                <Form.Control as="select" onChange={(value) => this.getProducts(value)}>
                  <option value="">Please select</option>
                  {
                    Object.values(SORT_TYPE).map(option => {
                      return <option key={option} value={option}>{option}</option>
                    })
                  }
                </Form.Control>
              </Form.Group>
            </Form>
            {this.state.loading ? <Spinner/> : <ProductList products={this.state.products}/>}
          </Row>
        </Container>
      </div>
    );
  }

}

export default App;
