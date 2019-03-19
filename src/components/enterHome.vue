<template>
  <div>
    <br/><br/><br/><br/>
    <router-link to="baseInfo" style="font-size: 28px">订单预约</router-link><br/><br/><br/>
    <router-link to="telLogin" style="font-size: 28px">手机查询</router-link><br/>

  </div>
</template>

<script>
export default {
  name: 'enterHome',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
