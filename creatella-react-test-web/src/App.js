import './App.css';
import ProductList from './components/product-list/ProductList';
import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { SORT_TYPE } from './constants/sort-type';
import ProductItemService from './services/product.service';
import Form from 'react-bootstrap/Form';
import Spinner from './components/spinner/Spinner';

class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      products: [],
      page: 0,
      sort: SORT_TYPE.ID,
      // loading: true
    }
  }

  componentDidMount() {
    this.getProducts(0, SORT_TYPE.ID);

    var options = {
      root: null,
      rootMargin: "0px",
      threshold: 1.0
    };

    this.observer = new IntersectionObserver(
      this.handleObserver.bind(this),
      options
    );
    this.observer.observe(this.loadingRef);
  }

  handleObserver(entities, observer) {
    const y = entities[0].boundingClientRect.y;
    if (this.state.prevY > y) {
      const curPage = this.state.page + 1;
      this.getProducts(curPage);
      this.setState({ page: curPage });
    }
    this.setState({ prevY: y });
  }

  getProducts(currentPage, option) {
    const value = (option && option.target) ? option.target.value : this.state.sort;
    this.setState({ page: currentPage, sort: value, loading: true });

    ProductItemService.getAll(currentPage, value).then(response => {
      this.setState({ products: [...this.state.products, ...response.data] })
    });
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

            <ProductList products={this.state.products}/>
            <div ref={loadingRef => (this.loadingRef = loadingRef)}>
            <Spinner/>
            </div>
            {/*{this.state.loading ? <Spinner/> : }*/}
          </Row>
        </Container>
      </div>
    );
  }

}

export default App;
