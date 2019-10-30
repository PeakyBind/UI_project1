import categoriesRequests from "./apiService/categoriesRequests";
import usersRequests from "./apiService/usersRequests";
import trainingsRequests from "./apiService/trainingsRequests";
import tutorialsRequests from "./apiService/tutorialsRequests";
import articlesRequests from "./apiService/articlesRequests";

class APIService {}

for (let key in categoriesRequests) {
  APIService.prototype[key] = categoriesRequests[key];
}

for (let key in usersRequests) {
  APIService.prototype[key] = usersRequests[key];
}

for (let key in trainingsRequests) {
  APIService.prototype[key] = trainingsRequests[key];
}

for (let key in tutorialsRequests) {
  APIService.prototype[key] = tutorialsRequests[key];
}

for (let key in articlesRequests) {
  APIService.prototype[key] = articlesRequests[key];
}

export default APIService;

/*

export default class {
  async getUsers() {
    const url = `${API_URL}/users`;
    return await axios.get(url);
  }

  async getUserById(id) {
    const url = `${API_URL}/users/${id}`;
    return await axios.get(url);
  }

  async checkAuth(id) {
    const url = `${API_URL}/users/checkAuth/${id}`;
    return await axios.get(url);
  }

  async updatePassword(id, data) {
    const url = `${API_URL}/users/${id}/password`;
    return await axios.put(url, data);
  }

  async uploadAvatar(id, data) {
    const url = `${API_URL}/users/${id}/avatar`;
    return await axios.post(url, data);
  }

  async updateUserTrainings(id, data) {
    const url = `${API_URL}/users/${id}/trainings`;
    return await axios.post(url, data);
  }

  async deleteUser(id) {
    const url = `${API_URL}/users/${id}`;
    return await axios.delete(url, id);
  }

  async getCategories() {
    const url = `${API_URL}/categories`;
    return await axios.get(url);
  }

  async addCategorie(data) {
    const url = `${API_URL}/categories/add`;
    return await axios.post(url, data);
  }

  async editCategorie(id, data) {
    const url = `${API_URL}/categories/${id}`;
    return await axios.put(url, data);
  }

  async deleteCategorie(id) {
    const url = `${API_URL}/categories/${id}`;
    return await axios.delete(url);
  }

  async getTrainings() {
    const url = `${API_URL}/trainings`;
    return await axios.get(url);
  }

  async addTraining(data) {
    const url = `${API_URL}/trainings/add`;
    return await axios.post(url, data);
  }

  async addTrainingImported(data) {
    const url = `${API_URL}/trainings/addImported`;
    return await axios.post(url, data);
  }

  async importYoutubePlaylist(playlist) {
    const url = `${API_URL}/trainings/youtubeImport`;
    return await axios.post(url, playlist);
  }

  async editTraining(id, data) {
    const url = `${API_URL}/trainings/${id}`;
    return await axios.put(url, data);
  }

  async deleteTraining(id) {
    const url = `${API_URL}/trainings/${id}`;
    return await axios.delete(url);
  }

  async getTutorials() {
    const url = `${API_URL}/tutorials`;
    return await axios.get(url);
  }

  async addTutorial(data) {
    const url = `${API_URL}/tutorials/add`;
    return await axios.post(url, data);
  }

  async importYoutubeVideo(video) {
    const url = `${API_URL}/tutorials/youtubeImport`;
    return await axios.post(url, video);
  }

  async editTutorial(id, data) {
    const url = `${API_URL}/tutorials/${id}`;
    return await axios.put(url, data);
  }

  async deleteTutorial(id) {
    const url = `${API_URL}/tutorials/${id}`;
    return await axios.delete(url);
  }

  async getArticles() {
    const url = `${API_URL}/articles`;
    return await axios.get(url);
  }

  async addArticle(data) {
    const url = `${API_URL}/articles/add`;
    return await axios.post(url, data);
  }

  async signIn(data) {
    const url = `${API_URL}/users/signin`;
    return await axios.post(url, data);
  }

  async signUp(data) {
    const url = `${API_URL}/users/signup`;
    return await axios.post(url, data);
  }

  async oauthGoogle() {
    const url = `${API_URL}/users/oauth/google`;
    return await axios.get(url);
  }
}

*/
