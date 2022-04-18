<template>
  <div>
    <el-dialog
      title="修改"
      width="600px"
      :visible.sync="dialogFormVisible"
      :before-close="handleClose"
      class="minDialog"
    >
      <!-- <el-form

        ref="form"
        :model="form"
        label-width="120px"
        label-position="left"
        :rules="rules"
      >
        <el-form-item label="审核是否通过:" prop="branchCode">
          <el-select
            filterable
            clearable
            size="small"
            v-model="form.branchCode"
          >
            <el-option
              v-for="item in branchList"
              :key="item.value"
              :label="item.shName"
              :value="item.shId"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="审核不通过原因:" prop="reason">
          <el-input
            type="textarea"
            :autosize="{ minRows: 5, maxRows: 8 }"
            placeholder="请输入内容"
            style="width: 90%"
            v-model="form.reason"
          >
          </el-input>
        </el-form-item>
      </el-form> -->
      <div class="form" style="padding-bottom: 25px">
        {{ form.userName }}
        <div style="float: left; padding-right: 20px">姓名：</div>
      </div>
      <el-form
        label-position="top"
        ref="form"
        :model="form"
        label-width="120px"
        :rules="rules"
      >
        <el-form-item label="1.目前所在地区">
          <v-distpicker
            :disabled="disabled"
            :province="form.addressprovince"
            :city="form.addresscity"
            :area="form.addressdist"
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
            >'
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
        </el-form-item></el-form
      >
      <div slot="footer" class="dialog-footer" style="text-align: center">
        <div>
          <el-button
            class="btn1"
            type="primary"
            size="small"
            @click="handleAdd"
          >
            保存</el-button
          >
          <el-button size="small" @click="handleClose"> 取消</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import userDailyApi from "../../../api/userDaily";
export default {
  data() {
    return {
      date: "",
      addressprovince: "",
      addresscity: "",
      addressdist: "",
      disabled: false,
      form: {
        uuid:"",
        userName:"",
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
      dialogFormVisible: false,
      id: "",
    };
  },
  mounted() {
      this.form = this.$route.query.record;
      // this.addressprovince =
      //   this.$route.query.record.currentLocation.split("-")[0];
      // console.log("省：" + this.addressprovince);
      // this.addresscity = this.$route.query.record.currentLocation.split("-")[1];
      // console.log("市：" + this.addresscity);
      // this.addressdist = this.$route.query.record.currentLocation.split("-")[2];
      // console.log("区：" + this.addressdist);
    this.getHealthyRecordInfo();
  },
  methods: {
    onSelected(data) {
      this.addressprovince = data.province.value;
      this.addresscity = data.city.value;
      this.addressdist = data.area.value;
      this.form.currentLocation =
        this.addressprovince + "-" + this.addresscity + "-" + this.addressdist;
    },
    open(item) {
      debugger
       this.addressprovince =
            item.currentLocation.split("-")[0];
          this.addresscity =
            item.currentLocation.split("-")[1];
          this.addressdist =
            item.currentLocation.split("-")[2];
      this.form.uuid = item.uuid;
      this.form.userName = item.userName;
      this.form.recordTime =
        item.recordTime;
      this.form.healthCondition = item.healthCondition;
      this.dialogFormVisible = true;
      this.getHealthyRecordInfo();
    },
    handleAdd() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          this.addHealthyRecord();
          this.$emit("refresh");
          this.handleClose();
        }
      });
      //   this.$refs["form"].validate((valid) => {
      //     if (valid) {
      //       let data = this.form
      //       modShStatus(data).then((res) => {
      //         if (res.code == 0) {
      //           this.$message.success("审核完成");
      //           this.$emit("refresh");
      //           this.handleClose();
      //         }
      //       });
      //     }
      //   });
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
      userDailyApi.getHealthyRecordInfo(this.form.uuid).then((response) => {
        if (response.code == 20000) {
          this.form.isHealthy=response.data.healthyRecord.isHealthy
          this.form.hasTravelMediumHighRiskAreas=response.data.healthyRecord.hasTravelMediumHighRiskAreas
          this.form.hasTravelAbroad=response.data.healthyRecord.hasTravelAbroad
          this.form.contact=response.data.healthyRecord.contact
          this.form.isolation=response.data.healthyRecord.isolation
          this.form.infection=response.data.healthyRecord.infection
          this.form.hasTested=response.data.healthyRecord.hasTested
          this.form.isVaccination=response.data.healthyRecord.isVaccination

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
    handleClose() {
      if (this.$refs["form"]) {
        this.$refs["form"].resetFields();
      }
      this.dialogFormVisible = false;
      this.form = [];
      this.id = "";
    },
  },
};
</script>
<style scoped>
.btn1 {
  color: aliceblue;
  background-color: #e2a0c9;
  border-style: none;
}
.form {
  margin-top: -15px;
}
</style>