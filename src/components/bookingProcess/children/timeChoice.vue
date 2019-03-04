<template>
  <div class="time-choice">
    <!--日历表-->-{{orderNo}}-
    <div class="time-choice-main">
      <div class="header" v-tap @tap="showSections">
        <div class="logo">香港漫溢</div>
        <div class="location">{{localAdd}}</div>
      </div>
      <div class="choice-content">
        <p class="choice-instruction">请您于月历上选取首次注射日期（仅提供最近30天内的服务预约），其他可约日期將定時更新。本中心会为您在完成支付后保留三支疫苗存货，支付后将不设取消、改期或退款。 如有任何查询，请致电港島西HPV热线4008588380或电邮:fmciw@hksh-healthcare.com 。</p>
        <div class="calendar">
          <h3 class="calendar-title">预约时间</h3>
          <!--日历表-->
          <div class="calendar-content">
            <div class="header-month">
              <span class="per-month" :class="{'un-show':swipeIndex===0}" @click="perMonth"></span>
              <span class="month-txt">{{showMonth | toChinese}}</span>
              <span class="next-month" :class="{'un-show':swipeIndex===2}" @click="nextMonth"></span>
            </div>
            <div class="calendar-list">
              <div class="weeks">
                <span>周日</span><span>周一</span><span>周二</span><span>周三</span><span>周四</span><span>周五</span><span>周六</span>
              </div>
              <mt-swipe ref="calendar" class="days" :auto="0" :continuous="false" :defaultIndex="swipeIndex" @change="calendarMonthChange" :showIndicators="false">
                <mt-swipe-item class="day-lists clearfix">
                  <div class="day-item" :class="{'unselect':item.state}" v-tap @tap="clickCalendar(item,index)" v-for="(item,index) in perDayList">
                    <span class="day-num">{{item.num}}</span>
                    <span class="day-txt" v-if="item.state">已满</span>
                  </div>
                </mt-swipe-item>
                <mt-swipe-item class="day-lists clearfix">
                  <div class="day-item" :class="{'unselect':item.state}" v-tap @tap="clickCalendar(item,index)" v-for="(item,index) in daysList">
                    <span class="day-num">{{item.num}}</span>
                    <span class="day-txt" v-if="item.state">已满</span>
                  </div>
                </mt-swipe-item>
                <mt-swipe-item class="day-lists clearfix">
                  <div class="day-item" :class="{'unselect':item.state}" v-tap @tap="clickCalendar(item,index)" v-for="(item,index) in nextDayList">
                    <span class="day-num">{{item.num}}</span>
                    <span class="day-txt" v-if="item.state">已满</span>
                  </div>
                </mt-swipe-item>
              </mt-swipe>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--选择门诊部-->
    <div class="sections" v-if="sectionModal">
      <div class="section-content">
        <div class="section-top" v-tap @tap="selectLoacalFn">{{localAdd}}</div>
        <ul class="section-list">
          <li class="section-item" v-tap @tap="selectSectionFn(item)" :class="{'section-selected':selectSection===item.name}" v-for="(item,index) in sectionData">{{item.name}}</li>
        </ul>
      </div>
      <!--选择地址下拉弹窗-->
      <mt-popup position="bottom" class="sections-modal" v-model="sectionPopup" :closeOnClickModal="false">
        <mt-picker :slots="localList" @change="changeLocal" :showToolbar="true" :itemHeight="70">
          <span v-tap @tap="confirmLocal" class="popup-ok">确定</span>
        </mt-picker>
      </mt-popup>
    </div>
    <!--预约时间段弹窗-->
    <div class="time-choice-modal" v-show="timeModal">
      <div class="time-modal-content">
        <div class="time-modal-top">
          时段选择<span class="time-modal-close" v-tap @tap="closeTimeModal">关闭</span>
        </div>
        <div class="time-line">
          <div class="time-left">
            <p class="line1">上午</p>
            <p class="line2">上午10时至下午1时</p>
          </div>
          <div class="time-right" v-tap @tap="confirmTime(amChoice)" :class="{'choice-active':amChoice}"><span v-if="amChoice" class="time-icon"></span>{{amTxt}}
          </div>
        </div>
        <div class="time-line">
          <div class="time-left">
            <p class="line1">下午</p>
            <p class="line2">下午3时至下午6时</p>
          </div>
          <div class="time-right"  v-tap @tap="confirmTime(pmChoice)" :class="{'choice-active':pmChoice}"><span v-if="pmChoice" class="time-icon"></span>{{pmTxt}}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {Toast,Popup,Picker,Swipe} from 'mint-ui'
  export default {
    name: "timeChoice",
    data(){
      return {
        orderNo: this.$route.params.orderNo || this.$route.query.orderNo || '',   //订单号
        localAdd: '香港·港岛西',             //当前定位
        sectionModal: false,              //选择门诊弹窗
        sectionData: [                    //门诊部列表
          {
            name: '综合门诊中心'
          },{
            name: '养和医院门诊部'
          },{
            name: '家庭医学及基层医疗中心'
          }
        ],
        selectSection: '',      //当前选择的门诊部
        sectionPopup: true,                  //门诊弹窗下拉选择显示状态
        localList: [                        //下拉滚动列表信息
          {
            flex: 1,
            values: ['香港·港岛西','香港·湾仔','香港·铜锣湾','香港·中环','香港·屯门','香港·元朗','香港·沙田','香港·荃湾'],
            textAlign: 'center',
            className: 'local-select'
          }
        ],
        selectLocal: '',        //下拉滚动选择数据
        daysList: [
          /*{num: null,state: false},{num: null,state: false},{num: null,state: false},{num: null,state: false},{num: null,state: false},{num: 1,state: false},{num: 2,state: true},{num: 3,state: false},{num: 4,state: false},{num: 5,state: false},{num: 6,state: true},{num: 7,state: false},{num: 8,state: true},{num: 9,state: false},{num: 10,state: true},{num: 11,state: false},{num: 12,state: false},{num: 13,state: true},{num: 14,state: false},{num: 15,state: false},{num: 16,state: false},{num: 17,state: true},{num: 18,state: false},{num: 19,state: true},{num: 20,state: false},{num: 21,state: true},{num: 22,state: false},{num: 23,state: false},{num: 24,state: true},{num: 25,state: false},{num: 26,state: false},{num: 27,state: false},{num: 28,state: true},{num: 29,state: false},{num: 30,state: true},{num: 31,state: false}*/
        ],        //日历表数据
        perDayList: [],         //上月日历
        nextDayList: [],        //下月日历
        yearList: [],
        perYearList: [],
        nextYearList: [],
        swipeIndex : 1,
        showMonth: null,
        timeModal: false,        //时段选择弹窗显示
        amChoice: true,
        pmChoice: false,
        //dateData: undefined
      }
    },
    computed:{
      "today"(){
        let date = new Date();
        let year = date.getFullYear(),
          month = date.getMonth() + 1,
          today = date.getDate();
        this.showMonth = month;
        return {year:year,month:month,today:today}
      },
      'amTxt'(){
        const _this = this;
        if(_this.amChoice){
          return '可预约'
        } else {
          return '已满'
        }
      },
      'pmTxt'(){
        const _this = this;
        if(_this.pmChoice){
          return '可预约'
        } else {
          return '已满'
        }
      }
      /*'showMonth'(){
        switch (this.swipeIndex) {
          case 0 :
            return this.today.month - 1;
            break;
          case 1 :
            return this.today.month;
            break;
          case 2 :
            return this.today.month + 1;
            break;
          default :
            return this.today.month;
        }
      }*/
    },
    watch: {
      'swipeIndex'(newValue,oldValue){
        switch (newValue) {
          case 0 :
            this.showMonth = this.today.month - 1;
            break;
          case 1 :
            this.showMonth = this.today.month;
            break;
          case 2 :
            this.showMonth = this.today.month + 1;
            break;
          default :
            this.showMonth = this.today.month;
        }
      }
    },
    filters: {
      toChinese(value){
        let arr = ['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月'];
        for (let i=0;i<arr.length;i++){
          if(i==(value-1)){
            return arr[i]
          }
        }
      }
    },
    created(){
      this.init();
    },
    beforeMount(){

    },
    methods:{
      /**
       * 页面加载方法
       */
      init(){
        const _this = this;
        //获取当月、上月、下月数据
        const year = _this.today.year,
          month = _this.today.month;
        switch (month) {
          case 1:
            _this.yaerList = _this.getDate(year);
            _this.perYearList =_this.getDate(year-1);
            _this.perDayList = _this.perYearList[11];
            _this.daysList = _this.yearList[month-1];
            _this.nextDayList = _this.yaerList[month];
            break;
          case 12:
            _this.yearList = _this.getDate(year);
            _this.nextYearList = _this.getDate(year+1);
            _this.perDayList = _this.yaerList[month];
            _this.daysList = _this.yearList[month-1];
            _this.nextDayList = _this.nextYearList[0];
            break;
          default:
            _this.yearList = _this.getDate(year);
            _this.perDayList = _this.yearList[month-2];
            _this.daysList = _this.yearList[month-1];
            _this.nextDayList = _this.yearList[month];
        }
      },
      /**
       * 点击logo部分弹出门诊地址窗口
       */
      showSections(){
        const _this = this;
        _this.sectionModal = true;
      },
      /**
       * 选择门诊确认事件
       * @param item：当前点击的对象
       */
      selectSectionFn(item){
        const _this = this;
        _this.selectSection = item.name;
        _this.sectionModal = false;
      },
      /**
       * 点击门诊弹窗头部激活下拉弹窗事件
       */
      selectLoacalFn(){
        const _this = this;
        _this.sectionPopup = true;
      },
      /**
       * 下拉滚动选择列表
       * @param picker  选择器picker的方法
       * @param values  当前选择的内容
       */
      changeLocal(picker,values){
        this.selectLocal = values[0];
      },
      /**
       * 下拉滚动列表确认事件
       */
      confirmLocal(){
        const _this = this;
        _this.localAdd = _this.selectLocal;
        Toast({
          message: '选择成功',    //提示信息
          position: 'center',   //位置
          duration: 2000        //时间
          //iconClass: 'icon-class' //如果显示图标的class名称
        });
        setTimeout(function () {
          _this.sectionPopup = false
        },2000)
      },
      /**
       * 获取时间数组
       */
      getDate(year){
        var dayMseconds = 86400000;
        var monthArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
        var resultArr = [];

        function isRun() {      //判断是否是闰年
          if ((year % 400 == 0) || (year % 4 == 0) && (year % 100 != 0)) {
            return true;
          } else {
            return false;
          }
        }

        var run = isRun();
        for (var m = 1; m < 13; m++) {
          var arr = [];
          var firstday = new Date(year + "-" + m + "-01").getTime();//拿到时间戳
          var lastday = 30;
          var weekDay = new Date(firstday).getDay();      //根据时间戳，拿到本月第一天的星期
          var weekLastDay = weekDay + 31;   //拿到本月最后一天的星期
          switch (m) {
            case 2:
              if (run) {
                lastday = new Date(year + "-" + m + "-29").getTime();
                weekLastDay = weekDay + 29;
              } else {
                lastday = new Date(year + "-" + m + "-28").getTime();
                weekLastDay = weekDay + 28;
              }
              break;
            case 4:
              lastday = new Date(year + "-" + m + "-30").getTime();
              weekLastDay = weekDay + 30;
              break;
            case 6:
              lastday = new Date(year + "-" + m + "-30").getTime();
              weekLastDay = weekDay + 30;
              break;
            case 9:
              lastday = new Date(year + "-" + m + "-30").getTime();
              weekLastDay = weekDay + 30;
              break;
            case 11:
              lastday = new Date(year + "-" + m + "-30").getTime();
              weekLastDay = weekDay + 30;
              break;

            default :
              lastday = new Date(year + "-" + m + "-31").getTime();//拿到时间戳
              weekLastDay = weekDay + 31;
              break;

          }

          var n = 0;
          for (var i = 0; i < 42; i++) {
            var content = {date: '', class: ''};
            if (i < weekDay || i > weekLastDay - 1) {
              arr.push(content);
            } else {
              n++;
              arr.push(
                {
                  num: new Date(firstday + dayMseconds * n - dayMseconds).getDate(),
                  state: false
                }
              )
            }

          }
          resultArr.push(arr);
        }
        return resultArr
      },
      /**
       * 点击日历事件
       * @param item：当前点击对象
       * @param index：当前点击索引
       */
      clickCalendar(item,index){
        if(item.state || !item.num) return;
        this.timeModal = true;
        document.documentElement.style.overflow = "hidden";
      },
      perMonth(){
        if (this.swipeIndex===0){
          return
        }
        this.$refs['calendar'].prev()
      },
      nextMonth(){
        if (this.swipeIndex===2){
          return
        }
        this.$refs['calendar'].next()
      },
      calendarMonthChange(){
        //debugger
        this.swipeIndex = this.$refs['calendar'].index
      },
      /**
       * 关闭时间选择弹窗
       */
      closeTimeModal(){
        this.timeModal = false;
        document.documentElement.style.overflow = "scroll";
      },
      /**
       * 预约时段弹窗点击事件
       * @param flag：当前可预约状态
       */
      confirmTime(flag){
        if(!flag) return
        /*axios请求提交*/
        this.$router.push({
          name: 'viewBooking'
        })
      }
    }
  }
</script>

<style lang="scss">
  .time-choice{
    .time-choice-main{
      width: 100%;
      height: 100vh;
      background: rgba(249,249,249,1);
      .header{
        width: 100%;
        height: 120px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 30px;
        background:rgba(255,255,255,1);
        box-shadow:0px 10px 10px 0px rgba(0,0,0,0.05);
      }
      .logo{
        padding-left: 64px;
        height: 120px;
        line-height: 120px;
        background: url("../../../assets/logo/icon@2x.png") left center no-repeat;
        background-size: 44px 70px;
        font-size:30px;
        font-family:PingFangSC-Medium;
        font-weight:500;
        color:rgba(51,51,51,1);
      }
      .location{
        padding-right: 40px;
        height: 120px;
        line-height: 120px;
        text-align: right;
        background: url("../../../assets/location/icon@2x.png") right center no-repeat;
        background-size: 29px 40px;
        font-size:26px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(102,102,102,1);
      }
      .choice-content{
        padding: 31px 30px 0;
        .choice-instruction{
          font-size:26px;
          font-family:PingFangSC-Regular;
          font-weight:400;
          color:rgba(153,153,153,1);
          line-height:46px;
        }
      }
      .calendar{
        margin-top: 50px;
        .calendar-title{
          font-size:32px;
          font-family:PingFangSC-Medium;
          font-weight:500;
          color:rgba(74,74,74,1);
          line-height:46px;
          margin-bottom: 28px;
        }
      }
    }
    .sections{
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100vh;
      z-index: 9;
      display: flex;
      align-items: center;
      justify-content: center;
      background:rgba(0,0,0,0.3);
      .section-content{
        width: 690px;
        position: relative;
        z-index: 99;
        background: rgba(255,255,255,1);
        border-radius:30px;
        padding: 10px 30px;
      }
      .section-top{
        height: 46px;
        line-height: 46px;
        margin: 32px 0;
        text-align: center;
        font-size:32px;
        font-family:PingFangSC-Medium;
        font-weight:500;
        color:rgba(74,74,74,1);
        background: url("../../../assets/down/icon@2x.png") right center no-repeat;
        background-size: 18px 17px;
      }
      .section-list{
        padding-top: 10px;
        border-top: 1px solid rgba(219,219,219,1);
        margin-bottom: 49px;
      }
      .section-item{
        width: 100%;
        height: 100px;
        line-height: 100px;
        margin: 30px 0;
        padding: 0 35px;
        background:rgba(248,248,248,1);
        border-radius:50px;
        font-size:28px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(102,102,102,1);
        &.section-selected{
          background:rgba(6,151,156,1);
          color: #fff;
        }
      }
      .sections-modal{
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
    }
    //日历表样式
    .calendar-content{
      width:690px;
      //height:630px;
      background:rgba(255,255,255,1);
      border-radius:30px;
      padding: 34px 34px;
      /*.mu-picker.mu-datepicker{
        .mu-date-display{
          display: none;
        }
        .mu-picker-container{
          width: 100%;
        }
      }*/
      .header-month{
        width: 100%;
        margin-bottom: 47px;
        height: 46px;
        line-height: 46px;
        text-align: center;
        position: relative;
        .per-month,.next-month{
          display: block;
          position: absolute;
          top: 0;
          z-index: 19;
          width: 17px;
          height: 100%;

          &.un-show{
            z-index: -2;
          }
        }
        .per-month{
          left: 0;
          background: url("../../../assets/left/icon@2x.png") center center no-repeat;
          background-size: 17px 18px;
        }
        .next-month{
          right: 0;
          background: url("../../../assets/right/icon@2x.png") center center no-repeat;
          background-size: 17px 18px;
        }
        .month-txt{
          font-size:32px;
          font-family:PingFangSC-Regular;
          font-weight:400;
          color:rgba(74,74,74,1);
        }
      }
      .calendar-list{
        width: 100%;
        height: 530px;
        .mint-swipe-items-wrap{
          width: 100%;

          /*> div.is-active{
            display: flex;
            flex-wrap: wrap;
          }*/
        }
        .weeks{
          padding: 0 3px;
          display: flex;
          justify-content: space-between;
          >span{
            display: inline-block;
            height: 46px;
            line-height: 46px;
            font-size:28px;
            font-family:PingFangSC-Regular;
            font-weight:400;
            color:rgba(74,74,74,1);
          }
        }

        .days{
          display: flex;
          flex-wrap: wrap;
          margin-top: 42px;
          .day-lists{
            /*display: flex;
            flex-wrap: wrap;*/
          }
          .day-item{
            width: 64px;
            height: 64px;
            float: left;
            line-height: 64px;
            text-align: center;
            //background: #ccc;
            border-radius: 50%;
            position: relative;
            margin-right: 29px;
            margin-bottom: 14px;
            &:nth-child(7),&:nth-child(14),&:nth-child(21),&:nth-child(28),&:nth-child(35),&:nth-child(42){
              margin-right: 0;
            }
            .day-num{
              font-size:32px;
              font-family:DINAlternate-Bold;
              font-weight:bold;
              color:rgba(6,151,156,1);
            }
            .day-txt{
              display: block;
              position: absolute;
              width: 40px;
              height: 46px;
              line-height: 46px;
              bottom: -20px;
              left: 50%;
              margin-left: -20px;
              font-size:20px;
              font-family:PingFangSC-Regular;
              font-weight:400;
              color:rgba(153,153,153,1);
            }
            &.unselect{
              .day-num{
                color: rgba(155,155,155,1);
              }
            }
          }
        }
      }
    }
    //时间段选择弹窗
    .time-choice-modal{
      position: fixed;
      top: 0;
      left: 0;
      z-index: 99;
      background:rgba(0,0,0,0.3);
      width: 100%;
      height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      .time-modal-content{
        background: #fff;
        position: relative;
        z-index: 999;
        width: 690px;
        padding: 37px 30px 18px;
        .time-modal-top{
          padding: 0 4px 0 10px;
          margin-bottom: 37px;
          height: 46px;
          line-height: 46px;
          //border-bottom: 1px solid rgba(219,219,219,1);
          display: flex;
          justify-content: space-between;
          font-size:32px;
          font-family:PingFangSC-Medium;
          font-weight:500;
          color:rgba(74,74,74,1);
        }
        .time-modal-close{
          //弹窗关闭图标
        }
        .time-line{
          padding: 50px 0 40px 10px;
          border-top: 1px solid rgba(219,219,219,1);
          display: flex;
          justify-content: space-between;
        }
        .time-left{
          padding-top: 6px;
        }
        .line1{
          height: 45px;
          line-height: 45px;
          font-size:32px;
          font-family:PingFangSC-Medium;
          font-weight:500;
          color:rgba(74,74,74,1);
          margin-bottom: 11px;
        }
        .line2{
          height: 37px;
          line-height: 37px;
          font-size:26px;
          font-family:PingFangSC-Regular;
          font-weight:400;
          color:rgba(102,102,102,1);
        }
        .time-right{
          width:250px;
          height:100px;
          line-height: 100px;
          border-radius:50px;
          background:rgba(221,221,221,1);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size:30px;
          font-family:PingFangSC-Regular;
          font-weight:400;
          color:rgba(255,255,255,1);
          .time-icon{
            width: 40px;
            height: 40px;
            background: url("../../../assets/record/icon@2x.png") center center no-repeat;
            background-size: 40px 40px;
            margin-right: 10px;
          }
          &.choice-active{
            background:rgba(6,151,156,1);
          }
        }


      }
    }
  }
</style>
