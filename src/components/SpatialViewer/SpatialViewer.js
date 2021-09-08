import React, { Component } from 'react';
import { Vitessce } from 'vitessce';

import 'vitessce/dist/es/production/static/css/index.css';
import { getViewConfig } from './viewConfigHelper';

class SpatialViewer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            viewConfig: ''
        }
    }

    componentDidMount() {
        if (this.state.selectedImageDataset) {
            let viewConfig = getViewConfig(this.props.selectedImageTray.type);
            viewConfig.datasets[0].files[0].images[0].url = this.props.selectedImageTray.url;
        }
    }

    render() {
        return (
            <Vitessce
                config={this.state.viewConfig}
                height={800}
                theme="light" />
        )
    }
}

export default SpatialViewer;