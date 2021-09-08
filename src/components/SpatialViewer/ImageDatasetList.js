import React, { Component } from 'react';
import {Col, Container, Row} from "reactstrap";
import TableFilter from "react-table-filter";
import { imageDatasets } from './imageDatasets.json'
import 'react-table-filter/lib/styles.css';

class ImageDatasetList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tableData: imageDatasets
        }
    }

    filterUpdated = (newData, filterConfiguration) => {
        this.setState({
            "tableData": newData
        });
    };

    display = (item) => {
        return item;
    };

    getCells = (data) => {
        return data.map((item, index) => {
            return (
                <tr key={'row_' + index}>
                    <td>
                        { item.dataType }
                    </td>
                    <td>
                        <button onClick={() => this.props.setSelectedImageDataset(item)} type='button' className='table-column btn btn-link text-left p-0'>{item.participantID}</button>
                    </td>
                    <td>
                        { item.tissueType }
                    </td>
                    <td>
                        { item.imageType }
                    </td>
                    <td>
                        { item.stainType }
                    </td>
                </tr>
            );
        });

    };

    render() {
        return (
            <Container id='outer-wrapper'>
                <Row>
                    <Col md={12}>
                        <table className="table table-bordered table-hover table-striped">
                            <thead>
                        <TableFilter
                            rows={this.state.tableData}
                            onFilterUpdate={this.filterUpdated}>
                            <th filterkey="dataType">
                                DATA TYPE
                            </th>
                            <th filterkey="participantID">
                                PARTICIPANT ID
                            </th>
                            <th filterkey="tissueType">
                                TISSUE TYPE
                            </th>
                            <th filterkey="imageType">
                                IMAGE TYPE
                            </th>
                            <th filterkey="stainType">
                                STAIN TYPE
                            </th>
                        </TableFilter>
                            </thead>
                        <tbody>
                        { this.getCells(this.state.tableData) }
                        </tbody>
                    </table>
                    </Col>
                </Row>
            </Container>
        )
    }

}

export default ImageDatasetList;