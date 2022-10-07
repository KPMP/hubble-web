import React, { Component } from 'react';
import { Vitessce } from 'vitessce';
import 'vitessce/dist/esm/index.css';
import { Row, Col } from "reactstrap";
import { getViewConfig, populateViewConfig } from './viewConfigHelper';
import { createHeaderString } from './spatialHelper';
import { Redirect } from 'react-router-dom';
import { handleGoogleAnalyticsEvent } from "../../helpers/googleAnalyticsHelper";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDoubleRight } from "@fortawesome/free-solid-svg-icons";


class SpatialViewer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            viewConfig: '',
            noData: true,
            headerString: '',
            reportCardOpen: false
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

    openReportCard = () => {
        this.setState({reportCardOpen: true})
    }

    closeReportCard = () => {
        this.setState({reportCardOpen: false})
    }

    render() {
        if (!this.props.selectedImageDataset || (this.props.selectedImageDataset && Object.keys(this.props.selectedImageDataset).length === 0)) {
            return <Redirect to='/' />
        }

        return (
            <div className="container-fluid">
                <div id="vitessce-container" className="rounded border shadow-sm mt-2 mx-3 p-3">
                    
                    <div className={`flyout shadow-sm border u-transition ${this.state.reportCardOpen ? "open" : "closed"}`}>
                        <Row className="header u-gutter-fix">
                            <Col className="pt-1 pb-1">
                                <div className="pr-2 d-inline clickable" onClick={()=>{this.closeReportCard()}}>
                                    <FontAwesomeIcon className="fa fa-angle-double-right" icon={faAngleDoubleRight} />
                                </div>
                                <span>Participant Information</span>
                            </Col>
                        </Row>
                    </div>


                    {!this.state.noData &&
                        <div>
                    <Row xs='12'>                        
                        <Col xs='8'>
                            <h5>
                                {`${this.props.selectedImageDataset["datatype"]} 
                                for ${this.props.selectedImageDataset["tissuetype"]} 
                                sample ${this.props.selectedImageDataset["spectracksampleid"]} 
                                (participant`} 
                                <button
                                    type="button"
                                    class="btn btn-link text-left p-0 u-text-decoration-none"
                                    onClick={()=>{this.openReportCard()}}>
                                    {`${this.props.selectedImageDataset["redcapid"]}`}
                                </button>
                                {`)`}
                            </h5>
                        </Col>
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
