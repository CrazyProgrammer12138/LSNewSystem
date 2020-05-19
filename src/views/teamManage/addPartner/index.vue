<template>
  <div class="container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>新增城市合伙人</span>
        <!-- <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button> -->
      </div>
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <div class="item">
        <div class="item-header">
          <span></span>
          <span>基本信息</span>
        </div>
        <div class="basic-from">
          <div class="basic-from-left">
            <!-- <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm"> -->
              <el-form-item label="合伙人姓名" prop="userName" label-width="100px">
                <el-input v-model="ruleForm.userName"></el-input>
              </el-form-item>
              <el-form-item label="电话号码" prop="phone" label-width="100px">
                <el-input type="number" v-model="ruleForm.phone"></el-input>
              </el-form-item>
              <el-form-item label="开户行" prop="bank" label-width="100px">
                <el-input v-model="ruleForm.bank"></el-input>
              </el-form-item>
            <!-- </el-form> -->
          </div>
          <div class="basic-from-right">
            <!-- <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm"> -->

              <el-form-item label="业务区域" required class="basic-from-right-area">
                <el-col :span="11" popper-class="basic-from-right-area1">
                  <el-form-item prop="area1">
                    <el-select v-model="ruleForm.area1" placeholder="请选择" @change="areaChange">
                      <el-option
                        v-for="item in options1"
                        :key="item.value"
                        :label="item.provinceName"
                        :value="item.provinceId">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col class="line" :span="2">-</el-col>
                <el-col :span="11">
                  <el-form-item prop="area2">
                    <el-select v-model="ruleForm.area2" placeholder="请选择" @change="areaChange2">
                      <el-option
                        v-for="item in options2"
                        :key="item.cityKey"
                        :label="item.cityName"
                        :value="item.cityKey">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-form-item>

              <el-form-item label="身份证号" prop="idCode" label-width="100px">
                <el-input type="number" v-model="ruleForm.idCode"></el-input>
              </el-form-item>
              <el-form-item label="银行卡" prop="bankCode" label-width="100px">
                <el-input type="number" v-model="ruleForm.bankCode"></el-input>
              </el-form-item>
            <!-- </el-form> -->
          </div>
        </div>
      </div>
      <div class="item">
        <div class="item-header">
          <span></span>
          <span>公司信息</span>
        </div>
        <div class="basic-from">
          <div class="basic-from-left">
            <!-- <el-form :model="ruleForm" class="demo-ruleForm"> -->
              <el-form-item prop="company" label="签约公司名称" >
                <el-input type="text" v-model="ruleForm.company" ></el-input>
              </el-form-item>
              <el-form-item prop="taxpayer" label="纳税人识别号" >
                <el-input type="text" v-model="ruleForm.taxpayer" ></el-input>
              </el-form-item>
              <el-form-item prop="specialPlane" label="公司座机">
                <el-input type="text" v-model="ruleForm.specialPlane" ></el-input>
              </el-form-item>
            <!-- </el-form> -->
          </div>
        </div>
      </div>
      <div class="item">
        <div class="item-header">
          <span></span>
          <span>登陆信息</span>
        </div>
        <div class="basic-from">
          <div class="basic-from-left">
            <!-- <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm"> -->
              <el-form-item label="密码" prop="pass">
                <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="确认密码" prop="checkPass">
                <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
              </el-form-item>
            <!-- </el-form> -->
          </div>
        </div>
      </div>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getCityList, addPartner } from '@/api/teamManage'
export default {
  name: 'addPartner',
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass');
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        uuserName: '',
        phone: '',
        bank: '',
        area1: '',
        area2: '',
        idCode: '',
        bankCode: '',
        padd: '',
        pass: '',
        checkPass: '',
        company: '',
        taxpayer: '',
        specialPlane: '',
      },
      rules: {
        userName: [
          { required: true, message: '请输入合伙人姓名', trigger: 'blur' } 
        ],
        phone: [
          { required: true, message: '请输入电话号码', trigger: 'blur' } 
        ],
        bank: [
          { required: true, message: '请输入开户行信息', trigger: 'blur' } 
        ],
        area1: [
          { required: true, message: '请选择区域', trigger: 'blur' } 
        ],
        area2: [
          { required: true, message: '请选择区域', trigger: 'blur' } 
        ],
        idCode: [
          { required: true, message: '请输入身份号码', trigger: 'blur' } 
        ],
        bankCode: [
          { required: true, message: '请输入银行卡号码', trigger: 'blur' } 
        ],
        pass: [
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' }
        ]
      },
      options1: [],
      options2: [],
    }
  },
  mounted(){
    
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let data = {
            name: this.ruleForm.userName,
            cityKey: this.ruleForm.area2,
            phone: this.ruleForm.phone,
            idcard: this.ruleForm.idCode,
            companyName: this.ruleForm.company,
            OpenBank: this.ruleForm.bank,
            bankAccount: this.ruleForm.bankCode,
            email: this.ruleForm.specialPlane,
            password: this.ruleForm.pass
          }
          this.addPartner(data);
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    addPartner(data){
      addPartner(data).then(response=>{
        if(response.state == '1') {
          this.$router.push({name: 'partner'})
          this.$message({
            message: '恭喜你，新建合伙人成功!',
            type: 'success'
          });
        }
      }).catch(error=>{
        console.log(error)
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    areaChange(val){
      this.ruleForm.area2 = '';
      getCityList({provinceId: val}).then(response=>{
        const {data} = response;
        this.options2 = data;
      }).catch(error=>{
        console.log(error)
      })
    },
    areaChange2(val){
      this.ruleForm.area2 = val;
    }
  },
  computed: {
    ...mapGetters([
      'name'
    ])
  }
}
</script>

<style lang="scss">
.container{
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
      -webkit-appearance: none;
  }
  input[type="number"]{
      -moz-appearance: textfield;
  }
  padding: 20px;
  
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

  .box-card {
    .basic-from{
      display: flex;
      margin-top: 20px;
      .basic-from-left{
        width: 40%;
      }
      .basic-from-right{
        width: 40%;
        margin-left: 5%;
        .basic-from-right-area {
          .el-form-item__content{
            display: flex;
          }
          .line{
            margin-left: 20px
          }
        }
      }
    }
  }
}
</style>
