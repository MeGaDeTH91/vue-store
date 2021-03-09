import { userService } from "../services/userService";
import router from "../router";

const cookie = JSON.parse(localStorage.getItem("access-token"));

const initialState = cookie
  ? { status: { loggedIn: true }, user: cookie.data.user }
  : { status: {}, user: null };

export const authentication = {
  namespaced: true,
  state: initialState,
  getters: {
    loggedIn: (state) => {
      return state.status.loggedIn;
    },
    user: (state) => {
      return state.user;
    },
  },
  actions: {
    login({ dispatch, commit }, { email, password }) {
      userService.login(email, password).then(
        (user) => {
          setTimeout(() => {
            commit("loginSuccess", user);
          }, 500);
          setTimeout(() => {
            router.push("/");
            router.go();
          }, 100);
        },
        (error) => {
          commit("loginFailure", error);
          dispatch("alert/error", error, { root: true });
        }
      );
    },
    register(
      { dispatch, commit },
      { email, fullName, phone, password, rePassword }
    ) {
      userService.register(email, fullName, phone, password, rePassword).then(
        (user) => {
          setTimeout(() => {
            router.push("/");
            router.go();
          }, 500);

          setTimeout(() => {
            commit("loginSuccess", user);
          }, 100);
        },
        (error) => {
          commit("loginFailure", error);
          dispatch("alert/error", error, { root: true });
        }
      );
    },
    logout({ commit }) {
      userService.logout();
      setTimeout(() => {
        commit("logout");
      }, 300);
      router.push("/");
      router.go();
    },
  },
  mutations: {
    loginSuccess(state, user) {
      state.status = { loggedIn: true };
      state.user = user;
    },
    loginFailure(state) {
      state.status = {};
      state.user = null;
    },
    logout(state) {
      state.status = {};
      state.user = null;
    },
  },
};
