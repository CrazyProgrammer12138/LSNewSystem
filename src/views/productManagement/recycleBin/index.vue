<template>
  <div class="container" v-loading="loading">
    <div class="ls-filtrate">
      <div class="filtrate-header">
        <div class="function-keys">
          <el-button type="danger" class="add-product" @click.native="addProduct"><span>一键清空</span></el-button>
        </div>
        <div class="seek">
          <div class="seek-input">
            <el-input placeholder="产品名称/产品类型/利率/额度" v-model="screeningPhone" clearable></el-input>
          </div>
          <div class="seek-btn">
            <el-button type="primary" icon="el-icon-search" @click="seek()" >搜索</el-button>
          </div>
        </div>
      </div>
      <div class="filtrate-botter">
        <el-select v-model="productTpyeValue" clearable placeholder="请选择产品类型">
          <el-option
            v-for="item in productTpyeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <el-select v-model="customsValue" clearable placeholder="请选择报单方式">
          <el-option
            v-for="item in customsOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
    </div>
    
    <el-table :data="tableData" :default-sort = "{prop: 'borrow_money'}" border style="width: 100%"  >
      <el-table-column prop="productName" label="产品名称"  width="180"></el-table-column>

      <el-table-column prop="typeName" label="产品类型"  width="150"></el-table-column>

      <el-table-column prop="creatTime" label="创建时间"  width="150">
        <template>
          <div>2020-04-03</div>
        </template>
      </el-table-column>
      <el-table-column prop="" label="报单时间"  width="200">
        <template>
          <div>线上报单线下签约</div>
        </template>
      </el-table-column>
      <el-table-column prop="" label="关联地区数量" >
        <template>
          <div>3</div>
        </template>
      </el-table-column>

      <el-table-column prop="" label="状态" >
        <template>
          <div>已删除</div>
        </template>
      </el-table-column>

      <el-table-column fixed="right" label="操作" width="200">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="handleEdit(scope.row)">恢复</el-button> 
          <el-button type="danger" size="small" @click="handleEdit(scope.row)">删除</el-button> 
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
  name: 'recycleBin',
  data(){
    return{
      screeningPhone: '',
      total: 100,
      pageSize: 10,
      pageNum: 1,
      loading: true,
      tableData: [],
      productTpyeOptions: [],
      productTpyeValue: '',
      customsOptions: [],
      customsValue: '',
      stateOptions: [],
      stateValue: '',

    }
  },
  mounted(){
    this.getOrder(this.pageNum);
  },
  methods:{
    handleEdit(prop){
      console.log(prop)
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
          console.log(data);

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
    putaway(event, newRow, ID){
      console.log(newRow)
      console.log(ID)
      // this.putawayValue = 2;draftsProduct
    },
    addProduct(){
      this.$router.push({name: 'productAdd', params:{}})
    },
    draftsProduct(){
      this.$router.push({name: 'drafts', params:{}})
    },
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
.ls-filtrate{
  background-color: #fff;
  margin-bottom: 20px;
  padding: 20px;
  .filtrate-header{
    display:flex;
    justify-content: space-between;
    // background-color: #fff;
    // padding: 20px;
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
  }
}

</style>
