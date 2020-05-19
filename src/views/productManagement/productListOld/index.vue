<template>
  <div class="container" v-loading="loading">
    <div class="seek">
      <div class="seek-input">
        <el-input placeholder="产品名称/产品类型/利率/额度" v-model="screeningPhone" clearable></el-input>
      </div>
      <div class="seek-btn">
        <el-button type="primary" icon="el-icon-search" @click="seek()" >搜索</el-button>
      </div>
    </div>
    <el-table :data="tableData" :default-sort = "{prop: 'borrow_money'}" border style="width: 100%"  >
      <!-- <el-table-column  prop="date"  label="日期"  >
        <template slot-scope="scope">
          <div>{{scope.row.date}}</div>
        </template>
      </el-table-column> -->
      <el-table-column prop="productId" label="产品编号"></el-table-column>
      <el-table-column prop="productName" label="产品名称"></el-table-column>
      <el-table-column prop="typeName" label="产品类型"></el-table-column>
      <el-table-column sortable prop="borrow_money"  label="额度">
        <template  slot-scope="scope">
          <div>{{scope.row.borrow_money}}万元</div>
        </template>
      </el-table-column>
      <el-table-column prop="product_rate" label="利率">
        <template slot-scope="scope">
          <div>{{scope.row.product_rate}}</div>
        </template>
      </el-table-column>
      <el-table-column prop="return_fee" label="直推返佣比例">
        <template slot-scope="scope">
          <div>{{scope.row.return_fee?scope.row.return_fee+'%':'-----'}}</div>
        </template>
      </el-table-column>
      <el-table-column prop="team_settlement_ratio" label="间推返佣比例">
        <template slot-scope="scope">
          <div>{{scope.row.team_settlement_ratio?scope.row.team_settlement_ratio+'%':'-----'}}</div>
        </template>
      </el-table-column>
      <el-table-column prop="partner_settlement_ratio" label="合伙人返佣比例">
        <template slot-scope="scope">
          <div>{{scope.row.partner_settlement_ratio?scope.row.partner_settlement_ratio+'%':'-----'}}</div>
        </template>
      </el-table-column>
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
import { productList } from '@/api/productManagement'
import { getToken } from '@/utils/auth'
export default {
  name: 'ProductList',
  data(){
    return{
      screeningPhone: '',
      total: 100,
      pageSize: 10,
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
      this.$router.push({name: 'ProductDetail', params:{productId: prop.productId}})
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
        pageSize: this.pageSize,
        pageNum: pageNum
      }
      productList(data).then(response=>{
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
.container {
  padding: 20px;
}
.el-pagination{
  text-align: center;
  background-color: #fff;
  padding: 20px 0;
}
.el-table{
  min-height: 44rem;
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
