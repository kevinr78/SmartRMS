<template>
  <div class="main">
    <router-view />
  </div>
</template>
<script setup>
import BaseAuthView from './components/views/auth/BaseAuthView.vue';

</script>
<style>
@import url('https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300..800;1,300..800&display=swap');
html {
  font-size: 16px;
}
* {
  box-sizing: border-box;
}
#app {
  font-family: 'Open Sans', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  font-style: normal;
  font-optical-sizing: auto;
  height: 100%;
  font-size: 14px;
  color: #58585e;
}

body, .main{
  height: 100vh ;
  background-color: #fafafa;
}
</style>
