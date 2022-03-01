import React, { Component } from 'react';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
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
    TableColumnReordering,
    PagingPanel,
} from '@devexpress/dx-react-grid-bootstrap4';
import '@devexpress/dx-react-grid-bootstrap4/dist/dx-react-grid-bootstrap4.css';

import { ToolbarButtonState } from './Plugins/toolbar-button-state.js';
import { ToolbarButton } from './Plugins/toolbar-button.js';

import { PaginationState } from './Plugins/pagination-state.js';
import { Pagination } from './Plugins/pagination.js';

class ImageDatasetList extends Component {

    constructor(props) {
        super(props);
        const columnCards = this.getColumns().map((item, index) => {
            return {id: index, text: item.name, name: item.name, hideable: item.hideable}
        })
        this.state = {
            filterTabActive: true,
            activeFilterTab: 'DATASET',
            tableData: [],
            cards: columnCards
        }
    }

    async componentDidMount() {
        let spatialData = await getSpatialDataAsJSON();
        this.setState({ "tableData": spatialData });
    }

    setCards = (cards) => {
        this.setState({cards})
    }
    
    setDefaultCards = () => {
        const cards = this.getColumns().map((item, index) => {
            return {id: index, text: item.name, name: item.name, hideable: item.hideable}
        })
        this.setState({cards})
    }

    // This is used for column ordering too.
    getColumns = () => {
        const { setSelectedImageDataset } = this.props;
        return [
            {
                name: 'Participant ID',
                title: 'PARTICIPANT ID',
                sortable: true,
                hideable: false,
                defaultHidden: false,
                getCellValue: row => <button onClick={() => setSelectedImageDataset(row)} type='button' data-toggle="popover" title="Popover title And here's some amazing content. It's very engaging. Right?" data-content="" className='table-column btn btn-link text-left p-0'>{row["Participant ID"]}</button>
            },
            {
                name: 'Data Type',
                title: 'DATA TYPE',
                sortable: true,
                hideable: true,
                defaultHidden: false,
            },
            {
                name: 'Image Type',
                title: 'IMAGE TYPE',
                sortable: true,
                hideable: true,
                defaultHidden: false,
                getCellValue: this.getImageTypeCell
            },
        ];
    };
    getDefaultHiddenColumnNames = (columns) => {
        return columns.filter((column) => {
            return column.defaultHidden === true
          }).map((column) => {
            return column.name;
          })
    }
    
    getImageTypeCell = (row) => {
        return getImageTypeTooltipCopy(row["Image Type"]) !== "" &&
            <div>
                <span className='mr-1'>{row["Image Type"]}</span>
            </div>
    };

    getDefaultColumnWidths = () => {
        return [
            { columnName: 'Participant ID', width: 145 },
            { columnName: 'Data Type', width: 250 },
            { columnName: 'Image Type', width: 660 },
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
        this.setState({activeFilterTab: tabName});
    }
    
    getPageSizes = () => {
        return [10,20,40,80,100]
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
                                <i alt="Close Filter Tab" onClick={() => {this.toggleFilterTab()}} className="fas fa-angles-left clickable"></i>
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
                            <i alt="Open Filter Tab" onClick={() => {this.toggleFilterTab()}} className={`fas fa-angles-right clickable`}></i>
                            </Col>
                            <Col xl={11} className='my-0 p-3'>
                                <div className="border rounded activeFilter">
                                    <span>
                                        Active filter appears here
                                        &nbsp; &nbsp; &nbsp;
                                        <i alt="Turn off filter" className="close-button fas fa-xmark"></i>
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
       
                            </Col>
                        </Row>
                        <DndProvider backend={HTML5Backend}>
                            <Container className='rounded border shadow-sm p-3 container-max spatial-data-table-wrapper'>
                                <div className="spatial-data-table">
                                    <Grid
                                        rows={this.state.tableData}
                                        columns={this.getColumns()} >

                                        <SortingState defaultSorting={[]} />
                                        <IntegratedSorting />
                                        <PagingState
                                            defaultCurrentPage={0}
                                            defaultPageSize={10}
                                        />
                                        <IntegratedPaging />
                                        <PagingPanel />
                                        <Toolbar
                                            cards={this.state.cards}
                                            setCards={this.state.setCards}
                                        />

                                        <ToolbarButtonState />
                                        <Table />
                                        <TableColumnResizing
                                            defaultColumnWidths={this.getDefaultColumnWidths()} minColumnWidth={145} />

                                        <TableColumnReordering
                                            order={(this.state.cards).map(item => item.name)}
                                            defaultOrder={this.getColumns().map(item => item.name)}
                                        />
                                        <TableHeaderRow showSortingControls />
                                        <TableColumnVisibility
                                            defaultHiddenColumnNames={this.getDefaultHiddenColumnNames(this.getColumns())}
                                        />
                                        <ColumnChooser />
                                        
                                        <ToolbarButton 
                                            cards={this.state.cards}
                                            setCards={this.setCards}
                                            setDefaultCards={this.setDefaultCards}
                                            defaultOrder={this.getColumns().map(item => item.name)} />

                                        <PaginationState />
                                        <Pagination pageSizes={this.getPageSizes()} />
                                    </Grid>
                                </div>
                            </Container>
                        </DndProvider>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default ImageDatasetList;
