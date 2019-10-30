export default {
  getUsers(state, users) {
    state.users = users;
  },

  getUser(state, user) {
    state.user = user;
  },

  storeToken(state, token) {
    state.authToken = token;
  },

  setConnection(state, userId) {
    state.connected = true;
    state.user.id = userId;
  },

  deleteUser(state, id) {
    const userToDelete = state.users.find(element => element.id === id);
    const userToDeleteIndex = state.users.indexOf(userToDelete);
    state.users.splice(userToDeleteIndex, 1);
  },

  getCategories(state, categories) {
    state.categories = categories;
  },

  getTrainings(state, trainings) {
    state.trainings = trainings;
  },

  getTutorials(state, tutorials) {
    state.tutorials = tutorials;
  },

  getArticles(state, articles) {
    state.articles = articles;
  }
}
