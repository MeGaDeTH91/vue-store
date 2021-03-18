import { userService } from '../services/userService';
import router from '../router';

const cookie = JSON.parse(localStorage.getItem('access-token'));

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
          dispatch('alert/success', 'Logged in successfully!', { root: true });

          setTimeout(() => {
            dispatch('alert/clear', '', { root: true });
            router.push({ name: 'home' });
            router.go();
          }, 2500);

          setTimeout(() => {
            commit('loginSuccess', user);
          }, 2000);
        },
        (error) => {
          console.log(error);
          commit('loginFailure', '');
          dispatch('alert/error', 'Invalid credentials!', { root: true });

          setTimeout(() => {
            dispatch('alert/clear', '', { root: true });
          }, 2500);
        }
      );
    },
    register(
      { dispatch, commit },
      { email, fullName, phone, password, rePassword }
    ) {
      userService.register(email, fullName, phone, password, rePassword).then(
        (user) => {
          dispatch('alert/success', 'User registered successfully!', {
            root: true,
          });

          setTimeout(() => {
            dispatch('alert/clear', '', { root: true });
            router.push({ name: 'home' });
            router.go();
          }, 2500);

          setTimeout(() => {
            commit('loginSuccess', user);
          }, 2000);
        },
        (error) => {
          console.log(error);
          commit('loginFailure', '');
          dispatch('alert/error', 'Try another email.', { root: true });

          setTimeout(() => {
            dispatch('alert/clear', '', { root: true });
          }, 2500);
        }
      );
    },
    logout({ commit }) {
      userService.logout();
      setTimeout(() => {
        commit('logout');
      }, 2000);

      setTimeout(() => {
        router.push({ name: 'home' }).catch(err => {
          // Ignore the vuex err regarding  navigating to the page they are already on.
          if (
            err.name !== 'NavigationDuplicated' &&
            !err.message.includes('Avoided redundant navigation to current location')
          ) {
            // But print any other errors to the console
            console.log(err);
          }
        });
        router.go();
      }, 2500);
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
