import axios from "axios";
import config from '../config';

const API_URL = config.API_URL + '/articles';

export default {
  getArticles: async function () {
    const url = `${API_URL}`;
    return await axios.get(url);
  },

  addArticle: async function (data) {
    const url = `${API_URL}/add`;
    return await axios.post(url, data);
  }
}
