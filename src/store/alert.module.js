export const alert = {
  namespaced: true,
  state: {
    type: null,
    message: null,
  },
  getters: {
    notification: (state) => {
      return {
        type: state.type,
        message: state.message,
      };
    },
  },
  actions: {
    success({ commit }, message) {
      commit('success', message);
    },
    error({ commit }, message) {
      commit('error', message);
    },
    clear({ commit }) {
      commit('clear');
    },
  },
  mutations: {
    success(state, message) {
      state.type = 'popup-success';
      state.message = message;
    },
    error(state, message) {
      state.type = 'popup-fail';
      state.message = message;
    },
    clear(state) {
      state.type = null;
      state.message = null;
    },
  },
};
