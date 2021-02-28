<template>
  <div class="container">
    <header>
      <article class="header-logo">
        <router-link class="nav-link header-logo" to="/">Vue-Store</router-link>
      </article>
      <article class="header-right">
        <ul class="nav-links">
          <li
            v-for="(route, index) in this.getRoutes"
            :key="index"
          >
            <router-link class="nav-link" :to="route.link">{{ route.title }}</router-link>
          </li>
        </ul>
      </article>
    </header>
    <slot></slot>
    <footer class="footer">
      <p class="footer-text">Copyright &copy; 2021 Vue-Store - All Rights Reserved</p>
    </footer>
  </div>
</template>

<script>
import getNavigationRoutes from "@/utils/routes.js";
export default {
  name: "PageLayout",
  computed: {
    getRoutes() {
      return getNavigationRoutes();
    },
  },
  data() {
    return {};
  },
  created() {
    this.navigationRoutes = getNavigationRoutes;
  },
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,400;0,700;1,300;1,400&display=swap');

.container {
  max-width: 1650px;
  margin: 0 auto;
  position: relative;
}
/* Header CSS */
header {
  display: flex;
  justify-content: space-between;
  font-family: 'Lato', sans-serif;
  overflow: hidden;
  padding: 0 50px;
  margin: 30px 40px;
}

header a {
  color: #EFEFE8FF;
  text-align: center;
  padding: 18px;
  text-decoration: none;
  font-size: 22px;
  line-height: 25px;
  font-weight: bold;
}

.header-logo {
  margin-top: 8px;
  font-size: 26px;
  font-weight: bold;
}

.nav-links {
  display: flex;
}

.nav-links li{
  font-weight: bold;
  list-style: none;
}

.nav-link:hover {
  background: grey;
  color: rgb(255, 104, 104);
  opacity: 50%;
  border-radius: 4px;
}

.footer-text {
  position: absolute;
  text-align: right;
  left: 1175px;
  top: 820px;
  height: 20;
  color: #EFEFE8FF;
}

@media screen and (max-width: 600px) {
  
}
</style>