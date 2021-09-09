import React, { Component } from 'react';
import { Vitessce } from 'vitessce';
import lmViewConfig from './lightMicroscopyViewConfig.json';
import threeDCytometryViewConfig from './threeDCytometryViewConfig.json';
import 'vitessce/dist/es/production/static/css/index.css';
import { Row, Col} from "reactstrap";
import { baseURL } from '../../../package.json';

class SpatialViewer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            viewConfig: threeDCytometryViewConfig,
            noData: true
        }
    }

    componentDidMount() {
        if (this.props.selectedImageDataset) {
            let viewConfig = this.getViewConfig(this.props.selectedImageDataset.dataType);
            viewConfig.datasets[0].files[0].options.images[0].url = this.props.selectedImageDataset.url;
            this.setState({viewConfig: viewConfig, noData: false});
        }
    }

    getViewConfig = (type) => {
        switch (type) {
            case '3D Cytometry':
                return threeDCytometryViewConfig;
            case 'CODEX':
                return threeDCytometryViewConfig;
            case 'WSI':
                return lmViewConfig;
            default:
                return threeDCytometryViewConfig
        }
    };

    render() {
        return (
            <div className="container-fluid">
                <div id="vitessce-container" className="rounded border shadow-sm mt-2 mx-3 p-3">
            {!this.state.noData ?
                <div>
                <Row xs='12'>
                    <Col xs='10'><h5>Viewing {this.props.selectedImageDataset.dataType} images for {this.props.selectedImageDataset.participantID}</h5></Col>
                    <Col xs='2' className="text-right text-primary ">
                        <button onClick={() => {window.location.href=baseURL}} type='button' className='btn btn-link'>
                            <h5><span style={{"font-size":"26px"}}>&larr;</span> Close viewer</h5></button></Col>
                </Row>
                    <Vitessce
                    config={this.state.viewConfig}
                    height={800}
                    theme="light" />
                </div>
                : <span> Please select some data</span>
            }
                </div>
            </div>
        )
    }
}

export default SpatialViewer;