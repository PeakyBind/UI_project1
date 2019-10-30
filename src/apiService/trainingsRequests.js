import axios from "axios";
import config from '../config';

const API_URL = config.API_URL + '/trainings';

export default {
  getTrainings: async function () {
    const url = `${API_URL}`;
    return await axios.get(url);
  },

  addTraining: async function (data) {
    const url = `${API_URL}/add`;
    return await axios.post(url, data);
  },

  addTrainingImported: async function (data) {
    const url = `${API_URL}/addImported`;
    return await axios.post(url, data);
  },

  importYoutubePlaylist: async function (playlist) {
    const url = `${API_URL}/youtubeImport`;
    return await axios.post(url, playlist);
  },

  editTraining: async function (id, data) {
    const url = `${API_URL}/${id}`;
    return await axios.put(url, data);
  },

  deleteTraining: async function (id) {
    const url = `${API_URL}/${id}`;
    return await axios.delete(url);
  }
}
