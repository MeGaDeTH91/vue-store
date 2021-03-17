import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/home';
import Login from '../views/login';
import Register from '../views/register';
import Logout from '../views/logout';
import ProductCreate from '../views/products/create';
import ProductEdit from '../views/products/edit';
import ProductDelete from '../views/products/delete';
import CategoriesAll from '../views/categories/all';
import CategoryCreate from '../views/categories/create';
import CategoryEdit from '../views/categories/edit';
import CategoryProducts from '../views/categories/products-by-category';
import NotFound from '../views/not-found';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/home',
    component: Home,
  },
  {
    path: '/login',
    component: Login,
  },
  {
    path: '/register',
    component: Register,
  },
  {
    path: '/logout',
    component: Logout,
  },
  {
    path: '/products/create',
    component: ProductCreate,
  },
  {
    path: '/products/edit/:id',
    component: ProductEdit,
  },
  {
    path: '/products/delete/:id',
    component: ProductDelete,
  },
  {
    path: '/categories/all',
    component: CategoriesAll,
  },
  {
    path: '/categories/create',
    component: CategoryCreate,
  },
  {
    path: '/categories/edit/:id',
    component: CategoryEdit,
  },
  {
    path: '/categories/:id/products',
    component: CategoryProducts,
  },
  {
    path: '*',
    component: NotFound,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

// eslint-disable-next-line
function checkAdminRights(to, from, next) {
  const ala = 5;
  // check if the user is admin
  if (ala !== null) {
    next({ path: '/adminroute' });
  } else {
    next({ path: '/nonadminroute' });
  }
}

export default router;
