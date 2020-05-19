<template>
  <div class="dashboard-container">
    <!-- <div class="dashboard-text">name: {{ name }} 海报</div> -->
    <el-card class="dashboard-box-card">
      <div slot="header" class="clearfix">
          <span class="clearfix-red"></span>
          <span>招募海报生成</span>
      </div>
      <div class="broker">
        <div class="broker-img">
          <el-image :src="src" style="width: 300px; height: 350px;"></el-image>
        </div>
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item prop="userName" label="姓名" >
            <el-input type="text" v-model="ruleForm.userName" placeholder="请输入姓名"></el-input>
          </el-form-item>
          <el-form-item prop="phone" label="电话" >
            <el-input type="text" v-model="ruleForm.phone" placeholder="请输入电话"></el-input>
          </el-form-item>
          <!-- <el-form-item prop="textarea" label="联系地址" >
            <el-input type="textarea" :rows="4" placeholder="请输入联系地址" v-model="ruleForm.textarea" > </el-input>
          </el-form-item> -->
        </el-form>
        <el-button type="danger" @click="generate()">一键生成</el-button>
      </div>
    </el-card>
    <el-card class="dashboard-box-card">
      <div slot="header" class="clearfix">
          <span class="clearfix-red"></span>
          <span>海报生成结果</span>
      </div>
      <div class="broker">
        <div class="broker-img">
          <el-image :src="src1" style="width: 470px; height: 670px;"></el-image>
        </div>
        <!-- <el-button type="danger" @click="downImg">下载原图</el-button> -->
      </div>
    </el-card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { posterData } from '@/api/teamManage'
import { getToken } from '@/utils/auth'
export default {
  name: 'poster',
  data(){
    return{
      src: require('../../../assets/poster.jpg'),
      src1: '',
      ruleForm: {
        userName: '',
        phone: '',
        textarea: ''
      },
      rules:{}
    }
  },
  methods:{
    generate(){
      this.posterData()
    },
    posterData(){
      let data = {
        token: getToken(),
        name: this.ruleForm.userName,
        phone: this.ruleForm.phone,
      }
      posterData(data).then(response=>{
        if(response.state == '1'){
          const {data} = response;
          this.src1 = data;
        }
      }).catch(error => {
        console.log(error)
      })
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
.dashboard {
  &-container {
    padding: 20px;
    display: flex;
  }
  &-box-card{
    width: 620px;
    margin-right: 30px;
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
    .broker{
      text-align: center;
      &-img{
        margin-bottom: 30px;
      }
    }
  }
}
</style>
