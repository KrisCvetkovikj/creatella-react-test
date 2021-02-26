import React from 'react';
import { Col } from 'react-bootstrap';
import Jumbotron from 'react-bootstrap/Jumbotron';
import AdvertService from '../../services/ads.service';

class Advertisement extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = { src: '' };

  }

  fetchAdvert = () => {
    AdvertService.getRandomAd(Math.floor(Math.random() * 1000)).then(response => {
      this.setState({ src: new Buffer(response.data, 'binary').toString('base64') });
    })
  }

  componentDidMount() {
    this.fetchAdvert();
  }

  render() {

    return (
      <Col xs={12}>
        <Jumbotron>
          <p>Here you're sure to find a bargain on some of the finest ascii available to purchase. Be sure to peruse our
            selection of ascii faces in an exciting range of sizes and prices.

            But first, a word from our sponsors:</p>
          {this.state.src && <img className="ad" src={`data:image/jpeg;base64,${this.state.src}`} alt=""/>}
        </Jumbotron>
      </Col>
    );
  }
}

export default Advertisement;