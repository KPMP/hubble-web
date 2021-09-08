import React, { Component } from 'react';
import { Vitessce } from 'vitessce';
import 'vitessce/dist/es/production/static/css/index.css';
import { getViewConfig, populateViewConfig } from './viewConfigHelper';

class SpatialViewer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            viewConfig: '',
            noData: true
        }
    }

    componentDidMount() {
        console.log(this.props)
        if (this.props.selectedImageDataset) {
            let viewConfig = getViewConfig(this.props.selectedImageDataset.dataType);
            viewConfig = populateViewConfig(viewConfig, this.props.selectedImageDataset);

            this.setState({viewConfig: viewConfig, noData: false});
        }
    }

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