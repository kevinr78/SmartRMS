<template>
  <div class="main">
    <BaseAuthView />
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
  font-weight: 500;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  font-style: normal;
  font-optical-sizing: auto;
  height: 100%;
}

body, .main{
  height: 100vh ;
}
</style>
