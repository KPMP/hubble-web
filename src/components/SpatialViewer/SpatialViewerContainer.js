import {connect} from "react-redux";
import SpatialViewer from "./SpatialViewer";
import { withRouter } from 'react-router';
import { setClinicalDatasets, setSummaryDatasets } from "../../actions/Clinical/clinicalDatasetAction";
import { setExperimentalDataCounts } from "../../actions/Experimental/experimentalDatasetAction";

const mapStateToProps = (state, props) =>
    ({
        selectedImageDataset: state.selectedImageDataset,
        summaryDatasets: state.summaryDatasets,
        clinicalDatasets:  state.clinicalDatasets,
        experimentalDataCounts: state.experimentalDataCounts,
    });

const mapDispatchToProps = (dispatch, props) =>
    ({
        setSummaryDatasets(participant_id) {
            const summaryDatasets = {}
            summaryDatasets[participant_id] = {
                "Participant ID": "ABC-123",
                "Disease Type": "AKI",
            }
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
        setExperimentalDataCounts(participant_id) {
            const experimentalDataCounts = {}
            experimentalDataCounts[participant_id] = {
                'Light Microscopic Whole Slide Image': '8',
                'CODEX': 0,
                'Single-cell RNA-Seq': 1,
                'Single-nucleus RNA-Seq': 30,
                'Regional Transcriptomics': 100
            }
            dispatch(setExperimentalDataCounts(experimentalDataCounts));
        }

    });

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SpatialViewer));