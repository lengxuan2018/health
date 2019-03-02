<style>
  @import './style/reset.css';
  @import "./style/myMint.css";
  #app{
    flex: 1;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
  }
</style>

<template>
  <div id="app">
    <router-view></router-view>
    <!--<img src="./assets/logo.png">
    <router-view/>-->
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>


