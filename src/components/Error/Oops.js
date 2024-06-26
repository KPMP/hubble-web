import React, { Component } from 'react';
import { Col, Row, Button } from 'reactstrap';
import { NavFooter } from 'kpmp-common-components';

class Oops extends Component {
  render() {
    return (
      <div className='oops-height-wrapper'>
        <article className="container-fluid">
          <Row id="oops-content">
            <Col xs={0} md={2}>
              &nbsp;
            </Col>
            <Col xs={12} md={4} className={'text-center'}>
              <img
                src="img/oops.png"
                alt="Oops, something went wrong"
                id="oops-image"
              />
            </Col>
            <Col xs={12} md={6}>
              <p className="oops-big">Oops...</p>
              <p className="oops-small">
                Looks like something went wrong.
                <br />
                We&#39;re working on it.
              </p>
              <p className="oops-button-container">
                <Button
                  className="btn btn-primary"
                  onClick={() => (window.location.href = '/')}
                >
                  Back to Home
                </Button>
              </p>
            </Col>
          </Row>
        </article>

        <NavFooter app='atlas' />
      </div>
    );
  }
}

export default Oops;
