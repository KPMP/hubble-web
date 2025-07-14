import {connect} from "react-redux";
import SpatialViewer from "./SpatialViewer";
import { withRouter } from 'react-router';
import {
    fetchAndSetClinicalDatasets,
    fetchAndSetSummaryDatasets
} from "../../actions/Clinical/clinicalDatasetAction";
import {
    fetchAndSetExperimentalDataCounts
} from "../../actions/Experimental/experimentalDatasetAction";
import { setSelectedImageDataset } from "../../actions/Images/imageDatasetActions";

const mapStateToProps = (state, props) =>
    ({
        selectedImageDataset: state.selectedImageDataset,
        summaryDatasets: state.summaryDatasets,
        clinicalDatasets:  state.clinicalDatasets,
        experimentalDataCounts: state.experimentalDataCounts,
    });

const mapDispatchToProps = (dispatch, props) =>
    ({
        setSelectedImageDataset(selectedImageDataset) {
            dispatch(setSelectedImageDataset(selectedImageDataset));
        },
        setSummaryDatasets(participant_id) {
            dispatch(fetchAndSetSummaryDatasets(participant_id));
        },
        setClinicalDatasets(participant_id) {
            dispatch(fetchAndSetClinicalDatasets(participant_id));
        },
        setExperimentalDataCounts(participant_id) {
            dispatch(fetchAndSetExperimentalDataCounts(participant_id));
        },

    });

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SpatialViewer));