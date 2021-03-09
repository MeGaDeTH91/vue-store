const getNavigationRoutes = (store) => {
  const adminLinks = [
    {
      title: "Products",
      link: "/",
    },
    {
      title: "Categories",
      link: "/categories/all",
    },
    {
      title: "Users",
      link: "/users",
    },
    {
      title: "Add Product",
      link: "/products/create",
    },
    {
      title: "Add Category",
      link: "/categories/create",
    },
    {
      title: "Profile",
      link: `/profile-details`,
    },
    {
      title: "ShoppingCart",
      link: `/shopping-cart`,
    },
    {
      title: "Logout",
      link: `/logout`,
    },
  ];

  const authLinks = [
    {
      title: "Products",
      link: "/",
    },
    {
      title: "Categories",
      link: "/categories/all",
    },
    {
      title: "Profile",
      link: `/profile-details`,
    },
    {
      title: "ShoppingCart",
      link: `/shopping-cart`,
    },
    {
      title: "Logout",
      link: `/logout`,
    },
  ];

  const guestLinks = [
    {
      title: "Products",
      link: "/",
    },
    {
      title: "Categories",
      link: "/categories/all",
    },
    {
      title: "Register",
      link: "/register",
    },
    {
      title: "Login",
      link: "/login",
    },
  ];
  const loggedIn = store.getters['authentication/loggedIn'];
  const user = store.getters['authentication/user'];
  
  if (!user || (user && !loggedIn)) {
    return guestLinks;
  }

  const isAdmin = user && user.isAdministrator;

  return isAdmin ? adminLinks : authLinks;
};

export default getNavigationRoutes;
