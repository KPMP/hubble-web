import React, { Component } from 'react';
import { Vitessce } from 'vitessce';
import 'vitessce/dist/esm/index.css';
import { Row, Col} from "reactstrap";
import { getViewConfig, populateViewConfig } from './viewConfigHelper';
import { createHeaderString } from './spatialHelper';
import { Redirect } from 'react-router-dom';
import { handleGoogleAnalyticsEvent } from "../../helpers/googleAnalyticsHelper";


class SpatialViewer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            viewConfig: '',
            noData: true,
            headerString: '',
        }
    }

    async componentDidMount() {
        if (this.props.selectedImageDataset) {
            handleGoogleAnalyticsEvent(
                'Visualization',
                this.props.selectedImageDataset["imagetype"],
                this.props.selectedImageDataset["filename"]);
            let viewConfig = getViewConfig(this.props.selectedImageDataset["configtype"]);
            viewConfig = await populateViewConfig(viewConfig, this.props.selectedImageDataset);
            const headerString = createHeaderString(this.props.selectedImageDataset);
            this.setState({viewConfig: viewConfig, noData: false, headerString});
        }
    }

    render() {
        if (!this.props.selectedImageDataset || (this.props.selectedImageDataset && Object.keys(this.props.selectedImageDataset).length === 0)) {
            return <Redirect to='/' />
        }

        return (
            <div className="container-fluid">
                <div id="vitessce-container" className="rounded border shadow-sm mt-2 mx-3 p-3">
                {!this.state.noData &&
                    <div>
                <Row xs='12'>
                    <Col xs='8'><h5>
                        {this.state.headerString}
                    </h5></Col>
                    <Col xs='4' className="text-right text-primary ">
                        <button onClick={() => {this.props.history.goBack()}} type='button' className='btn btn-link'>
                            <h5><span style={{"font-size":"26px"}}>&larr;</span> Close viewer</h5></button></Col>
                </Row>
                    <Vitessce
                    config={this.state.viewConfig}
                    height={window.innerHeight - 200}
                    theme="light" />
                </div>
            }
                </div>
            </div>
        )
    }
}

export default SpatialViewer;
