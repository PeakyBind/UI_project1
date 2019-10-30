import axios from "axios";
import config from '../config';

const API_URL = config.API_URL + '/users';

export default {
  getUsers: async function () {
    const url = `${API_URL}`;
    return await axios.get(url);
  },

  getUserById: async function (id) {
    const url = `${API_URL}/${id}`;
    return await axios.get(url);
  },

  checkAuth: async function (id) {
    const url = `${API_URL}/checkAuth/${id}`;
    return await axios.get(url);
  },

  updatePassword: async function (id, data) {
    const url = `${API_URL}/${id}/password`;
    return await axios.put(url, data);
  },

  uploadAvatar: async function (id, data) {
    const url = `${API_URL}/${id}/avatar`;
    return await axios.post(url, data);
  },

  updateUserTrainings: async function (id, data) {
    const url = `${API_URL}/${id}/trainings`;
    return await axios.post(url, data);
  },

  deleteUser: async function (id) {
    const url = `${API_URL}/${id}`;
    return await axios.delete(url, id);
  },

  signIn: async function (data) {
    const url = `${API_URL}/signin`;
    return await axios.post(url, data);
  },

  signUp: async function (data) {
    const url = `${API_URL}/signup`;
    return await axios.post(url, data);
  },

  oauthGoogle: async function () {
    const url = `${API_URL}/oauth/google`;
    return await axios.get(url);
  }

}
