<template>
  <div>
    <router-view></router-view>
    <!--<base-info></base-info>
    <time-choice></time-choice>
    <view-booking></view-booking>-->
  </div>
</template>

<script>
  import baseInfo from './children/baseInfo.vue';
  import timeChoice from './children/timeChoice.vue';
  import viewBooking from './children/viewBooking.vue';

  export default {
    name: "index",
    components:{
      baseInfo,
      timeChoice,
      viewBooking
    },
    data(){
      return {

      }
    }
  }
</script>

<style lang="scss">

</style>
