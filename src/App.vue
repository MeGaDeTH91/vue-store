<template>
  <div id="app">
    <page-layout>
      <router-view />
    </page-layout>
  </div>
</template>

<script>
import PageLayout from '@/components/page-layout';
export default {
  name: 'App',
  components: {
    'page-layout': PageLayout,
  },
  mounted() {
    let cloudinaryScript = document.createElement('script');
    cloudinaryScript.setAttribute('type', 'text/javascript');
    cloudinaryScript.setAttribute(
      'src',
      'https://widget.cloudinary.com/v2.0/global/all.js'
    );
    document.head.appendChild(cloudinaryScript);
  },
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans&display=swap');

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
button {
  color: rgb(119, 153, 113);
}

h1 {
  font-size: 45px;
  margin: 11px 0 60px 0;
}

body {
  margin: 0;
  padding: 0;
}

#app {
  font-family: 'Noto Sans', sans-serif;
  text-align: center;
  background: linear-gradient(
      to top,
      rgba(0, 0, 0, 0.8) 0,
      rgba(0, 0, 0, 0.4) 50%,
      rgba(0, 0, 0, 0.8) 80%
    ),
    url('assets/home-background.jpg') no-repeat center center fixed;
  background-repeat: no-repeat;
  background-size: 100%;
  background-position: center bottom;
  background-attachment: fixed;
  min-height: 1000px;
}

.go-back-btn {
  background: rgb(189, 184, 184);
  font-size: 18px;
  font-weight: bold;
  color: white;
  border-radius: 3px;
  border: none;
  padding: 11px 35px 11px 35px;
  margin-left: 21px;
}

.go-back-btn:hover {
  cursor: pointer;
  background: grey;
  color: rgb(255, 104, 104);
  opacity: 50%;
  border-radius: 3px;
}

* {
  box-sizing: inherit;
}
</style>
