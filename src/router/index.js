import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/home';
import Login from '../views/login';
import Register from '../views/register';
import Logout from '../views/logout';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/home',
    component: Home
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/register',
    component: Register
  },
  {
    path: '/logout',
    component: Logout
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

// eslint-disable-next-line
function checkAdminRights(to, from, next) {
  const ala = 5;
  // check if the user is admin
  if(ala !== null) {
      next({ path: '/adminroute'});       
  } else {
      next({ path: '/nonadminroute'});
  }
}

export default router
