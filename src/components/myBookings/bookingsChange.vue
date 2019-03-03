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
          <p>漫溢健康客服热线：400XXXXXXXXX</p>
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
  export default {
    name: "bookingsChange",
    data(){
      return {
        bookingData: {
          title: 'HPV疫苗接种',
          time: '2019年2月2日上午10时至下午1时',
          hospital: '香港港岛西家庭医学及基层医疗中心'
        },
        attentionData: [],
        btnTxt: '确认退款',   //页面按钮显示文字
        routerState: 1,   //1:退款    2：改签
        stepState: 1,     //1:申请退款/改签  2:取消退款/改签
        changModal: false,   //弹窗控制
        modalData: {  //弹窗数据
          title: '申请退款',
          txt: '您确定需要退款服务吗？'
        }
      }
    },
    watch: {
      'stepState'(newValue,oldValue){
        const _this = this;
        if (_this.routerState === 1){   //退款流程
          if(newValue===1){   //申请退款
            _this.bookingData = {
              title: 'HPV疫苗接种',
              time: '2019年2月2日上午10时至下午1时',
              hospital: '香港港岛西家庭医学及基层医疗中心'
            };
            _this.attentionData = [' 已发送预约成功短信的客户，如客户取消预约，服务费及问诊注射费不作退款，名额不作转让，逾期视为取消;','已完成第一针接种的客户不接受任何形式退款;','确认退款后我们的客服会在48小时内向您确认退款服务;'];
            _this.modalData = {     //弹窗数据
              title: '申请退款',
              txt: '您确定需要退款服务吗？'
            };
            _this.btnTxt = '确认退款'
          } else {      //取消退款
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
            _this.btnTxt = '取消申请'
          }
        } else {      //改签流程
          if(newValue===1){   //申请改签
            _this.bookingData = {
              title: 'HPV疫苗接种',
              time: '2019年2月2日上午10时至下午1时',
              hospital: '香港港岛西家庭医学及基层医疗中心'
            };
            _this.attentionData = ['更改已预约日期，必须至少提前14个工作日变更预约;','另需缴付500人民币作行政费用;'];
            _this.modalData = {     //弹窗数据
              title: '改签申请',
              txt: '您确定需要申请改签吗？'
            };
            _this.btnTxt = '申请改签'

          } else {      //取消改签
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
            _this.btnTxt = '取消改签'
          }
        }
      }
    },
    created(){
      const _this = this;
      const path = _this.$route.name;
      switch (path) {
        case 'bookingsRefund':    //退款
          _this.btnTxt = '确认退款';
          _this.routerState = 1;
          _this.attentionData = [' 已发送预约成功短信的客户，如客户取消预约，服务费及问诊注射费不作退款，名额不作转让，逾期视为取消;','已完成第一针接种的客户不接受任何形式退款;','确认退款后我们的客服会在48小时内向您确认退款服务;'];
          break;
        case 'bookingsEndorse':   //改签
          _this.btnTxt = '申请改签';
          _this.routerState = 2;
          _this.attentionData = ['更改已预约日期，必须至少提前14个工作日变更预约;','另需缴付500人民币作行政费用;'];
          break;
        default:
          _this.btnTxt = '确认退款';
          _this.routerState = 1;
          _this.attentionData = [' 已发送预约成功短信的客户，如客户取消预约，服务费及问诊注射费不作退款，名额不作转让，逾期视为取消;','已完成第一针接种的客户不接受任何形式退款;','确认退款后我们的客服会在48小时内向您确认退款服务;'];
      }
    },
    methods: {
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
        if (_this.stepState===1) {    //第一步点击事件
          _this.stepState = 2;
          _this.changModal = false;
        } else {      //第二步点击事件
          _this.changModal = false;
          _this.$router.push({
            name: 'bookings'
          })
        }
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
        border-bottom: 2px solid rgba(77,77,77,0.78);
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
              border-right: 1px solid rgba(77,77,77,0.78);
            }
            &:last-child{
              border-left: 1px solid rgba(77,77,77,0.78);
            }
          }


      }
    }
  }
</style>
