<template>
  <div id="app">
    <page-layout>
      <router-view />
    </page-layout>
  </div>
</template>

<script>
import PageLayout from "@/components/page-layout";
export default {
  name: "App",
  components: {
    "page-layout": PageLayout,
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Noto+Sans&display=swap");

html {
  padding: 0;
  margin: -30px 0 0 0;
  box-sizing: border-box;
}

* {
  box-sizing: inherit;
}

h1,
h2,
h3,
button,
label {
  color: rgb(119, 153, 113);
}

h1 {
  font-size: 45px;
  margin: 11px 0 60px 0;
}

hr {
  width: 50%;
  margin: 50px auto;
}

body {
  margin: 0;
  padding: 0;
}

#app {
  font-family: "Noto Sans", sans-serif;
  text-align: center;
  color: #2c3e50;
  background: linear-gradient(
      to top,
      rgba(0, 0, 0, 0.8) 0,
      rgba(0, 0, 0, 0.4) 50%,
      rgba(0, 0, 0, 0.8) 80%
    ),
    url("assets/home-background.jpg") no-repeat center center fixed;
  background-repeat: no-repeat;
  background-size: 100%;
  background-position: center bottom;
  background-attachment: fixed;
  min-height: 1000px;
}

* {
  box-sizing: inherit;
}
</style>
