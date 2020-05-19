<template>
    <div class="container">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>新增产品</span>
            </div>
            <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <div class="basic">
                    <div class="item-header">
                        <span></span>
                        <span>基本信息</span>
                    </div>
                    <div class="item-content">
                        <div class="item-content-left">
                            <div class="line-block">
                                <el-form-item label="产品名称" prop="productName" label-width="120px">
                                    <el-input v-model="ruleForm.productName" placeholder="请输入产品名称"></el-input>
                                </el-form-item>
                                <el-form-item label="产品类型" prop="productTypeValue" label-width="100px">
                                    <el-select v-model="ruleForm.productTypeValue" clearable placeholder="请选择产品类型" @change="productTypeChange">
                                        <el-option
                                        v-for="item in basicJson.productTypeList"
                                        :key="item.typeName"
                                        :label="item.typeName"
                                        :value="item.productClass">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </div>
                            <div class="line-block">
                                <el-form-item label="产品业务区域" prop="productArea" label-width="120px">
                                    <el-select v-model="ruleForm.productArea" clearable placeholder="请选择产品业务区域" @change="areaChange">
                                        <el-option
                                        v-for="item in basicJson.areaList"
                                        :key="item.areaName"
                                        :label="item.areaName"
                                        :value="item.areaId">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="报单方式" prop="customsValue" label-width="100px">
                                    <el-select v-model="ruleForm.customsValue" clearable placeholder="请选择报单方式" @change="customsChange">
                                        <el-option
                                        v-for="item in basicJson.islineList"
                                        :key="item.islineName"
                                        :label="item.islineName"
                                        :value="item.islineId">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </div>
                            <div>
                                <el-form-item label="快捷优势选择" prop="" label-width="120px">
                                    <el-checkbox-group v-model="ruleForm.featuresValue" @change="featuresChange">
                                        <el-checkbox v-for="item in advantageOptions" :label="item.featuresName" :key="item.featuresName">{{item.featuresName}}</el-checkbox>
                                    </el-checkbox-group>
                                    <el-checkbox :indeterminate="advantageIsIndeterminate" v-model="advantageAll" @change="featuresAllChange">全选</el-checkbox>
                                </el-form-item>
                            </div>
                            <div>
                                <el-form-item label="产品概述" prop="productFeature" label-width="120px">
                                    <el-input
                                    type="productFeature"
                                    placeholder="请输入产品概述"
                                    v-model="ruleForm.productFeature"
                                    maxlength="280"
                                    show-word-limit
                                    >
                                    </el-input>
                                </el-form-item>
                                
                            </div>
                        </div>
                        <div class="item-content-logo">
                            <div>
                                <el-form-item prop="imageUrl"  label-width="0">
                                    <el-upload
                                        class="avatar-uploader"
                                        ref="uploadLogo"
                                        action="#"
                                        :show-file-list="false"
                                        :before-upload="beforeUploadLogo"
                                        :on-success="handleChangeLogo"
                                        :on-change="onChangeLogo"
                                        :auto-upload="false"
                                        v-model="ruleForm.imageUrl"
                                        >
                                    <img v-if="ruleForm.imageUrl" :src="ruleForm.imageUrl" class="avatar" alt>
                                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                    </el-upload>
                                </el-form-item>
                                <p class="logo-message">110*110分辨率不大于50kb PNG或JPG图片</p>
                            </div>
                        </div>
                    </div>
                </div>
                <el-divider></el-divider>
                <div class="particular">
                    <div class="item-header">
                        <span></span>
                        <span>详细信息</span>
                    </div>
                    <div class="item-content">
                        <div class="particular-left">
                            <div class="particular-line-block">
                                <el-form-item label="产品额度" prop="minimumBorrowMoneyScreening" label-width="120px">
                                    <el-input v-model="ruleForm.minimumBorrowMoneyScreening" placeholder="请输入最低额度"></el-input>
                                </el-form-item>
                                <el-col class="line" :span="2">-</el-col>
                                <el-form-item prop="highestBorrowMoneyScreening" label-width="0">
                                    <el-input v-model="ruleForm.highestBorrowMoneyScreening" placeholder="请输入最高额度" ></el-input>
                                </el-form-item>
                            </div>
                            <div class="particular-line-block">
                                <el-form-item label="还款方式" prop="repaymentMethod" label-width="120px">
                                    <el-select v-model="ruleForm.repaymentMethod" placeholder="请选择还款方式">
                                        <el-option
                                        v-for="item in basicJson.repaymentMethodList"
                                        :key="item.repaymentMethodName"
                                        :label="item.repaymentMethodName"
                                        :value="item.repaymentMethodId">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </div>
                            <div class="particular-line-block">
                                <el-form-item label="放款时长" prop="featuresLoantime" label-width="120px">
                                    <el-input v-model="ruleForm.featuresLoantime" placeholder="支持数字或中文描述输入时请添加%号"></el-input>
                                </el-form-item>
                            </div>
                            <div class="particular-line-block">
                                <el-form-item label="产品利率" prop="rate" label-width="120px">
                                    <el-input v-model="ruleForm.rate" placeholder="支持数字或中文描述输入时请添加%号"></el-input>
                                </el-form-item>
                            </div>
                            <div class="particular-line-block">
                                <el-form-item label="还款期数" prop="termList" label-width="120px">
                                    <el-checkbox-group v-model="ruleForm.termList" @change="termChange">
                                        <el-checkbox v-for="(item,index) in termOptions" :label="item.termId" :key="index" :data-value="item.termId">{{item.termName}}</el-checkbox>
                                    </el-checkbox-group>
                                    <el-checkbox :indeterminate="isTerm" v-model="termAll" @change="termAllChange">全选</el-checkbox>
                                </el-form-item>
                            </div>
                            <div class="particular-line-block">
                                <el-form-item label="违约金" prop="featuresLiquidateddamages" label-width="120px">
                                    <el-input
                                    type="textarea"
                                    placeholder="输入违约金收取方式(支持数字)"
                                    v-model="ruleForm.featuresLiquidateddamages"
                                    maxlength="280"
                                    show-word-limit
                                    >
                                    </el-input>
                                    <el-checkbox v-model="dedit" @change="featuresLiquidateddamagesFn('无违约金')">无违约金</el-checkbox>
                                </el-form-item>
                            </div>
                            <div class="particular-line-block">
                                <el-form-item label="咨询服务费" prop="featuresServicecharge" label-width="120px">
                                    <el-input v-model="ruleForm.featuresServicecharge" placeholder="仅支持输入数字输入时请添加%号"></el-input>
                                    <el-checkbox v-model="features" @change="featuresServicechargeFn('平台不提供代扣服务')">平台不提供代扣服务</el-checkbox>
                                </el-form-item>
                            </div>
                            <div class="particular-line-block">
                                <el-form-item label="个人佣金" prop="returnFee" label-width="120px">
                                    <el-input v-model="ruleForm.returnFee" placeholder="仅支持输入数字输入时请添加%号"></el-input>
                                </el-form-item>
                            </div>
                            <div class="particular-line-block">
                                <el-form-item label="合伙人佣金" prop="partnerSettlementRatio" label-width="120px">
                                    <el-input v-model="ruleForm.partnerSettlementRatio" placeholder="仅支持输入数字输入时请添加%号"></el-input>
                                </el-form-item>
                            </div>
                            <div class="particular-line-block">
                                <el-form-item label="团队返佣" prop="teamSettlementRatio" label-width="120px">
                                    <el-input v-model="ruleForm.teamSettlementRatio" placeholder="仅支持输入数字输入时请添加%号"></el-input>
                                </el-form-item>
                            </div>
                        </div>
                        <div class="particular-right">
                            <div class="particular-line-block">
                                <el-form-item label="基本条件" prop="postulate" label-width="80px">
                                    <el-input
                                    type="textarea"
                                    placeholder="请输入基本条件"
                                    v-model="ruleForm.postulate"
                                    >
                                    </el-input>
                                </el-form-item>
                            </div>
                            <div class="particular-line-block">
                                <el-form-item label="征信要求" prop="requirements" label-width="80px">
                                    <el-input
                                    type="textarea"
                                    placeholder="请输入征信要求"
                                    v-model="ruleForm.requirements"
                                    >
                                    </el-input>
                                </el-form-item>
                            </div>
                             <div class="particular-line-block">
                                <el-form-item label="申请资料" prop="material" label-width="80px">
                                    <el-input
                                    type="textarea"
                                    placeholder="请输入申请资料"
                                    v-model="ruleForm.material"
                                    >
                                    </el-input>
                                </el-form-item>
                            </div>
                            <div class="particular-line-block">
                                <el-form-item label="准入条件" prop="conditionAdmittance" label-width="80px">
                                    <el-input
                                    type="textarea"
                                    placeholder="请输入准入条件"
                                    v-model="ruleForm.conditionAdmittance"
                                    >
                                    </el-input>
                                </el-form-item>
                            </div>
                        </div>
                    </div>
                    <div class="particular-footer">
                        <div class="particular-line-block">
                            <el-form-item label="注意事项" prop="matters" label-width="120px">
                                <el-input
                                type="textarea"
                                placeholder="请输入注意事项"
                                v-model="ruleForm.matters"
                                >
                                </el-input>
                            </el-form-item>
                        </div>
                    </div>
                </div>
                <el-divider></el-divider>
                <div class="up-poster">
                    <div class="item-header">
                        <span></span>
                        <span>上传产品海报</span>
                    </div>
                    <div class="item-content">
                        <div class="up-poster-text">上传海报时请上传一张原图及一张相同的缩略图，最多支持上传6组产品海报，1080*1500分辨率，不大于900kb，PNG或JPG图片</div>
                        <div class="up-poster-img">
                            <el-form-item label-width="0">
                                <el-upload
                                ref="uploadPoster"
                                action="/as"
                                multiple
                                :auto-upload="false"
                                :limit="3"
                                list-type="picture-card"
                                :on-preview="handlePictureCardPreview"
                                :on-remove="handleRemove"
                                :before-upload="beforeUploadPreview"
                                :on-success="onSuccessPreview"
                                :on-change="onChangePreview"
                                :on-exceed="onExceedPreview"
                                >
                                <i class="el-icon-plus"></i>
                                </el-upload>
                                <el-dialog :visible.sync="dialogVisible">
                                    <img width="100%" :src="dialogImageUrl" alt="">
                                </el-dialog>
                            </el-form-item>
                        </div>
                    </div>
                </div>
                <el-form-item label-width="0" class="submit-btn">
                    <el-button @click="cancel">取消</el-button>
                    <el-button @click="resetForm('ruleForm')">重置</el-button>
                    <el-button @click="saveDraft">存草稿</el-button>
                    <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
              </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { basicData, advantage, addProduct, drafts, seekProduct } from '@/api/productManagement'
import { getToken } from '@/utils/auth'
export default {
    name: 'productAdd',
    data(){
        var isPosterFiles = (rule, value, callback)=>{
            console.log(value)
            // if(value.length < 1){
            //     return callback(new Error('海报数量最少不能少于一张！'));
            // }
        }
        return{
            basicJson: {},
            ruleForm: {
                productName: '',
                productTypeValue: '',
                productArea: '',
                customsValue: '',
                featuresValue: [],
                productFeature: '',
                imageUrl: '',
                minimumBorrowMoneyScreening: '',
                highestBorrowMoneyScreening: '',
                repaymentMethod: '',
                featuresLoantime: '',
                rate: '',
                termList: [],
                featuresLiquidateddamages: '',//违约金
                featuresServicecharge: '', // 咨询服务费
                returnFee: '',
                partnerSettlementRatio: '',
                teamSettlementRatio: '',
                postulate: '', // 基本条件
                requirements: '', //征信要求
                material: '', //申请资料
                matters: '', // 注意事项
                conditionAdmittance: '', // 准入条件
            },
            rules: {
                productName: [
                    { required: true, message: '请输入产品名称', trigger: 'blur' },
                ],
                productTypeValue: [
                    { required: true, message: '请选择产品类别', trigger: 'change' },
                ],
                productArea: [
                    { required: true, message: '请选择产品业务区域', trigger: 'change' },
                ],
                customsValue: [
                    { required: true, message: '请选择报单方式', trigger: 'change' },
                ],
                productFeature: [
                    { required: true, message: '请输入产品概述', trigger: 'blur' },
                ],
                imageUrl: [
                    { required: true, message: '请上传logo', trigger: 'change' },
                ],
                minimumBorrowMoneyScreening: [
                    { required: true, message: '请输入最低额度', trigger: 'blur' },
                ],
                highestBorrowMoneyScreening: [
                    { required: true, message: '请输入最高额度', trigger: 'blur' },
                ],
                repaymentMethod: [
                    { required: true, message: '请选择还款方式', trigger: 'change' },
                ],
                featuresLoantime: [
                    { required: true, message: '请输入放款时长', trigger: 'blur' },
                ],
                rate: [
                    { required: true, message: '请输入产品利率', trigger: 'blur' },
                ],
                termList: [
                    { required: true, message: '请选择期数', trigger: 'change' },
                ],
                returnFee: [
                    { required: true, message: '请输入个人佣金', trigger: 'blur' },
                ],
                featuresLiquidateddamages: [
                    { required: true, message: '请输入违约金', trigger: 'blur' },
                ],
                featuresServicecharge: [
                    { required: true, message: '请输入咨询服务费', trigger: 'blur' },
                ],
                postulate: [
                    { required: true, message: '请输入基本条件', trigger: 'blur' },
                ],
                requirements: [
                    { required: true, message: '请输入征信要求', trigger: 'blur' },
                ],
                material: [
                    { required: true, message: '请输入申请资料', trigger: 'blur' },
                ],
                matters: [
                    { required: true, message: '请输入注意事项', trigger: 'blur' },
                ],
                conditionAdmittance: [
                    { required: true, message: '请输入准入条件', trigger: 'blur' },
                ],
                // posterFiles: [
                //     { validator: isPosterFiles, trigger: 'change' },
                // ],
            },
            productTypeOptions: [],
            areaOptions: [],

            advantageAll: false,
            advantageIsIndeterminate: true,
            advantageOptions: [], // 快捷优势选择    

            termAll: false,
            isTerm: true,
            termOptions: [], // 还款期数

            dedit: false,  // 无违约金
            features: false, // 平台不提供代扣服务

            dialogImageUrl: '',
            dialogVisible: false,
            posterFiles: [] // 海报

        }
    },
    mounted(){
        this.getBasicData()
    },
    methods:{
        getBasicData(){
            let data = {
                token: getToken()
            }
            basicData(data).then(response=>{
                if(response.state == '1'){
                    const {data} = response;
                    console.log(data)
                    this.basicJson = data;
                    this.termOptions = data.termList;
                }
            }).catch(error=>{
                console.log(error);
            })
        },
        productTypeChange(val){
            this.ruleForm.productType = val;
            this.getAdvantage(val);
        },
        areaChange(val){
            this.ruleForm.productArea = val;
        },
        customsChange(val){
            this.ruleForm.customsValue = val;
        },
        //快捷优势选择 start
        getAdvantage(val){
            let data = {
                token: getToken(),
                productType: val
            }
            advantage(data).then(response=>{
                if(response.state == '1'){
                    const {data} = response;
                    this.advantageOptions = data;
                }
            }).catch(error=>{
                console.log(error);
            })
        },
        featuresAllChange(val) {
            this.ruleForm.featuresValue = val ? this.advantageOptions : [];
            this.advantageIsIndeterminate = false;
        },
        featuresChange(value) {
            let checkedCount = value.length;
            this.advantageAll = checkedCount === this.advantageOptions.length;
            this.advantageIsIndeterminate = checkedCount > 0 && checkedCount < this.advantageOptions.length;
        },
        //快捷优势选择 end

        //还款期数 start
        termAllChange(val) {
            this.ruleForm.termList = val ? this.termOptions : [];
            this.isTerm = false;
        },
        termChange(value) {
            let checkedCount = value.length;
            this.termAll = checkedCount === this.termOptions.length;
            this.isTerm = checkedCount > 0 && checkedCount < this.termOptions.length;
        },
        //还款期数 end

        handleCheckAllChange(val) {
            this.checkedCities = val ? this.cities : [];
            this.isIndeterminate = false;
        },
        handleCheckedCitiesChange(value) {
            let checkedCount = value.length;
            this.checkAll = checkedCount === this.cities.length;
            this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
        },
        // 无违约金选择
        featuresLiquidateddamagesFn(value){
            if(this.dedit){
                if(this.ruleForm.featuresLiquidateddamages) return;
                this.ruleForm.featuresLiquidateddamages = value;
            }else {
                if(this.ruleForm.featuresLiquidateddamages =='无违约金') {
                    this.ruleForm.featuresLiquidateddamages = '';
                };
            }
        },
        // 平台不提供代扣服务
        featuresServicechargeFn(value){
            if(this.features){
                if(this.ruleForm.featuresServicecharge) return;
                this.ruleForm.featuresServicecharge = value;
            }else {
                if(this.ruleForm.featuresServicecharge =='平台不提供代扣服务') {
                    this.ruleForm.featuresServicecharge = '';
                };
            }
        },

        beforeUploadLogo(){
            const isJPG = file.type === 'image/jpeg';
            const isLt2M = file.size / 1024 / 1024 < 2;
            if (!isJPG) {
                this.$message.error('上传头像图片只能是 JPG 格式!');
            }
            if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 2MB!');
            }
            return isJPG && isLt2M;
        },
        onChangeLogo(file,fileList){
            var _this = this;
            var event = event || window.event;
            var file = event.target.files[0];
            var reader = new FileReader(); 
            //转base64
            reader.onload = function(e) {
                _this.ruleForm.imageUrl = e.target.result //将图片路径赋值给src
            }
            reader.readAsDataURL(file);
        },
        handleChangeLogo(res, file) {
            this.ruleForm.imageUrl = URL.createObjectURL(file.raw);
        },
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        },
        beforeUploadPreview(file){
            const isJPG = file.type === 'image/jpeg';
            const isLt2M = file.size / 1024 / 1024 < 2;
            if (!isJPG) {
                this.$message.error('上传头像图片只能是 JPG 格式!');
            }
            if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 2MB!');
            }
            return isJPG && isLt2M;
        },
        onSuccessPreview(response, file, fileList){

        },
        onChangePreview(file, fileList){
            var _this = this;
            var event = event || window.event;
            var file = event.target.files[0];
            var reader = new FileReader(); 
            //转base64
            reader.onload = function(e) {
                _this.posterFiles.push(e.target.result)//将图片路径赋值给src
            }
            reader.readAsDataURL(file);
        },
        onExceedPreview(files, fileList){
            this.$message.error('超出');
        },
        submitForm(formName) {
            console.log(1);
            this.$refs[formName].validate((valid) => {
                console.log(valid)
                if (valid) {
                    let data = {
                        token: getToken(),
                        productLogo: this.ruleForm.imageUrl,
                        productClass: this.ruleForm.productTypeValue,
                        isline: this.ruleForm.customsValue,
                        productName: this.ruleForm.productName,
                        fastAdvantage: this.ruleForm.featuresValue.toString(),
                        productFeature: this.ruleForm.productFeature,
                        areaId: this.ruleForm.productArea,
                        minimumBorrowMoneyScreening: this.ruleForm.minimumBorrowMoneyScreening,
                        highestBorrowMoneyScreening: this.ruleForm.highestBorrowMoneyScreening,
                        featuresRepaymentmethod: this.ruleForm.repaymentMethod,
                        featuresLoantime: this.ruleForm.featuresLoantime,
                        rate: this.ruleForm.rate,
                        term: this.ruleForm.termList.toString(),
                        featuresLiquidateddamages: this.ruleForm.featuresLiquidateddamages,
                        featuresServicecharge: this.ruleForm.featuresServicecharge,
                        returnFee: this.ruleForm.returnFee,
                        teamSettlementRatio: this.ruleForm.teamSettlementRatio,
                        conditionBasic: this.ruleForm.postulate,
                        conditionCredit: this.ruleForm.requirements,
                        conditionData: this.ruleForm.material,
                        conditionBecareful: this.ruleForm.matters,
                        conditionAdmittance: this.ruleForm.conditionAdmittance,
                        exhibitionPoster1: JSON.stringify(this.posterFiles)
                    }
                    addProduct(data).then(response=>{
                        console.log(response)
                        if(response.state == '1'){
                            this.$message({
                                message: response.msg,
                                type: 'success'
                            });
                            this.$router.push({name: 'ProductList', params:{}})
                        }
                    }).catch(error=>{
                        console.log(error)
                    })
                    console.log(data);
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        changeArr(arr){
            let str = '';
            arr.foreach(item=>{
                
            })
        },
        cancel(){

        },
        saveDraft(){

        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
    }
}
</script>
<style lang="scss" scoped>
.container {
  padding: 20px;
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
      -webkit-appearance: none;
  }
  input[type="number"]{
      -moz-appearance: textfield;
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
      .basic{
          .item-content{
            display: flex;
            justify-content: space-between;
            margin-top: 25px;
            .item-content-left{
                // border: 1px solid;
                width: 70%;
                .line-block{
                    display: flex;
                    justify-content: space-between;
                    .el-form-item{
                        width: 100%;
                        .el-select{
                            width: 100%;
                        }
                    }
                }
                .el-checkbox-group{
                    float: left;
                    margin-right: 20px;
                }
            }
            .item-content-logo{
                .el-form-item{
                    /deep/ .avatar-uploader .el-upload {
                        border: 1px dashed #d9d9d9;
                        border-radius: 6px;
                        cursor: pointer;
                        position: relative;
                        overflow: hidden;
                    }
                    /deep/ .avatar-uploader .el-upload:hover {
                        border-color: #409EFF;
                    }
                    /deep/ .avatar-uploader-icon {
                        font-size: 28px;
                        color: #8c939d;
                        width: 178px;
                        height: 178px;
                        line-height: 178px;
                        text-align: center;
                    }
                    /deep/ .avatar {
                        width: 178px;
                        height: 178px;
                        display: block;
                    }
                }
                .logo-message{
                    width: 170px;
                    padding: 0;
                    margin: 0;
                    text-align: center;
                    font-size: 13px;
                }
            }
          }
      }
      .particular{
        .item-content{
            display:flex;
            justify-content: space-between;
            margin-top: 25px;
            .particular-left{
                width: 53%;
                .particular-line-block{
                    display: flex;
                    // justify-content: space-between;
                    // margin-top: 25px;
                    .el-form-item{
                        width: 100%;
                        .el-select{
                            width: 100%;
                        }
                    }
                    .line {
                        text-align: center;
                        line-height: 36px;
                    }
                }
                .el-checkbox-group{
                    float: left;
                    margin-right: 20px;
                }
            }
            .particular-right{
                width: 45%;
                .el-textarea{
                    width: 100%;
                    /deep/.el-textarea__inner{
                        height: 150px;
                    }
                }

            }
        }
      }
      .up-poster{
          .item-content{
                margin-top: 25px;
                margin-left: 50px;
                .up-poster-text{
                    font-size: 13px;
                }
                .up-poster-img{
                    margin-top: 30px;
                    /deep/.el-upload-list--picture-card .el-upload-list__item{
                        width: 200px;
                        height: 280px;
                    }
                }
            }
      }
      .submit-btn{
          text-align: center;
      }
  }
}
</style>