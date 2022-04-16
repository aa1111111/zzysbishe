<template>
  <div>
    <el-dialog
      :title="this.type == 1 ? '修改' : '新增'"
      width="600px"
      :visible.sync="dialogFormVisible"
      :before-close="handleClose"
      class="minDialog"
    >
      <el-form
        label-position="top"
        ref="form"
        :model="form"
        label-width="120px"
        :rules="rules"
      >
        <el-form-item label="用户名" prop="userName">
          <el-input v-model="form.userName"></el-input>
        </el-form-item>
        <el-form-item label="用户名" prop="realName">
          <el-input v-model="form.realName"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="form.phone"></el-input>
        </el-form-item>
      </el-form>
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
import loginApi from "../../../api/login";
export default {
  data() {
    return {
      form: {
        userName: "",
        realName: "",
        phone: "",
      },
      rules: {
        userName: [{ required: true, message: "请输入", trigger: "blur" }],
        realName: [{ required: true, message: "请输入", trigger: "blur" }],
        phone: [{ required: true, message: "请选择", trigger: "change" }],
      },
      dialogFormVisible: false,
      id: "",
      type: "",
    };
  },
  mounted() {},
  methods: {
    onSelected(data) {},
    open(item, type) {
      this.id = item.id;
      this.type = type;
      console.log(type); //修改弹窗type=1
      this.form.userName = item.patName;
      this.form.realName = item.patName;
      this.form.phone = item.patName;
      this.dialogFormVisible = true;
    },
    handleAdd() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          loginApi.modifyUserInfo(this.form).then((response) => {
            if (response.code === 2) {
              this.$message.success(response.message);
              this.$emit("refresh");
              this.handleClose();
            }
          });
          // let data = this.form
          // modShStatus(data).then((res) => {
          //   if (res.code == 0) {
          //     this.$message.success("审核完成");
          //     this.$emit("refresh");
          //     this.handleClose();
          //   }
          // });
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
.nr {
  padding-top: 12px;
  font-size: 12px;
  color: dimgrey;
  display: -webkit-box;
  /* -webkit-box-orient: vertical; */
  /*! autoprefixer: off */
  -webkit-box-orient: vertical;
  /* autoprefixer: on */
  -webkit-line-clamp: 2;
  overflow: hidden;
}
</style>