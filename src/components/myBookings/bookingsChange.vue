<template>
    <div class="booking-change">
      <div class="change-content">
        <div class="change-header">
          <h3>{{bookingData.title}}</h3>
          <p>{{bookingData.time}}</p>
          <p>{{bookingData.hospital}}</p>
        </div>
        <div class="change-line"></div>
        <div class="change-attention">
          <h4>注意事项：</h4>
          <ul class="change-attention-list">
            <li class="change-attention-item" v-for="(item,index) in attentionData">{{item}}</li>
          </ul>
          <p>如有任何疑问请咨询</p>
          <p>漫溢健康客服热线：4008588380</p>
        </div>
        <div class="change-btn" v-tap @tap="showModal"><span>{{btnTxt}}</span></div>
      </div>
      <div class="change-modal" v-if="changModal">
        <div class="change-modal-content">
          <div class="change-modal-top">
            <h4 class="modal-title">{{modalData.title}}</h4>
            <p class="modal-txt">{{modalData.txt}}</p>
          </div>
          <div class="change-modal-btn">
            <span v-tap @tap="modalCancel">取消</span><span v-tap @tap="modalOk">确定</span>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
  import {Toast} from 'mint-ui'
  export default {
    name: "bookingsChange",
    data(){
      return {
        orderNo: '',
        sid: this.$route.params.sid || this.$route.query.sid || '',
        //status: this.$route.params.status || this.$route.query.status || '',  //1001订单正常；1002订单改签中；1003订单退款中；1004订单已退款
        status: null,
        type: this.$route.params.type || this.$route.query.type || '',    //endorse改签；refund退款
        bookingInfo: this.$route.params.bookingInfo || this.$route.query.bookingInfo || {},
        bookingData: {
          title: 'HPV疫苗接种',
          time: '',
          hospital: ''
        },
        attentionData: [],
        btnTxt: '确认退款',   //页面按钮显示文字
        routerState: 1,   //1:退款    2：改签
        //stepState: 1,     //1:申请退款/改签  2:取消退款/改签
        changModal: false,   //弹窗控制
        modalData: {  //弹窗数据
          title: '申请退款',
          txt: '您确定需要退款服务吗？'
        },
        data:{
          '4':{   //可预约的月份
            '1': {  //可预约月份的日期
              am:5,
              pm:5
            },
            '2': {
              am:5,
              pm:0
            },
            //...
            '30':{
              am: 5,
              pm:5
            }
          },
          '5':{
            '1':{
              am: 5,
              pm: 5
            }
          }
        }
      }
    },
    created(){

    },
    watch:{
      'status'(newValue,oldValue){
        const _this = this;
        let status = newValue;
        if(_this.type==='endorse'){   //改签进入
          if(status==1001){
            _this.bookingData = {
              title: 'HPV疫苗接种',
              time: _this.bookingInfo.time,
              hospital: _this.bookingInfo.hospital
            };
            _this.attentionData = ['更改已预约日期，必须至少提前14个工作日变更预约;','另需缴付500人民币作行政费用;'];
            _this.modalData = {     //弹窗数据
              title: '改签申请',
              txt: '您确定需要申请改签吗？'
            };
            _this.btnTxt = '申请改签';
          }
          else if(status==1002){
            _this.bookingData = {
              title: '您已成功申请改签预约服务',
              time: '48小时内我们的客服人员会和您电话沟通确认改签相关医院和改签预约时间以及改签产生的相关费用。',
              hospital: ''
            };
            _this.attentionData = [' 更改已预约日期，必须至少提前14个工作日变更预约;','另需缴付500人民币作行政费用;'];
            _this.modalData = {     //弹窗数据
              title: '取消申请',
              txt: '您确定要取消申请改签吗？'
            };
            _this.btnTxt = '取消改签';
          }
          else {
            _this.$router.push({
              path: 'bookings',
              query: {sid: _this.sid}
            })
          }
        }
        else if(_this.type==='refund'){   //退款进入
          if(status==1001){
            _this.bookingData = {
              title: 'HPV疫苗接种',
              time: _this.bookingInfo.time,
              hospital: _this.bookingInfo.hospital
            };
            _this.attentionData = [' 已发送预约成功短信的客户，如客户取消预约，服务费及问诊注射费不作退款，名额不作转让，逾期视为取消;','已完成第一针接种的客户不接受任何形式退款;','确认退款后我们的客服会在48小时内向您确认退款服务;'];
            _this.modalData = {     //弹窗数据
              title: '申请退款',
              txt: '您确定需要退款服务吗？'
            };
            _this.btnTxt = '确认退款';
          }
          else if(status==1003){
            _this.bookingData = {
              title: '退款申请中',
              time: '我们的服务人员会在48小时内处理您的退款申请。',
              hospital: ''
            };
            _this.attentionData = ['已发送预约成功短信的客户，如客户取消预约，服务费及问诊注射费不作退款，名额不作转让，逾期视为取消;','已完成第一针接种的客户不接受任何形式退款;','确认退款后我们的客服会在48小时内向您确认退款服务;'];
            _this.modalData = {     //弹窗数据
              title: '取消退款',
              txt: '您确定要取消退款吗？'
            };
            _this.btnTxt = '取消申请';
          }
          else {
            _this.$router.push({
              path: 'bookings',
              query: {sid: _this.sid}
            })
          }
        }
      }
    },
    beforeMount(){
      this.init();
    },
    methods: {
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
              debugger
              _this.bookingData.time = res.data['app_full_time'];
              _this.bookingData.hospital = res.data['full_address'];
              _this.bookingData = JSON.parse(JSON.stringify(_this.bookingData))
              _this.orderNo = res.data['order_no'];
              _this.status = res.data['status'];

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
        });
      },
      /**
       * 点击申请/取消按钮
       */
      showModal(){
        const _this = this;
        _this.changModal = true;

      },
      /**
       * 弹窗取消事件
       */
      modalCancel(){
        const _this = this;
        _this.changModal = false;
      },
      /**
       * 弹窗确认事件
       */
      modalOk(){
        const _this = this;
        if (_this.status==1001) {    //第一步点击事件
          if(_this.type === 'endorse'){   //申请改签
            _this.changeStatus(1,function () {
              _this.status = 1002;
              _this.changModal = false;
            });
          }
          else if (_this.type === 'refund'){
            _this.changeStatus(2,function () {
              _this.status = 1003;
              _this.changModal = false;
            });
          }
        } else {      //第二步点击事件
          if(_this.type === 'endorse'){   //申请改签
            _this.changeStatus(3,function () {
              _this.changModal = false;
              _this.$router.push({
                path: 'bookings',
                query: {sid: _this.sid}
              })
            });
          }
          else if (_this.type === 'refund'){
            _this.changeStatus(4,function () {
              _this.changModal = false;
              _this.$router.push({
                path: 'bookings',
                query: {sid: _this.sid}
              })
            });
          }
        }
      },
      /**
       * 改签/退款 axios事件
       * @param type： 1:申请改签;  2:申请退款；   3:取消改签    4:取消退款
       * @param callBack: 回调函数
       */
      changeStatus(type,callBack){
        const _this = this;
        let postData = {
          order_no: _this.orderNo,
          sid: _this.sid,
          op_type: type      //1:申请改签;  2:申请退款；   3:取消改签    4:取消退款
        };
        $.ajax({
          url:basePath + 'appointment/change-status',
          data: postData,
          type: 'POST',
          dataType: 'json',
          success : function (res) {
            if(res.code==0){
              callBack && callBack()
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
        /*_this.axios.post(basePath + 'appointment/change-status',postData)
          .then(function (response) {
            let res = response.data;
            if(res.code==0){
              callBack && callBack()
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
      }
    }
  }
</script>

<style lang="scss">
  .booking-change{
    width: 100%;
    height: 100vh;
    background:rgba(249,249,249,1);
    padding: 40px 30px;
    .change-content{
      padding: 30px 35px;
      background:rgba(255,255,255,1);
      box-shadow:0px 12px 24px 0px rgba(0,0,0,0.05);
      border-radius: 20px;
      .change-header{
        padding: 0 5px;
        >h3{
          font-size:32px;
          font-family:PingFangSC-Medium;
          font-weight:500;
          color:rgba(6,151,156,1);
          height: 54px;
          line-height:54px;
          margin-bottom: 4px;
        }
        >p{
          font-size:26px;
          font-family:PingFangSC-Regular;
          font-weight:400;
          color:rgba(153,153,153,1);
          min-height: 41px;
          line-height:41px;
          //margin-top: -10px;
          &:nth-of-type(1){
            margin-top: 0;
          }
        }
      }
      .change-line{
        width: 100%;
        height:1px;
        border:1px dashed rgba(188,188,188,1);
        margin-top: 17px;
        margin-bottom: 54px;
      }
      .change-attention{
        padding: 0 5px;
        margin-bottom: 60px;
        >h4{
          line-height: 50px;
          font-size: 26px;
          color: #4A4A4A;
          font-family: PingFangSC-Medium;
        }
        >p{
          color: #999;
          line-height: 50px;
          font-family: PingFangSC-Regular;
          font-size: 24px;
        }
        .change-attention-list{
          margin-bottom: 50px;
          .change-attention-item{
            color: #999;
            line-height: 50px;
            font-family: PingFangSC-Regular;
            font-size: 24px;
            text-indent: 22px;
            position: relative;
            &:before{
              content: '';
              display: block;
              width: 10px;
              height: 10px;
              border-radius: 50%;
              background-color: rgba(6,151,156,1);
              position: absolute;
              left: 4px;
              top: 20px;
            }
          }
        }
      }
      .change-btn{
        width: 100%;
        margin-bottom: 26px;
        >span{
          display: block;
          width: 600px;
          height: 100px;
          line-height: 100px;
          background:rgba(6,151,156,1);
          border-radius:50px;
          text-align: center;
          font-size:30px;
          font-family:PingFangSC-Medium;
          font-weight:500;
          color:rgba(255,255,255,1);
        }
      }
    }
    .change-modal{
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100vh;
      background:rgba(0,0,0,0.4);
      z-index: 99;
      display: flex;
      align-items: center;
      justify-content: center;
      .change-modal-content{
        position: relative;
        z-index: 999;
        width: 540px;
        background: #fff;
        border-radius:24px;
        //filter:blur(20px);
      }
      .change-modal-top{
        padding: 44px 0 32px 0;
        border-bottom: 2px solid rgba(223,223,223,1);
        .modal-title{
          height: 48px;
          text-align: center;
          font-size:34px;
          font-family:PingFangSC-Medium;
          font-weight:500;
          color:rgba(74,74,74,1);
          margin-bottom: 16px;
        }
        .modal-txt{
          height:32px;
          font-size:28px;
          font-family:PingFangSC-Medium;
          font-weight:500;
          color:rgba(155,155,155,1);
          line-height:32px;
          text-align: center;
        }
      }
      .change-modal-btn{
          display: flex;
          >span{
            width: 50%;
            height: 87px;
            line-height: 87px;
            display: inline-block;
            text-align: center;
            font-size:34px;
            font-family:PingFangSC-Regular;
            font-weight:400;
            color:rgba(0,122,255,1);
            &:first-child{
              border-right: 1px solid rgba(223,223,223,1);
            }
            &:last-child{
              border-left: 1px solid rgba(223,223,223,1);
            }
          }


      }
    }
  }
</style>
