<template>
  <div class="container" v-loading="loading">
    <div class="ls-filtrate">
      <div class="filtrate-header">
        <div class="function-keys">
          <el-button type="danger" class="add-product" @click.native="addProduct"><i class="el-icon-circle-plus-outline"></i><span>新增产品</span></el-button>
          <el-button type="warning" class="draft-product" @click="draftsProduct"><i class="el-icon-document"></i><span>草稿箱</span></el-button>
          <el-button type="info" class="delete-product" @click="recycleBin"><i class="el-icon-delete"></i><span>回收站</span></el-button>
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
        <el-select v-model="productTpyeValue" clearable placeholder="请选择产品类型" @change="productTpyeChange">
          <el-option
            v-for="item in productTpyeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <el-select v-model="customsValue" clearable placeholder="请选择报单方式" @change="customsChange">
          <el-option
            v-for="item in customsOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <el-select v-model="stateValue" clearable placeholder="请选择展示状态" @change="stateChange">
          <el-option
            v-for="item in stateOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
    </div>
    
    <el-table :data="tableData" :default-sort = "{prop: 'borrow_money'}" border style="width: 100%"  >
      <!-- <el-table-column  prop="date"  label="日期"  >
        <template slot-scope="scope">
          <div>{{scope.row.date}}</div>
        </template>
      </el-table-column> -->
      <!-- <el-table-column prop="productId" label="产品编号"></el-table-column> -->
      <!-- <el-table-column prop="productName" label="产品名称" width="200"
      column-key="productName"
      :filters="[{text: '友金云贷', value: '友金云贷'}, {text: '联盛薪金贷', value: '联盛薪金贷'}, {text: '联盛豪车贷', value: '联盛豪车贷'}, {text: '平安新一贷', value: '平安新一贷'}]"
      :filter-method="filterTag"
      filter-placement="bottom-end">
        <template slot-scope="scope">
          <div>{{scope.row.productName}}</div>
        </template>
      </el-table-column> -->
      <el-table-column prop="productName" label="产品名称"  width="180"></el-table-column>

      <el-table-column prop="typeName" label="产品类型"  width="150"></el-table-column>

      <el-table-column prop="createTime" label="创建时间"  width="150">
        <template slot-scope="scope">
          <div>{{scope.row.createTime}}</div>
        </template>
      </el-table-column>
      <el-table-column prop="islineName" label="报单方式"  width="200">
        <template slot-scope="scope">
          <div>{{scope.row.islineName}}</div>
        </template>
      </el-table-column>
      
      <el-table-column prop="statusName" label="状态" >
        <template slot-scope="scope">
          <div>{{scope.row.statusName}}</div>
        </template>
      </el-table-column>

      <el-table-column fixed="right" label="操作" width="200">
        <template slot-scope="scope">
          <el-button type="text" size="small" style="font-size: 15px;"  @click="handleEdit(scope.row)">编辑</el-button> 
          <el-switch
            v-model="scope.row.status"
            :active-value="0"
            :inactive-value="1"
            active-color="#13ce66"
            inactive-color="#ff4949"
            @change="putaway($event, scope.row, scope.$index)">
          </el-switch>
          <!-- <span>{{scope.row.status}}</span> -->
          <i class="el-icon-delete" style="font-size: 18px;"></i>
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
import { productList, upperOr } from '@/api/productManagement'
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
      tableData: [],
      productTpyeOptions: [],
      productTpyeValue: '',
      customsOptions: [
        {value: '0', label: '线上报单线下签约'},
        {value: '1', label: '纯线上产品'}
      ],
      customsValue: '',
      stateOptions: [
        {value: '0', label: '下架'},
        {value: '1', label: '上架'}
      ],
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
    getOrder(pageNum, productId, state){
      let data = {
        token: getToken(),
        phone: this.screeningPhone,
        pageSize: this.pageSize,
        pageNum: pageNum,
        productId: productId,
        state: state
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
    putaway(event, b, index){
      this.loading = true;
      let data = {
        token: getToken(),
        productId: b.productId,
        state: b.status
      }
      let str = b.status =='0'?'下架':'上架';
      this.$confirm(`此操作将产品${str}, 是否继续?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          upperOr(data).then(response=>{
            if(response.state == '1') {
              this.loading = false;
              this.getOrder(this.pageNum);
              this.$message({
                type: 'success',
                message: response.msg
              });
            } else {
              let newData = b;
              newData.status = newData.status == '0'?'1':'0';
              this.tableData[index] = newData;
            }
          }).catch(error=>{
            console.log(error)
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    },
    productTpyeChange(val){

    },
    customsChange(val){

    },
    stateChange(val){

    },
    addProduct(){
      this.$router.push({name: 'productAdd', params:{}})
    },
    draftsProduct(){
      this.$router.push({name: 'drafts', params:{}})
    },
    recycleBin(){
      this.$router.push({name: 'recycleBin', params:{}})
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
