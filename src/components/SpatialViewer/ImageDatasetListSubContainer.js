import React, { Component } from 'react';
import { Container } from "reactstrap";
import ImageDatasetList from "./ImageDatasetList";

import { WithSearch } from "@elastic/react-search-ui";
import { handleGoogleAnalyticsEvent } from '../../helpers/googleAnalyticsHelper';

class ImageDatasetListSubContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeFilterTab: 'DATASET',
            reportCardOpen: false,
            filterTabActive: true
        };

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

    setActiveFilterTab = (tabName) => {
        this.setState({activeFilterTab: tabName});
    };

    toggleFilterTab = () => {
        if(this.state.filterTabActive) {
            this.setState({filterTabActive: false});
        } else {
            this.setState({filterTabActive: true});
        }
    };

    render() {
        return (
            <Container id='outer-wrapper' className="multi-container-container container-xxl">
            <WithSearch mapContextToProps={({ filters, results, searchContext,setResultsPerPage,removeFilter, clearFilters}) =>
             ({filters, results, searchContext,setResultsPerPage,removeFilter, clearFilters})}>
                {(context) => {
                const { filters, results, searchContext, setResultsPerPage, removeFilter, clearFilters } = context;
                return (
                    <ImageDatasetList
                        reportCardOpen={this.state.reportCardOpen}
                        openReportCard={this.openReportCard}
                        closeReportCard={this.closeReportCard}
                        filters={filters}
                        results={results}
                        searchContext={searchContext}
                        setResultsPerPage={setResultsPerPage}
                        removeFilter={removeFilter}
                        clearFilters={clearFilters}
                        setActiveFilterTab={this.setActiveFilterTab}
                        activeFilterTab={this.state.activeFilterTab}
                        filterTabActive={this.state.filterTabActive}
                        toggleFilterTab={this.toggleFilterTab}
                        {...this.props}
                    />
                )}}
                </WithSearch>
            </Container>
        )
    }
}

export default ImageDatasetListSubContainer;
