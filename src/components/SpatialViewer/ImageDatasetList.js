import React, { Component } from 'react';
import { Col, Container, Row } from "reactstrap";
import { getSpatialDataAsJSON } from "../../helpers/dataHelper";
import { getDerivedImageName, getImageTypeTooltipCopy } from "./viewConfigHelper";
import {
    SortingState,
    IntegratedSorting,
} from '@devexpress/dx-react-grid';
import {
    Grid,
    Table,
    TableHeaderRow,
    TableColumnResizing,
    ColumnChooser,
    TableColumnVisibility,
    Toolbar,
    DragDropProvider,
    TableColumnReordering,
} from '@devexpress/dx-react-grid-bootstrap4';
import '@devexpress/dx-react-grid-bootstrap4/dist/dx-react-grid-bootstrap4.css';

class ImageDatasetList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tableData: []
        }
    }

    async componentDidMount() {
        let spatialData = await getSpatialDataAsJSON();
        this.setState({ "tableData": spatialData });
    }

    // This is used for column ordering too.766
    getColumns = () => {
        return [
            {
                name: 'Participant ID',
                title: 'PARTICIPANT ID',
                getCellValue: row => <button onClick={() => this.props.setSelectedImageDataset(row)} type='button' className='table-column btn btn-link text-left p-0'>{row["Participant ID"]}</button>
            },
            { name: 'Data Type', title: 'DATA TYPE' },
            { name: 'Tissue Type', title: 'TISSUE TYPE' },
            {
                name: 'Image Type',
                title: 'IMAGE TYPE',
                getCellValue: this.getImageTypeCell
            },
            {
                name: 'Level',
                title:
                    <span>LEVEL&nbsp;
                        <span className='tooltip-icon'>
                        <span className="icon-info"><i className="fas fa-info-circle"></i></span>
                        <div className='tooltip-parent rounded border shadow-sm mt-1 p-2'>
                            <span className='tooltip-child'>Identifier of the section of the FFPE tissue block used in light microscopy.</span>
                        </div>
                        </span>
                    </span>
            },
            {
                name: 'Source File',
                title: 'FILE NAME',
                getCellValue: row => getDerivedImageName(row["Source File"])
            }
        ];
    };

    getImageTypeCell = (row) => {
        return getImageTypeTooltipCopy(row["Image Type"]) !== "" &&
                <div>
                        <span className='mr-1'>{row["Image Type"]}</span>
                    <span className="icon-info">
                        <i className="fas fa-info-circle"></i>
                    </span>
                        <div className='tooltip-parent rounded border shadow-sm mt-1 p-2'>
                            <span className='tooltip-child'>{getImageTypeTooltipCopy(row["Image Type"])}</span>
                        </div>
                    </div>
    };

    getDefaultColumnWidths = () => {
        return [
            { columnName: 'Participant ID', width: 120 },
            { columnName: 'Data Type', width: 155 },
            { columnName: 'Tissue Type', width: 100 },
            { columnName: 'Image Type', width: 270 },
            { columnName: 'Level', width: 100 },
            { columnName: 'Source File', width: 250 }
        ]
    };

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
                        <Container className='rounded border shadow-sm my-3 p-3 overflow-auto'>
                            <div className="spatial-data-table">
                                <Grid
                                    rows={this.state.tableData}
                                    columns={this.getColumns()}
                                >
                                    <SortingState
                                        defaultSorting={[]}
                                    />
                                    <IntegratedSorting />
                                    <DragDropProvider />
                                    <Table />
                                    <TableColumnResizing defaultColumnWidths={this.getDefaultColumnWidths()} />
                                    <TableColumnReordering
                                        defaultOrder={this.getColumns().map(item => item.name)}
                                    />
                                    <TableHeaderRow showSortingControls />
                                    <TableColumnVisibility
                                        defaultHiddenColumnNames={[]}
                                    />
                                    <Toolbar />
                                    <ColumnChooser />
                                </Grid>
                            </div>
                        </Container>
                    </Col>
                </Row>
            </Container>
        )
    }

}

export default ImageDatasetList;
