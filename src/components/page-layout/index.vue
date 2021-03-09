<template>
  <div class="container">
    <header>
      <article class="header-logo">
        <router-link class="nav-link header-logo" to="/">Vue-Store</router-link>
      </article>
      <article class="header-right">
        <ul class="nav-links">
          <li v-for="(route, index) in this.getRoutes" :key="index">
            <router-link class="nav-link" :to="route.link">{{
              route.title
            }}</router-link>
          </li>
        </ul>
      </article>
    </header>
    <slot></slot>
    <br />
    <footer class="footer">
      <p class="footer-text">
        Copyright &copy; 2021 Vue-Store - All Rights Reserved
      </p>
    </footer>
  </div>
</template>

<script>
import getNavigationRoutes from "@/utils/routes.js";
export default {
  name: "PageLayout",
  computed: {
    getRoutes() {
      return getNavigationRoutes(this.$store);
    },
  },
  data() {
    return {};
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,400;0,700;1,300;1,400&display=swap");

.container {
  max-width: 1650px;
  margin: 0 auto;
}
/* Header CSS */
header {
  display: flex;
  justify-content: space-between;
  font-family: "Lato", sans-serif;
  overflow: hidden;
  padding: 30px 10px;
  margin: 30px 40px;
}

header a {
  color: #efefe8ff;
  text-align: center;
  padding: 11px 18px 11px 18px;
  text-decoration: none;
  font-size: 22px;
  line-height: 25px;
  font-weight: bold;
}

.header-logo {
  margin-top: 11px;
  font-size: 26px;
  font-weight: bold;
}

.nav-links {
  display: flex;
}

.nav-links li {
  font-weight: bold;
  list-style: none;
}

.nav-link:hover {
  background: grey;
  color: rgb(255, 104, 104);
  opacity: 50%;
  border-radius: 8px;
}

footer {
  position: fixed;
  height: 30px;
  margin-top: -50px;
  bottom: 0;
  bottom: 20px;
  right: 20px;
  margin-bottom: 0px;
}

.footer-text {
  text-align: right;
  font-size: 14px;
  height: 20;
  color: #efefe8ff;
}

@media screen and (max-width: 1200px) {
  .footer-text {
    left: 100px;
  }
}
</style>