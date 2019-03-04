<template>
    <div class="booking-success">
      <div class="success-box">
        <div class="success-header">
          <div class="header-icon"></div>
          <div class="header-msg">成功提交预约信息</div>
        </div>
        <div class="success-line"></div>
        <div class="success-msg">
          <p>我们会在两个工作日内完成预约并发送短信预约通知；</p>
          <p>若两个工作日后未收到信息请与客服联系；</p>
          <p>联系电话：<a class="tel-num" :href="'tel:4008588380'">4008588380</a></p>
        </div>
      </div>
      <div class="success-btn"  v-tap @tap="successOK">好的</div>
    </div>
</template>

<script>
  export default {
    name: "success",
    data(){
      return {

      }
    },
    methods: {
      successOK () {
        this.$router.push({
          name: 'bookings'
        })
      }
    }
  }
</script>

<style lang="scss">
  .booking-success{
    width: 100%;
    height: 100vh;
    background:rgba(249,249,249,1);
    padding-top: 48px;
    .success-box{
      width: 690px;
      margin: 0 auto;
      background: rgba(255,255,255,1);
      box-shadow: 0 12px 24px 0 rgba(0,0,0,0.05);
      padding: 61px 35px 55px;
      border-radius: 20px;
      position: relative;
      z-index: 1;
      .success-header{
        margin-bottom: 43px;
      }
      .header-icon{
        width: 100%;
        height: 102px;
        margin-bottom: 15px;
        background: url("../../../assets/success/icon@2x.png") center center no-repeat;
        background-size: 102px 102px;
      }
      .header-msg{
        width: 100%;
        height:54px;
        text-align: center;
        font-size:32px;
        font-family:PingFangSC-Medium;
        font-weight:500;
        color:rgba(6,151,156,1);
        line-height:54px;
      }
      .success-line{
        width: 100%;
        height: 1px;
        border-top: 1px dashed rgba(188,188,188,1);
        margin-bottom: 54px;
        position: relative;
        &:before{
          display: block;
          content: '';
          //width: 15px;
          width: 30px;
          height: 30px;
          border-radius: 50%;
          //border-radius: 0 15px 15px 0;
          position: absolute;
          z-index: 99;
          left: -50px;
          top: -15px;
          background:rgba(249,249,249,1);
          //box-shadow: 0 12px 24px 0 rgba(0,0,0,0.05);
        }
        &:after{
          display: block;
          content: '';
          //width: 15px;
          width: 30px;
          height: 30px;
          border-radius: 15px 0 0 15px;
          //border-radius: 50%;
          position: absolute;
          z-index: 99;
          right: -50px;
          top: -15px;
          background:rgba(249,249,249,1);
          //box-shadow: 0 12px 24px 0 rgba(0,0,0,0.05);
        }
      }
      .success-msg{
        >p{
          width: 100%;
          font-size:26px;
          font-family:PingFangSC-Regular;
          font-weight:400;
          color:rgba(153,153,153,1);
          line-height:37px;

          &:first-child{margin-bottom: 28px}
        }
        .tel-num{
          color: #007AFF;
          margin-left: 5px;
        }
      }
    }
    .success-btn{
      position: fixed;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 100px;
      line-height: 100px;
      background: rgba(6,151,156,1);
      text-align: center;
      font-size:30px;
      font-family:PingFangSC-Medium;
      font-weight:500;
      color:rgba(255,255,255,1);
    }
  }
</style>
