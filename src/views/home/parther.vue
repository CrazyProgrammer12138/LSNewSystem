<template>
  <div class="home-container">
    <div class="content">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span class="clearfix-red"></span>
          <span>城市合伙人团队概览</span>
        </div>
        <div class="text item">
          <div class="chart1">
            <PieChart :chart-data-all="homeDataJson.num1" :chart-data="chartData1" :chart-text="chartText"></PieChart>
          </div>
          <div class="item-content">
            <div class="item-content-one-line line-grey">
              <div class="line-left">
                <span></span>
                <span>城市合伙人总数</span>
              </div>
              <div class="line-right">
                <span>{{homeDataJson.partnerNum}}</span>
                <span>人</span>
              </div>
            </div>
            <div class="item-content-two-line">
              <div class="item-content-one-line">
                <div class="line-left">
                  <span></span>
                  <span>经纪人总数</span>
                </div>
                <div class="line-right">
                  <span>{{homeDataJson.num1}}</span>
                  <span>人</span>
                </div>
              </div>
              <div class="item-content-none-line">
                <div class="none-line-left">
                  <p><span>{{homeDataJson.num2}}</span><span>人</span></p>
                  <div>本日新增</div>
                </div>
                <div class="line"></div>
                <div class="none-line-right">
                  <p><span>{{homeDataJson.num3}}</span><span>人</span></p>
                  <div>本月新增</div>
                </div>
              </div>
            </div> 
            <div class="item-content-one-line line-grey">
              <div class="line-left">
                <span></span>
                <span>直推经纪人总数</span>
              </div>
              <div class="line-right">
                <span>{{homeDataJson.num4}}</span>
                <span>人</span>
              </div>
            </div>
            <div class="item-content-one-line line-grey">
              <div class="line-left">
                <span></span>
                <span>间推经纪人总数</span>
              </div>
              <div class="line-right">
                <span>{{homeDataJson.num5}}</span>
                <span>人</span>
              </div>
            </div>
          </div>
        </div>
      </el-card>
    </div>
    
    <div class="content">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span class="clearfix-red"></span>
          <span>团队业绩概览</span>
        </div>
        <div class="text item">
          <div ref="chart2" class="chart2">
            <PieChart :chart-data-all="homeDataJson.amount1" :chart-data="chartData2" :chart-text="chartText2"></PieChart>
          </div>
          <div class="item-content">
            <div class="item-content-two-line">
              <div class="item-content-one-line">
                <div class="line-left">
                  <span></span>
                  <span>累计成交订单数</span>
                </div>
                <div class="line-right">
                  <span>{{homeDataJson.count1}}</span>
                  <span>单</span>
                </div>
              </div>
              <div class="item-content-none-line">
                <div class="none-line-left">
                  <p><span>{{homeDataJson.count2}}</span><span>单</span></p>
                  <div>本日新增</div>
                </div>
                <div class="line"></div>
                <div class="none-line-right">
                  <p><span>{{homeDataJson.count3}}</span><span>单</span></p>
                  <div>本月新增</div>
                </div>
              </div>
            </div> 
            <div class="item-content-two-line">
              <div class="item-content-one-line">
                <div class="line-left">
                  <span></span>
                  <span>累计放款总额</span>
                </div>
                <div class="line-right">
                  <span>{{homeDataJson.amount1}}</span>
                  <span>万</span>
                </div>
              </div>
              <div class="item-content-none-line">
                <div class="none-line-left">
                  <p><span>{{homeDataJson.amount2}}</span><span>万</span></p>
                  <div>本日新增</div>
                </div>
                <div class="line"></div>
                <div class="none-line-right">
                  <p><span>{{homeDataJson.amount3}}</span><span>万</span></p>
                  <div>本月新增</div>
                </div>
              </div>
            </div>
            <div class="item-content-one-line line-grey">
              <div class="line-left">
                <span></span>
                <span>直推经纪人累计放款</span>
              </div>
              <div class="line-right">
                <span>{{homeDataJson.amount4}}</span>
                <span>万</span>
              </div>
            </div>
            <div class="item-content-one-line line-grey">
              <div class="line-left">
                <span></span>
                <span>间推经纪人累计放款</span>
              </div>
              <div class="line-right">
                <span>{{homeDataJson.amount5}}</span>
                <span>万</span>
              </div>
            </div>
          </div>
        </div>
      </el-card>
    </div>

    <div class="content">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span class="clearfix-red"></span>
          <span>佣金支出概览</span>
        </div>
        <div class="text item">
          <div ref="chart3" class="chart3">
            <PieChart :chart-data-all="homeDataJson.amount6" :chart-data="chartData3" :chart-text="chartText3"></PieChart>
          </div>
          <div class="item-content">
            <div class="item-content-two-line">
              <div class="item-content-one-line">
                <div class="line-left">
                  <span></span>
                  <span>累计产生佣金</span>
                </div>
                <div class="line-right">
                  <span>{{homeDataJson.amount9}}</span>
                  <span>万</span>
                </div>
              </div>
            </div> 
            <div class="item-content-two-line">
              <div class="item-content-one-line">
                <div class="line-left">
                  <span></span>
                  <span>城市合伙人累计结算</span>
                </div>
                <div class="line-right">
                  <span>{{homeDataJson.amount6}}</span>
                  <span>万</span>
                </div>
              </div>
              <div class="item-content-none-line">
                <div class="none-line-left">
                  <p><span>{{homeDataJson.amount7}}</span><span>万</span></p>
                  <div>本月待结</div>
                </div>
                <div class="line"></div>
                <div class="none-line-right">
                  <p><span>{{homeDataJson.amount8}}</span><span>万</span></p>
                  <div>上月结算</div>
                </div>
              </div>
            </div> 
            <div class="item-content-two-line">
              <div class="item-content-one-line">
                <div class="line-left">
                  <span></span>
                  <span>累计个人返佣</span>
                </div>
                <div class="line-right">
                  <span>{{homeDataJson.amount10}}</span>
                  <span>万</span>
                </div>
              </div>
            </div> 
            <div class="item-content-one-line line-grey">
              <div class="line-left">
                <span></span>
                <span>累计团队返佣</span>
              </div>
              <div class="line-right">
                <span>{{homeDataJson.amount11}}</span>
                <span>万</span>
              </div>
            </div>
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
let echarts = require("echarts/lib/echarts");

require("echarts/lib/chart/bar")
// 引入提示框和title组件
require("echarts/lib/component/tooltip")
require("echarts/lib/component/title")

import { getToken, getRoleid } from '@/utils/auth'
import { mapGetters } from 'vuex'
import PieChart from './components/PieChart'
import LineChart1 from './components/LineChart1'
import { homeData } from '@/api/home'
export default {
  name: 'Home',
  components: {
    PieChart,
    LineChart1
    
  },
  data(){
    return{
      homeDataJson: '',
      chartData1: [],
      chartText: ['城市合伙人', '直推经纪人总数', '间推经纪人总数'],
      chartData2: [],
      chartText2: ['直推经纪人累计放款', '间推经纪人累计放款'],
      chartData3: [],
      chartText3: ['累计个人返佣', '累计团队返佣']
    }
  },
  created(){
    let token = getToken();
    homeData({token: token}).then(response => {
      const { data } = response;
      this.homeDataJson = data;
      this.chartData1 = [
          {value: Number(data.partnerNum), name: '城市合伙人'},
          {value: Number(data.num4), name: '直推经纪人总数'},
          {value: Number(data.num5), name: '间推经纪人总数'}
        ]
        this.chartData2 = [
          {value: Number(data.amount4), name: '直推经纪人累计放款'},
          {value: Number(data.amount5), name: '间推经纪人累计放款'}
        ]
        this.chartData3 = [
          {value: Number(data.amount10), name: '累计个人返佣'},
          {value: Number(data.amount101), name: '累计团队返佣'}
        ]
    }).catch(error => {
      console.log(error)
    })
  },
  mounted(){

  },
  methods: {
  },
  computed: {
    ...mapGetters([
      'name'
    ])
  }
}
</script>

<style lang="scss" scoped>
.home-container{
  padding: 20px;
  display: flex;
  .content{
    width: 100%;
    .text {
      font-size: 14px;
    }
    .item {
      margin-bottom: 18px;
    }
    .clearfix:before,
    .clearfix:after {
      display: table;
      content: "";
    }
    .clearfix:after {
      clear: both
    }
    .clearfix{
      .clearfix-red{
        width: 5px;
        height: 12px;
        background: #dd0b0b;
        display: inline-block;
      }
    }
     .box-card {
      width: 95%;
      padding: 0 20px;
      /deep/ .el-card__header{
        padding: 18px 0;
      }
      /deep/ .el-card__body{
        padding: 20px 0;
        .item-content{
          .item-content-one-line{
            display: flex;
            justify-content: space-between;
            align-items: center;
            overflow: hidden;
            padding: 10px 0;
            .line-left{
              display: flex;
              align-items: center;
              span:first-child{
                display: inline-block;
                width: 6px;
                height: 6px;
                background-color: #dd0b0b;
                margin-right: 5px;
              }
              
            }
            .line-right{
              color: #dd0b0b;
              span:first-child{
                font-size: 18px;
              }
            }
          }
          .line-grey{
            border-bottom: 1px solid #EBEEF5;
          }
          .item-content-two-line{
            .item-content-none-line{
              display: flex;
              padding: 0 20px 10px 20px;
              border-bottom: 1px solid #EBEEF5;
              align-items: center;

              .none-line-left, .none-line-right{
                width: 50%;
                text-align: center;
                p{
                  padding: 0;
                  margin: 5px 0 14px 0;
                  color: #dd0b0b;
                  span:first-child{
                    font-size: 18px;
                  }
                }
                div{

                }
              }
              .line{
                width: 1px;
                height: 30px;
                background-color:#EBEEF5;
              }
              
            }
          }
        }
      }
    }
  }
  
  
}
</style>
