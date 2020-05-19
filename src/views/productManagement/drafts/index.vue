<template>
  <div class="container" v-loading="loading">
    <div class="ls-filtrate">
      <div class="filtrate-header">
        <div class="function-keys">
          <el-button type="danger" class="delete-all" ><span>批量删除</span></el-button>
          <el-select v-model="productTpyeValue" clearable placeholder="请选择产品类型">
          <el-option
            v-for="item in productTpyeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        </div>
      </div>
    </div>
    
    <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" @selection-change="handleSelectionChange" border style="width: 100%"  >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="productName" label="产品名称" ></el-table-column>

      <el-table-column prop="typeName" label="产品类型"></el-table-column>

      <el-table-column prop="creatTime" label="创建时间">
        <template>
          <div>2020-04-03</div>
        </template>
      </el-table-column>
      <el-table-column prop="" label="状态" >
        <template>
          <div>上架中</div>
        </template>
      </el-table-column>

      <el-table-column fixed="right" label="操作" width="200">
        <template slot-scope="scope">
          <el-button type="text" size="small" style="font-size: 15px; color: #F56C6C;"  @click="handleEdit(scope.row)">编辑</el-button> 
          <el-button type="text" size="small" style="font-size: 15px; color: #F56C6C;"  @click="handleEdit(scope.row)">删除</el-button> 
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
  name: 'drafts',
  data(){
    return{
      screeningPhone: '',
      total: 100,
      pageSize: 10,
      pageNum: 1,
      loading: true,
      tableData: [],
      productTpyeOptions: [],
      productTpyeValue: ''
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
    handleSelectionChange(val) {
        console.log(val)
        // this.multipleSelection = val;
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
.ls-filtrate{
  background-color: #fff;
  margin-bottom: 20px;
  padding: 20px;
  .filtrate-header{
    display:flex;
    justify-content: space-between;
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
