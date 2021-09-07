import React, { Component } from 'react';

class SpatialViewer extends Component {

    render() {
        return (
            <Container id='outer-wrapper'>
                <Row>
                    <Col md={12}>
                        <Vitessce
                            config={this.state.viewConfig}
                            height={800}
                            theme="light" />
                    </Col>
                </Row>
            </Container>
        )
    }

}

export default SpatialViewer;