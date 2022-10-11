import React, { Component } from 'react';
import { Col, Row } from "reactstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDoubleRight } from "@fortawesome/free-solid-svg-icons";
import PropTypes from 'prop-types';
import { Grid, Table, TableColumnResizing, TableHeaderRow} from '@devexpress/dx-react-grid-bootstrap4';
import '@devexpress/dx-react-grid-bootstrap4/dist/dx-react-grid-bootstrap4.css';
import { dataToTableConverter } from '../../helpers/dataHelper';

class ReportCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: true
        }
    }
    getDefaultColumnWidths = () => {
        return [
            { columnName: 'key', width: 225 },
            { columnName: 'value', width: 150 },
        ]
    };
    getDefaultLinkColumnWidths = () => {
        return [
            { columnName: 'key', width: 350 },
            { columnName: 'value', width: 40 },
        ]
    };
    getColumns = () => {
        return [
            {
                name: 'key',
                sortable: false,
                hideable: false,
                defaultHidden: false,
            },
            {
                name: 'value',
                sortable: false,
                hideable: false,
                defaultHidden: false,
            },
        ];
    };

    formatLinkableCellKey = (row) => {
        let key = row['key'];
        if (row['key'] === 'Single-cell RNA-Seq'
         || row['key'] === 'Single-nucleus RNA-Seq'
         || row['key'] === 'Regional Transcriptomics' ) {
            key = (<div>{`${row['key']}`} <span className="u-controlled-access-asterisk">*</span></div>);
        } else {
            key = (<div>{`${row['key']}`}</div>);
        }
        return( key )
    }

    formatLinkableCellValue = (row) => {
        return( row['value'] > 0 ? <a className="p-0" href="/">{row['value']}</a>: <span>{row['value']}</span>)
    }
    
    getLinkableColumns = () => {
        return [
            {
                name: 'key',
                sortable: false,
                hideable: false,
                defaultHidden: false,
                getCellValue: row => this.formatLinkableCellKey(row)
            },
            {
                name: 'value',
                sortable: false,
                hideable: false,
                defaultHidden: false,
                getCellValue: row => this.formatLinkableCellValue(row)
            },
        ];
    };

    getRows = (dataset) => {
        return dataToTableConverter(dataset)
    }

    render() {
        return (
            <div className={`flyout shadow-sm border u-transition ${this.props.reportCardOpen ? "open" : "closed"}`}>
                <Row className="header u-gutter-fix">
                    <Col className="pt-1 pb-1">
                        <div className="pr-2 d-inline clickable" onClick={()=>{this.props.closeReportCard()}}>
                            <FontAwesomeIcon className="fa fa-angle-double-right" icon={faAngleDoubleRight} />
                        </div>
                        <span>Participant Information</span>
                    </Col>
                </Row>
                
                <div className="container">
                    <div className="report-card">
                        <React.Fragment>
                            <h4 className='mt-3'>Summary</h4>
                            <div className="u-border-helper">
                                <Grid rows={this.getRows(this.props.summaryDataset)} columns={this.getColumns()}>
                                    <Table/>
                                    <TableColumnResizing defaultColumnWidths={this.getDefaultColumnWidths()} />
                                    <TableHeaderRow />
                                </Grid>
                            </div>
                        </React.Fragment>
                    </div>

                    <div className="report-card">
                        <React.Fragment>
                        <h4 className="mt-3">Clinical</h4>
                            <div className="u-border-helper">
                            <Grid rows={this.getRows(this.props.clinicalDataset)} columns={this.getColumns()}>
                                <Table />
                                <TableColumnResizing defaultColumnWidths={this.getDefaultColumnWidths()} />
                                <TableHeaderRow />
                            </Grid>
                            </div>
                            
                        </React.Fragment>
                    </div>

                    <div className="report-card">
                        <React.Fragment>
                            <h4 className="mt-3">Counts By Experimental Strategy</h4>
                            <div className="u-border-helper">
                                <Grid rows={this.getRows(this.props.experimentalDataCounts)} columns={this.getLinkableColumns()}>
                                    <Table columnExtensions={[{ columnName: 'value', align: 'right' }]} />
                                    <TableColumnResizing defaultColumnWidths={this.getDefaultLinkColumnWidths()} />
                                    <TableHeaderRow />
                                </Grid>
                            </div>
                        </React.Fragment>
                    </div>
                    <div className="mt-3 mb-3 font-italic">
                        <span className="u-controlled-access-asterisk">*</span> = Aggregated dataset opens in Explorer
                    </div>
                </div>
            </div>
        )
    }
}

ReportCard.propTypes = {
    reportCardOpen: PropTypes.bool.isRequired,
    closeReportCard: PropTypes.func.isRequired,
    summaryDataset: PropTypes.object.isRequired,
    clinicalDataset: PropTypes.object.isRequired,
    experimentalDataCounts: PropTypes.object.isRequired,
}

export default ReportCard;