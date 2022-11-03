import React, { useState, useEffect, useRef } from 'react';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { Col, Container, Row, Spinner } from "reactstrap";
import { resultConverter } from "../../helpers/dataHelper";
import { getImageTypeTooltipCopy } from "./viewConfigHelper";
import { faXmark, faAnglesRight, faAnglesLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { compareTableStrings } from "./spatialHelper";
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

import { Facet } from "@elastic/react-search-ui";
import { MultiCheckboxFacet } from "@elastic/react-search-ui-views";

import "@elastic/react-search-ui-views/lib/styles/styles.css";

const ImageDatasetList = (props)  => {

    const tabEnum = {
        DATASET: 'DATASET',
        PARTICIPANT: 'PARTICIPANT',
    };
    const getImageTypeCell = (row) => {
        return row["imagetype"] !== "" &&
            <div className={`image-type-cell ${(getImageTypeTooltipCopy(row["imagetype"]) !== "") ? 'clickable': '' }`}>
                <span className='mr-1'>{row["imagetype"]}</span>
                {getImageTypeTooltipCopy(row["imagetype"]) !== "" &&
                <div>
                    <div className='tooltip-parent-sibling'></div>
                    <div className='tooltip-parent rounded border shadow mt-2 p-2'>
                        <span className='tooltip-child'>{getImageTypeTooltipCopy(row["imagetype"])}</span>
                    </div>
                </div>
                }
            </div>
    };
    const getColumns = () => {
        const { setSelectedImageDataset } =props;
        let columns = [
            {
                name: 'spectrackSampleId',
                title: 'Sample ID',
                sortable: true,
                hideable: false,
                defaultHidden: false,
                getCellValue: row => <button onClick={() => setSelectedImageDataset(row)} type='button' data-toggle="popover" data-content="" className='table-column btn btn-link text-left p-0'>{row["spectracksampleid"]}</button>
            },
            {
                name: 'redcapid',
                title: 'Participant ID',
                sortable: true,
                hideable: true,
                defaultHidden: false,
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
                getCellValue: getImageTypeCell
            },
            {
                name: 'level',
                title: 'Level',
                sortable: true,
                hideable: true,
                defaultHidden: true,
            },
        ];
        return columns;
    }
    const columnCards = getColumns().map((item, index) => {
        return {id: index, text: item.title, name: item.name, hideable: item.hideable}
    })
    const { pagingSize, columnWidths, hiddenColumnNames, sorting } = props.tableSettings;
    const [filterTabActive, setFilterTabActive] = useState(true);
    const [currentPage] = useState(props.tableSettings.currentPage);
    const [activeFilterTab , setActiveFilterTab] = useState(tabEnum.DATASET)
    const [tableData, setTableData] = useState([]);
    const [isLoaded , setIsLoaded] = useState(false);
    const [cards, setCardState] = useState(props.tableSettings.cards || columnCards);
    const prevProps = useRef(props); 

    useEffect(() => {
        const getSearchResults = () => {
            let spatialData = resultConverter(props.results);
            setTableData(spatialData);
        };
        getSearchResults();
        setIsLoaded(true);
    }, [props]);

    useEffect(() => { 
        const getSearchResults = () => {
            let spatialData = resultConverter(props.results);
            setTableData(spatialData);
        };
         
        if (props !== prevProps.current) {
            if (props.results !== prevProps.current.results) {
                getSearchResults();
            }
            if (props.filters !== prevProps.current.filters) {
                props.setTableSettings({currentPage: 0});
            }
        }
    }, [props]);

    const setCards = (cards) => {
        setCardState(cards);
        props.setTableSettings({cards: cards});
    };
    
    const setDefaultCards = () => {
        const cards = getColumns().map((item, index) => {
            return {id: index, text: item.title, name: item.name, hideable: item.hideable}
        });
        setCards(cards)
    };

    // This is used for column ordering too.
    const getDefaultHiddenColumnNames = (columns) => {
        return columns.filter((column) => {
            return column.defaultHidden === true
          }).map((column) => {
            return column.name;
          })
    };

    
    


    const getDefaultColumnWidths = () => {
        return [
            { columnName: 'spectrackSampleId', width: 145 },
            { columnName: 'datatype', width: 250 },
            { columnName: 'imagetype', width: 350 },
            { columnName: 'redcapid', width: 145 },
            { columnName: 'filename', width: 250 },
            { columnName: 'level', width: 100 },
        ]
    };

    const toggleFilterTab = () => {
        if(filterTabActive) {
            setFilterTabActive(false)
        } else {
            
            setFilterTabActive(true)
        }
    };
    
    const getPageSizes = () => {
        return [10,20,40,80,100]
    };

    const getFilterPills = (filters) => {
        return filters.map(
            filter => {
                return filter.values.map(value => {
                    return (<div
                                key={(filter.field).toString() + value.toString()}
                                className="border rounded activeFilter">
                                <span>{value}
                                    <FontAwesomeIcon
                                        alt="Close Filter"
                                        onClick={()=>{
                                            props.removeFilter(filter.field, value)
                                        }}
                                        className="close-button fas fa-xmark ml-2"
                                        icon={faXmark} />
                                </span>
                             </div>)
                })
            })
    };
        return (
            <Container id='outer-wrapper' className="multi-container-container container-xxl">
                <Row>
                    <Col xl={3}>
                        <div className={`filter-panel-wrapper ${filterTabActive ? '': 'hidden'}`}>
                        <div className="filter-panel-tab-wrapper">
                            <div onClick={() => {setActiveFilterTab(tabEnum.DATASET)}}
                                className={`filter-tab ${activeFilterTab === tabEnum.DATASET ? 'active' : ''} rounded border`}>DATASET</div>
                            <div onClick={() => {setActiveFilterTab(tabEnum.PARTICIPANT)}}
                                className={`filter-tab ${activeFilterTab === tabEnum.PARTICIPANT ? 'active' : ''} rounded border`}>PARTICIPANT</div>
                            
                            <div className="filter-tab filter-tab-control-icon clickable"
                                 alt="Close Filter Tab"
                                 onClick={() => {toggleFilterTab()}}>                                
                                <FontAwesomeIcon
                                    className="fas fa-angles-left " icon={faAnglesLeft} />
                            </div>
                        </div>
                            <React.Fragment>
                            {activeFilterTab === tabEnum.DATASET &&
                            <Container className="mt-3 rounded border p-3 shadow-sm spatial-filter-panel container-max">
                                <Row className="mb-2"><Col><Facet field="datatype" label="Experimental Strategy" filterType="any"
                                                                  view={MultiCheckboxFacet}/></Col></Row>
                                <Row className="mb-2"><Col><Facet field="imagetype" label="Image Type" filterType="any"
                                                                  view={MultiCheckboxFacet}/></Col></Row>
                            </Container>
                            }{activeFilterTab === tabEnum.PARTICIPANT &&
                        <Container className="mt-3 rounded border p-3 shadow-sm spatial-filter-panel container-max">
                            <Row className="mb-2"><Col><Facet field="sex" label="Sex" filterType="any"
                                                              view={MultiCheckboxFacet}/></Col></Row>
                            <Row className="mb-2"><Col><Facet field="age" label="Age" filterType="any"
                                                              view={MultiCheckboxFacet}/></Col></Row>
                            <Row className="mb-2"><Col><Facet field="tissuetype" label="Tissue Type"
                                                              filterType="any"
                                                              view={MultiCheckboxFacet}/></Col></Row>
                            <Row className="mb-2"><Col><Facet inputProps={{ placeholder: "cusaceholder" }} isFilterable={true}  field="redcapid" label="Participant ID"
                                                              filterType="any"
                                                              view={(props) => <MultiCheckboxFacet {...props} searchPlaceholder={"Search..."}/>}/></Col></Row>
                        </Container>
                        }
                            </React.Fragment>
                        </div>

                    </Col>
                    <Col xl={`${filterTabActive ? 9 : 12 }`}>
                        <Row>
                            <Col 
                                className={`filter-collapse clickable ${filterTabActive ? 'hidden': ''}`}
                                xl={1}
                                alt="Open Filter Tab"
                                onClick={() => {toggleFilterTab()}}>
                            <FontAwesomeIcon
                                    className="fas fa-angles-left" icon={faAnglesRight} />
                            </Col>
                            <Col xl={12} className={`my-0 activeFilter-column ${filterTabActive ? 'closed': ''}`}>
                                {props.filters.length === 0 ?

                                <Row className="filter-pill-row inactive-filters">
                                    <span>Select a spatial dataset from the list below to visualize it in the <a target="_blank" rel="noreferrer" href="http://vitessce.io/">Vitessce</a> visual integration tool.</span>
                                </Row>
                                :
                                <Row className="filter-pill-row">
                                    {getFilterPills(props.filters)}
                                </Row>}
                                
                            </Col>
                        </Row>
                        <DndProvider backend={HTML5Backend}>
                            <div className='container-max spatial-data-table-wrapper'>
                                <div className="spatial-data-table">
                                    <React.Fragment>
                                    { isLoaded ?
                                    <Grid
                                        rows={tableData}
                                        columns={getColumns()}>
                                        <SortingState
                                            defaultSorting={[]}
                                            onSortingChange={(sorting) =>  props.setTableSettings({sorting: sorting})}
                                            sorting={sorting}/>
                                        <IntegratedSorting 
                                            columnExtensions={[
                                                { columnName: 'spectrackSampleId', compare: compareTableStrings },
                                                { columnName: 'datatype',          compare: compareTableStrings },
                                                { columnName: 'filename',          compare: compareTableStrings },
                                                { columnName: 'imagetype',         compare: compareTableStrings },
                                                { columnName: 'redcapid',          compare: compareTableStrings }]}
                                        />
                                        <PagingState
                                            currentPage={currentPage}
                                            defaultPageSize={pagingSize}
                                            onCurrentPageChange={(page) => props.setTableSettings({currentPage: page})}
                                        />
                                        <IntegratedPaging />
                                        <PagingPanel />
                                        <Toolbar
                                            cards={cards}
                                            setCards={setCards}
                                        />
                                        <ToolbarButtonState setTableSettings={props.setTableSettings} />
                                        <Table />
                                        <TableColumnResizing
                                            defaultColumnWidths={getDefaultColumnWidths()} minColumnWidth={145}
                                            onColumnWidthsChange={(columnWidths) =>  props.setTableSettings({columnWidths: columnWidths})}
                                            columnWidths={columnWidths}
                                        />

                                        <TableColumnReordering
                                            order={(cards).map(item => item.name)}
                                            defaultOrder={getColumns().map(item => item.name)}
                                        />
                                        <TableHeaderRow showSortingControls />
                                        <TableColumnVisibility
                                            defaultHiddenColumnNames={getDefaultHiddenColumnNames(getColumns())}
                                            hiddenColumnNames={hiddenColumnNames}
                                            onHiddenColumnNamesChange={(hiddenColumnNames) => {props.setTableSettings({hiddenColumnNames: hiddenColumnNames})}}
                                        />
                                        <ColumnChooser />
                                        
                                        <ToolbarButton 
                                            cards={cards}
                                            setCards={setCards}
                                            setDefaultCards={setDefaultCards}
                                            defaultOrder={getColumns().map(item => item.name)} />
                                        <PaginationState
                                            currentPage={currentPage}
                                            setTableSettings={props.setTableSettings}
                                            pagingSize={pagingSize}/>
                                        <Pagination pageSizes={getPageSizes()} />
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

export default ImageDatasetList;
