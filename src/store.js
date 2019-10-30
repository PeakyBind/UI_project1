import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from "vuex-persist";
import state from "./store/state";
import getters from "./store/getters";
import mutations from "./store/mutations";
import actions from "./store/actions";

Vue.use(Vuex);

const vuexSessionStorage = new VuexPersistence({
  key: 'vuex',
  storage: window.sessionStorage,
});

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
  plugins: [vuexSessionStorage.plugin],
})
