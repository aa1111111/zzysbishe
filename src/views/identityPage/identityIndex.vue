<template>
  <div class="box">
    <el-steps
      :active="active"
      finish-status="success"
      class="step"
      align-center
    >
      <el-step title="身份认证"></el-step>
      <el-step title="完善信息"></el-step>
      <el-step title="完成认证"></el-step>
    </el-steps>
    <div class="jz" v-show="active == 0">
      <el-form
        ref="form"
        :model="form"
        :rules="rules"
        size="medium"
        label-width="100px"
        class="form"
      >
        <el-form-item label="真实姓名" prop="realName">
          <el-input v-model="form.realName"></el-input>
        </el-form-item>
        <el-form-item label="身份证号码" prop="idCard">
          <el-input v-model="form.idCard"></el-input>
        </el-form-item>
        <el-form-item>
          <div class="btn">
            <p>请确认您是本人，认证通过后不可修改</p>
            <el-button type="primary" @click="next1">下一步</el-button>
            <el-button @click="cancle">重置</el-button>
          </div>
        </el-form-item>
      </el-form>
    </div>
    <div class="jz" v-show="active == 1">
      <el-form
        ref="form"
        :model="form"
        size="medium"
        :rules="rules"
        label-width="120px"
        class="form"
      >
        <el-form-item label="目前所在地区" prop="area">
          <v-distpicker
            :province="addressprovince"
            :city="addresscity"
            :area="addressdist"
            @selected="onSelected"
          ></v-distpicker>
        </el-form-item>
        <el-form-item label="所在公司/学校" prop="unit">
          <el-select v-model="form.unitId" placeholder="请选择公司/学校" filterable :filter-method="dataFilter">
            <el-option 
            v-for="item in options"
            :key="item.uuid"
            :label="item.unitName"
            :value="item.uuid">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="工号/学号" prop="number">
          <el-input v-model="form.number"></el-input>
        </el-form-item>
        <el-form-item label="电子邮箱" prop="email">
          <el-input v-model="form.email"></el-input>
        </el-form-item>
        <el-form-item>
          <div class="btn">
            <el-button type="primary" @click="nextUp">上一步</el-button>
            <el-button type="primary" @click="next2">下一步</el-button>
            <el-button @click="cancle">重置</el-button>
          </div>
        </el-form-item>
      </el-form>
    </div>
    <div class="jz" v-show="active == 2">
      <el-result
        icon="success"
        title="完成认证"
        subTitle="请根据提示进行操作"
        :style="{ marginTop: '-30px' }"
      >
      </el-result>
    </div>
  </div>
</template>
<script>
import loginApi from "../../api/login";
export default {
  data() {
    return {
      active: 0,
      userType: null,
      options: "",
      optionsCopy:"",
      addressprovince: "",
      addresscity: "",
      addressdist: "",
      form: {
        realName: "",
        idCard: "",
        address: "",
        unitId: "",
        number: "",
        email:""
      },
      // 表单验证，需要在 el-form-item 元素中增加 prop 属性
      rules: {
        realName: [
          { required: true, message: "请输入真实姓名", trigger: "blur" },
        ],
        idCard: [
          { required: true, message: "请输入身份证号", trigger: "blur" },
        ],
        area: [
          { required: true, message: "请选择所在地区", trigger: "change" },
        ],
        unit: [
          { required: true, message: "请选择所在单位", trigger: "change" },
        ],
        number: [
          { required: true, message: "请输入学号/工号", trigger: "blur" },
        ],
        email: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
        ]
      },
    };
  },
  created() {
    this.getUnitList();
  },
  mounted() {
    this.userType = this.$route.query.userType;
  },
  methods: {
    onSelected(data) {
      this.addressprovince = data.province.value;
      this.addresscity = data.city.value;
      this.addressdist = data.area.value;
      this.form.address = this.addressprovince + this.addresscity + this.addressdist;
    },
    cancle() {
      this.form = {};
    },
    next1() {
       if (this.form.realName === "") {
        this.$message.warning("真实姓名不能为空");
      } else if (this.form.idCard === "") {
        this.$message.warning("身份证号不能为空");
      }else{
        this.active = 1;
      }
    },
    nextUp() {
      this.active = 0;
    },
    next2() {
      // debugger
       if (this.form.addressprovince === "" && this.form.addresscity === "" && this.form.addressdist === "") {
        this.$message.warning("所在地不能为空");
      } else if (this.form.unitId === "") {
        this.$message.warning("单位不能为空");
      } else if (this.form.number === "") {
        this.$message.warning("学号/工号不能为空");
      } else if (this.form.email === "") {
        this.$message.warning("邮箱不能为空");
      } else{
        loginApi.identify(this.form).then(response =>{
          if(response.code == 20000){
            this.active = 2;
            this.$router.push({ name: "index" });
          }else{
            this.$message.warning(response.message);
          }
        })
      }
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
      }
  },
};
</script>
<style scoped>
.box {
  padding: 200px 100px 0 100px;
  /* color: #d6aac58c; */
}
.step {
  padding: 50px 0px;
}
.form {
  padding: 0 30px;
}
.jz {
  padding-top: 20px;
  text-align: left;
  margin: 0 auto;
  width: 65%;
}
.btn {
  margin-top: 10px;
  text-align: center;
}
.btn p {
  font-size: smaller;
  padding-bottom: 3px;
}
</style>