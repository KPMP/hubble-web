import React, { Component } from 'react';
import { Vitessce } from 'vitessce';
import lmViewConfig from './lightMicroscopyViewConfig.json';
import threeDCytometryViewConfig from './threeDCytometryViewConfig.json';
import 'vitessce/dist/es/production/static/css/index.css';

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
            <div>
            {!this.state.noData ?
                <div>
                <span>Viewing {this.props.selectedImageDataset.dataType} images for {this.props.selectedImageDataset.participantID}</span>
                <Vitessce
                    config={this.state.viewConfig}
                    height={800}
                    theme="light" />
                </div>
                : <span> please select some data</span>
            }
            </div>
        )
    }
}

export default SpatialViewer;