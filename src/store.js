import Vue from 'vue';
import Vuex from 'vuex';
import messages from './vuex/messages';
import users from './vuex/users';

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    users,
    messages
  }
});
