import React, { Component } from 'react';
import { Col, Container, Row } from "reactstrap";
import { getSpatialDataAsJSON } from "../../helpers/dataHelper";
import { getImageTypeTooltipCopy } from "./viewConfigHelper";
import {
    SortingState,
    IntegratedSorting,
    IntegratedPaging,
    PagingState,
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
    PagingPanel,
} from '@devexpress/dx-react-grid-bootstrap4';
import '@devexpress/dx-react-grid-bootstrap4/dist/dx-react-grid-bootstrap4.css';

class ImageDatasetList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            filterTabActive: true,
            activeFilterTab: 'DATASET',
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
            {
                name: 'Image Type',
                title: 'IMAGE TYPE',
                getCellValue: this.getImageTypeCell
            },
            {
                name: 'Info',
                title: 'INFO',
                getCellValue: row => { 
                    return <span className="icon-info">
                     <i className="fas fa-info-circle"></i>
                    </span>
                }
            },
        ];
    };

    getImageTypeCell = (row) => {
        return getImageTypeTooltipCopy(row["Image Type"]) !== "" &&
                <div>
                        <span className='mr-1'>{row["Image Type"]}</span>
                        <div className='tooltip-parent rounded border shadow-sm mt-1 p-2'>
                            <span className='tooltip-child'>{getImageTypeTooltipCopy(row["Image Type"])}</span>
                        </div>
                    </div>
    };

    getDefaultColumnWidths = () => {
        return [
            { columnName: 'Participant ID', width: 120 },
            { columnName: 'Data Type', width: 250 },
            { columnName: 'Image Type', width: 650 },
            { columnName: 'Info', width: 25 },
        ]
    };

    toggleFilterTab = () => {
        if(this.state.filterTabActive) {
            this.setState({filterTabActive: false});
        } else {
            this.setState({filterTabActive: true});
        }
    }
    setActiveFilterTab = (tabName) => {
        console.log('foo',tabName)
        this.setState({activeFilterTab: tabName});
    }
    
    render() {
        const tabEnum = {
            DATASET: 'DATASET',
            PARTICIPANT: 'PARTICIPANT',
        }
        return (
            <Container id='outer-wrapper' className="multi-container-container container-xxl">
                <Row>
                    <Col xl={12}>
                        <Container className="mt-2 rounded border p-3 shadow-sm container-max">
                            <Row><Col><h5>Welcome to the Kidney Tissue Atlas Spatial Viewer</h5></Col></Row>
                            <Row><Col><p>Select a spatial dataset from the list below to visualize it in the <a target="_blank" rel="noreferrer" href="http://vitessce.io/">Vitessce</a> visual integration tool.</p></Col></Row>
                        </Container>
                    </Col>
                </Row>
                <Row>
                    
                    <Col xl={3}>
                        <div className={`filter-panel-wrapper ${this.state.filterTabActive ? '': 'hidden'}`}>
                        
                        <div className="filter-panel-tab-wrapper">
                            <div onClick={() => {this.setActiveFilterTab(tabEnum.DATASET)}}
                                className={`filter-tab ${this.state.activeFilterTab === tabEnum.DATASET ? 'active' : ''} rounded border`}>DATASET</div>
                            <div onClick={() => {this.setActiveFilterTab(tabEnum.PARTICIPANT)}}
                                className={`filter-tab ${this.state.activeFilterTab === tabEnum.PARTICIPANT ? 'active' : ''} rounded border`}>PARTICIPANT</div>
                            
                            <div className="filter-tab filter-tab-control-icon">
                                <i onClick={() => {this.toggleFilterTab()}} className="fas fa-angles-left clickable"></i>
                            </div>
                        </div>
                        <Container className="mt-3 rounded border p-3 shadow-sm spatial-filter-panel container-max">
                            <Row><Col><h5>Data Type</h5></Col></Row>
                            <Row><Col><h5>Image Type</h5></Col></Row>
                            <Row><Col><h5>Sample Type</h5></Col></Row>
                        </Container>
                        </div>
                    </Col>
                    <Col xl={`${this.state.filterTabActive ? 9 : 12 }`}>
                        <Row>
                            <Col className={`filter-collapse ${this.state.filterTabActive ? 'hidden': ''}`}  xl={1}>
                            <i onClick={() => {this.toggleFilterTab()}} className={`fas fa-angles-right clickable`}></i>
                            </Col>
                            <Col xl={11} className='my-0 p-3'>
                                <div className="border rounded activeFilter">
                                    <span>
                                        Active filter appears here
                                        &nbsp; &nbsp; &nbsp;
                                        <i className="close-button fas fa-xmark"></i>
                                    </span>
                                </div>

                                <div className="border rounded activeFilter ">
                                    <span>
                                        Active filter appears here
                                        &nbsp; &nbsp; &nbsp;
                                        <i className="close-button fas fa-xmark"></i>
                                    </span>
                                </div>
                                
                                <div className="border rounded activeFilter ">
                                    <span>
                                        Active filter appears here
                                        &nbsp; &nbsp; &nbsp;
                                        <i className="close-button fas fa-xmark"></i>
                                    </span>
                                </div>
                                
                                <div className="border rounded activeFilter ">
                                    <span>
                                        Really long active filter appears here
                                        &nbsp; &nbsp; &nbsp;
                                        <i className="close-button fas fa-xmark"></i>
                                    </span>
                                </div>
                                <div className="border rounded activeFilter ">                                    
                                    <span>
                                        Really long active filter appears here
                                        &nbsp; &nbsp; &nbsp;
                                        <i className="close-button fas fa-xmark"></i>
                                    </span>
                                </div>
                                <div className="border rounded activeFilter ">                                    
                                    <span>
                                        Really long active filter appears here
                                        &nbsp; &nbsp; &nbsp;
                                        <i className="close-button fas fa-xmark"></i>
                                    </span>
                                </div>
                                <div className="border rounded activeFilter ">                                    
                                    <span>
                                        Really long active filter appears here
                                        &nbsp; &nbsp; &nbsp;
                                        <i className="close-button fas fa-xmark"></i>
                                    </span>
                                </div>
                                <div className="border rounded activeFilter ">                                    
                                    <span>
                                        Really long active filter appears here
                                        &nbsp; &nbsp; &nbsp;
                                        <i className="close-button fas fa-xmark"></i>
                                    </span>
                                </div>
                            </Col>
                        </Row>
                        <Container className='rounded border shadow-sm p-3 container-max spatial-data-table-wrapper'>
                            <div className="spatial-data-table">
                                <Grid
                                    rows={this.state.tableData}
                                    columns={this.getColumns()}
                                >
                                    <SortingState
                                        defaultSorting={[]}
                                    />
                                    
                                    <DragDropProvider />
                                    <IntegratedSorting />
                                    <PagingState
                                        defaultCurrentPage={0}
                                        defaultPageSize={10}
                                        pageSize={10}
                                        
                                    />
                                    <IntegratedPaging />
                                    <PagingPanel />
                                    <Toolbar />
                                    <Table />
                                    <TableColumnResizing defaultColumnWidths={this.getDefaultColumnWidths()} />
                                    <TableColumnReordering
                                        defaultOrder={this.getColumns().map(item => item.name)}
                                    />
                                    
                                    <TableHeaderRow showSortingControls />

                                    <TableColumnVisibility
                                        defaultHiddenColumnNames={[]}
                                    />
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
