import './App.css';
import ProductList from './components/product-list/ProductList';
import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { SORT_TYPE } from './constants/sort-type';
import ProductItemService from './services/product.service';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import Loader from './components/spinner/Loader';

class App extends React.Component {

  constructor(props) {
    super(props);

    this.setDefaultState(SORT_TYPE.ID);
  }

  componentDidMount() {
    this.getProducts(1, SORT_TYPE.ID);

    // Scroll observer
    this.observer = new IntersectionObserver(
      this.handleObserver.bind(this),
      this.state.options
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

  setDefaultState(sort) {
    this.state = {
      products: [],
      page: 1,
      prevY: 0,
      sort: sort,
      allProductsLoaded: false,
      options: {
        root: null,
        rootMargin: "0px",
        threshold: 1.0
      }
    }
  }

  /**
   * Fetch products.
   * Push an advertisement "product" every 20.
   * @param currentPage
   * @param option
   * @param onlyLoad
   */
  getProducts(currentPage, option, onlyLoad) {
    const value = (option && option.target) ? option.target.value : this.state.sort;
    this.setState({ page: currentPage || this.state.page, sort: value, loading: true });

    ProductItemService.getAll(currentPage, value).then(response => {
      if (onlyLoad) {
        // reset on sort change
        this.setDefaultState(value);
      }

      this.setState({
        // push on top of stack new products
        products: [...this.state.products, ...response.data],
        // if no more products, assign
        allProductsLoaded: response.data.length < 20
      });

      if (!this.state.allProductsLoaded) {
        // fake product i.e. advertisement
        this.setState({
          products: [...this.state.products, {
            isAd:true
          }]
        })
      }
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
                <Form.Control as="select" onChange={(value) => this.getProducts(undefined, value, true)}>
                  <option value="">Please select</option>
                  {
                    Object.values(SORT_TYPE).map(option => {
                      return <option key={option} value={option}>{option}</option>
                    })
                  }
                </Form.Control>
              </Form.Group>
            </Form>

            <ProductList products={this.state.products} />
            {!this.state.allProductsLoaded && <div ref={loadingRef => (this.loadingRef = loadingRef)}>
              <Loader/>
            </div>}
            {this.state.allProductsLoaded &&
            <Alert variant={'info'}>
              End of catalogue...
            </Alert>}
          </Row>
        </Container>
      </div>
    );
  }
}

export default App;
