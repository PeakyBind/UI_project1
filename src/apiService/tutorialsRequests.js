import axios from "axios";
import config from '../config';

const API_URL = config.API_URL + '/tutorials';

export default {
  getTutorials: async function () {
    const url = `${API_URL}`;
    return await axios.get(url);
  },

  addTutorial: async function (data) {
    const url = `${API_URL}/add`;
    return await axios.post(url, data);
  },

  importYoutubeVideo: async function (video) {
    const url = `${API_URL}/youtubeImport`;
    return await axios.post(url, video);
  },

  editTutorial: async function (id, data) {
    const url = `${API_URL}/${id}`;
    return await axios.put(url, data);
  },

  deleteTutorial: async function (id) {
    const url = `${API_URL}/${id}`;
    return await axios.delete(url);
  }
}
