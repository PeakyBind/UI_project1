import axios from "axios";
import config from '../config';

const API_URL = config.API_URL + '/categories';

export default {
  getCategories: async function () {
    const url = `${API_URL}`;
    return await axios.get(url);
  },

  addCategorie: async function (data) {
    const url = `${API_URL}/add`;
    return await axios.post(url, data);
  },

  editCategorie: async function (id, data) {
    const url = `${API_URL}/${id}`;
    return await axios.put(url, data);
  },

  deleteCategorie: async function (id) {
    const url = `${API_URL}/${id}`;
    return await axios.delete(url);
  }
}
