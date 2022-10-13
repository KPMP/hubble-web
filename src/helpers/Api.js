import axios from 'axios';
import { apolloClient } from './ApolloClient';
import { gql } from "@apollo/client";
import { store } from '../App';
import { sendMessageToBackend } from '../actions/Error/errorActions';

export default class Api {
  static getInstance() {
    return axios.create({
      timeout: 10000,
    });
  }
}

export const getFileLink = async (queryString) => {
  const api_host = process.env.REACT_APP_API_HOST ? process.env.REACT_APP_API_HOST : '';
  return Api.getInstance().get(api_host + "/api/v1/derived/download/" + queryString)
};


export const fetchParticipantSummaryDataset = async (participant_id) => {
  const query = gql`
  query participantSummaryDataset($participant_id: String) {
    participantSummaryDataset(participant_id: $participant_id){
      tissue_type
      redcap_id
    }
  }`;
  const response = await apolloClient.query({
      query: query,
      variables: {
        participant_id: participant_id
      }
    });
  
  if (response && response.data && response.data.participantSummaryDataset) {
      return response.data.participantSummaryDataset;
  } else {
      store.dispatch(sendMessageToBackend("Could not retrieve participantSummaryDataset: " + response.error));
  }
};