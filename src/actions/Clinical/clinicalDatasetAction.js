import actionNames from '../actionNames'
import {mapClinicalKeysToPresentationStyle, mapSummaryKeysToPresentationStyle} from "../../helpers/dataHelper";
import {fetchParticipantClinicalDataset, fetchParticipantSummaryDataset} from "../../helpers/Api";

export const fetchAndSetSummaryDatasets = (participant_id) => {
    return async (dispatch) => {
        let summaryDatasets = await fetchParticipantSummaryDataset(participant_id);
        summaryDatasets = mapSummaryKeysToPresentationStyle(summaryDatasets);
        dispatch(setSummaryDatasets(summaryDatasets));
    }
}

export const fetchAndSetClinicalDatasets = (participant_id) => {
    return async (dispatch) => {
        let clinicalDatasets = await fetchParticipantClinicalDataset(participant_id);
        console.log(clinicalDatasets)
        if (clinicalDatasets) {
            clinicalDatasets = JSON.parse(clinicalDatasets);
        }
        clinicalDatasets = mapClinicalKeysToPresentationStyle(clinicalDatasets);
        dispatch(setClinicalDatasets(clinicalDatasets));
    }
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


