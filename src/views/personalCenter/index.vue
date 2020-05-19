<template>
  <div class="container">
    <el-card class="box-card">
      <div class="text item">
        <div>姓名：</div>
        <div>{{msg.name}}</div>
      </div>
      <!-- <div class="text item">
        <div>性别：</div>
        <div>{{msg.grade}}</div>
      </div> -->
      <div class="text item">
        <div>城市：</div>
        <div>{{msg.cityName}}</div>
      </div>
      <div class="text item">
        <div>等级：</div>
        <div>{{msg.grade}}</div>
      </div>
      <div class="text item">
        <div>绑定手机：</div>
        <div>{{msg.phone}}</div>
        <!-- <div class="chage-phone">
          <el-button type="primary" @click="dialogVisible = true">修改</el-button>
        </div> -->
      </div>
      <div class="text item">
        <div>实名认证：</div>
        <div>{{msg.idcard}}</div>
      </div>
      <div class="text item">
        <div>绑定银行卡：</div>
        <div>{{msg.bankAccount}}</div>
      </div>
      <div class="text access-list">
        <div class="access-list-text">准入产品列表：</div>
        <el-table :data="tableData" border style="width: 100%"  >
          <el-table-column prop="productName" label="产品名称" ></el-table-column>
          <el-table-column prop="productType" label="产品类别" ></el-table-column>
          <el-table-column prop="features_servicecharge" label="咨询服务费收取上限" ></el-table-column>
          <el-table-column prop="partner_settlement_ratio" label="城市合伙人返佣比例" >
            <template slot-scope="scope">
              <div>{{scope.row.partner_settlement_ratio?scope.row.partner_settlement_ratio+'%':''}}</div>
            </template>
          </el-table-column>
          <el-table-column prop="return_fee" label="个人返佣比例" >
            <template slot-scope="scope">
              <div>{{scope.row.return_fee?scope.row.return_fee+'%':''}}</div>
            </template>
          </el-table-column>
          <el-table-column prop="team_settlement_ratio" label="团队返佣比例" >
            <template slot-scope="scope">
              <div>{{scope.row.team_settlement_ratio?scope.row.team_settlement_ratio+'%':''}}</div>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="er-code">
        <el-image :src="avatar"></el-image>
        <p>我的二维码</p>
      </div>
      <div class="exit-btn"> 
        <el-button type="primary" @click.native="logout">退出系统</el-button>
      </div>
      <!-- <el-button type="text" @click="dialogVisible = true">点击打开 Dialog</el-button> -->
      
<!-- <el-dialog
  title="更换手机号"
  :visible.sync="dialogVisible"
  width="40%"
  :before-close="handleClose">

  <div class="dialog-content">
    <el-form :label-position="labelPosition" label-width="120px" :model="formLabelAlign">
      <el-form-item label="原手机号码">
        <el-input v-model="formLabelAlign.oldPhone"></el-input>
      </el-form-item>
      <el-form-item label="验证码">
        <el-input v-model="formLabelAlign.region"></el-input>
      </el-form-item>
      <el-form-item label="新手机号码">
        <el-input v-model="formLabelAlign.type"></el-input>
      </el-form-item>
      <el-form-item label="验证码">
        <el-input v-model="formLabelAlign.type"></el-input>
        
      </el-form-item>
    </el-form>
  </div>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
</el-dialog> -->
    </el-card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { personalCenterData } from '@/api/home'
import { getToken } from '@/utils/auth'

export default {
  name: 'personalCenter',
  data(){
    return{
      msg: {},
      dialogVisible: false,
      tableData: [],
      labelPosition: 'right',
        formLabelAlign: {
          name: '',
          region: '',
          type: ''
        }
    }
  },
  methods:{
    goBack(){
      this.$router.go(-1);
    },
    handleClose(done) {
      this.$confirm('确认关闭？') .then(_ => {
        done();
        console.log('确认关闭？')
      }).catch(_ => {});
    },
    async logout() {
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    }
  },
  mounted(){
    let data = {
      token: getToken()
    }
    personalCenterData(data).then(response=>{
      if(response.state == '1') {
        const { data } = response;
        this.msg = data;
        this.tableData = data.list;
      }
    }).catch(error=>{
      console.log(error)
    })
  },
  computed: {
    ...mapGetters([
      'name',
      'avatar'
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
  .can-be {
    padding: 0;
    margin: 0;
  }
  .can-be li{
    width: 320px;
    list-style: none;
    display: flex;
    margin-bottom: 20px;
  }
  .can-be li p{
    padding: 0;
    margin: 0 35px 0 0;
    width: 40%;
  }
  .exit-btn{
    margin-top: 20px;
    text-align: center;
  }
  .chage-phone button{
    padding: 5px 8px;
    margin-left: 40px;
  }
  .dialog-content{
    width: 85%;
  }
  .el-card{
    position: relative;
  }
  .er-code{
    position: absolute;
    top: 2%;
    right: 5%;
  }
  .er-code .el-image{
    width: 300px;
    height: 300px;
  }
  .er-code p{
    text-align: center;
    margin: 0;
    font-size: 18px;
    font-weight: 600;
  }
  .access-list .access-list-text{
    font-size: 16px;
    padding: 20px 0;
  }

</style>
