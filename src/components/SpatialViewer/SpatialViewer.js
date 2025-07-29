import React, { Component } from 'react';
import { Vitessce } from 'vitessce';
import { Row, Col } from "reactstrap";
import { getViewConfig, populateViewConfig } from './viewConfigHelper';
import { Redirect } from 'react-router-dom';
import { handleGoogleAnalyticsEvent } from "../../helpers/googleAnalyticsHelper";
import ReportCard from '../ReportCard/ReportCard';
import Api from '../../helpers/Api';
import { resultConverter } from '../../helpers/dataHelper';

class SpatialViewer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            fileid: new URLSearchParams(window.location.search).get("image"),
            viewConfig: '',
            noData: true,
            reportCardOpen: false
        }
    }


    async componentDidMount() {
        await this.getSelectedImage();
        this.props.setSummaryDatasets(this.props.selectedImageDataset["redcapid"])
        this.props.setClinicalDatasets(this.props.selectedImageDataset["redcapid"])
        this.props.setExperimentalDataCounts(this.props.selectedImageDataset["redcapid"])   
        if (this.props.selectedImageDataset) {
            handleGoogleAnalyticsEvent(
                'Spatial Viewer',
                'Navigation',
                this.props.selectedImageDataset["spectracksampleid"] 
                + this.props.selectedImageDataset['imagetype']);
            let viewConfig = getViewConfig(this.props.selectedImageDataset["configtype"]);
            viewConfig = await populateViewConfig(viewConfig, this.props.selectedImageDataset);
            this.setState({viewConfig: viewConfig, noData: false});
        }
    }

    
    getSelectedImage = async () => {
        let result;
        let config = {
            "query": "",
            "filters": {
                "all": [
                    { "dlfileid": this.state.fileid }
                ]
            }
        }
        await Api.getInstance().post(
            process.env.REACT_APP_SEARCH_ENDPOINT + "/api/as/v1/engines/spatial-viewer/search.json", 
            config, 
            { 
                headers: {
                    "Authorization" : `Bearer ${process.env.REACT_APP_SEARCH_KEY}`
                }
            }).then((response) => {
                result = resultConverter(response.data.results)[0];
                this.props.setSelectedImageDataset(result);
            })
        return result;
    }

    openReportCard = () => {
        this.setState({reportCardOpen: true})
        handleGoogleAnalyticsEvent(
            'Spatial Viewer', 
            'Navigation', 
            'Participant Information'
        );
    }

    closeReportCard = () => {
        this.setState({reportCardOpen: false})
    }

    render() {
        if (!this.state.fileid && (this.props.selectedImageDataset && Object.keys(this.props.selectedImageDataset).length === 0)) {
            return <Redirect to='/' />
        }
        const summaryDataset = this.props.summaryDatasets
        const experimentalDataCounts = this.props.experimentalDataCounts
        const clinicalDataset = this.props.clinicalDatasets

        return this.props.selectedImageDataset && (
            <div className="container-fluid">
                <div id="vitessce-container" className="rounded border shadow-sm mt-2 mb-3 mx-3 p-3">
                    <ReportCard 
                        reportCardOpen={this.state.reportCardOpen}
                        closeReportCard={this.closeReportCard}
                        summaryDataset={summaryDataset}
                        clinicalDataset={clinicalDataset}
                        experimentalDataCounts={experimentalDataCounts}
                        redcapid={this.props.selectedImageDataset["redcapid"]}
                    />

                    {!this.state.noData &&
                        <div>
                    <Row xs='12'>                        
                        <Col xs='8'>
                            <h5>
                                {`${this.props.selectedImageDataset["datatype"]} 
                                for ${this.props.selectedImageDataset["enrollmentcategory"]} 
                                sample ${this.props.selectedImageDataset["spectracksampleid"]} 
                                (participant `} 
                                <button
                                    className="btn btn-link p-0 u-text-decoration-none"
                                    onClick={()=>{this.openReportCard()}}>
                                    {`${this.props.selectedImageDataset["redcapid"]}`}
                                </button>
                                {`)`}
                            </h5>
                        </Col>
                        <Col xs='4' className="text-end text-primary ">
                            <button onClick={() => {this.props.history.goBack()}} type='button' className='btn btn-link'>
                                <h5><span style={{"fontSize":"26px"}}>&larr;</span> Close viewer</h5></button></Col>
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
