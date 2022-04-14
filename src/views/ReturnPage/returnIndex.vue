<template>
  <div class="box">
    <el-page-header @back="goBack"> </el-page-header>
    <el-row>
      <el-col :span="6">
        <div class="img1">
          <img src="../../assets/public_images/diannao.png" alt="" />
        </div> </el-col
      ><el-col :span="8"> <h2 class="title">复工申请</h2></el-col>
      <el-col :span="10">
        <div class="img2">
          <img src="../../assets/public_images/fugong.png" alt="" /></div
      ></el-col>
    </el-row>
    <!-- <h2 class="title">复工申请</h2> -->
    <div class="jz">
      <el-form
        ref="form"
        :model="form"
        label-position="top"
        label-width="80px"
        :rules="rules"
      >
        <el-form-item label="申请人" prop="userName">
          <el-input v-model="form.userName" auto-complete="off" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="联系电话" prop="phone">
          <el-input v-model="form.phone" auto-complete="off" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="公司/学校" prop="unitId">
          <el-select v-model="form.unitId" placeholder="请选择公司/学校">
             <el-option 
            v-for="item in options"
            :key="item.uuid"
            :label="item.unitName"
            :value="item.uuid">
            </el-option>
            <!-- <el-option label="宁波财经学院" value="shanghai"></el-option>
            <el-option label="浙江万里学院" value="beijing"></el-option>
            <el-option label="宁波大学" value="qq"></el-option> -->
          </el-select>
        </el-form-item>
        <el-form-item label="工号/学号" prop="number">
          <el-input v-model="form.number"></el-input>
        </el-form-item>

        <!-- <el-form-item label="申请内容">
          <el-input v-model="form.goout"></el-input>
        </el-form-item> -->
        <el-form-item label="申请时间" prop="applyTime">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="form.applyTime"
            style="width: 100%"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="备注说明">
          <el-input type="textarea" v-model="form.desc"></el-input>
        </el-form-item>

        <el-form-item class="btn">
          <el-button v-show="this.gai == null" type="primary" @click="save"
            >立即创建</el-button
          >
          <el-button v-show="this.gai == 1" type="primary" @click="modify"
            >修改完成</el-button
          >
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import returnWorkApi from "../../api/returnWork";
import loginApi from "../../api/login";
export default {
  data() {
    return {
      options: "",
      optionsCopy:"",
      form: {
        userName:"",
        phone:"",
        unit:"",
        number:"",
        applyTime:"",
        remark:""
      },
      regionList: [
        {
          value: "1",
          name: "宁波大学",
        },
        {
          value: "2",
          name: "浙江万里学院",
        },
        {
          value: "3",
          name: "宁波财经学院",
        },
      ],
      gai: null,
      rules: {
        // userName: [{ required: true, message: "请输入", trigger: "blur" }],
        // phone: [{ required: true, message: "请输入", trigger: "blur" }],
        region: [{ required: true, message: "请选择", trigger: "change" }],
        idcard: [{ required: true, message: "请输入", trigger: "blur" }],
        date1: [{ required: true, message: "请输入", trigger: "change" }],
      },
    };
  },
  created() {
    this.getUserInfo();
    this.getUnitList();
  },
  mounted() {
    this.gai = this.$route.query.gai;
    console.log(this.gai);
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    getUserInfo(){
      returnWorkApi.getUserInfo().then(response=>{
        this.form = response.data.userInfo
      })
    },
    getUnitList(){
      loginApi.getUnitList().then(response =>{
        console.log(response.data.unitList)
        this.options = response.data.unitList
        this.optionsCopy = response.data.unitList
      })
    },
    dataFilter(val) {
      this.value = val;
      if (val) { //val存在
        this.options = this.optionsCopy.filter((item) => {
          if (!!~item.unitName.indexOf(val) || !!~item.unitName.toUpperCase().indexOf(val.toUpperCase())) {
            return true
          }
        })
      } else { //val为空时，还原数组
        this.options = this.optionsCopy;
      }
    },
    save() {
      this.$refs["form"].validate((valid) => {
        this.addHealthyRecord();
      });
    },
    modify() {
      this.$refs["form"].validate((valid) => {
        this.updateHealthyRecord();
      });
    },
    addHealthyRecord() {
      userDailyApi.addHealthyRecord(this.form).then((response) => {
        if (response.code == 20000) {
          setTimeout(() => {
            this.$message.success("添加成功");
          }, 3000);
          this.$router.push({
            path: "userDailyList",
            query: { userType: this.userType },
          });
        }
      });
    },
    getHealthyRecordInfo() {
      userDailyApi.getHealthyRecordInfo(this.recordId).then((response) => {
        if (response.code == 20000) {
          this.form = response.data.healthyRecord;
        }
      });
    },
    updateHealthyRecord() {
      console.log(this.form);
      userDailyApi.updateHealthyRecord(this.form).then((response) => {
        if (response.code == 20000) {
          setTimeout(() => {
            this.$message.success("修改成功");
          }, 3000);
          this.$router.push({
            path: "userDailyList",
            query: { userType: this.userType },
          });
        }
      });
    },
  },
};
</script>
<style scoped>
.box {
  padding: 200px 100px 0 100px;
  /* color: #d6aac58c; */
}
.img1 {
  text-align: right;
  padding-left: 60px;
}
.img2 {
  text-align: left;
  magin-left: -30px;
  padding-top: 10px;
  height: 150px;
}
.box img {
  height: 180px;
}
.jz {
  padding-top: 50px;
  text-align: left;
  margin: 0 auto;
  width: 65%;
}
.zs {
  font-size: 18px;
  padding-bottom: 13px;
  color: rgb(63, 59, 59);
}
.title {
  color: #367ac3;
  padding-top: 100px;
  padding-left: 100px;
  padding-bottom: 15px;
}
.btn {
  text-align: center;
  padding-top: 20px;
}
.title {
  text-align: center;
}
</style>
