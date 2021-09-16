import React, { Component } from 'react';
import { Vitessce } from 'vitessce';
import 'vitessce/dist/es/production/static/css/index.css';
import { Row, Col} from "reactstrap";
import { baseURL } from '../../../package.json';
import { getViewConfig, populateViewConfig } from './viewConfigHelper';

class SpatialViewer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            viewConfig: '',
            noData: true
        }
    }

    async componentDidMount() {
        console.log(this.props)
        if (this.props.selectedImageDataset) {
            let viewConfig = getViewConfig(this.props.selectedImageDataset["Data Type"]);
            viewConfig = await populateViewConfig(viewConfig, this.props.selectedImageDataset);
            this.setState({viewConfig: viewConfig, noData: false});
        }
    }

    render() {

        return (
            <div className="container-fluid">
                <div id="vitessce-container" className="rounded border shadow-sm mt-2 mx-3 p-3">
                {!this.state.noData &&
                    <div>
                <Row xs='12'>
                    <Col xs='10'><h5>Viewing {this.props.selectedImageDataset["Data Type"]} images for {this.props.selectedImageDataset["Participant ID"]}</h5></Col>
                    <Col xs='2' className="text-right text-primary ">
                        <button onClick={() => {window.location.href=baseURL}} type='button' className='btn btn-link'>
                            <h5><span style={{"font-size":"26px"}}>&larr;</span> Close viewer</h5></button></Col>
                </Row>
                    <Vitessce
                    config={this.state.viewConfig}
                    height={800}
                    theme="light" />
                </div>
            }
                </div>
            </div>
        )
    }
}

export default SpatialViewer;