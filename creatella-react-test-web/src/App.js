import './App.css';
import ProductList from './components/product-list/ProductList';
import React, { useEffect, useState } from 'react';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import Dropdown from 'react-bootstrap/Dropdown';
import SplitButton from 'react-bootstrap/SplitButton';
import ProductDataService from './services/product.service';

const App = () => {

  const [products, setProducts] = useState([]);

  let sortBySize = () => {
    let sortedProducts = [...products].sort((p1, p2) => {
      return p1.size - p2.size;
    });
    console.log("sorted by size")
    setProducts(sortedProducts);
  };
  let sortByPrice = () => {
    let sortedProducts = [...products].sort((p1, p2) => {
      return p1.price - p2.price;
    });
    console.log("sorted by price")
    setProducts(sortedProducts);
  };
  let sortById = () => {
    let sortedProducts = [...products].sort((p1, p2) => {
      return p1.id - p2.id;
    });
    console.log("sorted by id")
    setProducts(sortedProducts);
  };


  useEffect(() => {
    async function fetchProducts() {
      return await ProductDataService.getAll();
    }

    fetchProducts().then(response => setProducts(response.data));
  }, [setProducts]);

  return (
    <div>
      <Nav>
        <Nav.Item>
          <Dropdown>
            <SplitButton id="dropdown-basic-button" title="Sort">
              <Dropdown.Item onClick={sortBySize}>Size</Dropdown.Item>
              <Dropdown.Item onClick={sortByPrice}>Price</Dropdown.Item>
              <Dropdown.Item onClick={sortById}>Id</Dropdown.Item>
            </SplitButton>
          </Dropdown>
        </Nav.Item>
      </Nav>
      <Container>
        <ProductList products={products}/>
      </Container>
    </div>
  )
}

export default App;
