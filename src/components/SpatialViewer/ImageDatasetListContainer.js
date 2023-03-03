import {connect} from "react-redux";
import { withRouter } from 'react-router';
import {setSelectedImageDataset, setTableSettings} from "../../actions/Images/imageDatasetActions";
import ImageDatasetListSubContainer from "./ImageDatasetListSubContainer";
import {
    fetchParticipantClinicalDataset,
    fetchParticipantExperimentCounts,
    fetchParticipantSummaryDataset
} from "../../helpers/Api";
import {mapClinicalKeysToPresentationStyle, mapSummaryKeysToPresentationStyle} from "../../helpers/dataHelper";
import {
    fetchAndSetSummaryDatasets,
    setClinicalDatasets,
    setSummaryDatasets
} from "../../actions/Clinical/clinicalDatasetAction";
import {
    fetchAndSetExperimentalDataCounts,
    setExperimentalDataCounts
} from "../../actions/Experimental/experimentalDatasetAction";

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
        setSelectedImageDatasetReportCard(selectedImageDataset) {
            dispatch(setSelectedImageDataset(selectedImageDataset));
        },
        setSummaryDatasets(participant_id) {
            dispatch(fetchAndSetSummaryDatasets(participant_id));
        },
        setClinicalDatasets(participant_id) {
            dispatch(fetchParticipantClinicalDataset(participant_id));
        },
        setExperimentalDataCounts(participant_id) {
            dispatch(fetchAndSetExperimentalDataCounts(participant_id));
        },
         setTableSettings(componentState) {
            dispatch(setTableSettings(componentState))
         }
    });

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ImageDatasetListSubContainer))