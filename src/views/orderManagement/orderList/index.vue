<template>
  <div class="home-container" v-loading="loading">
    <div class="seek">
      <div class="seek-input">
        <el-input placeholder="手机号/客户姓名/订单号" v-model="screeningPhone"  clearable></el-input>
      </div>
      <div class="seek-btn">
        <el-button type="primary" icon="el-icon-search" @click="seek()">搜索</el-button>
      </div>
    </div>
    <el-table :data="tableData" border style="width: 100%"  >
      <el-table-column prop="boxOrderNumber" label="订单号"  ></el-table-column>
      <el-table-column prop="customerName" label="客户名称"  ></el-table-column>
      <el-table-column prop="productName" label="产品名称"  ></el-table-column>
      <el-table-column prop="agentName" label="经纪人名称"></el-table-column>
      <el-table-column prop="createTime" label="报单时间"  ></el-table-column>
      <el-table-column prop="applicationAmount" label="贷款金额"  ></el-table-column>
      <el-table-column prop="commission1" label="直推佣金"  ></el-table-column>
      <el-table-column prop="commission2" label="间推佣金"  ></el-table-column>
      <el-table-column prop="operator" label="经办人"  ></el-table-column>
      <el-table-column prop="statuName" label="订单状态"  ></el-table-column>
      <el-table-column label="操作" >
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleEdit(scope.row)">查看</el-button>
        </template>
      </el-table-column>
    </el-table>

  <el-pagination background layout="prev, pager, next" :total="total" 
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"></el-pagination>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { orderList } from '@/api/orderManagement'
import { getToken } from '@/utils/auth'

export default {
  name: 'orderList',
  data(){
    return{
      screeningPhone: '',
      total: 100,
      pageSize: 12,
      pageNum: 1,
      loading: true,
      tableData: []
    }
  },
  mounted(){
    this.getOrder(this.pageNum);
  },
  methods:{
    handleEdit(prop){
      this.$router.push({name: 'OrderDetail', params:{boxOrderNumber: prop.boxOrderNumber}})
    },
    handleSizeChange(){

    },
    handleCurrentChange(val) {
      this.getOrder(val);
      this.loading = true;
    },
    getOrder(pageNum){
      let data = {
        token: getToken(),
        phone: this.screeningPhone,
        pageSize: 12,
        pageNum: pageNum
      }
      orderList(data).then(response=>{
        if(response.state == '1') {
          this.loading = false;
          const { data } = response;
          this.tableData = data.list;
          this.total = data.total;
        }
      }).catch(error=>{
        console.log(error)
      })
    },
    seek(){
      this.getOrder(this.pageNum);
    }
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
  }
  .el-pagination{
    text-align: center;
    background-color: #fff;
    padding: 20px 0;
  }
  .seek{
    margin-bottom: 20px;
    display: flex;
    .seek-input{
      width: 300px;
    }
    .seek-btn{
      margin-left: 15px;
      button{
        padding: 12px 15px;
      }
    }
  }
</style>
