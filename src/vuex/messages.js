export default {
  state: {
    messages: [],
    user: {}
  },
  getters: {
    MESSAGES: state => {
      return state.messages
    }
  },
  mutations: {
    SET_MESSAGES: (state, payload) => {
      state.messages = payload
    },
    ADD_MESSAGE: (state, payload) => {
      state.messages.push(payload)
    }
  },
  actions: {
    GET_MESSAGES: async (context, payload) => {
      context.commit('SET_MESSAGES', payload)
    },
    SET_MESSAGE: (context, payload) => {
      context.commit('ADD_MESSAGE', payload)
    }
  }
};