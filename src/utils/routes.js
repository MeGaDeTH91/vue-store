const getNavigationRoutes = (auth) => {
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

  if (!auth.user || (auth.user && !auth.status.loggedIn)) {
    return guestLinks;
  }

  const isAdmin = auth.user && auth.user.isAdministrator;

  return isAdmin ? adminLinks : authLinks;
};

export default getNavigationRoutes;
