import React, { Component } from 'react';
import { Col, Row } from "reactstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDoubleRight } from "@fortawesome/free-solid-svg-icons";
import PropTypes from 'prop-types';
import { Grid, Table } from '@devexpress/dx-react-grid-bootstrap4';
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
            { columnName: 'key', width: 30 },
            { columnName: 'value', width: 30 },
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

    getLinkableColumns = () => {
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
                getCellValue: row => {return( row['value'] > 0 ? <a href="/">{row['value']}</a>: <span>{row['value']}</span>) }

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

                <div className="absolute-scroll-fix">

                    <div>
                        <React.Fragment>
                            <h3>Summary</h3>
                            <Grid rows={this.getRows(this.props.summaryDataset)} columns={this.getColumns()}>
                                <Table />
                            </Grid>
                        </React.Fragment>
                    </div>

                    <div>
                        <React.Fragment>
                            <h3>Clinical</h3>
                            <Grid rows={this.getRows(this.props.clinicalDataset)} columns={this.getColumns()}>
                                <Table />
                            </Grid>
                        </React.Fragment>
                    </div>

                    <div>
                        <React.Fragment>
                            <h3>Counts By Experimental Strategy</h3>
                            <Grid rows={this.getRows(this.props.experimentalDataCounts)} columns={this.getLinkableColumns()}>
                                <Table />
                            </Grid>
                        </React.Fragment>
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