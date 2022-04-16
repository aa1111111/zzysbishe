<template>
    <div class="box">
      <el-row :gutter="20" style="margin-top:10px;">
        <el-col :span="8">
            <div class="grid-content bg-purple">
                 <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>个人中心</span>
        </div>
          <div class="name-role">
          <span class="sender" v-show="this.userType==2">Admin - {{dataForm.userName}}</span>  
          <span class="sender" v-show="this.userType==1">User - {{dataForm.userName}}</span> 
          <div class="btn" v-if="dataForm.healthCondition == 0"><el-button type="success" plain size="mini">健康</el-button></div>
        <div class="btn" v-if="dataForm.healthCondition == 1"><el-button type="warning" plain size="mini">已感染</el-button></div>
        </div>
        <div class="registe-info">
          <span class="registe-info">
            是否完成身份认证：
             <span v-if="dataForm.authenticationStatus==1">已认证</span>
             <span v-if="dataForm.authenticationStatus==0">未认证</span>
          </span>
        </div>
        <el-divider></el-divider>
        <div class="personal-relation">
        <div class="relation-item">手机号:  <div style="float: right; padding-right:20px;">{{dataForm.phone}}</div></div>
    </div>
    <div class="personal-relation">
      <div class="relation-item">所属企业/学校:  <div style="float: right; padding-right:20px;">{{dataForm.unitName}}</div></div> 
    </div>
       <div class="personal-relation">
      <div class="relation-item">学号:  <div style="float: right; padding-right:20px;">{{dataForm.number}}</div></div>      
    </div>
      </el-card>
        </div>
        </el-col>
    <el-col :span="16">
        <div class="grid-content bg-purple">
       <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>基本资料</span>
        </div>
        <div>
          <el-form label-width="100px" v-model="dataForm1" size="small" label-position="right">
          <el-form-item v-show="this.userType==1" label="用户昵称" prop="nickName">
            <el-input  auto-complete="off" v-model="dataForm1.userName"></el-input>
        </el-form-item>
          <el-form-item v-show="this.userType==2" label="管理员昵称" prop="nickName" >
          <el-input  auto-complete="off" v-model="dataForm1.userName"></el-input>
        </el-form-item>
        <el-form-item label="真实姓名" prop="homeUrl">
          <el-input  maxlength="18" v-model="dataForm1.realName"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input auto-complete="off" v-model="dataForm1.phone"></el-input>
        </el-form-item>
          
          </el-form>
          <div slot="footer" class="dialog-footer">
          <el-button size="mini" type="primary" @click="modifyUser">提交</el-button>
          <el-button v-show="this.userType==1 && this.dataForm.authenticationStatus==0" size="mini" type="primary" @click="rz">去认证</el-button>
          <el-button size="mini" type="warning" @click="exit">退出登录</el-button>
        </div>
        </div>
      </el-card>
        </div>
        </el-col>

      </el-row>
    </div>
</template>

<script>
import loginApi from '../../api/login';
export default {
  data(){
    return{
      userType:null,
      dataForm:[],
      dataForm1:{
        userName: '',
        phone: '',
        realName: ''
      }
    }
  },
  created(){
    this.getUserInfo();
  },
  mounted() {
    this.userType = this.$route.query.userType
  },
  methods:{
    exit(){
      loginApi.userLoginOut().then(response =>{
        if(response.code===20000){
          this.$router.push({ name: "login" });
        }
      })
    },
    rz(){
      this.$router.push({ path: "identityIndex", query: { userType: this.userType } });
    },
    modifyUser(){
      console.log(this.dataForm1);
      loginApi.modifyUserInfo(this.dataForm1).then(response =>{
        if(response.code===20000){
          this.$message.success("修改成功")
          this.getUserInfo();
        }
      })
    },
    getUserInfo(){
      loginApi.getUserInfo().then(response =>{
        if(response.code === 20000){
          this.dataForm = response.data.userInfo
          this.dataForm1.userName =response.data.userInfo.userName
          this.dataForm1.phone = response.data.userInfo.phone
          this.dataForm1.realName = response.data.userInfo.realName
          console.log(this.dataForm )
        }else{
          this.$message.warning(response.message)
          this.$router.push({ name: "login" });
        }
      })
    }
  }
}
</script>

<style scoped>
.box {
  padding: 200px 100px 0 100px;
  /* color: #d6aac58c; */
}
.btn{
  padding-right: 50px;
  float: right;
}
 .text {
    font-size: 14px;
  }

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
    width: 100%;
  }
  .name-role {
    font-size: 16px;
    padding: 5px;
   text-align:center;
  }
   .sender{
      text-align:center;
    }
.registe-info{
  text-align: center;
  padding-top:10px;
}
.personal-relation {
  font-size: 16px;
  padding: 0px 5px 15px;
  margin-right: 1px;
    width: 100%
}

.relation-item {
  padding: 12px;
   
}
.dialog-footer{
  padding-top:10px ;
  padding-left: 10%;
}
   /* .el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  } */
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
</style>