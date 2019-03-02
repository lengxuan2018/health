<template>
  <div class="base-info">
    <!--温馨提示-->
    <div class="tips" v-if="showTips">
      <div class="tips-content">
        <h3 class="tips-title"><span class="tips-title-line"></span><span class="tips-title-txt">温馨提示</span></h3>
        <div class="tips-txt">
          <p class="txt-top">预约前请检查自己的港澳通行证或者护照，确保签证以及证件本身在有效期之内，港澳通行证或者护照有效期过期前半年之内无法签证</p>
          <h4 class="txt-second-title">注射HPV疫苗需要注意以下事项:</h4>
          <ul class="txt-list">
            <li>对于过敏体质的人群,特别是对疫苗有过过敏史的,一般不建议接种疫苗,包括HPV疫苗。</li>
            <li>对酵母过敏的人群也不适合注射四价HPV疫苗。</li>
            <li>有一些人在注射第一针后有过敏反应,也不建议继续注射另外两针。</li>
            <li>在怀孕期间不宜接种HPV疫苗。</li>
            <li>月经期是可以接种疫苗的。</li>
            <li>HPV疫苗注射之前,不需要常规检测是否有HPV感染。</li>
            <li>比较常见的为局部注射部位的红、肿、痛反应,也有报道,个别人注射后会出现全身酸痛、低热、胃肠道恶心等不良反应,但基本为一过性的。</li>
            <li>接种疫苗时患感冒、发烧等疾患,暂不接种。</li>
          </ul>
        </div>
        <div class="tips-btn">
          <span class="tips-close" v-tap @tap="hideTips">我知道了</span>
        </div>
      </div>
    </div>
    <!--基本信息填写-->
    <div class="person-info">
      <div>
        <ul class="info-form">

          <li :class="{'input-choice':focus==='name'}">
            <span class="form-icon name"></span><input class="form-input" v-model="formData.name" placeholder="请填写姓名" @focus="inputFocus('name')" @blur="inputBlur('name')" v-on:input="changeInput('name')"/>
          </li>
          <li class="error" v-if="error.errname">
            <span class="error-icon"></span><span class="error-txt">请填写正确的姓名</span>
          </li>

          <li :class="{'input-choice':focus==='idCode'}">
            <span class="form-icon id-code"></span><input class="form-input" v-model="formData.idCode" placeholder="请填写身份证号" @focus="inputFocus('idCode')" @blur="inputBlur('idCode')" v-on:input="changeInput('idCode')"/>
          </li>
          <li class="error" v-if="error.erridCode">
            <span class="error-icon"></span><span class="error-txt">请填写正确的身份证号</span>
          </li>

          <li :class="{'input-choice':focus==='idType'}">
            <span class="form-icon id-type"></span><span class="form-input id-type-input" v-model="formData.idType" @touchend.stop.prevent="idTypeChoice"><i v-if="formData.idType">{{formData.idType}}</i><i v-else class="placeholder">选择证件类型</i><i class="id-type-icon"></i></span>
            <!--<span class="form-icon id-type"></span><span class="form-input id-type-input" v-model="formData.idType" @focus="inputFocus('idType')" @blur="inputBlur('idType')" v-on:input="changeInput('idType')"><i v-if="formData.idType">{{formData.idType}}</i><i v-else class="placeholder">选择证件类型</i><i class="id-type-icon"></i></span>-->
          </li>
          <li class="error" v-if="error.erridType">
            <span class="error-icon"></span><span class="error-txt">请选择证件类型</span>
          </li>

          <li :class="{'input-choice':focus==='idNumber'}">
            <span class="form-icon id-number"></span><input class="form-input" v-model="formData.idNumber" placeholder="请填写证件号码" @focus="inputFocus('idNumber')" @blur="inputBlur('idNumber')" v-on:input="changeInput('idNumber')"/>
          </li>
          <li class="error" v-if="error.erridNumber">
            <span class="error-icon"></span><span class="error-txt">请填写正确的证件号</span>
          </li>

          <li :class="{'input-choice':focus==='tel'}">
            <span class="form-icon tel"></span><input class="form-input" v-model="formData.tel" type="number" placeholder="请填写联系电话" @focus="inputFocus('tel')" @blur="inputBlur('tel')" v-on:input="changeInput('tel')"/>
          </li>
          <li class="error" v-if="error.errtel">
            <span class="error-icon"></span><span class="error-txt">请填写正确的联系电话</span>
          </li>

          <li>
            <i :class="{'sex-choice':formData.sex==='male'}">男</i><i :class="{'sex-choice':formData.sex==='female'}">女</i>
          </li>
        </ul>
      </div>
    </div>
    <div class="attention">
      <h4 class="attention-title">注意事项：</h4>
      <p class="attention-txt">请留意支付后将<span>不设取消、改期或退款</span>。在首次注射当天，病人<span>须带同香港居民身份证/往来港澳通行证、中国居民身份证和微信支付凭证(不接受屏幕截图)完成登记</span>，请预留足够时间应诊和接受注射，您可于当天一并预约第二针注射日期。</p>
      <p class="attention-txt">如你未能提供以上资料，我们有权拒绝提供服务，而不会安排退款。</p>
    </div>
    <div class="base-info-btn">
      <span class="info-next-btn" :class="{'next-active':showNext}" v-tap @tap="nextProcess">下一步</span>
    </div>

    <!--证件选择下弹出-->
    <mt-popup position="bottom" class="type-style-modal" v-model="showPopup">
      <mt-picker :slots="idTypeData" @change="changeIdType" :showToolbar="true" :itemHeight="70">
        <span @click="showPopup=false" class="popup-ok">确定</span>
      </mt-picker>
    </mt-popup>


    <!--下一步验证失败弹窗-->
    <div class="error-modal" v-show="errorMoadal">
      <div class="modal-content">
        <div class="modal-top">
          <h4 class="modal-title">您填写的信息有误</h4>
          <p class="modal-txt">请认真核对后重新填写</p>
          <p class="modal-txt">如系统无法识别请与瑞华保险客服联系</p>
          <p class="modal-tel">联系电话:<a class="tel-num" :href="'tel:400-133-3113'">400-133-3113</a></p>
        </div>
        <div class="modal-btn" @click="hideErrorMoadal">好的</div>
      </div>
    </div>
  </div>
</template>

<script>
  import {Popup,Picker} from 'mint-ui'
  export default {
    name: "baseInfo",
    data(){
      return {
        showTips: true,
        formData: {
          name: '',
          idCode: '',
          idType: '',
          idNumber: '',
          tel: '',
          sex: ''
        },
        error: {
          errname: false,
          erridCode: false,
          erridType: false,
          erridNumber: false,
          errtel: false,
          errsex: false
        },
        focus: '',      //当前聚焦的input
        showNext: false,   //下一步按钮高亮
        showPopup: false,     //证件选择弹窗
        idTypeData: [
          {
            flex: 1,
            values: ['请选择','港澳通行证','护照'],
            textAlign: 'center',
            className: 'id-type-list'
          }
        ],
        errorMoadal: false
      }
    },
    watch: {
      formData: {
        handler(newValue,oldValue){
          if(newValue.name && newValue.idCode && newValue.idType && newValue.idNumber && newValue.tel && newValue.sex){
            this.showNext = true
          } else {
            this.showNext = false
          }
        },
        deep: true
      }
    },
    methods:{
      /**
       * 关闭温馨提示
       */
      hideTips(){
        this.showTips = false;
      },
      /**
       *  input获得焦点
       * @param type:当前聚焦的对象 name：姓名 idCode：身份证号码  idType:证件类型  idNumber：证件号码  tel：电话
       */
      inputFocus(type){
        const _this = this;
        _this.focus = type;
      },
      /**
       * input失去焦点
       * @param type:当前失去焦点的对象，同上
       */
      inputBlur(type){
        const _this = this;
        _this.focus = '';
        if(!_this.formData[type]){
          _this.error['err' + type] = true;
        }
        if (type === 'idCode'){   //身份证号码校验
          const idCode = _this.formData.idCode;
          let reg = /^(\d{6})(\d{4})((0[1-9])|(1[0-2]))((0[1-9])|(1[0-9])|(2[0-9])|(3[0-1]))(\d{3})([0-9]|X|x)$/;
          if (!reg.test(idCode)) {
            _this.error['err' + type] = true;
            _this.formData.sex = ''
          }
        }
      },
      /**
       * input输入事件
       * @param type：同上
       */
      changeInput(type){
        const _this = this;
        _this.error['err' + type] = false;
        if (type === 'idCode') {
          const idCode = _this.formData.idCode;
          if (idCode.length>= 17){
            if ( parseInt(idCode[16])%2===0 ) {   //偶数为女
              _this.formData.sex = 'female'
            } else {
              _this.formData.sex = 'male'
            }
          }
          else if (idCode.length>18){
            _this.error['err' + type] = true;
          }
        }
      },
      /**
       * 点击证件选择事件
       */
      idTypeChoice(){
        this.showPopup = true;
      },
      /**
       * 证件选择事件
       * @param picker  选择器picker的方法
       * @param values  当前选择的内容
       */
      changeIdType(picker,values){
        const _this = this;
        if(values[0]==='请选择'){
          _this.formData.idType = ''
        } else {
          _this.formData.idType = values[0];
        }
      },
      /**
       * 下一步事件
       */
      nextProcess(){
        if (!this.showNext){
          document.documentElement.style.overflow = "hidden";
          this.errorMoadal = true;
          return false
        }
        let currentUrl = window.location.href;

        function GetQueryString(name){
          var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
          var r = window.location.search.substr(1).match(reg);
          if(r!=null){
            return  unescape(r[2])
          } else {
            return ""
          }
        }
        let CUserId = GetQueryString('CUserId'),    //截取的客户号
          CPkgNo = GetQueryString('CPkgNo');        //截取的保单号

        this.$router.push({
          name: 'timeChoice'
        })
      },
      hideErrorMoadal(){
        this.errorMoadal = false;
        document.documentElement.style.overflow = "scroll";
      }
    }
  }
</script>

<style lang="scss">
  .base-info{
    padding-top: 20px;
    background:rgba(249,249,249,1);
    height: 100vh;
    .tips{
      width: 100%;
      min-height: 100vh;
      background: rgba(51,51,51,0.2);
      position: fixed;
      top: 0;
      left: 0;
      z-index: 9;
      padding: 0 30px;
      .tips-content{
        position: relative;
        z-index: 99;
        background: rgba(255,255,255,1);
        border-radius: 4px;
        padding: 38px 30px 0;
      }
      .tips-title{
        text-align: center;
        height: 45px;
        line-height: 45px;
        position: relative;
      }
      .tips-title-txt{
        font-size: 32px;
        font-family:PingFangSC-Medium;
        font-weight: 500;
        color: rgba(74,74,74,1);
        position: relative;
        z-index: 199;
      }
      .tips-title-line{
        display: block;
        width: 140px;
        height: 16px;
        background: rgba(109,206,210,1);
        border-radius: 50px;
        position: absolute;
        z-index: 100;
        bottom: 0;
        left: 50%;
        margin-left: -70px;
      }
      .tips-txt{
        margin-top: 18px;
        font-family: PingFangSC-Regular;
        font-size: 24px;
        color: #999;
        line-height: 44px;
      }
      .txt-top{
        margin-bottom: 48px;
      }
      .txt-second-title{
        color: #4A4A4A;
        font-size: 26px;
        line-height: 44px ;
        font-weight: 500;
        font-family: PingFangSC-Medium;
      }
      .txt-list{
        &>li{
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
            top: 16px;
          }
        }
      }
      .tips-btn{
        margin-top: 34px;
        text-align: center;
        padding-bottom: 45px;
      }
      .tips-close{
        display: inline-block;
        width: 600px;
        height: 90px;
        line-height: 90px;
        background:rgba(6,151,156,1);
        border-radius:50px;
        font-size:30px;
        font-family:PingFangSC-Medium;
        font-weight:500;
        color:rgba(255,255,255,1);
      }
    }
    .person-info{
      padding: 0 30px;
      background: #fff;
      .info-form{
        >li{
          width: 100%;
          height: 100px;
          line-height: 100px;
          display: flex;
          border: 1px solid transparent;
          .form-icon{
            width: 70px;
          }
          .form-input{
            width: calc(100% - 72px);
            padding-right: 30px;
            height: 95px;
            line-height: 98px;
            margin-top: 1px;
            border: 1px solid transparent;
            outline: 1px solid transparent;
            font-size:28px;
            font-family:PingFangSC-Regular;
            font-weight:400;
            &::-webkit-input-placeholder{
              color:rgba(170,170,170,1);
            }
          }
          .id-type-input{
            height: 100px;
            line-height: 100px;
            position: relative;

            >i{
              font-style: normal;
            }
            .placeholder{
              color:rgba(170,170,170,1);
            }
            .id-type-icon{
              position: absolute;
              display: block;
              width: 18px;
              height: 100px;
              right: 3px;
              top: 0;
              background: url("../../../assets/down/icon@2x.png") center center no-repeat;
              background-size: 18px 17px;
            }
          }
          &:last-child{
            padding: 25px 0;
            line-height: 50px;
          }
          &.error{
            height: 60px;
            padding: 14px 42px 13px;
            margin-left: -30px;
            line-height: 33px;
            background: rgba(249,249,249,1);
            width: calc(100% + 60px);

            .error-icon{
              display: inline-block;
              width: 30px;
              height: 28px;
              background: url("../../../assets/warn/icon@2x.png");
              background-size: 30px 28px;
            }
            .error-txt{
              font-size:24px;
              font-family:PingFangSC-Regular;
              font-weight:400;
              color:rgba(255,102,102,1);
              //line-height: 33px;
            }
          }
          >i{
            font-style: normal;
            display: inline-block;
            width: 94px;
            height: 50px;
            border-radius:30px;
            margin-right: 65px;
            color: #4A4A4A;
            font-size:28px;
            font-family:PingFangSC-Regular;
            font-weight:400;
            text-align: center;

            &:last-child{
              margin-right: 0;
            }
            &.sex-choice{
              background:rgba(6,151,156,1);
              color: #fff;
            }
          }
        }
        .input-choice{
          border: 1px solid #06979C;
         }
        .name{
          background: url("../../../assets/name/icon@2x.png") center center no-repeat;
          background-size: 30px 43px;
        }
        .id-code{
          background: url("../../../assets/id-code/icon@2x.png") center center no-repeat;
          background-size: 43px 30px;
        }
        .id-type{
          background: url("../../../assets/id-type/icon@2x.png") center center no-repeat;
          background-size: 40px 36px;
        }
        .id-number{
          background: url("../../../assets/id-number/icon@2x.png") center center no-repeat;
          background-size: 36px 27px;
        }
        .tel{
          background: url("../../../assets/tel/icon@2x.png") center center no-repeat;
          background-size: 30px 41px;
        }
      }
    }
    .attention{
      padding: 38px 30px 0;
      max-height: 9999999px;
      .attention-title{
        font-size: 26px;
        line-height: 50px;
        color: #4A4A4A;
        font-weight: 400;
        font-family: PingFangSC-Medium;
        width: 100%;
      }
      .attention-txt{
        color: #999;
        font-size: 24px;
        line-height: 50px;
        font-weight: 400;
        font-family: PingFangSC-Regular;
        width: 100%;
        >span{
          color: #666;
        }
      }
    }
    .base-info-btn{
      margin: 60px 0;
      width: 100%;
      .info-next-btn{
        display: block;
        width: 690px;
        margin: 0 auto;
        height: 100px;
        background:rgba(221,221,221,1);
        line-height: 100px;
        border-radius:50px;
        text-align: center;
        font-size:30px;
        font-family:PingFangSC-Medium;
        font-weight:500;
        color:rgba(255,255,255,1);

        &.next-active{
          background: #06979C;
        }
      }
    }
    .type-style-modal{
      width: 100%;
      text-align: right;
      .picker-toolbar{
        height: 88px;
        line-height: 88px;
        padding: 0 30px;
      }
      .popup-ok{
        font-size:32px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(3,140,247,1);
      }
      .picker-item{
        font-size: 42px;
      }
    }
    .error-modal{
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 1334px;
      z-index: 9;
      background: rgba(51,51,51,0.2);
      display: flex;
      align-items: center;
      justify-content: center;
      .modal-content{
        width: 540px;
        background: #fff;
        border-radius: 20px;
      }
      .modal-top{
        padding-top: 40px;
      }
      .modal-title{
        text-align: center;
        margin-bottom: 17px;
        font-size: 32px;
        line-height: 48px;
        height: 48px;
        color: #fe3e3e;
      }
      .modal-txt{
        font-size: 24px;
        text-align: center;
        color: #999;
        line-height: 44px;
      }
      .modal-tel{
        margin-top: 30px;
        margin-bottom: 25px;
        text-align: center;
        font-size: 28px;
        line-height: 44px;
        color: #999;
      }
      .tel-num{
        color: #038CF7;
        margin-left: 15px;
      }
      .modal-btn{
        height: 88px;
        line-height: 88px;
        font-size: 32px;
        color: #038CF7;
        text-align: center;
        border-top: 1px solid #e5e5e5;
      }
    }
  }
</style>
