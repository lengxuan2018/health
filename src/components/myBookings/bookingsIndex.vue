<template>
    <div class="bookings-index">
      <div class="bookings-list" v-if="item.hospital">
        <div class="bookings-list-top">
          <h3 class="bookings-list-title">{{item.title}}</h3>
          <p class="bookings-list-info">{{item.time}}</p>
          <p class="bookings-list-info">{{item.hospital}}</p>
        </div>
        <div class="bookings-line"></div>
        <div class="bookings-list-btns">
          <div class="bookings-btn-box">
            <span class="bookings-btn" v-tap @tap="changeBooking('endorse')">申请改签</span><span class="bookings-btn" v-tap @tap="changeBooking('refund')">申请退款</span>
          </div>
        </div>
      </div>
      <div v-else class="no-record">暂无预约记录</div>
    </div>
</template>

<script>
  import {Toast} from 'mint-ui'
  export default {
    name: "bookingsIndex",
    data(){
      return{
        sid: this.$route.params.sid || this.$route.query.sid || '',   //订单预约跳转查询
        //orderData: this.$route.params.orderData || this.$route.query.orderData || {},   //手机号码验证查询
        item: {
          title: 'HPV疫苗接种',
          time: '',
          hospital: ''
        },
        orderNo: '',
        status: ''
      }
    },
    beforeMount(){
      this.init()
    },
    methods: {
      /**
       * 页面加载事件
       */
      init(){
        const _this = this;
        let postData = {
          sid: _this.sid
        };
        $.ajax({
          url: basePath + 'appointment/get-app-info',
          data: postData,
          type: 'POST',
          dataType: 'json',
          success : function (res) {
            if(res.code==0){
              _this.item.time = res.data['app_full_time'];
              _this.item.hospital = res.data['full_address'];
              _this.orderNo = res.data['order_no'];
              _this.status = res.data['status'];
              //_this.$store.dispatch('getNumStatus',_this.status);

              if(_this.status == 1004){     //订单已退款状态
                _this.$router.push(
                  {
                    path: 'refundSuccess',
                    query: {
                      time: res.data['app_full_time'],
                      hospital: res.data['full_address']
                    }
                  })
              }
              else if (_this.status == 1000){     //订单审核中状态
                _this.$router.push(
                  {
                    path: 'success',
                    query: {
                      sid: _this.sid
                    }
                  })
              }
            }
            else if(res.code==1002){    //认证失效，重新登录
              _this.$router.push(
                {path: 'telLogin'}
              )
            }
            else {
              Toast({
                message: res.msg,    //提示信息
                position: 'center',   //位置
                duration: 1500        //时间
              });
            }
          },
          error: function (err) {
            Toast({
              message: '请求错误，请重试',    //提示信息
              position: 'center',   //位置
              duration: 1500        //时间
            });
          }
        })
        /*_this.axios.post(basePath + 'appointment/get-app-info',postData)
          .then(function (response) {
            let res = response.data;
            if(res.code==0){
              _this.item.time = res.data['app_full_time'];
              _this.item.hospital = res.data['full_address'];
              _this.orderNo = res.data['order_no'];
              _this.status = res.data['status'];

              if(_this.status == '1004'){     //订单已退款状态
                _this.$router.push(
                  {
                    path: 'refundSuccess',
                    query: {
                      time: res.data['app_full_time'],
                      hospital: res.data['full_address']
                    }
                  }
                )
              }

            }
            else if(res.code==1002){    //认证失效，重新登录
              _this.$router.push(
                {path: 'telLogin'}
              )
            }
            else {
              Toast({
                message: res.msg,    //提示信息
                position: 'center',   //位置
                duration: 1500        //时间
              });
            }
          })
          .catch(function (error) {
            Toast({
              message: '请求错误，请重试',    //提示信息
              position: 'center',   //位置
              duration: 1500        //时间
            });
          });*/
      },
      /**
       * 改签/退款事件
       * @param type：endorse改签；refund退款
       */
      changeBooking(type){
        const _this = this;
        if(type==='endorse' && _this.status==1003){   //退款中点击改签
          Toast({
            message: '订单处于退款中，无法操作改签',    //提示信息
            position: 'center',   //位置
            duration: 1500        //时间
          });
          return
        }
        if(type === 'refund' && _this.status==1002){    //改签中点击退款
          Toast({
            message: '订单处于改签中，无法操作退款',    //提示信息
            position: 'center',   //位置
            duration: 1500        //时间
          });
          return
        }
        /*let bookingInfo = {
          time: _this.item.time,
          hospital: _this.item.hospital
        }*/
        _this.$router.push({
          path: 'bookingChange',
          query: {
            //orderNo: _this.orderNo,
            sid: _this.sid,
            //status: _this.status,
            type: type,
            //bookingInfo: JSON.stringify(bookingInfo)
          }
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
        /*&:before{
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
        }*/
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
    .no-record{
      width: 100%;
      color: #9b9b9b;
      text-align: center;
    }
  }
</style>
