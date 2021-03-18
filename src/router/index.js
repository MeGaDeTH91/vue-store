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
import ProfileDetails from '../views/profile/profile-details';
import ProfileEdit from '../views/profile/profile-edit';
import ManageUsers from '../views/users';
import NotFound from '../views/not-found';
import { store } from '@/store';

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
    name: 'login',
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
    name: 'category-products',
    component: CategoryProducts,
  },
  {
    path: '/profile-details',
    name: 'profile-details',
    component: ProfileDetails
  },
  {
    path: '/profile-edit',
    name: 'profile-edit',
    component: ProfileEdit
  },
  {
    path: '/users',
    name: 'users',
    component: ManageUsers
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

router.beforeEach((to, from, next) => {
  const guestOnlyPages = ['/register', '/login'];
  const publicPages = [
    '/home',
    '/',
    '/register',
    '/login',
    '/categories/all',
    `/categories/${to.params.id}/products`,
  ];

  const loggedIn = store.getters['authentication/loggedIn'];
  if (guestOnlyPages.includes(to.path) && loggedIn) {
    return next('/');
  }

  const authRequired = !publicPages.includes(to.path);

  if (!authRequired) {
    return next();
  }

  const user = store.getters['authentication/user'];
  const privatePages = [
    '/logout',
    '/profile-details',
    '/profile-edit',
    '/shopping-cart',
    '/my-orders',
  ];

  const adminRequired = !privatePages.includes(to.path);
  const isAdmin = user && user.isAdministrator;

  if ((!adminRequired && loggedIn) || (adminRequired && isAdmin)) {
    return next();
  } else {
    return next('/');
  }
});

export default router;
