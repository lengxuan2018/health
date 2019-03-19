<template>
  <div class="time-choice">
    <!--选择时间-->
    <div v-show="processStep===1">
      <!--日历表-->
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
                <span class="per-month" :class="{'un-show':swipeIndex===0}" v-tap @tap="perMonth"></span>
                <span class="month-txt">{{selectYear}}年{{showMonth | changeDay}}月</span>
                <span class="next-month" :class="{'un-show':swipeIndex===showMonthNum-1}" v-tap @tap="nextMonth"></span>
              </div>
              <div class="calendar-list">
                <div class="weeks">
                  <span>周日</span><span>周一</span><span>周二</span><span>周三</span><span>周四</span><span>周五</span><span>周六</span>
                </div>
                <mt-swipe ref="calendar" class="days" :auto="0" :continuous="false" :defaultIndex="swipeIndex" @change="calendarMonthChange" :showIndicators="false">
                  <mt-swipe-item class="day-lists clearfix" v-for="(monthItem,monthIndex) in daysList">
                    <div class="day-item" :class="[{'unselect':!item.state},{'select-time':selectItem.month==showMonth&&selectItem.num==item.num&&item.num}]" v-tap @tap="clickCalendar(item,index)" v-for="(item,index) in monthItem">
                      <span class="day-num">{{item.num}}</span>
                      <span class="day-txt" v-if="!item.state && item.num && !item.before">已满</span>
                    </div>
                  </mt-swipe-item>
                  <!--<mt-swipe-item class="day-lists clearfix">
                    <div class="day-item" :class="{'unselect':!item.state}" v-tap @tap="clickCalendar(item,index)" v-for="(item,index) in secondDayList">
                      <span class="day-num">{{item.num}}</span>
                      <span class="day-txt" v-if="!item.state && item.num">已满</span>
                    </div>
                  </mt-swipe-item>
                  <mt-swipe-item class="day-lists clearfix">
                    <div class="day-item" :class="{'unselect':!item.state}" v-tap @tap="clickCalendar(item,index)" v-for="(item,index) in thirdDayList">
                      <span class="day-num">{{item.num}}</span>
                      <span class="day-txt" v-if="!item.state && item.num">已满</span>
                    </div>
                  </mt-swipe-item>-->
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
            时段选择<span class="time-modal-close" v-tap @tap="closeTimeModal"></span>
          </div>
          <div class="time-line">
            <div class="time-left">
              <p class="line1">上午</p>
              <p class="line2">上午10时至下午1时</p>
            </div>
            <div class="time-right" v-tap @tap="confirmTime(selectItem.am,'am')" :class="{'choice-active':selectItem.am}"><span v-if="selectItem.am" class="time-icon"></span>{{amTxt}}
            </div>
          </div>
          <div class="time-line">
            <div class="time-left">
              <p class="line1">下午</p>
              <p class="line2">下午3时至下午6时</p>
            </div>
            <div class="time-right"  v-tap @tap="confirmTime(selectItem.pm,'pm')" :class="{'choice-active':selectItem.pm}"><span v-if="selectItem.pm" class="time-icon"></span>{{pmTxt}}
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--提交信息页面-->
    <view-booking ref="viewBooking" v-show="processStep===2" :formData="formData" :personData="personData" :orderNo="orderNo"></view-booking>
  </div>
</template>

<script>
  import {Toast,Popup,Picker,Swipe,Indicator} from 'mint-ui'
  import ViewBooking from "./viewBooking";
  export default {
    name: "timeChoice",
    components: {ViewBooking},
    data(){
      return {
        processStep: 1,     //选择时间和地区为1，确认提交为2
        orderNo: this.$route.params.orderNo || this.$route.query.orderNo || '',   //订单号
        formData: this.$route.params.formData || this.$route.query.formData || {},
        localArr: [],                     //请求出的区域和门店
        localAdd: '',                     //当前定位
        sectionModal: true,              //选择门诊弹窗
        sectionData: [
          /*{
            name: '综合门诊中心'
          },{
            name: '养和医院门诊部'
          },{
            name: '家庭医学及基层医疗中心'
          }*/
        ],              //门诊部列表
        selectSection: '',               //当前选择的门诊部
        sectionPopup: true,              //门诊弹窗下拉选择显示状态
        localList: [                        //下拉滚动列表信息
          {
            flex: 1,
            values: [/*'香港·港岛西'*/],
            textAlign: 'center',
            className: 'local-select'
          }
        ],
        selectLocal: '',        //下拉滚动选择数据
        daysList: [
          /*{
          num: null,      //当前的日期
          state: false,   //是否可预约
          am: true,       //上午是否可预约
          pm: false,       //下午是否可预约
          before: false     //是否早于当前日期
          }*/
        ],        //日历表数据
        //secondDayList: [],         //下月日历
        //thirdDayList: [],        //下下月日历
        yearList: [],           //今年日期数组
        nextYearList: [],       //明年日期数组
        swipeIndex : 0,         //当前显示的日历索引
        showMonth: null,        //当前选择的日
        timeModal: false,        //时段选择弹窗显示
        //amChoice: true,         //
        //pmChoice: true,
        personData: {
          //保存接口所需数据
          order_no: '',           //订单号
          area_id: '',            //区域ID
          clinic_id: '',          //诊所ID
          //area_name: '',          //区域
          //clinic_name: '',        //诊所
          full_address: '',         //区域+诊所
          app_date: '',           //预约日期
          time_interval: '1001'   //预约时段: 上午1001   下午1002
        },           //提交页面订单信息
        selectYear: '',       //当前展示的年
        selectDay: '',         //当前点击选择的日
        selectItem: {
          /*
          num: null,      //当前的日期
          state: false,   //是否可预约
          am: true,       //上午是否可预约
          pm: false,       //下午是否可预约
          month: null     */
        },
        unChoiceDay: 14,        //从今天开始不能选择的天数
        showMonthNum: 4         //总共显示多少月日历
      }
    },
    computed:{
      "today"(){
        let date = new Date($.ajax({async: false}).getResponseHeader("Date"));
        let date2 = new Date();
        console.log('Date:',date2)
        console.log('Date-ajax:',date)
        let year = date.getFullYear(),
          month = date.getMonth() + 1,
          today = date.getDate();
        this.showMonth = month;
        return {year:year,month:month,today:today}
      },
      'amTxt'(){
        const _this = this;
        if(_this.selectItem.am){
          return '可预约'
        } else {
          return '已满'
        }
      },
      'pmTxt'(){
        const _this = this;
        if(_this.selectItem.pm){
          return '可预约'
        } else {
          return '已满'
        }
      }
    },
    watch: {
      'swipeIndex'(newValue,oldValue){
        const _this = this;
        const year = _this.today.year;
        const month = _this.today.month;

        if(month + newValue <=12){
          _this.selectYear = year;
          _this.showMonth = month + newValue;
        }
        else {
          _this.selectYear = parseInt(year) + 1;
          _this.showMonth = newValue - (12 - month);
        }
        /*switch (newValue) {
          case 0 :
            _this.selectYear = year;
            _this.showMonth = month;
            /!*if(_this.today.month == 1){
              _this.showMonth = 12;
              _this.selectYear -= 1;
            }
            else {
              _this.showMonth = _this.today.month - 1;
            }*!/
            break;
          case 1 :
            if(month==12){
              _this.selectYear = parseInt(year) + 1;
              _this.showMonth = 1;
            }
            else {
              _this.selectYear = year;
              _this.showMonth = parseInt(month) + 1;
            }
            //_this.showMonth = _this.today.month;
            break;
          case 2 :
            if(month==11){
              _this.selectYear = parseInt(year) + 1;
              _this.showMonth = 1;
            }
            else if(month==12){
              _this.selectYear = parseInt(year) + 1;
              _this.showMonth = 2;
            }
            else{
              _this.selectYear = year;
              _this.showMonth = parseInt(month) + 2;
            }
            /!*if(_this.today.month == 12){
              _this.showMonth = 1;
              _this.selectYear = parseInt(_this.selectYear) + 1;
            }
            else {
              _this.showMonth = _this.today.month + 1;
            }*!/
            break;
          default :
            _this.selectYear = year;
            _this.showMonth = month;
            //_this.showMonth = _this.today.month;
        }*/
      }
    },
    filters: {
      changeDay(value){
        if(parseInt(value)<10){
          return '0' + value
        } else{
          return value
        }
      }
    },
    created(){
      this.init();
    },
    methods:{
      /**
       * 页面加载方法
       */
      init(){
        const _this = this;
        _this.formData = JSON.parse(_this.formData);
        //获取当月、上月、下月数据
        const year = _this.today.year,
          month = _this.today.month,
          today = _this.today.today;

        _this.selectYear = year;
        _this.selectMonth = month;

        _this.yearList = _this.getDate(year);
        _this.nextYearList =_this.getDate(parseInt(year)+1);
        setDayList(_this.showMonthNum);
        console.log('daysList',this.daysList);
        /**
         * 设置显示时间数据
         * @param n:显示几个月数据
         */
        function setDayList(n) {
          let currentMonth = parseInt(_this.today.month);
          if(n+currentMonth-1 <=12){
            for (let i=currentMonth-1;i<n+currentMonth-1;i++){
              _this.daysList.push(_this.yearList[i]);
              console.log(i)
            }
          }
          else {
            let numNextYear = n-(12-currentMonth);
            for(let i=currentMonth-1;i<12;i++){
              _this.daysList.push(_this.yearList[i]);
              console.log(i)
            }
            for(let j=0;j<numNextYear-1;j++){
              _this.daysList.push(_this.nextYearList[j]);
              console.log(j)
            }
          }
        }
        _this.daysList[0].map((item,index) => {
          if(item.num<today){
            item.state = false;
            item.before = true;
          }
        })
        /*const unChoiceDay = _this.unChoiceDay;
        if([1,3,5,7,8,10,12].includes(parseInt(month))){
          /!*if(parseInt(today)+unChoiceDay <= 31){
            let totalUnChoice = parseInt(today)+unChoiceDay;
            _this.daysList.map((item,index) => {
              if(item.num<today){
                item.state = false;
                item.before = true;
              }
              if(item.num<=totalUnChoice && item.num>=today){   //大于或等于当天，并且小于或等于最大不可选天数
                item.state = false;
              }
            })
          }
          else {
            let nextMonthUnChoice = unChoiceDay + 31 - today - 1;
            _this.daysList.map(item => {
              if(item.num<today){
                item.state = false;
                item.before = true;
              }
              if(item.num<=31 && item.num>=today){   //大于或等于当天，并且小于或等于最大不可选天数
                item.state = false;
              }
            })
            _this.secondDayList.map(item => {
              if(item.num<=nextMonthUnChoice){
                item.state = false;
              }
            })
          }*!/
          changeDayStatus(31);
        }
        else if([4,6,9,11].includes(parseInt(month))){
          changeDayStatus(30);
        }
        else {
          let days = [];
          let maxDay = null;
          let n = 0;
          _this.daysList.map((item,index) => {
            n++;
            if(item.num) {
              days.push(item.num)
            }
          });
          if(n==_this.daysList.length){
            maxDay = Math.max.apply(null, days);
            if(maxDay==28){
              changeDayStatus(28)
            }
            else{
              changeDayStatus(29)
            }
          }
        }

        //
        /!**
         * 写入规定不可预约的天数
         * @param monthTotalDay:当月天数
         *!/
        function changeDayStatus(monthTotalDay){
          if(parseInt(today)+unChoiceDay - 1 <= monthTotalDay){
            let totalUnChoice = parseInt(today)+unChoiceDay - 1;
            _this.daysList[0].map((item,index) => {
              if(item.num<today){
                item.state = false;
                item.before = true;
              }
              if(item.num<=totalUnChoice && item.num>=today){   //大于或等于当天，并且小于或等于最大不可选天数
                item.state = false;
              }
            })
          }
          else {
            let nextMonthUnChoice = unChoiceDay - monthTotalDay + today - 1;
            _this.daysList[0].map(item => {
              if(item.num<today){
                item.state = false;
                item.before = true;
              }
              if(item.num<=monthTotalDay && item.num>=today){   //大于或等于当天，并且小于或等于最大不可选天数
                item.state = false;
              }
            })
            _this.daysList[1].map(item => {
              if(item.num<=nextMonthUnChoice){
                item.state = false;
              }
            })
          }
        }*/

        Indicator.open('加载中');
        $.ajax({
          url: basePath + 'arc/area/get-info',
          data: {order_no: _this.orderNo},
          type: 'GET',
          dataType: 'json',
          success : function (res) {
            _this.localArr = res.data;
            _this.localList[0].values = [];
            if(res.code == 0){
              res.data.map((item,index) => {
                _this.localList[0].values.push(item.name)
              });
              Indicator.close();
            }
            else {
              Indicator.close();
              Toast({
                message: res.msg,    //提示信息
                position: 'center',   //位置
                duration: 1500        //时间
              });
            }
          },
          error: function (err) {
            Indicator.close();
            Toast({
              message: '请求错误，请重试',    //提示信息
              position: 'center',   //位置
              duration: 1500        //时间
            });
          }
        })

        /*_this.axios.get(basePath + 'arc/area/get-info',{
          params: {order_no: _this.orderNo}
        })
          .then(function (response) {
            let res = response.data;
            _this.localArr = res.data;
            if(res.code == 0){
              res.data.map((item,index) => {
                _this.localList[0].values.push(item.name)
              });
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
        _this.personData.clinic_id = item.id;
        _this.personData.clinic_name = item.name;
        _this.selectSection = item.name;
        _this.selectItem = {};
        _this.sectionModal = false;

        Indicator.open('加载中');
        $.ajax({
          url: basePath + '/appointment/get-time-list',
          data: {clinic_id: item.id},
          type: 'GET',
          dataType: 'json',
          success : function (res) {
            if(res.code == 0){
              let data = res.data;
              let month = _this.today.month;
              for (let key in data) {
                for (let i=0;i<_this.showMonthNum;i++) {
                  if(i+month<13){
                    if(i+month == key) {
                      _this.daysList[i].map((item,index) => {
                        let dateItem = data[key];
                        for (let k=0;k<dateItem.length;k++) {
                          if(item.num==dateItem[k].app_day) {
                            item.am = dateItem[k].am;
                            item.pm = dateItem[k].pm;
                            if(item.am!=0 || item.pm!=0){
                              item.state = true;
                            }
                            return
                          }
                        }
                      })
                    }
                  }
                  else {
                    if(i+month-12 == key) {
                      _this.daysList[i].map((item,index) => {
                        let dateItem = data[key];
                        for (let k=0;k<dateItem.length;k++) {
                          if(item.num==dateItem[k].app_day) {
                            item.am = dateItem[k].am;
                            item.pm = dateItem[k].pm;
                            if(item.am!=0 || item.pm!=0){
                              item.state = true;
                            }
                            return
                          }
                        }
                      })
                    }
                  }

                }
              }
              Indicator.close();
            }
            else {
              Indicator.close();
              Toast({
                message: res.msg,    //提示信息
                position: 'center',   //位置
                duration: 1500        //时间
              });
            }
          },
          error: function (err) {
            Indicator.close();
            Toast({
              message: '请求错误，请重试',    //提示信息
              position: 'center',   //位置
              duration: 1500        //时间
            });
          }
        })

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
        _this.localArr.map((item,index) =>{
          if(item.name == _this.localAdd) {
            _this.personData.area_id = item.id;
            _this.personData.area_name = item.name;
            _this.sectionData = item.sonNode;
          }
        });
        _this.sectionPopup = false
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
          var firstday = new Date(year + "/" + m + "/01").getTime();//拿到时间戳
          var lastday = 30;
          var weekDay = new Date(firstday).getDay();      //根据时间戳，拿到本月第一天的星期
          var weekLastDay = weekDay + 31;   //拿到本月最后一天的星期
          switch (m) {
            case 2:
              if (run) {
                lastday = new Date(year + "/" + m + "/29").getTime();
                weekLastDay = weekDay + 29;
              } else {
                lastday = new Date(year + "/" + m + "/28").getTime();
                weekLastDay = weekDay + 28;
              }
              break;
            case 4:
              lastday = new Date(year + "/" + m + "/30").getTime();
              weekLastDay = weekDay + 30;
              break;
            case 6:
              lastday = new Date(year + "/" + m + "/30").getTime();
              weekLastDay = weekDay + 30;
              break;
            case 9:
              lastday = new Date(year + "/" + m + "/30").getTime();
              weekLastDay = weekDay + 30;
              break;
            case 11:
              lastday = new Date(year + "/" + m + "/30").getTime();
              weekLastDay = weekDay + 30;
              break;

            default :
              lastday = new Date(year + "/" + m + "/31").getTime();//拿到时间戳
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
                  state: false,
                  am: 0,
                  pm: 0
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
        if(!item.state || !item.num) return;
        const _this = this;
        _this.selectItem = item;
        _this.selectItem.month = _this.showMonth;
        _this.selectDay = item.num;
        _this.timeModal = true;
        document.documentElement.style.overflow = "hidden";
      },
      perMonth(){     //上个月
        if (this.swipeIndex===0){
          return
        }
        this.$refs['calendar'].prev();
      },
      nextMonth(){
        if (this.swipeIndex===this.showMonthNum-1){
          return
        }
        this.$refs['calendar'].next()
      },
      /**
       * mint组件月份变动时间
       */
      calendarMonthChange(){
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
       * @param type: 当前点击的时间  am:上午   pm: 下午
       */
      confirmTime(flag,type){
        if(!flag) return
        const _this = this;
        if(type==='am'){
          _this.personData.time_interval = '1001'
        }
        else if(type==='pm'){
          _this.personData.time_interval = '1002'
        }
        _this.personData.app_date = _this.selectYear + '-' + _this.showMonth + '-' + _this.selectDay;
        _this.$refs['viewBooking'].personData = _this.personData;
        _this.$refs['viewBooking'].init();
        _this.processStep = 2;
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
      margin: 0 auto;
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
          z-index: 5;
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
            &.select-time{
              background: rgba(6,151,156,1);
              border-radius: 50%;
              .day-num{
                color: #fff;
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
          width: 30px;
          height: 100%;
          background: url("../../../assets/close.png") center center no-repeat;
          background-size: 30px 30px;
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
