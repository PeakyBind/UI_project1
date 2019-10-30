export default {
  getTutorialById: (state) => {
    return (id) => {
      return state.tutorials.find(item => {
        return item.id === id
      });
    }
  },
  getTrainingById: (state) => {
    return (id) => {
      return state.trainings.find(item => {
        return item.id === id
      });
    }
  }
}
