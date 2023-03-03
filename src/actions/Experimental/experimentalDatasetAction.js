import actionNames from '../actionNames'
import {fetchParticipantExperimentCounts} from "../../helpers/Api";

export const fetchAndSetExperimentalDataCounts = async (participant_id) => {
    let experimentalDataCounts = await fetchParticipantExperimentCounts(participant_id);
    return (dispatch) => dispatch(setExperimentalDataCounts(experimentalDataCounts));
}

export const setExperimentalDataCounts = (experimentalDataCounts) => {
  return {
      type: actionNames.SET_EXPERIMENTAL_DATASETS,
      payload: experimentalDataCounts
  }
}

