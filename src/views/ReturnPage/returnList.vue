<template>
  <div class="box"> 
    <div class="search">
      <el-row :gutter="90">
        <el-col :span="6">
          <div class="search-item">
            <span style="width: 100px">日期</span>
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="searchQuery.patName"
            style="width: 100%"
          ></el-date-picker>
          </div>
        </el-col>
        <el-col :span="5">
          <div class="search-item">
            <el-button size="small" @click="reset">
              <i class="el-icon-refresh"></i>
              重置</el-button
            >
            <el-button
              style="
                background-color: #367ac3;
                color: #ffffff;
                border-color: #367ac3;
              "
              size="small"
              class="btnh"
              @click="search(1)"
            >
              <i class="el-icon-search"></i>
              查询</el-button
            >
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="tool">
      <el-row>
        <el-button
          @click="addEmpType"
          class="btnh"
          style="
            background-color: #367ac3;
            color: #ffffff;
            border-color: #367ac3;
          "
          size="small"
        >
          <i class="el-icon-circle-plus-outline"></i>
          新增
        </el-button>

        <el-button @click="deleteEmpType" size="small">
          <i class="el-icon-delete"></i>
          删除
        </el-button>
      </el-row>
    </div>
    <div class="box2">
      <el-table
        class="el-table"
        :data="tableData"
        highlight-current-row
        height="300"
        ref="table"
        :header-cell-style="{ background: '#367ac3', color: 'white' }"
        style="width: 100%"
      >
        <el-table-column
          type="selection"
          width="50"
          fixed
          :reserve-selection="true"
          align="center"
        >
        </el-table-column>
        <el-table-column
          type="index"
          width="70"
          label="序号"
          fixed
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="patName"
          label="姓名"
          width="100"
          fixed
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="content"
          label="申请内容"
          width="100"
          fixed
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="time"
          label="申请时间"
          fixed
          align="center"
        >
        </el-table-column>
        <el-table-column prop="remark" label="备注说明" fixed align="center">
        </el-table-column>
        <el-table-column prop="status" label="审核状态" fixed align="center">
        </el-table-column>
        <el-table-column prop="statusly" label="审核不通过理由" fixed align="center">
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="130" align="center">
          <template>
            <el-button type="text" size="small" @click="modify">修改</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="block">
  <el-pagination
    layout="prev, pager, next"
    :total="50">
  </el-pagination>
</div>
  </div>
</template>
<script>
export default {
  components:{
  },
  data() {
    return {
      tableData: [
        {
          time: "2021-09-27 11:13:33",
          content: "复工申请",
          patName: "王小虎",
          status: "未审核",
          remark: "健康",
          statusly: "",
        },
        {
          time: "2021-10-27 11:13:33",
          content: "复工申请",
          patName: "王小虎",
          status: "通过",
          remark: "健康",
          statusly: "",
        },
        {
          time: "2021-09-27 11:13:33",
          content: "复工申请",
          patName: "王小虎",
          status: "未通过",
          remark: "健康",
          statusly: "时间错误",
        },
        {
          time: "2021-09-28 11:13:33",
          content: "复工申请",
          patName: "王小虎",
          status: "通过",
          remark: "健康",
          statusly: "",
        },
        {
          time: "2021-09-29 11:13:33",
          content: "复工申请",
          patName: "王小虎",
          status: "通过",
          remark: "健康",
          statusly: "",
        },
        
      ],
      currentRow: null,
      searchQuery: {
        patName: ""
      },
    };
  },
  methods: {
    filterTag(value, row) {
      return row.tag === value;
    },
    filterCon(value, row) {
      return row.condition === value;
    },
    reset() {
      (this.searchQuery = {
        idCard: "",
        patName: "",
        clockCon: [],
        bodyCon: [],
      }),
        (this.createDataRange = []);
      this.modifyDataRange = [];
      this.search();
    },
    addEmpType() {
      this.$router.push({ path: 'returnIndex', query: { userType: this.userType} })
    
    },
    modify(){
        this.$router.push({ path: 'returnIndex', query: { userType: this.userType,gai:1} })
    },
    deleteEmpType() {
      console.log(2);
    },
  },
};
</script>
<style scoped>
.box{
  padding: 200px 100px 0 100px;
/* color: #d6aac58c; */
}
.search {
  border-bottom: 1px solid #eeeeee;
}
.el-col {
  margin-right: 10px;
}
.search-item {
  margin: 15px 0 20px -30px;
  display: flex;
  line-height: 200%;
  color: #363636;
}
.search-item span {
  padding: 0 10px 0 0;
  display: inline-block;
  width: 90px;
  text-align: right;
}
.el-table {
  opacity: 0.8;
}
.box2 {
  background-color: #ebcfe03a !important;
}
.tool {
  padding: 10px 0;
}
.btnh :hover {
}
.block{
  padding-top: 40px;
  padding-bottom: 40px;
  text-align: center;
}
</style>