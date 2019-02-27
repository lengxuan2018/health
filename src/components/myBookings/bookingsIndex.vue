<template>
    <div class="bookings-index">
      <div class="bookings-list">
        <div class="bookings-list-top" v-for="(item,index) in dataList">
          <h3 class="bookings-list-title">{{item.title}}</h3>
          <p class="bookings-list-info" v-for="txt in item.info">{{txt.txt}}</p>
        </div>
        <div class="bookings-list-btns">
          <div class="bookings-btn-box">
            <span class="bookings-btn" @click="changeBooking('bookingsEndorse')">申请改签</span><span class="bookings-btn" @click="changeBooking('bookingsRefund')">申请退款</span>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
  export default {
    name: "bookingsIndex",
    data(){
      return{
        dataList: [
          {
            title: 'HPV疫苗接种',
            info: [
              {txt:'2019年2月2日上午10时至下午1时'},{txt:'香港港岛西家庭医学及基层医疗中心'}
            ]
          }
        ]
      }
    },
    mounted(){

    },
    methods: {
      /**
       * 改签/退款事件
       * @param type：bookingsEndorse改签；bookingsRefund退款
       */
      changeBooking(type){
        this.$router.push({
          name: type
        })
      }
    }
  }
</script>

<style lang="scss">
  .bookings-index{
    background: rgba(249,249,249,1);
    width: 100%;
    min-height: 1334px;
    padding: 30px;
    .bookings-list{
      width: 690px;
      background: rgba(255,255,255,1);
      box-shadow:0 12px 24px 0 rgba(0,0,0,0.05);
      border-radius: 20px;
      padding: 30px;
      &:before{
        display: block;
        width: 30px;
        height: 30px;
        background: transparent;
      }
      &:after{

      }

      .bookings-list-top{
        padding: 0 20px;
        margin-bottom: 35px;
        .bookings-list-title{
          font-size: 32px;
          font-family: PingFangSC-Medium;
          font-weight: 500;
          color: rgba(6,151,156,1);
          line-height: 54px;
        }
        .bookings-list-info{
          font-size: 26px;
          margin-top: -10px;
          font-family:PingFangSC-Regular;
          font-weight:400;
          color:rgba(153,153,153,1);
          line-height: 54px;
        }
        .bookings-list-info:nth-of-type(1){
          margin-top: 0;
        }
      }
      .bookings-list-btns{
        padding: 0 5px;
        position: relative;
        &:before{
          display: block;
          content: '';
          width: 30px;
          height: 30px;
          background: rgba(249,249,249,1);
          position: absolute;
          border-radius: 50%;
          top: -15px;
          left: -45px;
        }
        &:after{
          display: block;
          content: '';
          width: 30px;
          height: 30px;
          background: rgba(249,249,249,1);
          position: absolute;
          border-radius: 50%;
          top: -15px;
          right: -45px;
        }
        .bookings-btn-box{
          padding-top: 30px;
          border-top: 1px rgba(188,188,188,1) dashed;
          text-align: center;
          .bookings-btn{
            display: inline-block;
            width: 280px;
            height: 90px;
            line-height: 90px;
            background: rgba(6,151,156,1);
            border-radius: 12px;
            text-align: center;
            font-size: 28px;
            font-family: PingFangSC-Medium;
            font-weight: 500;
            color: rgba(255,255,255,1);
            margin-right: 50px;
            &:last-child{
              margin-right: 0;
            }
          }
        }
      }
    }
  }
</style>
