import axios from 'axios';

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
