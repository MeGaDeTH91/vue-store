import Vue from 'vue';
import App from './App.vue';
import Vuelidate from 'vuelidate';
import BootstrapVue from 'bootstrap-vue';
import router from './router';
import { store } from './store';
import vSelect from 'vue-select'

Vue.use(BootstrapVue);
Vue.use(Vuelidate);

Vue.component('v-select', vSelect)

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
