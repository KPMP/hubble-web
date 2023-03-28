import {connect} from "react-redux";
import { withRouter } from 'react-router';
import {setSelectedImageDataset, setTableSettings} from "../../actions/Images/imageDatasetActions";
import ImageDatasetListSubContainer from "./ImageDatasetListSubContainer";
import {
    fetchAndSetSummaryDatasets,
    fetchAndSetClinicalDatasets
} from "../../actions/Clinical/clinicalDatasetAction";
import {
    fetchAndSetExperimentalDataCounts,
} from "../../actions/Experimental/experimentalDatasetAction";

const mapStateToProps = (state, props) =>
    ({
        selectedImageDataset: state.selectedImageDataset,
        tableSettings: state.tableSettings,
        summaryDatasets: state.summaryDatasets,
        clinicalDatasets:  state.clinicalDatasets,
        experimentalDataCounts: state.experimentalDataCounts,
    });

const mapDispatchToProps = (dispatch, props) =>
    ({
        setSelectedImageDataset(selectedImageDataset) {
             dispatch((dispatch) => {
                 if (selectedImageDataset['configtype'] === 'external_link') {
                     window.open(selectedImageDataset['externallink'], '_blank')
                 } else {
                     dispatch(setSelectedImageDataset(selectedImageDataset));
                     dispatch((dispatch) => props.history.push("/view"));
                 }
             })
         },
        setSelectedImageDatasetReportCard(selectedImageDataset) {
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
         setTableSettings(componentState) {
            dispatch(setTableSettings(componentState))
         }
    });

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ImageDatasetListSubContainer))