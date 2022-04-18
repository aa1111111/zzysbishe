<template>
  <div class="box">
    <div class="search">
      <el-row :gutter="90">
        <el-col :span="6">
          <div class="search-item">
            <span style="width: 100px">日期</span>
            <el-date-picker
              type="datetime"
              placeholder="选择日期"
              v-model="recordDate"
              value-format="yyyy-MM-dd"
              format="yyyy-MM-dd"
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
                background-color: #e2a0c9;
                color: #ffffff;
                border-color: #e2a0c9;
              "
              size="small"
              class="btnh"
              @click="search()"
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
            background-color: #e2a0c9;
            color: #ffffff;
            border-color: #e2a0c9;
          "
          size="small"
        >
          <i class="el-icon-circle-plus-outline"></i>
          新增
        </el-button>

        <el-button
          @click="deleteEmpType"
          size="small"
          :disabled="this.multipleSelection.length === 0"
        >
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
        :row-key="getRowKey"
        @selection-change="handleSelectionChange"
        :header-cell-style="{ background: '#994a8e', color: 'white' }"
        style="width: 100%"
      >
        <el-table-column
          type="selection"
          label="序号"
          width="50"
          fixed
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
          prop="userName"
          label="姓名"
          width="100"
          fixed
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="recordTime"
          label="打卡时间"
          width="190"
          fixed
          align="center"
        >
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ scope.row.recordTime }}</span>
          </template>
        </el-table-column>

        <el-table-column
          prop="currentLocation"
          label="目前所在地"
          fixed
          align="center"
        >
        </el-table-column>
        <el-table-column
          label="是否打卡"
          width="100"
          fixed
          align="center"
        >
          <template slot-scope="scope">
            <el-tag
              :type="scope.row.status === 0 ? 'success' : 'warning'"
              disable-transitions
              ><span v-if="scope.row.status == 0">已打卡</span>
              <span v-if="scope.row.status == 1">被退回</span></el-tag
            >
          </template>
        </el-table-column>
        <el-table-column prop="msgBack" label="退回理由" fixed align="center">
        </el-table-column>

        <el-table-column fixed="right" label="操作" width="130" align="center">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="modify(scope.row.uuid)"
              >修改</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="block">
      <el-pagination
        layout="prev, pager, next"
        :current-page="currentPage"
        :page-size="pageSize"
        :total="total"
      >
      </el-pagination>
    </div>
  </div>
</template>
<script>
import userDailyApi from "../../api/userDaily";
export default {
  data() {
    return {
      pageSize: 10,
      currentPage: 1,
      total: 0,
      recordDate: "",
      multipleSelection: [],
      tableData: [],
      ids: [],
    };
  },
  created() {
    this.getHealthyRecordList();
  },
  activated() {
    this.getHealthyRecordList();
  },
  methods: {
    addEmpType() {
      //需要判断当天是否已经打卡
      userDailyApi.getRecentRecord().then((response) => {
        this.$router.push({
          path: "userDailyIndex",
          query: { record: response.data.healthyRecord },
        });
      });
    },
    getRowKey(row) {
      return row.id;
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
      this.ids = this.multipleSelection.map((item) => {
        return item.uuid;
      });
    },
    modify(uuid) {
      this.$router.push({
        path: "userDailyIndex",
        query: { recordId: uuid, gai: 1 },
      });
    },
    reset() {
      (this.recordDate = ""), this.getHealthyRecordList();
    },
    deleteEmpType() {
      //批量删除的方法
      if (this.multipleSelection == [] || this.multipleSelection.length == 0) {
        this.$message.info("请选择要删除的数据");
        return;
      }
      this.$confirm("删除操作不可逆，是否继续 ?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          //参数
          userDailyApi.deleteHealthyRecord(this.ids).then((response) => {
            this.$message.success("删除成功");
            this.getHealthyRecordList();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    search() {
      this.getHealthyRecordList();
    },
    getHealthyRecordList() {
      userDailyApi
        .getHealthyRecordList(this.currentPage, this.pageSize, this.recordDate)
        .then((response) => {
          console.log(response.data);
          if (response.code==20000) {
            this.tableData = response.data.items;
            this.currentPage = response.data.current;
            this.total = response.data.total;
            this.pageSize = response.data.size;
          } else {
            this.tableData = [];
            this.$message.warning(response.message);
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
.block {
  padding-top: 40px;
  padding-bottom: 40px;
  text-align: center;
}
</style>