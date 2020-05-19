<template>
  <div class="container">
    <el-card class="box-card">
      <div class="text item">
        <div>订单编号：</div>
        <div>{{orderDetailMsg.boxOrderNumber}}</div>
      </div>
      <div class="text item">
        <div>报单产品：</div>
        <div>{{orderDetailMsg.productName}}</div>
      </div>
      <div class="text item">
        <div>报单时间：</div>
        <div>{{orderDetailMsg.createTime}}</div>
      </div>
      <div class="text item">
        <div>贷款金额：</div>
        <div>{{orderDetailMsg.applicationAmount?orderDetailMsg.applicationAmount+'元':''}}元</div>
      </div>
      <div class="text item">
        <div>利率：</div>
        <div>{{orderDetailMsg.qualification?orderDetailMsg.qualification+'%':''}}</div>
      </div>
      <!-- <div class="text item">
        <div>咨询服务费：</div>
        <div>{{orderDetailMsg.}}</div>
      </div> -->
      <div class="text item">
        <div>个人返佣(元)：</div>
        <div>{{orderDetailMsg.commission1?orderDetailMsg.commission1+'元':''}}</div>
      </div>
      <div class="text item">
        <div>团队返佣(元)：</div>
        <div>{{orderDetailMsg.commission2?orderDetailMsg.commission2+'元':''}}</div>
      </div>
      <div class="text item">
        <div>城市合伙人返佣(元)：</div>
        <div>{{orderDetailMsg.commission3?orderDetailMsg.commission3+'元':''}}</div>
      </div>
      <div class="text item">
        <div>经纪人：</div>
        <div>{{orderDetailMsg.agentName}}</div>
      </div>
      <div class="text item">
        <div>客户电话：</div>
        <div>{{orderDetailMsg.customerPhone}}</div>
      </div>
      <!-- <div class="text item">
        <div>应得佣金：</div>
        <div>{{orderDetailMsg.commission3}}</div>
      </div> -->
      <div class="text item">
        <div>订单状态：</div>
        <div>{{orderDetailMsg.statuName}}</div>
      </div>
      <div class="text item">
        <div>经办人：</div>
        <div>{{orderDetailMsg.operator}}</div>
      </div>

      <!-- <div class="btn">
        <el-button @click="goBack()">取消</el-button>
        <el-button type="primary">生成推广连接</el-button>
      </div> -->
    </el-card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { orderDetail } from '@/api/orderManagement'
import { getToken } from '@/utils/auth'

export default {
  name: 'OrderDetail',
  data(){
    return{
      orderDetailMsg: {},
      boxOrderNumber: this.$route.params.boxOrderNumber 
    }
  },
  methods:{
    goBack(){
      this.$router.go(-1);
    }
  },
  mounted(){
      let data = {
        token: getToken(),
        boxOrderNumber: this.boxOrderNumber
      }
      orderDetail(data).then(response=>{
        if(response.state == '1') {
          const { data } = response;
          console.log(data)
          this.orderDetailMsg = data;
        }
      }).catch(error=>{
        console.log(error)
      })
  },
  computed: {
    ...mapGetters([
      'name'
    ])
  }
}
</script>

<style scoped>
  .container{
    padding: 20px;
  }
  .text {
    font-size: 14px;
  }
  .item {
    display: flex;
    padding: 18px 0;
  }
  .btn{
    text-align: center;
  }
  
</style>
