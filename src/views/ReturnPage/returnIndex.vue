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
        <el-form-item label="申请人" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="联系电话" prop="phone">
          <el-input v-model="form.phone"></el-input>
        </el-form-item>
        <el-form-item label="公司/学校" prop="region">
          <el-select v-model="form.region" placeholder="请选择公司/学校">
            <el-option
              v-for="(item, index) in regionList"
              :key="index"
              :label="item.name"
              :value="item.value"
            >
            </el-option>
            <!-- <el-option label="宁波财经学院" value="shanghai"></el-option>
            <el-option label="浙江万里学院" value="beijing"></el-option>
            <el-option label="宁波大学" value="qq"></el-option> -->
          </el-select>
        </el-form-item>
        <el-form-item label="工号/学号" prop="idcard">
          <el-input v-model="form.idcard"></el-input>
        </el-form-item>

        <!-- <el-form-item label="申请内容">
          <el-input v-model="form.goout"></el-input>
        </el-form-item> -->
        <el-form-item label="申请时间" prop="date1">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="form.date1"
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
export default {
  data() {
    return {
      form: {
        name: "王小虎",
        phone: "1321245852",
        region: "宁波财经学院",
        idcard: "1822110044",
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
        name: [{ required: true, message: "请输入", trigger: "blur" }],
        phone: [{ required: true, message: "请输入", trigger: "blur" }],
        region: [{ required: true, message: "请选择", trigger: "change" }],
        idcard: [{ required: true, message: "请输入", trigger: "blur" }],
        date1: [{ required: true, message: "请输入", trigger: "change" }],
      },
    };
  },
  mounted() {
    this.gai = this.$route.query.gai;
    console.log(this.gai);
  },
  methods: {
    goBack() {
      this.$router.go(-1);
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
