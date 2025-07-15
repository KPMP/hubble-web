import React, { Component } from 'react';
import { Container } from "reactstrap";
import ImageDatasetList from "./ImageDatasetList";

import { NavFooter } from 'kpmp-common-components';
import { handleGoogleAnalyticsEvent } from '../../helpers/googleAnalyticsHelper';
import AppSearchAPIConnector from "@elastic/search-ui-app-search-connector";
import { SearchProvider, WithSearch } from "@elastic/react-search-ui";


const connector = new AppSearchAPIConnector({
    searchKey: process.env.REACT_APP_SEARCH_KEY,
    engineName: "spatial-viewer",
    endpointBase: process.env.REACT_APP_SEARCH_ENDPOINT,
    cacheResponses: false
  })
  
  const searchConfig = {
    apiConnector: connector,
    searchQuery: {
        disjunctiveFacets: [
          "sex", 
          "age", 
          "redcapid", 
          "enrollmentcategory", 
          "imagetype", 
          "datatype", 
          "configtype", 
          "level", 
          "releaseversion",
          "race",
          "proteinuria",
          "hypertensionhistory",
          "hypertensionduration",
          "onraasblockade",
          "diabetesduration",
          "diabeteshistory",
          "kdigostage",
          "a1c",
          "albuminuria",
          "baselineegfr",
          "primaryadjudicatedcategory",
          ],
        facets: {
          sex: { type: "value", sort: {"value": "asc"}, size: 100},
          age: { type: "value", sort: {"value": "asc"}, size: 100},
          redcapid: { type: "value", sort: {"value": "asc"}, size: 500 },
          enrollmentcategory: { type: "value", sort: {"value": "asc"}, size: 100},
          imagetype: { type: "value", sort: {"value": "asc"}, size: 100},
          datatype: { type: "value", sort: {"value": "asc"}, size: 100 },
          configtype: { type: "value", sort: {"value": "asc"}, size: 100},
          level: { type: "value", sort: {"value": "asc"}, size: 100},
          releaseversion: {type: "value", sort: {"value": "asc"}, size: 250},
          race: {type: "value", sort: {"value": "asc"}, size: 250},
          proteinuria: {type: "value", sort: {"value": "asc"}, size: 250},
          hypertensionhistory: {type: "value", sort: {"value": "asc"}, size: 250},
          hypertensionduration: {type: "value", sort: {"value": "asc"}, size: 250},
          onraasblockade:{type: "value", sort: {"value": "asc"}, size: 250},
          diabetesduration: {type: "value", sort: {"value": "asc"}, size: 250},
          diabeteshistory: {type: "value", sort: {"value": "asc"}, size: 250},
          kdigostage: {type: "value", sort: {"value": "asc"}, size: 250},
          a1c: {type: "value", sort: {"value": "asc"}, size: 250},
          albuminuria: {type: "value", sort: {"value": "asc"}, size: 250},
          baselineegfr: {type: "value", sort: {"value": "asc"}, size: 250},
          primaryadjudicatedcategory: {type: "value", sort: {"value": "asc"}, size: 250},
        }
    },
    initialState: {
      resultsPerPage: 20,
      current: 1
    },
    trackUrlState: true,
    alwaysSearchOnInitialLoad: true
  }

class ImageDatasetListSubContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeFilterTab: 'DATASET',
            reportCardOpen: false,
            filterTabActive: true, 
            search: ""
        };

    }

    clearSearch = () => {
        this.setState({search: null})
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
            <SearchProvider config={searchConfig}>
                <Container id='outer-wrapper' className="multi-container-container container-xxl">
                    <WithSearch mapContextToProps={({ filters, current, setCurrent, results, resultsPerPage, searchContext, setResultsPerPage, removeFilter, clearFilters, totalResults, setSort}) =>
                    ({filters, current, setCurrent, results, resultsPerPage, searchContext, setResultsPerPage, removeFilter, clearFilters, totalResults, setSort})}>
                        {(context) => {
                        const { filters, current, setCurrent, results, searchContext, resultsPerPage, setResultsPerPage, removeFilter, clearFilters, totalResults, setSort } = context;
                        return (
                            <ImageDatasetList
                                reportCardOpen={this.state.reportCardOpen}
                                currentPage={current}
                                setCurrent={setCurrent}
                                setSort={setSort}
                                totalResults={totalResults}
                                resultsPerPage={resultsPerPage}
                                openReportCard={this.openReportCard}
                                closeReportCard={this.closeReportCard}
                                filters={filters}
                                results={results}
                                searchContext={searchContext}
                                setResultsPerPage={setResultsPerPage}
                                removeFilter={removeFilter}
                                clearFilters={clearFilters}
                                clearSearch={this.clearSearch}
                                setActiveFilterTab={this.setActiveFilterTab}
                                activeFilterTab={this.state.activeFilterTab}
                                filterTabActive={this.state.filterTabActive}
                                toggleFilterTab={this.toggleFilterTab}
                                {...this.props}
                            />
                        )}}
                    </WithSearch>
                    <NavFooter app='atlas' />
                </Container>
            </SearchProvider>
        )
    }
}

export default ImageDatasetListSubContainer;
