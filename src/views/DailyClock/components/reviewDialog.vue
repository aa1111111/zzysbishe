<template>
  <div>
    <el-dialog 
    title="退回"
      width="600px"
      :visible.sync="dialogFormVisible"
      :before-close="handleClose"
      class="minDialog"
    >
    <!-- :style="{'background-image':'url('+require('@/assets/public_images/bizhi.jpg')+')', backgroundSize:'600px 350px',backgroundPosition:'340px 90px', backgroundRepeat: 'no-repeat'}" -->
      
      <el-form
        ref="form"
        :model="form"
        label-width="120px"
        label-position="left"
      >
        <!-- <el-form-item label="审核是否通过:" prop="status">
          <el-select
            filterable
            clearable
            size="small"
            v-model="form.status"
          >
            <el-option label="通过" value="1"></el-option>
            <el-option label="不通过" value="2"></el-option>
          </el-select>
        </el-form-item> -->
        <el-form-item label="不通过原因:" prop="msgBack">
          <el-input
            type="textarea"
            :autosize="{ minRows: 5, maxRows: 8 }"
            placeholder="请输入内容"
            style="width: 90%"
            v-model="form.msgBack"
          >
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer" style="text-align: center">
        <div>
          <el-button class="btn1" type="primary" size="small" @click="handleAdd">
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
      manage:null,
      form: {
        uuid:"",
        status: 1,
        msgBack: "",
      },
      // rules: {
      //   status: [
      //     { required: true, message: "请选择是否审核通过", trigger: "change" },
      //   ],
      // },
      dialogFormVisible: false,
      branchList: [],
      id: "",
    };
  },
      
  activated() {
  },
  methods: {
    open(item) {
      this.form.msgBack= ""
      this.form.uuid = item.uuid;
      this.dialogFormVisible = true;
    },
    handleAdd() {
      this.updateHealthyRecord();
      this.$emit("refresh");
      this.handleClose();
    },
    updateHealthyRecord() {
      userDailyApi
        .updateHealthyRecord(this.form)
        .then((response) => {
          if (response.code == 20000) {
            this.$message.success("修改成功");
          }else{
            this.$message.warning(response.message);
          }
        });
    },
    handleClose() {
      this.dialogFormVisible = false;
    },
  },

};
</script>
<style scoped>
.btn1{
  color: aliceblue;
  background-color: #e2a0c9;
    border-style:none;
}
</style>