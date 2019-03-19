<template>
    <div class="tel-login">
      <div class="login-content">
        <div class="tel-num">
          <input :class="{'input-focus':focus==='tel'}" class="tel-num-input" placeholder="请填写预留手机号" v-model="telNum" @focus="inputFocus('tel')" @blur="inputBlur('tel')" v-on:input="changeInput('tel')" type="number"/>
          <span class="tel-get-num" :class="{'code-active':telNumFlag}" v-tap @tap="getCode">{{codeMsg}}</span>
        </div>
        <div class="error-tel" v-show="telError">请填写正确手机号</div>
        <div class="tel-code" :class="{'input-focus':focus==='code'}">
          <input class="tel-code-input" placeholder="请填写验证码" v-model="codeNum" @focus="inputFocus('code')" @blur="inputBlur('code')" v-on:input="changeInput('code')" type="number"/>
        </div>
        <div class="error-tel code-error" v-show="codeError">请填写正确验证码</div>
        <p class="login-info">注：请填写您的九价HPV预约手机号并输入验证码后可以查看“我的预约”信息。</p>
      </div>
      <div class="login-btn">
        <span class="login-enter" :class="{'login-enter-active':!telError&&!codeError&&telNum&&codeNum}" v-tap @tap="validaLogin">确 认</span>
      </div>
    </div>
</template>

<script>
  import {Toast} from 'mint-ui';
  export default {
    name: "telLogin",
    data() {
      return {
        telNum: '',
        codeNum: '',
        codeMsg: '发送验证码',
        telNumFlag: false,
        loginEnterFlag: false,
        telError: false,
        codeError: false,
        focus: '' ,        //‘tel’聚焦手机码    ‘code’聚焦验证码
        timer: null
      }
    },
    watch: {
      'codeMsg'(newValue,oldValue){
        const _this = this;
        if(newValue == 0){
          clearInterval(_this.timer);
          _this.timer = null;
          _this.codeMsg = '重新获取';
          _this.validateTel();
        }
      }
    },
    /*beforeMount(){

    },*/
    methods: {
      getCode() {
        const _this = this;
        if(!_this.telNumFlag) return;
        if(_this.timer) return;

        /*_this.codeMsg = 60;
        _this.telNumFlag = false;

        _this.timer = setInterval(function () {
          _this.codeMsg--
        },1000)*/

        _this.axios.get(basePath + 'appointment/get-sms-code',{
          params: {contact_number: _this.telNum}
        })
          .then(function (response) {
            let res = response.data;
            if(res.code==0){
              _this.codeMsg = 60;
              _this.telNumFlag = false;

              _this.timer = setInterval(function () {
                _this.codeMsg--
              },1000)
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
              message: '服务器忙，请重试',    //提示信息
              position: 'center',   //位置
              duration: 1500        //时间
            });
          });
      },
      validateTel(){
        const _this = this;
        let tel = _this.telNum;
        let reg = /^1\d{10}$/;
        if(tel.length !== 11 || !reg.test(tel)) {
          _this.telError = true;
        } else {
          if(!_this.timer){
            _this.telNumFlag = true;
          }
        }
      },
      inputFocus(type){
        this.focus = type;
      },
      inputBlur(type){
        const _this = this;
        this.focus = '';
        if(type === 'tel'){
          _this.validateTel()
        }
        else if(type === 'code' && !_this.codeNum) {
          _this.codeError = true;
        }
      },
      changeInput(type){
        const _this = this;
        _this[type+'Error'] = false;
        if(type === 'tel'){
          _this.telNumFlag = false;
          const telValue = _this.telNum;
          if (telValue.length>0) {
            let reg = /^1\d{0,10}$/;
            if (!reg.test(telValue)) {
              _this.telError = true;
            }
            if(telValue.length===11){
              if(!_this.timer){
                _this.telNumFlag = true;
              }
            }
          }
        }
      },
      validaLogin(){
        const _this = this;
        if(_this.telError || _this.codeError || !_this.telNum || !_this.codeNum){
          return
        }
        _this.axios.get(basePath + 'appointment/check-sms-code',{
          params: {contact_number: _this.telNum, sms_code: _this.codeNum}
        })
          .then(function (response) {
            let data = response.data;
            let sid = data.data.sid;
            if(data.code==0){
              $.ajax({
                url: basePath + 'appointment/get-app-info',
                data: {sid:sid},
                type: 'POST',
                dataType: 'json',
                success : function (res) {
                  if(res.code==0){
                    if(res.data.status == 1004){     //订单已退款状态
                      _this.$router.push(
                        {
                          path: 'refundSuccess',
                          query: {
                            time: res.data['app_full_time'],
                            hospital: res.data['full_address']
                          }
                        })
                    }
                    else if (res.data.status == 1000){     //订单审核中状态
                      _this.$router.push(
                        {
                          path: 'success',
                          query: {
                            sid: sid
                          }
                        })
                    }
                    else {
                      _this.$router.push(
                        {
                          path: 'bookings',
                          query: {
                            sid:sid
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
                },
                error: function (err) {
                  Toast({
                    message: '请求错误，请重试',    //提示信息
                    position: 'center',   //位置
                    duration: 1500        //时间
                  });
                }
              })


            }
            else {
              Toast({
                message: data.msg,    //提示信息
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
          });
      }
    }
  }
</script>

<style lang="scss">
  .tel-login{
    width: 100%;
    height: 100vh;
    background:rgba(249,249,249,1);
    padding: 219px 30px 0;
    .login-content{
      .error-tel{
        width: calc(100% - 29px);
        height: 33px;
        line-height: 33px;
        margin-left: 29px;
        margin-bottom: 17px;
        padding: 0 35px;
        font-size:24px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(255,102,102,1);
        background: url("../../assets/warn/icon@2x.png") left center no-repeat;
        background-size: 30px 30px;
        &.code-error{
          margin-bottom: 56px;
        }
      }
      .tel-num{
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100px;
        background:rgba(255,255,255,1);
        //border:1px solid rgba(223,223,223,1);
        margin-bottom: 10px;
      }
      .tel-num-input{
        width: calc(100% - 226px);
        border: none;
        outline: none;
        padding: 0 34px;
        height: 100px;
        line-height: 100px;
        border-left: 1px solid rgba(223,223,223,1);
        border-top: 1px solid rgba(223,223,223,1);
        border-bottom: 1px solid rgba(223,223,223,1);
        font-size:28px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        &::-webkit-input-placeholder{
          color:rgba(187,187,187,1);;
        }
      }
      .tel-get-num{
        display: block;
        text-align: center;
        width: 225px;
        height: 100px;
        line-height: 100px;
        background:rgba(208,208,208,1);
        font-size:28px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(255,255,255,1);
        &.code-active{
          color: #fff;
          background:rgba(6,151,156,1);
        }
      }
      .tel-code{
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100px;
        background:rgba(255,255,255,1);
        border:1px solid rgba(223,223,223,1);
        margin-bottom: 25px;
      }
      .tel-code-input{
        width: calc(100% - 4px);
        height: 90px;
        border: none;
        outline: none;
        padding: 0 34px;
        line-height: 90px;
        font-size:28px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        &::-webkit-input-placeholder{
          color:rgba(187,187,187,1);;
        }
      }
      .login-info{
        padding: 0 15px;
        font-size:28px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(187,187,187,1);
        line-height:40px;
      }
      .input-focus{
        border: 1px solid #06979C;
      }
    }
    .login-btn{
      margin-top: 492px;
      margin-bottom: 80px;
      width: 100%;
      padding: 0 30px;
      .login-enter{
        display: block;
        width: 100%;
        height: 100px;
        line-height: 100px;
        text-align: center;
        background:rgba(221,221,221,1);
        border-radius:50px;
        font-size:30px;
        font-family:PingFangSC-Medium;
        font-weight:500;
        color:rgba(255,255,255,1);
        &.login-enter-active{
          background:rgba(6,151,156,1);
        }
      }
    }
  }
</style>
