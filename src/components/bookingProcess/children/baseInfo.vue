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
          <span class="tips-close" @click="hideTips">我知道了</span>
        </div>
      </div>
    </div>
    <!--基本信息填写-->
    <div class="person-info">
      <div>
        <ul class="info-form">
          <li :class="{'input-choice':focus==='name'}">
            <span class="name"></span><input placeholder="请填写姓名" @focus="focus='name'" @blur="focus=''"/>
          </li>
          <li :class="{'input-choice':focus==='id-code'}">
            <span class="id-code"></span><input placeholder="请填写身份证号" @focus="focus='id-code'" @blur="focus=''"/>
          </li>
          <li :class="{'input-choice':focus==='id-type'}">
            <span class="id-type"></span><input placeholder="选择证件类型" @focus="focus='id-type'" @blur="focus=''"/>
          </li>
          <li :class="{'input-choice':focus==='id-number'}">
            <span class="id-number"></span><input placeholder="请填写证件号码" @focus="focus='id-number'" @blur="focus=''"/>
          </li>
          <li :class="{'input-choice':focus==='tel'}">
            <span class="tel"></span><input placeholder="请填写联系电话" @focus="focus='tel'" @blur="focus=''"/>
          </li>
          <li>
            <i :class="{'sex-choice':sex==='male'}" @click="sexChoice('male')">男</i><i :class="{'sex-choice':sex==='female'}" @click="sexChoice('female')">女</i>
          </li>
        </ul>
        <div class="attention">
          <h4 class="attention-title">注意事项：</h4>
          <p class="attention-txt">请留意支付后将<span>不设取消、改期或退款</span>。在首次注射当天，病人<span>须带同香港居民身份证/往来港澳通行证、中国居民身份证和微信支付凭证(不接受屏幕截图)完成登记</span>，请预留足够时间应诊和接受注射，您可于当天一并预约第二针注射日期。</p>
          <p class="attention-txt">如你未能提供以上资料，我们有权拒绝提供服务，而不会安排退款。</p>
        </div>
        <div class="base-info-btn">下一步</div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "baseInfo",
    data(){
      return {
        showTips: false,
        sex: 'male',
        focus: ''
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
       * 选择性别
       * @param sex：'male'男，'female'女
       */
      sexChoice(sex){
        this.sex = sex
      }
    }
  }
</script>

<style lang="scss">
  .base-info{
    padding-top: 20px;
    background:rgba(249,249,249,1);
    .tips{
      width: 100%;
      min-height: 1334px;
      background: rgba(51,51,51,0.2);
      position: relative;
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
        //font-weight:400;
        font-size: 24px;
        color: #999;
        line-height: 44px;
      }
      .txt-top{

      }
      .txt-second-title{
        color: #4A4A4A;
        font-size: 26px;
        font-weight: 500;
      }
      .txt-list{
        &>li{

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
          border: 1px solid transparent;
          >span{
            display: inline-block;
            width: 70px;
          }
          >input{
            width: calc(100% - 72px);
            padding-right: 30px;
            height: 96px;
            line-height: 96px;
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

          &:last-child{
            padding: 25px 0;
            line-height: 50px;
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
          background: url("../../../assets/name/icon.png") no-repeat;
        }
        .id-code{
          background: url("../../../assets/id-code/icon.png") no-repeat;
        }
        .id-type{
          background: url("../../../assets/id-type/icon.png") no-repeat;
        }
        .id-number{
          background: url("../../../assets/id-number/icon.png") no-repeat;
        }
        .tel{
          background: url("../../../assets/tel/icon.png") no-repeat;
        }
      }
    }
    .attention{
      margin-top: 38px;
      .attention-title{
        font-size: 26px;
        line-height: 50px;
        color: #4A4A4A;
      }
      .attention-txt{
        color: #999;
        font-size: 24px;
        line-height: 50px;
        >span{
          color: #666;
        }
      }
    }
    .base-info-btn{
      margin: 60px 0;
      width: 100%;
      height: 100px;
      line-height: 100px;
      background:rgba(221,221,221,1);
      border-radius:50px;
      text-align: center;
      font-size:30px;
      font-family:PingFangSC-Medium;
      font-weight:500;
      color:rgba(255,255,255,1);

      .next-active{
        background: #06979C;
      }
    }
  }
</style>
