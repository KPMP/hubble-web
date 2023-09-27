import React, { Component } from 'react';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { Col, Container, Row, Spinner } from "reactstrap";
import { resultConverter } from "../../helpers/dataHelper";
import { getImageTypeTooltipCopy } from "./viewConfigHelper";
import { faXmark, faAnglesRight, faAnglesLeft, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Tooltip } from "antd";
import {
    SortingState,
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

import { Facet } from "@elastic/react-search-ui";
import { MultiCheckboxFacet } from "@elastic/react-search-ui-views";

import "@elastic/react-search-ui-views/lib/styles/styles.css";
import ReportCard from "../ReportCard/ReportCard";

class ImageDatasetList extends Component {

    constructor(props) {
        super(props);
        const columnCards = this.getColumns().map((item, index) => {
            return {id: index, text: item.title, name: item.name, hideable: item.hideable, isSortField: item?.isSortField}
        });

        const defaultHiddenColumns = this.getDefaultHiddenColumnNames(this.getColumns())
        this.state = {
            activeFilterTab: 'DATASET',
            tableData: [],
            cards: this.props.tableSettings.cards || columnCards,
            currentPage: this.props.tableSettings.currentPage,
            isLoaded: false,
            hiddenColumnNames: this.props.tableSettings.hiddenColumnNames || defaultHiddenColumns

        };
        
    }

    clickReportCard = (row) => {
        this.props.setSummaryDatasets(row['redcapid']);
        this.props.setClinicalDatasets(row['redcapid']);
        this.props.setExperimentalDataCounts(row['redcapid']) ;
        this.props.setSelectedImageDatasetReportCard(row);
        this.props.openReportCard();
    }

    getSearchResults = () => {
        let spatialData = resultConverter(this.props.results);
        this.setState({ "tableData": spatialData });
    };

    async componentDidMount() {
        await this.getSearchResults();
        this.setState({isLoaded: true})
    };

    componentDidUpdate(prevProps) {
        if (this.props !== prevProps) {
            if (this.props.results !== prevProps.results) {
                this.getSearchResults();
            }
            if (this.props.filters !== prevProps.filters) {
                this.props.setCurrent(1);
            }
        }
    };

    setCards = (cards) => {
        this.setState({cards});
    };
    setShowHide = (hiddenColumnNames) => {
        this.setState({hiddenColumnNames: hiddenColumnNames});
    }
    
    setDefaultCards = () => {
        const cards = this.getColumns().map((item, index) => {
            return {id: index, text: item.title, name: item.name, hideable: item.hideable, isSortField: item?.isSortField}
        });
        this.setCards(cards)
    };

    // This is used for column ordering too.
    getColumns = () => {
        const { setSelectedImageDataset } = this.props;
        let columns = [
            {
                name: 'spectracksampleid',
                title: 'Sample ID',
                sortable: true,
                hideable: false,
                defaultHidden: false,
                getCellValue: row => <button onClick={() => setSelectedImageDataset(row)} type='button' data-toggle="tooltip" data-placement="top" title="View dataset" className='table-column btn btn-link text-start p-0 text-decoration-none'>{row["spectracksampleid"]}</button>
            },
            {
                name: 'redcapid',
                title: 'Participant ID',
                sortable: true,
                hideable: true,
                defaultHidden: false,
                getCellValue: row => <button onClick={(e) => this.clickReportCard(row) } type='button' data-toggle="tooltip" data-placement="top" title="View participant information" className='table-column btn btn-link text-start p-0 text-decoration-none'>{row["redcapid"]}</button>
            },
            {
                name: 'datatype',
                title: 'Data Type',
                sortable: true,
                hideable: true,
                defaultHidden: false,
            },
            {
                name: 'filename',
                title: 'Filename',
                sortable: true,
                hideable: true,
                defaultHidden: true,
            },            
            {
                name: 'imagetype',
                title: 'Image Type',
                sortable: true,
                hideable: true,
                defaultHidden: false,
                getCellValue: this.getImageTypeCell
                  
            },
            {
                name: 'level',
                title: 'Level',
                sortable: true,
                hideable: true,
                defaultHidden: true,
            },
            // Sort Column
            {
                name: 'file_name_sort',
                sortable: false,
                hideable: false,
                defaultHidden: true,
                isSortField: true
            },
            {
                name: 'participant_id_sort',
                sortable: false,
                hideable: false,
                defaultHidden: true,
                isSortField: true
            },
            {
                name: 'image_type_sort',
                sortable: false,
                hideable: false,
                defaultHidden: true,
                isSortField: true
            }
        ];
        return columns;
    };

    getDefaultHiddenColumnNames = (columns) => {
        return columns.filter((column) => {
            return column.defaultHidden === true
          }).map((column) => {
            return column.name;
          })
    };

    getImageTypeCell = (row) => {
        return ( <Tooltip color='black' placement='bottom' title={getImageTypeTooltipCopy(row['imagetype'])}>
            <div className={`image-type-cell ${(getImageTypeTooltipCopy(row["imagetype"]) !== "") ? 'clickable': '' }`}>
                <span className='me-1'>{row["imagetype"]}</span>
                {getImageTypeTooltipCopy(row["imagetype"]) !== ""}
            </div>
        </Tooltip>
        )
    };

    getDefaultColumnWidths = () => {
        return [
            { columnName: 'spectracksampleid', width: 145 },
            { columnName: 'datatype', width: 250 },
            { columnName: 'imagetype', width: 350 },
            { columnName: 'redcapid', width: 145 },
            { columnName: 'filename', width: 250 },
            { columnName: 'level', width: 100 },
            { columnName: 'file_name_sort', width: 0},
            { columnName: 'participant_id_sort', width: 0},
            { columnName: 'image_type_sort', width: 0}
        ]
    };
  
    getPageSizes = () => {
        return [10,20,40,80,100]
    };

    getTotalPages = () => {
        let val = Math.ceil(this.props.totalResults / this.props.resultsPerPage);
        return (val > 100) ? 100 : val;
    };

    getFilterPills = (filters) => {
        return filters.map(
            filter => {
                return filter.values.map(value => {
                    return (
                        <div
                            key={(filter.field).toString() + value.toString()}
                            className="border rounded activeFilter">
                            <span>{value}
                                <FontAwesomeIcon
                                    alt="Close Filter"
                                    onClick={()=>{
                                        this.props.removeFilter(filter.field, value)
                                    }}
                                    className="close-button fas fa-xmark ms-2"
                                    icon={faXmark} />
                            </span>
                        </div>)
                })
            })
    };

    render() {
        const tabEnum = {
            DATASET: 'DATASET',
            PARTICIPANT: 'PARTICIPANT',
        };

        const { columnWidths, hiddenColumnNames, sorting } = this.props.tableSettings;
        const summaryDataset = this.props.summaryDatasets
        const experimentalDataCounts = this.props.experimentalDataCounts
        const clinicalDataset = this.props.clinicalDatasets
        return (
            <Container id='outer-wrapper' className="multi-container-container container-xxl">
                <ReportCard
                    reportCardOpen={this.props.reportCardOpen}
                    closeReportCard={this.props.closeReportCard}
                    summaryDataset={summaryDataset}
                    clinicalDataset={clinicalDataset}
                    experimentalDataCounts={experimentalDataCounts}
                    redcapid={this.props.selectedImageDataset["redcapid"]}
                />
                <Row>
                    <Col xl={3}>
                        <div className={`filter-panel-wrapper ${this.props.filterTabActive ? '': 'hidden'}`}>
                        <div className="filter-panel-tab-wrapper">
                            <div onClick={() => {this.props.setActiveFilterTab(tabEnum.DATASET)}}
                                className={`filter-tab ${this.props.activeFilterTab === tabEnum.DATASET ? 'active' : ''} rounded border`}>DATASET</div>
                            <div onClick={() => {this.props.setActiveFilterTab(tabEnum.PARTICIPANT)}}
                                className={`filter-tab ${this.props.activeFilterTab === tabEnum.PARTICIPANT ? 'active' : ''} rounded border`}>PARTICIPANT</div>
                            
                            <div className="filter-tab filter-tab-control-icon clickable"
                                 alt="Close Filter Tab"
                                 onClick={() => {this.props.toggleFilterTab()}}>                                
                                <FontAwesomeIcon
                                    className="fas fa-angles-left " icon={faAnglesLeft} />
                            </div>
                        </div>
                            <React.Fragment>
                            {this.props.activeFilterTab === tabEnum.DATASET &&
                            <Container id="spatial-filter" className="mt-3 rounded border shadow-sm spatial-filter-panel container-max">
                                <Row className='mb-2'><Col><Facet field="releaseversion" filterType="any" label="" show="1" view={MultiCheckboxFacet}/></Col></Row>
                                <Row className="mb-2"><Col><Facet field="datatype" label="Experimental Strategy" filterType="any" show="10"
                                                                  view={MultiCheckboxFacet}/></Col></Row>
                                <div id="image_type">
                                    <Row className="mb-2"><Col><Facet field="imagetype" label="Image Type" filterType="any" show="10"
                                                                    view={MultiCheckboxFacet}/></Col></Row>
                                </div>
                                
                            </Container>
                            }{this.props.activeFilterTab === tabEnum.PARTICIPANT &&
                        <Container id="spatial-filter" className="mt-3 rounded border shadow-sm spatial-filter-panel container-max">
                            <Row className="mb-2"><Col><Facet field="sex" label="Sex" filterType="any" show="10"
                                                              view={MultiCheckboxFacet}/></Col></Row>
                            <Row className="mb-2"><Col><Facet field="age" label="Age" filterType="any" show="10"
                                                              view={MultiCheckboxFacet}/></Col></Row>
                            <Row className="mb-2"><Col><Facet field="tissuetype" label="Tissue Type"
                                                              filterType="any" show="10"
                                                              view={MultiCheckboxFacet}/></Col></Row>
                            <Row className="mb-2"><Col><Facet inputProps={{ placeholder: "cusaceholder" }} isFilterable={true}  field="redcapid" label="Participant ID"
                                                              filterType="any" show="10"
                                                              view={(props) => <MultiCheckboxFacet {...props} searchPlaceholder={"Search..."}/>}/></Col></Row>
                        </Container>
                        }
                            </React.Fragment>
                        </div>

                    </Col>
                    <Col xl={`${this.props.filterTabActive ? 9 : 12 }`}>
                        <Row>
                            <Col 
                                className={`filter-collapse clickable ${this.props.filterTabActive ? 'hidden': ''}`}
                                xl={1}
                                alt="Open Filter Tab"
                                onClick={() => {this.props.toggleFilterTab()}}>
                            <FontAwesomeIcon
                                    className="fas fa-angles-right" icon={faAnglesRight} />
                            </Col>
                            <Col xl={12} className={`my-0 activeFilter-column ${this.props.filterTabActive ? 'closed': ''}`}>
                                {this.props.filters.length === 0 ?

                                <Row className="filter-pill-row inactive-filters">
                                    <span>Select a spatial dataset from the list below to visualize it in the <a target="_blank" rel="noreferrer" href="http://vitessce.io/">Vitessce</a> visual integration tool.</span>
                                </Row>
                                :
                                <Row className="filter-pill-row">
                                    <div className="border rounded activeFilter clear-filters">
                                        <span 
                                            onClick={()=>{
                                                this.props.clearFilters()
                                            }}>
                                                <FontAwesomeIcon alt="Clear All Filters" className="fa-light fa-trash-can" icon={faTrashCan} /> Clear Filters 
                                        </span>
                                    </div>
                                    {this.getFilterPills(this.props.filters)}
                                </Row>}
                                
                            </Col>
                        </Row>
                        <DndProvider backend={HTML5Backend}>
                            <div className='container-max spatial-data-table-wrapper'>
                                <div className="spatial-data-table">
                                    <React.Fragment>
                                    { this.state.isLoaded ?
                                    <Grid
                                        rows={this.state.tableData}
                                        columns={this.getColumns()}>
                                        <SortingState
                                            defaultSorting={[]}
                                            onSortingChange={(sorting) => {
                                                let sortOptions = sorting.map(val => {
                                                    if (val.columnName === 'filename') {
                                                        return { field: "file_name_sort", direction: val.direction }
                                                    }
                                                    else if (val.columnName === "redcapid") {
                                                        return { field: "participant_id_sort", direction: val.direction }
                                                    }
                                                    else if (val.columnName === "imagetype") {
                                                        return { field: "image_type_sort", direction: val.direction }
                                                    }
                                                    return { field: val.columnName, direction: val.direction }
                                                })
                                                this.props.setSort(sortOptions);
                                                this.props.setTableSettings({sorting: sorting})
                                                this.props.setCurrent(1);
                                                }
                                            }  
                                            sorting={sorting}/>
                                        <PagingState
                                            currentPage={this.props.currentPage-1}
                                            pageSize={this.props.resultsPerPage}
                                        />
                                        <PagingPanel 
                                            pageSizes={this.getPageSizes()}
                                            containerComponent={() => {
                                                return (
                                                <PagingPanel.Container
                                                    totalPages={this.getTotalPages()}
                                                    currentPage={this.props.currentPage-1}
                                                    onCurrentPageChange={(page) => {
                                                        // dx-react-grid paging starts at 0, while ElasticSearch starts at 1
                                                        // (hence the "+1" and "-1")
                                                        this.props.setCurrent(page+1);
                                                    }}
                                                    pageSize={this.props.resultsPerPage}
                                                    totalCount={this.props.totalResults}
                                                    onPageSizeChange={(pageSize) => {
                                                        this.props.setResultsPerPage(pageSize);
                                                    }}
                                                    pageSizes={this.getPageSizes()}
                                                    getMessage={(messageKey) => {return messageKey}}
                                                />
                                                )}}
                                        />
                                        <Toolbar
                                            cards={this.state.cards}
                                            setCards={this.state.setCards}
                                        />
                                        <ToolbarButtonState setTableSettings={this.props.setTableSettings} order={this.state.cards} hidden={this.state.hiddenColumnNames} />
                                        <Table />
                                        <TableColumnResizing
                                            defaultColumnWidths={this.getDefaultColumnWidths()} minColumnWidth={145}
                                            onColumnWidthsChange={(columnWidths) =>  this.props.setTableSettings({columnWidths: columnWidths})}
                                            columnWidths={columnWidths}
                                        />

                                        <TableColumnReordering
                                            order={(this.state.cards).map(item => item.name)}
                                            defaultOrder={this.getColumns().map(item => item.name)}
                                        />
                                        <TableHeaderRow showSortingControls />
                                        <TableColumnVisibility
                                            defaultHiddenColumnNames={this.getDefaultHiddenColumnNames(this.getColumns())}
                                            hiddenColumnNames={hiddenColumnNames}
                                            onHiddenColumnNamesChange={(hiddenColumnNames) => {this.setShowHide(hiddenColumnNames)}}
                                        />
                                        <ColumnChooser />
                                        
                                        <ToolbarButton 
                                            cards={this.state.cards}
                                            setCards={this.setCards}
                                            setDefaultCards={this.setDefaultCards}
                                            defaultOrder={this.getColumns().map(item => item.name)} />
                                        <PaginationState
                                            setResultsPerPage={this.props.setResultsPerPage}
                                            pagingSize={this.props.resultsPerPage}/>
                                        <Pagination pageSizes={this.getPageSizes()} />
                                    </Grid>
                                    : <Spinner animation="border" variant="primary">
                                            <span className="visually-hidden">Loading...</span>
                                        </Spinner> }
                                        </React.Fragment>
                                </div>
                            </div>
                        </DndProvider>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default ImageDatasetList;