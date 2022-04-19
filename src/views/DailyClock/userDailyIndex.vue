<template>
  <div class="box">
    <el-page-header @back="goBack"> </el-page-header>
    <div class="title">
      <h2>全员健康每日打卡</h2>
    </div>
    <div class="img">
      <img src="../../assets/public_images/Daily.jpg" alt="" />
    </div>
    <div class="jz">
      <p class="zs">
        每天健康打卡报平安，请填写今日健康打卡。所有信息仅用于组织了解员工身体状况，不会泄露作他用。
      </p>
      <p class="rq">日期：{{ date }}</p>

      <el-form
        ref="form"
        :model="form"
        :rules="rules"
        label-position="top"
        label-width="80px"
      >
        <el-form-item label="1.目前所在地区">
          <v-distpicker
            :disabled="disabled"
            :province="addressprovince"
            :city="addresscity"
            :area="addressdist"
            @selected="onSelected"
          ></v-distpicker>
        </el-form-item>
        <el-form-item
          label="2.过去21天是否健康（如果21天内有过发烧情况，请选择有发烧、咳嗽等症状）"
          prop="isHealthy"
        >
          <el-radio-group v-model="form.isHealthy" :disabled="disabled">
            <el-radio :label="0">健康</el-radio>
            <el-radio :label="1">有发烧、咳嗽等症状</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item
          label="3.过去21天是否有涉及中高风险地区的旅居史"
          prop="hasTravelMediumHighRiskAreas"
        >
          <el-radio-group
            v-model="form.hasTravelMediumHighRiskAreas"
            :disabled="disabled"
          >
            <el-radio :label="0">否</el-radio>
            <el-radio :label="1">是，过去21天有涉及中风险地区旅居史</el-radio>
            <el-radio :label="2"
              >是，过去21天有涉及高风险地区/封闭管理</el-radio
            >
          </el-radio-group>
        </el-form-item>
        <el-form-item
          label="4.过去21天是否有国外或港台的旅居史"
          prop="hasTravelAbroad"
        >
          <el-radio-group v-model="form.hasTravelAbroad" :disabled="disabled"
            >
            <el-radio :label="0">否</el-radio>
            <el-radio :label="1">是</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item
          label="5.过去21天是否接触过新型冠状病毒确诊患者/无症状感染者/核酸检测为阳性者"
          prop="contact"
        >
          <el-radio-group v-model="form.contact" :disabled="disabled">
            <el-radio :label="0">否</el-radio>
            <el-radio :label="1">是</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item
          label="6.目前是否被所在街道/社区等部门要求居家/集中隔离"
          prop="isolation"
        >
          <el-radio-group v-model="form.isolation" :disabled="disabled">
            <el-radio :label="0">否</el-radio>
            <el-radio :label="1">是</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item
          label="7.目前是否是新型冠状病毒阳性（确诊）患者/正处于疑似待排查期间或曾是新型冠状病毒确诊患者/无症状感染者痊愈不足90天"
          prop="infection"
        >
          <el-radio-group v-model="form.infection" :disabled="disabled">
            <el-radio :label="0">否</el-radio>
            <el-radio :label="1">是</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item
          label="8.是否有病愈/隔离期满/涉及风险地区行程后，通过核酸检测（未诊断阳性或未被隔离的同学请选择“未检测”，检测结果未出前请选择“未检测”）"
          prop="hasTested"
        >
          <el-radio-group v-model="form.hasTested" :disabled="disabled">
            <el-radio :label="0">未检测（含不需要检测）</el-radio>
            <el-radio :label="1">已通过</el-radio>
            <el-radio :label="2">未通过</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="9.是否已接种新冠疫苗" prop="isVaccination">
          <el-radio-group v-model="form.isVaccination" :disabled="disabled">
            <el-radio :label="0">未注射新冠疫苗</el-radio>
            <el-radio :label="1">未完成，但已注射部分阶段新冠疫苗</el-radio>
            <el-radio :label="2">已完成注射新冠疫苗</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item class="btn">
          <el-button
            v-show="gai == null && record == undefined"
            type="primary"
            @click="save"
            >立即创建</el-button
          >
          <el-button v-show="record!=undefined">今天已完成打卡，无需重复打卡</el-button>
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
import userDailyApi from "../../api/userDaily";
export default {
  data() {
    return {
      date: "",
      addressprovince: "",
      addresscity: "",
      addressdist: "",
      disabled: false,
      form: {
        currentLocation: "",
        isHealthy: null,
        hasTravelMediumHighRiskAreas: null,
        hasTravelAbroad: null,
        contact: null,
        isolation: null,
        infection: null,
        hasTested: null,
        isVaccination: null,
      },
      record:"",
      recordId: "",
      gai: null,
      rules: {
        currentLocation: [
          { required: true, message: "请选择", trigger: "blur" },
        ],
        isHealthy: [{ required: true, message: "请选择", trigger: "blur" }],
        hasTravelMediumHighRiskAreas: [
          { required: true, message: "请选择", trigger: "blur" },
        ],
        hasTravelAbroad: [
          { required: true, message: "请选择", trigger: "blur" },
        ],
        contact: [{ required: true, message: "请选择", trigger: "blur" }],
        isolation: [{ required: true, message: "请选择", trigger: "blur" }],
        infection: [{ required: true, message: "请选择", trigger: "blur" }],
        hasTested: [{ required: true, message: "请选择", trigger: "blur" }],
        isVaccination: [{ required: true, message: "请选择", trigger: "blur" }],
      },
    };
  },
  created() {
    this.nowTimes();
  },
  activated() {
    this.disabled = false
    console.log(this.$route.query.record);
   this.record=this.$route.query.record
        if (this.$route.query.record != undefined) {
          this.form = this.$route.query.record;
          this.addressprovince =
            this.$route.query.record.currentLocation.split("-")[0];
          console.log("省：" + this.addressprovince);
          this.addresscity = this.$route.query.record.currentLocation.split("-")[1];
          console.log("市：" + this.addresscity);
          this.addressdist = this.$route.query.record.currentLocation.split("-")[2];
          console.log("区：" + this.addressdist);
          this.disabled = true;
        }

    this.gai = this.$route.query.gai;
    console.log(this.recordId);
    console.log(this.gai);
    if (this.gai == 1) {
      this.recordId = this.$route.query.recordId;
      this.getHealthyRecordInfo();
    }
  },
  methods: {
    timeFormate(timeStamp) {
      let year = new Date(timeStamp).getFullYear();
      let month =
        new Date(timeStamp).getMonth() + 1 < 10
          ? "0" + (new Date(timeStamp).getMonth() + 1)
          : new Date(timeStamp).getMonth() + 1;
      let date =
        new Date(timeStamp).getDate() < 10
          ? "0" + new Date(timeStamp).getDate()
          : new Date(timeStamp).getDate();
      // let hh =new Date(timeStamp).getHours() < 10? "0" + new Date(timeStamp).getHours(): new Date(timeStamp).getHours();
      // let mm =new Date(timeStamp).getMinutes() < 10? "0" + new Date(timeStamp).getMinutes(): new Date(timeStamp).getMinutes();
      // let ss =new Date(timeStamp).getSeconds() < 10? "0" + new Date(timeStamp).getSeconds(): new Date(timeStamp).getSeconds();
      // return year + "年" + month + "月" + date +"日"+" "+hh+":"+mm ;
      this.date = year + "年" + month + "月" + date + "日";
      console.log(this.date);
    },
    // 定时器函数
    nowTimes() {
      this.timeFormate(new Date());
      this.timer = setTimeout(this.nowTimes, 30 * 1000);
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
    goBack() {
      this.$router.go(-1);
    },
    onSelected(data) {
      this.addressprovince = data.province.value;
      this.addresscity = data.city.value;
      this.addressdist = data.area.value;
      this.form.currentLocation =
        this.addressprovince + "-" + this.addresscity + "-" + this.addressdist;
    },
    addHealthyRecord() {
      if (this.form.currentLocation === null) {
        this.$message.warning("目前所在地不能为空");
      } else {
        userDailyApi.addHealthyRecord(this.form).then((response) => {
          if (response.code == 20000) {
            this.$message.success("添加成功");
            setTimeout(() => {
              this.$router.push({
                path: "userDailyList",
                query: { userType: this.userType },
              });
            }, 3000);
          }
        });
      }
    },
    getHealthyRecordInfo() {
      userDailyApi.getHealthyRecordInfo(this.recordId).then((response) => {
        if (response.code == 20000) {
          this.form = response.data.healthyRecord;
          this.addressprovince =
            response.data.healthyRecord.currentLocation.split("-")[0];
          this.addresscity =
            response.data.healthyRecord.currentLocation.split("-")[1];
          this.addressdist =
            response.data.healthyRecord.currentLocation.split("-")[2];
        }
      });
    },
    updateHealthyRecord() {
      console.log(this.form);
      userDailyApi.updateHealthyRecord(this.form).then((response) => {
        if (response.code == 20000) {
          this.$message.success("修改成功");
          setTimeout(() => {
            this.$router.push({
              path: "userDailyList",
              query: { userType: this.userType },
            });
          }, 3000);
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
.img {
  text-align: center;
}
.box img {
  height: 200px;
}
.jz {
  text-align: left;
  margin: 0 auto;
  width: 65%;
}
.zs {
  font-size: smaller;
  padding-bottom: 13px;
  color: dimgrey;
}
.title {
  color: #994a8e;
  padding-top: 20px;
  text-align: center;
  padding-bottom: 15px;
}
.rq {
  padding-bottom: 10px;
}
.btn {
  text-align: center;
  padding-top: 20px;
}
</style>
