<template>
  <div>
    <el-dialog
      :title="this.type == 1 ? '新增' : '修改'"
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
        <el-form-item label="发布人" prop="userName">
          <el-input v-model="form.userName" disabled></el-input>
        </el-form-item>
        <el-form-item label="公告标题" prop="announcementTitle">
          <el-input v-model="form.announcementTitle"></el-input>
        </el-form-item>
        <el-form-item label="发布时间" prop="releaseTime">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="form.releaseTime"
            style="width: 100%"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="公告内容" prop="announcementContent" class="nr">
          <el-input type="textarea" :rows="4" v-model="form.announcementContent"></el-input>
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
import tzggApi from '../../../api/tzgg'
import loginApi from '../../../api/login'
export default {
  data() {
    return {
      form: {
        uuid:"",
        userId:"",
        userName: "",
        announcementTitle: "",
        announcementContent: "",
        releaseTime: "",
      },
      rules: {
        announcementTitle: [{ required: true, message: "请选择", trigger: "blur" }],
        releaseTime: [{ required: true, message: "请选择", trigger: "blur" }],
        announcementContent: [{ required: true, message: "请选择", trigger: "blur" }],
      },
      dialogFormVisible: false,
      id: "",
      type:""
    };
  },
  created(){
    
  },
  mounted() {},
  methods: {
    onSelected(data) {
      //   this.form.addressprovince = data.province.value
      //   this.form.addresscity = data.city.value
      //   this.form.addressdist = data.area.value
    },
    //新增传的type=1
    openA(type) {
      this.form.uuid=""
      this.type = type;
      this.dialogFormVisible = true;
      this.getUserName();
    },
    //修改没穿type
    open(item) {
      this.form.uuid = item.uuid;
      this.dialogFormVisible = true;
      this.getAnnouncementInfo();
    },
    handleAdd() {
      //新增
      if(this.type==1){
        tzggApi.addAnnouncement(this.form).then(response =>{
          if(response.code == 20000){
            this.$emit("refresh");
            this.handleClose();
          }else{
            this.$message.warning(response.message)
          }
        })
      }else{//修改
        debugger
        tzggApi.updateAnnouncementInfo(this.form).then(response =>{
          if(response.code == 20000){
            this.$emit("refresh");
            this.handleClose();
          }else{
            this.$message.warning(response.message)
          }
        })
      }
      
    },
    handleClose() {
      // if (this.$refs["form"]) {
      //   this.$refs["form"].resetFields();
      // }
      this.dialogFormVisible = false;
      //   this.form = [];
      //   this.id = "";
    },
    getAnnouncementInfo(){
      tzggApi.getAnnouncementInfo(this.form.uuid).then(response =>{
        if(response.code==20000){
          this.form.announcementTitle = response.data.announcementInfo.announcementTitle;
          this.form.userName = response.data.announcementInfo.userName;
          this.form.announcementContent = response.data.announcementInfo.announcementContent;
          this.form.releaseTime = response.data.announcementInfo.releaseTime;
        }else{
          this.$message.warning(response.message)
        }
      })
    },
    getUserName(){
      loginApi.getUserInfo().then(response =>{
        console.log(response.data.userInfo)
        this.form.userName = response.data.userInfo.userName
        this.form.userId = response.data.userInfo.uuid
        
      })
    }
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