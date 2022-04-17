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
      <div v-show="this.view == 1">
        <!-- <h2 class="title">复工申请</h2> -->
        <div class="Fform" style="padding-bottom: 10px">
          {{ Fform.userName }}
          <div style="float: left; padding-right: 20px">姓名：</div>
        </div>
        <el-form
          label-position="top"
          ref="Fform"
          :model="Fform"
          label-width="120px"
          :rules="rulesF"
        >
          <el-form-item label="联系电话" prop="phone">
            <el-input
              v-model="Fform.phone"
              auto-complete="off"
              :disabled="true"
            ></el-input>
          </el-form-item>
          <el-form-item label="公司/学校" prop="unitId">
            <el-select
              v-model="Fform.unitName"
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
            <el-input v-model="Fform.number" :disabled="true"></el-input>
          </el-form-item>

          <!-- <el-form-item label="申请内容">
            <el-input v-model="Fform.f4"></el-input>
          </el-form-item> -->
          <el-form-item label="申请时间" prop="applyTime">
            <el-date-picker
              type="date"
              placeholder="选择日期"
              v-model="Fform.applyTime"
              style="width: 100%"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="备注说明">
            <el-input type="textarea" v-model="Fform.remark"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer" style="text-align: center">
          <div>
            <el-button
              class="btn1"
              type="primary"
              size="small"
              @click="handleAddF"
            >
              保存</el-button
            >
            <el-button size="small" @click="handleClose"> 取消</el-button>
          </div>
        </div>
      </div>
      <div v-show="this.view == 2">
        <!-- 外出报备 -->
        <div class="Gform" style="padding-bottom: 10px">
          {{ Gform.userName }}
          <div style="float: left; padding-right: 20px">姓名：</div>
        </div>
        <el-form
          label-position="top"
          ref="Gform"
          :model="Gform"
          label-width="120px"
          :rules="rulesG"
        >
          <el-form-item label="联系电话" prop="phone">
            <el-input v-model="Gform.phone" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="公司/学校" prop="region">
            <el-select
              v-model="Gform.unitName"
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
            </el-select>
          </el-form-item>
          <el-form-item label="工号/学号" prop="number">
            <el-input v-model="Gform.number" :disabled="true"></el-input>
          </el-form-item>

          <el-form-item label="请假类别" prop="leaveCategory">
            <el-select v-model="Gform.leaveCategory" placeholder="请选择">
              <el-option label="事假" value="0"></el-option>
              <el-option label="病假" value="1"></el-option>
              <el-option label="公假" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="目的地范围" prop="destinationArea">
            <el-select v-model="Gform.destinationArea" placeholder="请选择">
              <el-option label="宁波市内" value="0"></el-option>
              <el-option label="浙江省内宁波市外" value="1"></el-option>
              <el-option label="浙江省外" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="前往目的地" prop="destination">
            <el-input v-model="Gform.destination"></el-input>
          </el-form-item>
          <el-form-item label="请假时间">
            <el-col :span="11">
              <el-date-picker
                type="date"
                placeholder="选择日期"
                v-model="Gform.leaveStartTime"
                style="width: 100%"
              ></el-date-picker>
            </el-col>
            <el-col class="line" :span="2">-</el-col>
            <el-col :span="11">
              <el-date-picker
                type="date"
                placeholder="选择时间"
                v-model="Gform.leaveEndTime"
                style="width: 100%"
                @change="selectTime"
              ></el-date-picker> </el-col
          ></el-form-item>
          <el-form-item label="天数" prop="leaveDays">
            <el-input v-model="Gform.leaveDays" :disabled="true"></el-input>
          </el-form-item>

          <el-form-item label="外出事由" prop="reason">
            <el-input type="textarea" v-model="Gform.reason"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer" style="text-align: center">
          <div>
            <el-button
              class="btn1"
              type="primary"
              size="small"
              @click="handleAddG"
            >
              保存</el-button
            >
            <el-button size="small" @click="handleClose"> 取消</el-button>
          </div>
        </div>
      </div>
      <div v-show="this.view == 3">
        <!-- 历史行程 -->
        <div class="Hform" style="padding-bottom: 10px">
          {{ Hform.userName }}
          <div style="float: left; padding-right: 20px">姓名：</div>
        </div>
        <el-form
          label-position="top"
          ref="Hform"
          :model="Hform"
          label-width="120px"
          :rules="rulesF"
        >
          <el-form-item label="联系电话" prop="phone">
            <el-input v-model="Hform.phone"></el-input>
          </el-form-item>
          <el-form-item label="公司/学校" prop="region">
            <el-select
              v-model="Hform.unitName"
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
            <el-input v-model="Hform.number" :disabled="true"></el-input>
          </el-form-item>

          <el-form-item label="出行地点" prop="h4">
            <el-input v-model="Hform.h4"></el-input>
          </el-form-item>
          <el-form-item label="出行时间" prop="h5">
            <el-date-picker
              type="date"
              placeholder="选择日期"
              v-model="Hform.h5"
              style="width: 100%"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="备注说明" prop="h6">
            <el-input type="textarea" v-model="Hform.h6"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer" style="text-align: center">
          <div>
            <el-button
              class="btn1"
              type="primary"
              size="small"
              @click="handleAddH"
            >
              保存</el-button
            >
            <el-button size="small" @click="handleClose"> 取消</el-button>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import returnWorkApi from "../../../api/returnWork";
export default {
  data() {
    return {
      Fform: {
        userId: "",
        userName: "",
        phone: "",
        unitId: "",
        number: "",
        applyTime: "",
        remark: "",
      },
      Gform: {
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
      Hform: {
        userId: "",
        userName: "",
        phone: "",
        unitId: "",
        unitName: "",
        number: "",
        h4: "浙江省 宁波市 鄞州区",
        h5: "2021-12-03",
        h6: "健康",
      },
      rulesF: {
        // userName: [{ required: true, message: "请输入", trigger: "blur" }],
        // phone: [{ required: true, message: "请输入", trigger: "blur" }],
        // unitId: [{ required: true, message: "请选择", trigger: "change" }],
        // number: [{ required: true, message: "请输入", trigger: "blur" }],
        applyTime: [{ required: true, message: "请选择", trigger: "blur" }],
      },
      rulesG: {
        // name: [{ required: true, message: "请输入", trigger: "blur" }],
        // phone: [{ required: true, message: "请输入", trigger: "blur" }],
        leaveCategory: [
          { required: true, message: "请选择", trigger: "change" },
        ],
        destinationArea: [
          { required: true, message: "请选择", trigger: "change" },
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
      rulesH: {
        // name: [{ required: true, message: "请输入", trigger: "blur" }],
        // phone: [{ required: true, message: "请输入", trigger: "blur" }],
        h4: [{ required: true, message: "请选择", trigger: "change" }],
        h5: [{ required: true, message: "请选择", trigger: "change" }],
        // leaveDays: [{ required: true, message: "请输入", trigger: "blur" }],
        h6: [{ required: true, message: "请输入", trigger: "blur" }],
      },
      dialogFormVisible: false,
      id: "",
      view: null,
    };
  },
  created() {
    // this.getUserInfo();
    // this.getUnitList();
  },
  mounted() {
    this.view = this.$route.query.view;
  },
  methods: {
    onSelected(data) {
      //   this.form.addressprovince = data.province.value
      //   this.form.addresscity = data.city.value
      //   this.form.addressdist = data.area.value
    },
    openF(item) {
      debugger
      this.Fform.uuid = item.uuid;
      this.Fform.userName = item.userName;
      this.Fform.applyTime = item.applyTime;
      this.Fform.remark = item.remark;
      this.dialogFormVisible = true;
      this.getReturnApplication();
    },
    openG(item) {
      this.Gform.userId = item.userId;
      this.Gform.userName = item.userName;
      this.Gform.phone = item.phone;
      this.Gform.unitId = item.unitId;
      this.Gform.unitName = item.unitName;
      this.Gform.number = item.number;
      this.Gform.leaveCategory = item.leaveCategory;
      this.Gform.destinationArea = item.destinationArea;
      this.Gform.destination = item.destination;
      this.Gform.leaveStartTime = item.leaveStartTime;
      this.Gform.leaveEndTime = item.leaveEndTime;
      this.Gform.leaveDays = item.leaveDays;
      this.Gform.reason = item.reason;
      this.dialogFormVisible = true;
    },
    openH(item) {
      this.Hform.userId = item.userId;
      this.Hform.userName = item.userName;
      this.Hform.phone = item.phone;
      this.Hform.unitId = item.unitId;
      this.Hform.number = item.number;
      this.Hform.h4 = item.h4;
      this.Hform.h5 = item.h5;
      this.Hform.h6 = item.h6;
      this.dialogFormVisible = true;
    },
    handleAddF() {
      this.$refs["Fform"].validate((valid) => {
        if (valid) {
          this.updateReturnApplication();
          this.$emit("refresh");
          this.handleClose();
        }
      });
    },
    handleAddG() {
      this.$refs["Gform"].validate((valid) => {
        if (valid) {
          this.addHealthyRecord();
          this.$emit("refresh");
          this.handleClose();
        }
      });
    },
    handleAddH() {
      this.$refs["Hform"].validate((valid) => {
        if (valid) {
          this.addHealthyRecord();
          this.$emit("refresh");
          this.handleClose();
        }
      });
    },
    handleClose() {
      // if (this.$refs["Fform"]) {
      //   this.$refs["Fform"].resetFields();
      // }
      this.dialogFormVisible = false;
      // this.Fform = [];
      // this.id = "";
    },
    getReturnApplication() {
      returnWorkApi.getReturnApplication(this.Fform.uuid).then((response) => {
        if (response.code == 20000) {
          this.Fform.number = response.data.application.number;
          this.Fform.phone = response.data.application.phone;
          this.Fform.userId = response.data.application.userId;
          this.Fform.unitId = response.data.application.unitId;
        } else {
          this.$message.warning(response.message);
        }
      });
    },
    updateReturnApplication() {
      returnWorkApi
        .updateReturnApplication(this.Fform)
        .then((response) => {
          if (response.code == 20000) {
            this.$message.success("修改成功");
            handleClose();
          }
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
  },
};
</script>
<style scoped>
.btn1 {
  color: aliceblue;
  background-color: #e2a0c9;
  border-style: none;
}
.Fform {
  margin-top: -15px;
}
.Gform {
  margin-top: -15px;
}
.Hform {
  margin-top: -15px;
}
</style>