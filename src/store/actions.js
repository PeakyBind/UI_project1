import APIService from "../APIService";
import convertDate from "../utils/convertDate";
import convertYoutubeDuration from "../utils/convertYoutubeDuration";
import decodeToken from "../utils/decodeToken";

const apiService = new APIService();

export default {
  async getUsers({ commit }) {
    const users = await apiService.getUsers();
    for (let user of users.data) {
      user.createdAt = convertDate(user.createdAt);
    }
    commit('getUsers', users.data);
  },

  async getUser({ commit }, id) {
    const User = await apiService.getUserById(id);
    User.createdAt = convertDate(User.createdAt);
    User.updatedAt = convertDate(User.updatedAt);
    commit('getUser', User.data);
  },

  async updatePassword(context, data) {
    await apiService.updatePassword(data.id, data);
  },

  async uploadAvatar(context, data) {
    await apiService.uploadAvatar(data.get('id'), data);
    context.dispatch('getUser', data.get('id'));
  },

  async updateUserTrainings(context, data) {
    await apiService.updateUserTrainings(data.user.id, data.training);
  },

  async deleteUser({ commit }, id) {
    await apiService.deleteUser(id);
    commit('deleteUser', id);
  },

  async getCategories({ commit }) {
    const categories = await apiService.getCategories();
    commit('getCategories', categories.data);
  },

  async addCategorie(context, data) {
    await apiService.addCategorie(data);
    context.dispatch('getCategories');
  },

  async editCategorie(context, data) {
    await apiService.editCategorie(data.id, data.item);
    context.dispatch('getCategories');
  },

  async deleteCategorie(context, id) {
    await apiService.deleteCategorie(id);
    context.dispatch('getCategories');
  },

  async getTrainings({ commit }) {
    const trainings = await apiService.getTrainings();
    commit('getTrainings', trainings.data);
  },

  async addTraining(context, data) {
    await apiService.addTraining(data);
    context.dispatch('getTrainings');
  },

  async addTrainingImported(context, data) {
    await apiService.addTrainingImported(data);
    context.dispatch('getTrainings');
  },

  async editTraining(context, data) {
    await apiService.editTraining(data.id, data.item);
    context.dispatch('getTrainings');
  },

  async deleteTraining(context, id) {
    await apiService.deleteTraining(id);
    context.dispatch('getTrainings');
  },

  async getTutorials({ commit }) {
    const tutorials = await apiService.getTutorials();
    for (let tutorial of tutorials.data) {
      tutorial.video.publishedAt = convertDate(tutorial.video.publishedAt);
      tutorial.video.duration = convertYoutubeDuration(tutorial.video.duration);
    }
    commit('getTutorials', tutorials.data);
  },

  async addTutorial(context, data) {
    await apiService.addTutorial(data);
    context.dispatch('getTutorials');
  },

  async editTutorial(context, data) {
    await apiService.editTutorial(data.id, data);
    context.dispatch('getTutorials');
  },

  async deleteTutorial(context, id) {
    await apiService.deleteTutorial(id);
    context.dispatch('getTutorials');
  },

  async getArticles({ commit }) {
    const articles = await apiService.getArticles();
    commit('getArticles', articles.data);
  },

  async addArticle(context, data) {
    await apiService.addArticle(data);
    context.dispatch('getArticles');
  },

  async signIn(context, data) {
    const response = await apiService.signIn(data);
    const { token } = response.data;
    context.commit('storeToken', token);

    const decoded = decodeToken(token);
    context.commit('setConnection', decoded.sub);
  },

  async signUp(context, data) {
    const response = await apiService.signUp(data);
    const { token } = response.data;
    context.commit('storeToken', token);

    const decoded = decodeToken(token);
    context.commit('setConnection', decoded.sub);
  }
}
