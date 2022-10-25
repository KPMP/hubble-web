import {connect} from "react-redux";
import SpatialViewer from "./SpatialViewer";
import { withRouter } from 'react-router';
import { setClinicalDatasets, setSummaryDatasets } from "../../actions/Clinical/clinicalDatasetAction";
import { setExperimentalDataCounts } from "../../actions/Experimental/experimentalDatasetAction";
import { mapKeysToPresentationStyle } from "../../helpers/dataHelper";
import { fetchParticipantSummaryDataset, fetchParticipantExperimentCounts } from "../../helpers/Api";

const mapStateToProps = (state, props) =>
    ({
        selectedImageDataset: state.selectedImageDataset,
        summaryDatasets: state.summaryDatasets,
        clinicalDatasets:  state.clinicalDatasets,
        experimentalDataCounts: state.experimentalDataCounts,
    });

const mapDispatchToProps = (dispatch, props) =>
    ({
        async setSummaryDatasets(participant_id) {
            let summaryDatasets = await fetchParticipantSummaryDataset(participant_id);
            summaryDatasets = mapKeysToPresentationStyle(summaryDatasets);
            dispatch(setSummaryDatasets(summaryDatasets));
        },
        setClinicalDatasets(participant_id) {
            // api call to get clinical data
            const clinicalDatasets = {}
            clinicalDatasets[participant_id] = {
                "Sex:": "Male",
                "Age": "60-69",
                "Ethnicity": "White",
                'KDIGO Stage': 'Stage 2',
                "Baseline_eGFR (ml/min/1.73m2)": "60-69",
                "Proteinuria (mg)": "150mg-499mg",
                "A1C (%)": ">8.5",
                "Albuminuria(mg)": "",
                "Diabetes History": "Yes",
                "Hypertension History": "14-Oct",
                "Hypertension Duration(years)": "",
                "On RAAS Blockade": "No",
            }
            dispatch(setClinicalDatasets(clinicalDatasets));
        },
        async setExperimentalDataCounts(participant_id) {
            let experimentalDataCounts = await fetchParticipantExperimentCounts(participant_id);
            dispatch(setExperimentalDataCounts(experimentalDataCounts));
        }

    });

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SpatialViewer));