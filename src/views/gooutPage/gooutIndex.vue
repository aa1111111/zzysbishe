<template>
  <div class="box">
    <el-page-header @back="goBack"> </el-page-header>
    <el-row>
      <el-col :span="6">
        <div class="img1">
          <img
            src="../../assets/public_images/waichu.jpg"
            class="imgo"
            alt=""
          />
        </div> </el-col
      ><el-col :span="8"> <h2 class="title">外出报备申请</h2></el-col>
      <el-col :span="10">
        <div class="img2">
          <img
            src="../../assets/public_images/wai.png"
            class="imgy"
            alt=""
          /></div
      ></el-col>
    </el-row>
    <div class="jz">
      <p class="zs">申请人信息</p>

      <el-form
        ref="form"
        :model="form"
        label-position="top"
        label-width="80px"
        :rules="rules"
      >
        <el-form-item label="申请人" prop="userName">
          <el-input v-model="form.userName" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="联系电话" prop="phone">
          <el-input v-model="form.phone" :disabled="true"></el-input>
        </el-form-item>

        <p class="zs">部门信息</p>
        <el-form-item label="公司/学校" prop="region">
          <el-select
            v-model="form.unitName"
            placeholder="请选择公司/学校"
            :disabled="true"
          >
            <!-- <el-option
              v-for="item in options"
              :key="item.uuid"
              :label="item.unitName"
              :value="item.uuid"
            >
            </el-option> -->
            <!-- <el-option label="宁波财经学院" value="shanghai"></el-option>
            <el-option label="浙江万里学院" value="beijing"></el-option>
            <el-option label="宁波大学" value="qq"></el-option> -->
          </el-select>
        </el-form-item>
        <el-form-item label="工号/学号" prop="number">
          <el-input v-model="form.number" :disabled="true"></el-input>
        </el-form-item>

        <p class="zs">外出信息</p>
        <el-form-item label="请假类别" prop="leaveCategory">
          <el-select v-model="form.leaveCategory" placeholder="请选择">
            <el-option label="事假" :value="0"></el-option>
            <el-option label="病假" :value="1"></el-option>
            <el-option label="公假" :value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="目的地范围" prop="destinationArea">
          <el-select v-model="form.destinationArea" placeholder="请选择">
            <el-option label="宁波市内" value="0"></el-option>
            <el-option label="浙江省内宁波市外" value="1"></el-option>
            <el-option label="浙江省外" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="前往目的地" prop="destination">
          <el-input v-model="form.destination"></el-input>
        </el-form-item>
        <el-form-item label="请假时间">
          <el-col :span="11">
            <el-date-picker
              type="date"
              placeholder="选择日期"
              v-model="form.leaveStartTime"
              style="width: 100%"
              value-format="yyyy-MM-dd"
              @change="selectTime"
            ></el-date-picker>
          </el-col>
          <el-col class="line" :span="2">-</el-col>
          <el-col :span="11">
            <el-date-picker
              type="date"
              placeholder="选择时间"
              v-model="form.leaveEndTime"
              style="width: 100%"
              value-format="yyyy-MM-dd"
              @change="selectTime"
            ></el-date-picker> </el-col
        ></el-form-item>
        <el-form-item label="天数" prop="leaveDays">
          <el-input v-model="form.leaveDays" :disabled="true"></el-input>
        </el-form-item>

        <el-form-item label="外出事由" prop="reason">
          <el-input type="textarea" v-model="form.reason"></el-input>
        </el-form-item>

        <el-form-item class="btn">
          <el-button v-show="gai == null" type="primary" @click="save"
            >立即创建</el-button
          >
          <el-button v-show="gai == 1" type="primary" @click="modify"
            >修改完成</el-button
          >
          <!-- <el-button>取消</el-button> -->
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import goOutApi from "../../api/goOut";
import returnWorkApi from "../../api/returnWork";
import loginApi from "../../api/login";
export default {
  data() {
    return {
      form: {
        userId: "",
        userName: "",
        phone: "",
        unitId: "",
        unitName: "",
        number: "",
        leaveCategory: "",
        destinationArea: "",
        destination: "",
        leaveStartTime: "",
        leaveEndTime: "",
        leaveDays: "",
        reason: "",
      },

      gai: null,
      rules: {
        // name: [{ required: true, message: "请输入", trigger: "blur" }],
        // phone: [{ required: true, message: "请输入", trigger: "blur" }],
        leaveCategory: [
          { required: true, message: "请选择", trigger: "blur", type: "array" },
        ],
        destinationArea: [
          { required: true, message: "请选择", trigger: "blur", type: "array" },
        ],
        destination: [{ required: true, message: "请输入", trigger: "blur" }],
        leaveStartTime: [
          { required: true, message: "请选择", trigger: "change" },
        ],
        leaveEndTime: [
          { required: true, message: "请选择", trigger: "change" },
        ],
        // leaveDays: [{ required: true, message: "请输入", trigger: "blur" }],
        reason: [{ required: true, message: "请输入", trigger: "blur" }],
      },
    };
  },
  created() {
    this.getUserInfo();
  },
  activated() {
    this.gai = this.$route.query.gai;
    if (this.gai == 1) {
      this.id = this.$route.query.id;
      this.getOutApplication();
      console.log("gai" + this.gai);
    } else {
      (this.form.leaveCategory = ""),
        (this.form.destinationArea = ""),
        (this.form.destination = ""),
        (this.form.leaveStartTime = ""),
        (this.form.leaveEndTime = ""),
        (this.form.leaveDays = ""),
        (this.form.reason = "");
    }
    this.getUserInfo();
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    getUserInfo() {
      loginApi.getUserInfo().then((response) => {
        this.form.userName = response.data.userInfo.userName;
        this.form.userId = response.data.userInfo.uuid;
        this.form.unitName = response.data.userInfo.unitName;
        this.form.unitId = response.data.userInfo.unitId;
        this.form.number = response.data.userInfo.number;
        this.form.phone = response.data.userInfo.phone;
        console.log(this.form);
      });
    },
    save() {
      this.addOutApplication();
    },
    modify() {
      this.$refs["form"].validate((valid) => {
        this.updateOutApplication();
      });
    },
    compareDate(dateTime1, dateTime2) {
      var formatDate1 = new Date(dateTime1);
      var formatDate2 = new Date(dateTime2);
      if (formatDate1 >= formatDate2) {
        this.$message.warning("结束日期不能早于开始日期");
      } else {
        var day = (formatDate2 - formatDate1) / 1000 / 60 / 60 / 24;
        this.form.leaveDays = day;
        console.log(this.form.leaveDays);
      }
    },
    selectTime() {
      this.compareDate(this.form.leaveStartTime, this.form.leaveEndTime);
    },
    addOutApplication() {
      this.compareDate(this.form.leaveStartTime, this.form.leaveEndTime);
      goOutApi.addOutApplication(this.form).then((response) => {
        if (response.code == 20000) {
          this.$message.success("添加成功");
          this.$router.push({
            path: "gooutList",
          });
        }
      });
    },
    getOutApplication() {
      goOutApi.getOutApplication(this.id).then((response) => {
        if (response.code == 20000) {
          this.form = response.data.application;
        } else {
          this.$message.warning(response.message);
          this.$router.push({
            path: "returnList",
          });
        }
      });
    },
    updateOutApplication() {
      console.log(this.form);
      goOutApi.updateOutApplication(this.form).then((response) => {
        if (response.code == 20000) {
          setTimeout(() => {
            this.$message.success("修改成功");
          }, 3000);
          this.$router.push({
            path: "gooutList",
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
  /* text-align: right;
  padding-left: 60px; */
  padding-left: 130px;
  padding-top: 20px;
}
.imgy {
  height: 90px;
}
.img2 {
  /* text-align: left;
  magin-left: -30px;
  padding-top: 10px; */
  padding-top: 50px;
  padding-left: 10px;
}
.imgo {
  height: 200px;
}
.jz {
  padding-top: 10px;
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
  color: #659798;
  padding-left: 170px;
  padding-top: 80px;
  /* padding-top: 100px;
  text-align: left;
  margin-left: -70px;
  padding-bottom: 15px; */
}
.btn {
  text-align: center;
  padding-top: 20px;
}
</style>
