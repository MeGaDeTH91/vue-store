<template>
  <div>
    <header>
      <span><router-link class="nav-link logo" to="/">Vue-Store</router-link></span>
      <div class="header-right">
        <span v-for="(route, index) in this.getRoutes"
            :key="index">
            <span><router-link class="nav-link" :to="route.link">{{route.title}}</router-link></span>
        </span>
      </div>
    </header>
    <slot></slot>
    <div class="footer">
      <div class="shell">
        <p class="lf">
          Copyright &copy; 2020 Vue-Store - All Rights Reserved
        </p>
      </div>
    </div>
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
    return {
      
    };
  },
  created() {
    this.navigationRoutes = getNavigationRoutes;
  },
};
</script>

<style>
/* Header CSS */
header {
  overflow: hidden;
  padding: 0 50px;
}

header a {
  float: left;
  color: #ffb9b9;
  text-align: center;
  padding: 18px;
  text-decoration: none;
  font-size: 18px;
  line-height: 25px;
  font-weight: bold;
}

header a.logo {
  font-size: 25px;
  font-weight: bold;
}

header a:hover {
  background-color: rgb(255, 236, 225);
  opacity: 10%;
}

header .header-right {
  float: right;
}

.nav-link {
  color: #ffa78c;
  font-family: Arial, Helvetica, sans-serif;
}

.nav-link:hover {
  color: rgb(255, 104, 104);
  opacity: 50%;
}

.footer {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  height: 20;
  color:rgb(255, 155, 155);
}

@media screen and (max-width: 500px) {
  header a {
    float: none;
    display: block;
    text-align: left;
  }

  header-right {
    float: none;
  }
}
</style>