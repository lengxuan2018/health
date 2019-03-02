<template>
  <div>
    <router-link to="bookingProcess">订单预约</router-link><br/>
    <router-link to="bookings">订单查询</router-link><br/>

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
