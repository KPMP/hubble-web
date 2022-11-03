import {connect} from "react-redux";
import ImageDatasetList from "./ImageDatasetList";
import { withRouter } from 'react-router';
import {setSelectedImageDataset, setTableSettings} from "../../actions/Images/imageDatasetActions";
import { withSearch } from "@elastic/react-search-ui";

const mapStateToProps = (state, props) =>
    ({
        selectedImageDataset: state.selectedImageDataset,
        tableSettings: state.tableSettings
    });

const mapDispatchToProps = (dispatch, props) =>
    ({
        setSelectedImageDataset(selectedImageDataset) {
             dispatch(setSelectedImageDataset(selectedImageDataset));
             dispatch((dispatch) => props.history.push("/view"));
         },
         setTableSettings(componentState) {
            dispatch(setTableSettings(componentState))
         }
    });

const mapSearchToProps = (context) => ({
    searchContext: context,
    results: context.results,
    setResultsPerPage: context.setResultsPerPage,
    filters: context.filters,
    removeFilter: context.removeFilter
});

export default withRouter(
    withSearch(mapSearchToProps),
    connect(mapStateToProps, mapDispatchToProps))(ImageDatasetList)