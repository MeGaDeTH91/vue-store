<template>
  <div id="app" class="back-image">
    <page-layout>
      <router-view/>
    </page-layout>
  </div>
</template>

<script>
import PageLayout from '@/components/page-layout';
export default {
  name: 'App',
  components: {
    'page-layout': PageLayout
  }
}
</script>

<style>
.back-image {
  /* The image used */
  background: url("assets/background.png") no-repeat center fixed;
  background-size: cover;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
}
</style>
