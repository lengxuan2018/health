<template>
  <div class="view-booking">
    <h3 class="view-title">预留信息</h3>
    <ul class="person-info">
      <li v-for="(item,index) in personData" class="info-item">
        {{item.name}}:<span class="info-item-txt">{{item.txt}}</span>
      </li>
    </ul>
    <div class="view-attention">
      <h4>注意事项</h4>
      <p>在首次注射当天，<b>须携带中国居民身份证和往来港澳通行证或护照完成登记</b>，请预留足够时间应诊和接受注射，您可于当天一并预约第二针注射日期。</p>
      <p>如你未能提供以上资料，我们有权拒绝提供服务，而不会安排退款。</p>
      <h4>温馨提示:</h4>
      <p>预约前请检查自己的港澳通行证或者护照，确保签证以及证件本身在有效期之内，港澳通行证或者护照有效期过期前半年之内无法签证</p>
    <p>注射HPV疫苗需要注意以下事项:</p>
    <p>①对于过敏体质的人群,特别是对疫苗有过过敏史的，一般不建议接种疫苗,包括HPV疫苗。</p>
    <p>②对酵母过敏的人群也不适合注射四价HPV疫苗.</p>
    <p>③有一些人在注射第一针后有过敏反应，也不建议继续注射另外两针。</p>
    <p>④在怀孕期间不宜接种HPV疫苗.</p>
    <p>⑤月经期是可以接种疫苗的。</p>
    <p>⑥HPV疫菌注射之前,不需要常规检测是否有HPV感染。</p>
    <p>⑦比较常见的为局部注射部位的红肿痛反应也有报道，个别人注射后会出现全身酸痛、低热、胃肠道恶心等不良反应,但基本为一过性的</p>
    <p>⑧接种疫苗时患感冒、发烧等疾患暂不接种。</p>
    </div>
    <div class="confirm-btn" v-tap @tap="viewNext">完成</div>
  </div>
</template>

<script>
  export default {
    name: "viewBooking",
    data(){
      return {
        personData: [
          {name: '姓名',txt: '陈某某'},{name: '身份证号',txt: '4405**********1010'},{name: '证件类型',txt: '港澳通行证'},{name: '证件号码',txt: 'SZ-5203432'},{name: '性别',txt: '男'},{name: '医院',txt: '香港港岛西家庭医学及基层医疗中心'},{name: '预约时间',txt: '2019年2月2日上午10时至下午1时'}
        ]        //列表展示数据
      }
    },
    methods: {
      /**
       * 点击完成事件
       */
      viewNext(){
        this.$router.push({
          name: 'bookings'
        })
      }
    }
  }
</script>

<style lang="scss">
  .view-booking{
    width: 100%;
    height: 100vh;
    background:rgba(249,249,249,1);
    padding: 0 30px;
    .view-title{
      height:46px;
      font-size:32px;
      font-family:PingFangSC-Medium;
      font-weight:500;
      color:rgba(74,74,74,1);
      line-height:46px;
      margin-top: 40px;
      margin-bottom: 30px;
    }
    .person-info{
      width: 690px;
      background: #fff;
      border-radius:20px;
      padding: 0 30px;
      .info-item{
        width: 100%;
        height: 98px;
        line-height: 98px;
        padding: 0 10px;
        border-bottom: 1px solid rgba(234,234,234,1);
        font-size:26px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(74,74,74,1);
        &:last-child{
          border-bottom: none;
        }
        .info-item-txt{
          margin-left: 10px;
        }
      }
    }
    .view-attention{
      padding-top: 32px;
      padding-bottom: 80px;
      >h4{
        height: 50px;
        line-height: 50px;
        font-size: 26px;
        font-family: PingFangSC-Medium;
        color: #4A4A4A;
        margin-top: 10px;
      }
      >p{
        line-height: 50px;
        font-size: 24px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color: #999;
        >b{
          font-family:PingFangSC-Regular;
          font-weight:400;
          color: #666;
        }
      }
    }
    .confirm-btn{
      width: 100%;
      height:100px;
      line-height: 100px;
      text-align: center;
      background:rgba(6,151,156,1);
      border-radius:50px;
      font-size:30px;
      font-family:PingFangSC-Medium;
      font-weight:500;
      color:rgba(255,255,255,1);
      margin-bottom: 100px;
    }
  }
</style>
