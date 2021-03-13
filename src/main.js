import Vue from "vue";
import App from "./App.vue";
import Vuelidate from "vuelidate";
import BootstrapVue from "bootstrap-vue";
import router from "./router";
import { store } from "./store";

Vue.use(BootstrapVue);
Vue.use(Vuelidate);
//Vue.mixin(authService);
//Vue.mixin(carService);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
