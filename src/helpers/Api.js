import axios from 'axios';

export default class Api {
  static getInstance() {
    return axios.create({
      timeout: 10000,
    });
  }
}

export const getFileLink = async (queryString) => {
  return Api.getInstance().get("/api/v1/derived/download/" + queryString)
};
