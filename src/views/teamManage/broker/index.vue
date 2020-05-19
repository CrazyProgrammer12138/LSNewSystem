<template>
  <div class="home-container" v-loading="loading">
    <div class="seek">
      <div class="seek-input">
        <el-input placeholder="编号/名称/电话" v-model="screeningPhone"  clearable></el-input>
      </div>
      <div class="seek-btn">
        <el-button type="primary" icon="el-icon-search" @click="seek()">搜索</el-button>
        <el-button type="primary" @click="jumpAdd" v-show="isAdd" >新建合伙人</el-button>
      </div>
    </div>
    <el-table :data="tableData" border style="width: 100%"  >
      <!-- <el-table-column  prop="date"  label="日期"  >
        <template slot-scope="scope">
          <div>{{scope.row.date}}</div>
        </template>
      </el-table-column> -->
      <el-table-column  prop="userId" label="编号" ></el-table-column>
      <el-table-column  prop="name" label="姓名" ></el-table-column>
      <el-table-column  prop="phone" label="电话" ></el-table-column>
      <el-table-column  prop="count2" label="团队人数"></el-table-column>
      <el-table-column  prop="count2" label="团队累计放款"></el-table-column>
      <el-table-column  prop="count3" label="团队累计订单数" ></el-table-column>
      <el-table-column  prop="amount3" label="累计佣金" ></el-table-column>
      <el-table-column  prop="grade" label="等级" ></el-table-column>
      <el-table-column  prop="createTime" label="注册时间" ></el-table-column>
      <el-table-column label="操作" >
        <template slot-scope="scope">
          <el-button type="primary" size="mini"  @click="handleEdit(scope.row)">查看</el-button>
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
import { broker } from '@/api/teamManage'
import { getToken, getLogindData, getPhone, getRoleid } from '@/utils/auth'
export default {
  name: 'broker',
  data(){
    return{
      screeningPhone: '',
      total: 100,
      pageSize: 12,
      pageNum: 1,
      loading: true,
      tableData: [],
      isAdd: true
    }
  },
  mounted(){
    if(getRoleid() == '26') {
      this.isAdd = false
    } else {
      this.isAdd = true
    }
    this.getOrder(this.pageNum);
  },
  methods:{
    handleEdit(prop){
      this.$store.dispatch('user/setUserId',  prop.userId)
      this.$router.push({name: 'BrokerDetail' })
    },
    handleSizeChange(){},
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
      broker(data).then(response=>{
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
    },
    jumpAdd(){
      this.$router.push({name: 'addPartner'})
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
