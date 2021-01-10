<template>
  <div id="app">
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
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
