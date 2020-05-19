<template>
  <div class="container">
    <el-card class="box-card">
        <div class="product-detail-left">
            <div class="text item">
                <div>产品名称：</div>
                <div>{{msg.productName}}</div>
            </div>
            <div class="text item">
                <div>产品类型：</div>
                <div>{{msg.typeName}}</div>
            </div>
            <div class="text item">
                <div>额度：</div>
                <div>{{msg.borrow_money?msg.borrow_money+'万元':''}}</div>
            </div>
            <div class="text item">
                <div>利率：</div>
                <div>{{msg.product_rate?msg.product_rate+'%':''}}</div>
            </div>
            <div class="text item">
                <div>服务费：</div>
                <div>{{msg.features_servicecharge?msg.features_servicecharge+'%':''}}</div>
            </div>
            <div class="text item">
                <div>个人返佣比例: </div>
                <div>{{msg.return_fee?msg.return_fee+'%':''}}</div>
            </div>
            <div class="text item">
                <div>团队返佣比例: </div>
                <div>{{msg.team_settlement_ratio?msg.team_settlement_ratio+'%':''}}</div>
            </div>
            <div class="text item">
                <div>城市合伙人返佣比例: </div>
                <div>{{msg.partner_settlement_ratio?msg.partner_settlement_ratio+'%':''}}</div>
            </div>
            <div class="text item">
                <div>经办人: </div>
                <div>{{msg.operator}}</div>
            </div>
            <div class="text item">
                <div>还款方式: </div>
                <div>{{msg.features_repaymentmethod}}</div>
            </div>
            <div class="text item">
                <div>违约金: </div>
                <div>{{msg.features_liquidateddamages}}</div>
            </div>
            <div class="text item">
                <div>代收方式: </div>
                <div>{{msg.withholdMethod}}</div>
            </div>
            <div class="text item">
                <div>期数: </div>
                <div>{{msg.term}}</div>
            </div>
            <div class="text item">
                <div>产品优势: </div>
                <div>{{msg.for_people}}</div>
            </div>
        </div>
        <div class="product-detail-right">
            <div class="broker">
                <div class="demo-image__preview" v-for="(item, index)  in exhibitionPosterPictures" :key="index"> 
                    <p class="demonstration">产品海报{{index}}</p>
                    <el-image 
                        :src="exhibitionPosterPictures[index]" 
                        :preview-src-list="exhibitionPosterPictures">
                    </el-image>
                </div>
                <!-- <div class="demo-image__preview">
                    <p class="demonstration">产品海报2</p>
                    <el-image 
                        :src="url" 
                        :preview-src-list="srcList">
                    </el-image>
                </div>
                <div class="demo-image__preview">
                    <p class="demonstration">产品海报3</p>
                    <el-image 
                        :src="url" 
                        :preview-src-list="srcList">
                    </el-image>
                </div> -->
            </div>
            <!-- <div class="er-img">
                <el-image :src="url" ></el-image>
            </div>
            <div class="btn">
                <el-button @click="goBack()">取消</el-button>
                <el-button type="primary"  @click="dialogVisible = true">生成推广连接</el-button>
            </div> -->
        </div>
    </el-card>
    <el-dialog
    title="提示"
    :visible.sync="dialogVisible"
    width="30%"
    :before-close="handleClose">
    <span>这是一段信息</span>
    <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
    </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { productDetail } from '@/api/productManagement'
import { getToken } from '@/utils/auth'

export default {
    name: 'productDetail',
    data() {
        return {
            msg: {},
            productId: this.$route.params.productId,
            exhibitionPosterPictures: [],
            dialogVisible: false
        }
    },
    mounted(){
      let data = {
        token: getToken(),
        productId: this.productId
      }
      productDetail(data).then(response=>{
        if(response.state == '1') {
          const { data } = response;
          this.msg = data;
          this.exhibitionPosterPictures = data.exhibitionPosterPictures.split(',');
        }
      }).catch(error=>{
        console.log(error)
      })
    },
    methods:{
        goBack(){
            this.$router.go(-1);
        },
        handleClose(done) {
        this.$confirm('确认关闭？').then(_ => {
            done();
          }).catch(_ => {

          });
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
.container{
    padding: 20px;
    .text {
        font-size: 14px;
    }
    .item {
        display: flex;
        padding: 18px 0;
        white-space:nowrap;
        div:first-child{
            width: 200px;
        }
        div:last-child{
            margin-left: 10px;
        }
    }
    .btn{
        text-align: center;
    }
    .box-card{
        /deep/ .el-card__body{
            width: 100%;
            display: flex;
            // justify-content: space-between;
            padding-bottom: 70px;
        }
        .product-detail-right{
            width: 70%;
            margin-left: 110px;
            .broker{
                display: flex;
                justify-content: space-between;
                align-items: flex-start;
                /deep/.demo-image__preview{
                    width: 32%;
                    .demonstration{
                        text-align: center;
                    }
                    .el-image{
                        width: 100%;
                        height: 340px;
                    }
                }
            }
            .er-img{
                margin-top: 20px;
                .el-image{
                    width: 300px;
                    height: 170px;
                }
            }
            .btn{
                text-align: left;
                margin-top: 50px;
            }
        }
    }
}
</style>
