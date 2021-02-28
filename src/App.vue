<template>
  <div id="app" class="back-image">
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
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans&display=swap');

.back-image {
  /* The image used */
  background: linear-gradient(
      to top,
      rgba(0, 0, 0, 0.8) 0,
      rgba(0, 0, 0, 0.4) 50%,
      rgba(0, 0, 0, 0.8) 80%
    ),
    url("assets/home-background.jpg") no-repeat center center/cover;
  background-size: cover;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
}

#app {
  font-family: 'Noto Sans', sans-serif;
  text-align: center;
  color: #2c3e50;
  box-sizing: border-box;
}

* {
  box-sizing: inherit;
}
</style>
