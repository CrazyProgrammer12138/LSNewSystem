<template>
    <div class="detail">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span class="clearfix-red"></span>
                <span>{{grade}}详情</span>
                <el-button style="float: right; padding: 8px 10px" type="primary" @click="dialogFormVisible = true" v-show="isAdd" >更换客户经理/城市合伙人</el-button>
            </div>
            <div class="item">
                <div class="item-header">
                    <span class="item-header-red-icon"></span>
                    <span>基本信息</span>
                </div>
                <div class="item-content">
                    <ul class="item-content-ul">
                        <li>
                            <span>姓名：</span>
                            <span>{{userMsg.name}}</span>
                        </li>
                        <li>
                            <span>个人编号：</span>
                            <span>{{userMsg.userId}}</span>
                        </li>
                        <li>
                            <span>业务区域：</span>
                            <span>{{userMsg.cityName}}</span>
                        </li>
                        <li>
                            <span>上级邀请人：</span>
                            <span>{{userMsg.invitedby}}</span>
                        </li>
                    </ul>
                    <ul class="item-content-ul">
                        <li>
                            <span>身份证号码：</span>
                            <span>{{userMsg.idcard}}</span>
                        </li>
                    </ul>
                    <ul class="item-content-ul">
                        <li>
                            <span>开户行：</span>
                            <span>{{userMsg.openingBank}}</span>
                        </li>
                        <li>
                            <span>银行卡号：</span>
                            <span>{{userMsg.bankAccount}}</span>
                        </li>
                        
                    </ul>
                </div>
            </div>
            <div class="item">
                <div class="item-header">
                    <span class="item-header-red-icon"></span>
                    <span>业绩信息</span>
                </div>
                <div class="item-content">
                    <ul class="item-content-ul">
                        <li>
                            <span>个人订单：</span>
                            <span>{{userMsg.count1}}</span>
                        </li>
                        <li>
                            <span>个人放款量：</span>
                            <span>{{userMsg.amount1}}</span>
                        </li>
                        <li>
                            <span>累计个人返佣：</span>
                            <span>{{userMsg.personTotalCommission}}</span>
                        </li>
                    </ul>
                    <ul class="item-content-ul">
                        <li>
                            <span>团队订单：</span>
                            <span>{{userMsg.count2}}</span>
                        </li>
                        <li>
                            <span>团队放款量：</span>
                            <span>{{userMsg.amount2}}</span>
                        </li>
                        <li>
                            <span>累计团队返佣：</span>
                            <span>{{userMsg.teamTotalCommission}}</span>
                        </li>
                    </ul>
                    <ul class="item-content-ul">
                        <li>
                            <span>总计订单：</span>
                            <span>{{userMsg.count3}}</span>
                        </li>
                        <li>
                            <span>总计放款量：</span>
                            <span>{{userMsg.amount3}}</span>
                        </li>
                        
                    </ul>
                </div>
            </div>
            <div class="item">
                <div class="item-header">
                    <span class="item-header-red-icon"></span>
                    <span>团队经纪人列表</span>
                </div>
                <div class="item-content">
                    <div class="seek">
                        <div class="seek-input">
                            <el-input placeholder="请输入内容" v-model="screeningPhone"  clearable></el-input>
                        </div>
                        <div class="seek-btn">
                            <el-button type="primary" icon="el-icon-search" @click="seek()">搜索</el-button>
                        </div>
                    </div>
                    <el-table :data="tableData" border style="width: 100%" v-loading="loading" >
                        <el-table-column prop="userId" label="编号"  ></el-table-column>
                        <el-table-column prop="name" label="姓名"  ></el-table-column>
                        <el-table-column prop="phone" label="电话"  ></el-table-column>
                        <el-table-column prop="count2" label="经纪人团队人数"></el-table-column>
                        <el-table-column prop="loanAmounts" label="放款量"  ></el-table-column>
                        <el-table-column prop="count1" label="订单数"  ></el-table-column>
                        <el-table-column prop="totalCommission" label="累计佣金"  ></el-table-column>
                        <el-table-column prop="grade" label="等级"  ></el-table-column>
                        <el-table-column prop="invitedby" label="邀请人"  ></el-table-column>
                        <el-table-column prop="createTime" label="注册时间"  ></el-table-column>
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
            </div>
        </el-card>
        <el-dialog title="更换客户经理/城市合伙人" :visible.sync="dialogFormVisible">
            <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="选择分公司" prop="area1" class="ls-filiale">
                <el-select v-model="ruleForm.area1" placeholder="选择分公司" @change="areaChange">
                    <el-option
                    v-for="item in options1"
                    :key="item.areaId"
                    :label="item.areaName"
                    :value="item.areaId">
                    </el-option>
                </el-select>
                </el-form-item>

                <el-form-item  label="选择客户经理/城市合伙人" prop="area2" class="ls-customer">
                <el-select v-model="ruleForm.area2" placeholder="选择客户经理/城市合伙人" @change="areaChange2">
                    <el-option
                    v-for="item in options2"
                    :key="item.inuserId"
                    :label="item.name"
                    :value="item.inuserId">
                    </el-option>
                </el-select>
                </el-form-item>
            </el-form>

            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="changeManagerBtn()">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import { getToken, getRoleid } from '@/utils/auth' // get token from cookie
import { mapGetters } from 'vuex'
import { partnerDetail, LSFiliale, LSManager } from '@/api/teamManage'
export default {
    name: 'partnerDetail',
    data(){
    return{
      userMsg: {},
      screeningPhone: '',
      tableData: [],
      total: 100,
      pageSize: 10,
      pageNum: 1,
      loading: true,
      listNone: true,
      grade: this.$route.params.grade,
      isAdd: true,
      dialogFormVisible: false,
      ruleForm: {
          inuserId: ''
      },
      rules: {},
      options1: [],
      options2: [],
      formLabelWidth: '120px'
    }
  },
  mounted(){
      if(getRoleid() == '26') {
        this.isAdd = false
      } else {
        this.isAdd = true
      }
      if(getRoleid() == '26'){
          this.listNone = false;
      } else {
          this.listNone = true;
      }
      this.partnerDateil(this.pageNum, this.getUserId);
      this.filialeList();
  },
  methods:{
    handleEdit(prop){
        this.partnerDateil(this.pageNum, prop.userId);
    },
    partnerDateil(pageNum, ID){
        let data = {
            token: getToken(),
            userId: ID,
            phone: this.screeningPhone,
            pageSize: 12,
            pageNum: pageNum
        }
        partnerDetail(data).then(response=>{
            if(response.state == '1') {
                this.loading = false;
                const { data } = response;
                this.userMsg = data.userItem;
                this.total = data.total;
                this.tableData = data.list;
            }
        }).catch(error=>{
            console.log(error)
        })
    },
    handleSizeChange(val) {

    },
    handleCurrentChange(val) {
      this.partnerDateil(val);
      this.loading = true;
    },
    seek(){
      this.partnerDateil(this.pageNum);
    },
    filialeList(){
      LSFiliale().then(response=>{
        if(response.state == '1') {
          const {data} = response;
          this.options1 = data;
        }
      }).catch(error=>{
        console.log(error)
      })
    },
    areaChange(val){
      this.managerList(val);
    },
    managerList(areaId){
        let data = {
          areaId: areaId
      }
      LSFiliale(data).then(response=>{
        if(response.state == '1') {
          const {data} = response;
          this.options2 = data;
        }
      }).catch(error=>{
        console.log(error)
      })
    },
    areaChange2(val){
      this.ruleForm.inuserId = val;
    },
    changeManagerBtn(){
        this.changeManager(this.ruleForm.inuserId);
    },
    changeManager(inuserId){
        let data = {
            token: getToken(),
            userId: this.getUserId,
            inuserId: inuserId
        }
        let _this = this;
        LSManager(data).then(response=>{
            if(response.state == '1') {
                this.$message.success(response.msg);
                _this.dialogFormVisible = false;
            } else {
                this.$message.success(response.msg);
                _this.dialogFormVisible = false;
            }
        }).catch(error=>{
            console.log(error)
        })
    }
  },
  computed: {
    ...mapGetters([
      'name',
      'roles',
      'getUserId'
    ])
  }
}
</script>
<style lang="scss">
.detail{
    padding: 20px;
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
    .item {
        margin-bottom: 40px;
        .item-header{
            .item-header-red-icon{
                display: inline-block;
                width: 6px;
                height: 6px;
                background-color: #dd0b0b;
                margin-right: 5px;
            }
        }
        .item-content{
            font-size: 14px;
            .item-content-ul{
                display: flex;
                li{
                    width: 25%;
                    list-style: none;
                }
            }
            .el-pagination{
                text-align: center;
                margin-top: 20px;
            }
            .seek{
                margin: 20px 0;
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
    .ls-filiale{
        .el-select{
        width: 60%;
        }
    }
    .ls-customer{
        .el-form-item__label{
            height: 40px;
            line-height: 20px;
        }
        .el-select{
            width: 60%;
        }
    }
}
</style>