import React, { Component } from 'react';
import { Col, Container, Row } from "reactstrap";
import TableFilter from "react-table-filter";
import 'react-table-filter/lib/styles.css';
import { getSpatialDataAsJSON } from "../../helpers/dataHelper";
import { getDerivedImageName } from "./viewConfigHelper";


class ImageDatasetList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tableData: []
        }
    }

    filterUpdated = (newData, filterConfiguration) => {
        this.setState({
            "tableData": newData
        });
    };

    getCells = (data) => {
        return data.map((item, index) => {
            return (
                <tr key={'row_' + index}>
                    <td>
                        <button onClick={() => this.props.setSelectedImageDataset(item)} type='button' className='table-column btn btn-link text-left p-0'>{item["Participant ID"]}</button>
                    </td>
                    <td>
                        {item["Data Type"]}
                    </td>
                    <td>
                        {item["Tissue Type"]}
                    </td>
                    <td>
                        {item["Image Type"]}
                    </td>
                    <td>
                        {item["Level"]}
                    </td>
                    <td>
                        {getDerivedImageName(item["Source File"])}
                    </td>
                </tr>
            );
        });

    };

    async componentDidMount() {
        let spatialData = await getSpatialDataAsJSON();
        this.setState({ "tableData": spatialData });
        this.tableFilterNode.reset(spatialData, true);
    }

    render() {
        return (
            <Container id='outer-wrapper' className="multi-container-container">
                <Row>
                    <Col md={12}>
                        <Container className="mt-3 rounded border p-3 shadow-sm">
                            <Row><Col><h5>Welcome to the Kidney Tissue Atlas Spatial Viewer (beta)</h5></Col></Row>
                            <Row><Col><p>Select a spatial dataset from the list below to visualize it in the <a target="_blank" rel="noreferrer" href="http://vitessce.io/">Vitessce</a> visual integration tool.</p></Col></Row>
                        </Container>
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        <Container className='rounded border shadow-sm my-3 pl-0 pr-0 pb-0 overflow-auto'>
                            <table className="table table-hover table-striped mb-0" width="100%">
                                <thead>
                                    <TableFilter
                                        rows={this.state.tableData}
                                        onFilterUpdate={this.filterUpdated}
                                        ref={(node) => { this.tableFilterNode = node; }}>
                                        <th filterkey="Participant ID">
                                            <span className="mr-2"> PARTICIPANT ID</span>
                                        </th>
                                        <th filterkey="Data Type">
                                            <span className="mr-2">DATA TYPE</span>
                                        </th>
                                        <th filterkey="Tissue Type">
                                            <span className="mr-2">TISSUE TYPE</span>
                                        </th>
                                        <th filterkey="Image Type">
                                            <span className="mr-2">IMAGE TYPE</span>
                                        </th>
                                        <th filterkey="Level">
                                            <span className="mr-2">LEVEL</span>
                                        </th>
                                        <th filterkey="Source File">
                                            <span className="mr-2">FILE NAME</span>
                                        </th>
                                    </TableFilter>
                                </thead>
                                <tbody>
                                    {this.getCells(this.state.tableData)}
                                </tbody>
                            </table>
                        </Container>
                    </Col>
                </Row>
            </Container>
        )
    }

}

export default ImageDatasetList;