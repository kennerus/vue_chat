export default {
  state: {
    user: {}
  },
  getters: {
    USER: state => {
      return state.user;
    }
  },
  mutations: {
    SET_USER: (state, payload) => {
      state.user = payload;
    }
  },
  actions: {
    SET_USER: (context, payload) => {
      context.commit('SET_USER', payload);
    },
  }
};
