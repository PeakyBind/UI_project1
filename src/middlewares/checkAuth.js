// ./src/middlewares/checkAuth.js

import JWT from 'jsonwebtoken';
import APIService from '../APIService';
import store from "../store";

const apiService = new APIService();

export default async (to, from, next) => {
  if (from) {
    const token = store.state.authToken;
    const decoded = JWT.decode(token);
    if (decoded) {
      if(await apiService.checkAuth(decoded.sub)) {
        store.commit('setConnection', decoded.sub)
      }
    }
    next();
  }
};
