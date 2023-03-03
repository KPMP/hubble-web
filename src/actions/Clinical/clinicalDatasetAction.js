import actionNames from '../actionNames'
import {
    fetchParticipantClinicalDataset,
    fetchParticipantExperimentCounts,
    fetchParticipantSummaryDataset
} from "../../helpers/Api";
import {mapClinicalKeysToPresentationStyle, mapSummaryKeysToPresentationStyle} from "../../helpers/dataHelper";
import {setExperimentalDataCounts} from "../Experimental/experimentalDatasetAction";

export const fetchAndSetSummaryDatasets = async (participant_id) => {
    let summaryDatasets = await fetchParticipantSummaryDataset(participant_id);
    summaryDatasets = mapSummaryKeysToPresentationStyle(summaryDatasets);
    return (dispatch) => dispatch(setSummaryDatasets(summaryDatasets));
}

export const fetchAndSetClinicalDatasets = async (participant_id) => {
    let clinicalDatasets = await fetchParticipantClinicalDataset(participant_id);
    if (clinicalDatasets) {
        clinicalDatasets = JSON.parse(clinicalDatasets.clinicalData);
    }
    clinicalDatasets = mapClinicalKeysToPresentationStyle(clinicalDatasets);
    return (dispatch) => dispatch(setClinicalDatasets(clinicalDatasets));
}

export const setSummaryDatasets = (summaryDatasets) => {
  return {
      type: actionNames.SET_SUMMARY_DATASETS,
      payload: summaryDatasets
  }
}

export const setClinicalDatasets = (clinicalDatasets) => {
  return {
      type: actionNames.SET_CLINICAL_DATASETS,
      payload: clinicalDatasets
  }
}


