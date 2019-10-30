// ./src/middlewares/sethAuth.js

import axios from 'axios';
import store from "../store";

export default function () {
  if (store.state.authToken !== '') {
    axios.defaults.headers.common.Authorization = store.state.authToken;
  }
}
