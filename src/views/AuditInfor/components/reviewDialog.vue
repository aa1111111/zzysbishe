<template>
  <div>
    <el-dialog 
    title="审核"
      width="600px"
      :visible.sync="dialogFormVisible"
      :before-close="handleClose"
      class="minDialog"
    >
    <!-- :style="{'background-image':'url('+require('@/assets/public_images/bizhi.jpg')+')', backgroundSize:'600px 350px',backgroundPosition:'340px 90px', backgroundRepeat: 'no-repeat'}" -->
     <!-- 复工 -->
      <div v-if="this.manage == 1">
      <el-form
        
        ref="form"
        :model="form"
        label-width="120px"
        label-position="left"
      >
        <el-form-item label="审核是否通过:" prop="status">
          <el-select
            filterable
            clearable
            size="small"
            v-model="form.status"
          >
            <el-option label="通过" value="1"></el-option>
            <el-option label="不通过" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="审核不通过原因:" prop="msgBack">
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
          <el-button class="btn1" type="primary" size="small" @click="handleAddR">
            保存</el-button
          >
          <el-button size="small" @click="handleClose"> 取消</el-button>
        </div>
      </div>
    </div>
    <!-- 外出 -->
      <div v-else>
      <el-form
        
        ref="form2"
        :model="form2"
        label-width="120px"
        label-position="left"
        :rules="rules"
      >
        <el-form-item label="审核是否通过:" prop="status">
          <el-select
            filterable
            clearable
            size="small"
            v-model="form2.status"
          >
           <el-option label="通过" value="1"></el-option>
            <el-option label="不通过" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="审核不通过原因:" prop="msgBack">
          <el-input
            type="textarea"
            :autosize="{ minRows: 5, maxRows: 8 }"
            placeholder="请输入内容"
            style="width: 90%"
            v-model="form2.msgBack"
          >
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer" style="text-align: center">
        <div>
          <el-button class="btn1" type="primary" size="small" @click="handleAddG">
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
import goOutApi from "../../../api/goOut";
export default {
  data() {
    return {
      manage:null,
      form: {
        uuid:"",
        status: "",
        msgBack: "",
      },
      // rules: {
      //   status: [
      //     { required: true, message: "请选择是否审核通过", trigger: "change" },
      //   ],
      // },
      dialogFormVisible: false,
      branchList: [],
      form2: {
        uuid:"",
        status: "",
        msgBack: "",
      },
      id: "",
    };
  },
    activated() {
    
  },
  methods: {
    openR(item,type) {
      this.form.status= "",
    this.form.msgBack= ""
      this.form.uuid = item.uuid;
      this.manage = type
      this.dialogFormVisible = true;
    },
    openG(item,type) {
    this.form2.status= "",
    this.form2.msgBack= ""
      this.form2.uuid = item.uuid;
      this.manage = type
      this.dialogFormVisible = true;
    },
    handleAddR() {
      this.updateReturnApplication();
      this.$emit("refresh");
          this.handleClose();
    },
    handleAddG() {
       this.updateOutApplication();
       this.$emit("refresh");
          this.handleClose();
      
    },
    handleClose() {
      // if (this.$refs["form"]) {
      //   this.$refs["form"].resetFields();
      // }
      this.dialogFormVisible = false;
      // this.form = { reason: "", branchCode: "" };
      // this.id = "";
    },
    updateReturnApplication() {
      returnWorkApi
        .updateReturnApplication(this.form)
        .then((response) => {
          if (response.code == 20000) {
            this.$message.success("修改成功");
          }else{
            this.$message.warning(response.message);
          }
        });
    },
    updateOutApplication() {
      console.log(this.form2);
      goOutApi.updateOutApplication(this.form2).then((response) => {
        if (response.code == 20000) {
          this.$message.success("修改成功");
        }else{
          this.$message.warning(response.message);
        }
      });
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