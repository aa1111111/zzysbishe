<template>
  <div>
    <div class="search">
      <el-row :gutter="0">
        <el-col :span="11">
          <div class="search-item">
            <span style="width: 100px">姓名</span>
            <el-input
              v-model="querySearch.userName"
              size="small"
              placeholder="请输入"
            ></el-input>
            <span style="width: 100px">日期</span>
            <el-date-picker
              type="datetime"
              placeholder="选择日期"
              v-model="querySearch.recordDate"
              value-format="yyyy-MM-dd"
              format="yyyy-MM-dd"
              style="width: 100%"
            ></el-date-picker>
          </div>
        </el-col>
        <!-- <el-col :span="6">
          <div class="search-item">
            <span style="width: 150px">打卡状态</span>
            <el-select filterable clearable size="small" v-model="status">
              <el-option key="0" label="已打卡" value="0" />
              <el-option key="1" label="未打卡" value="1" />
            </el-select>
          </div>
        </el-col> -->

        <el-col :span="6">
          <div class="search-item">
            <span>身体状态</span>
            <el-select
              filterable
              clearable
              size="small"
              v-model="querySearch.healthCondition"
            >
              <el-option key="0" label="健康" value="0" />
              <el-option key="1" label="已感染" value="1" />
            </el-select>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="tool">
      <el-row>
        <!-- <el-button
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
        </el-button> -->
        <el-col :span="12">
          <el-button
            @click="auditEmpType"
            style="
              background-color: #e2a0c9;
              color: #ffffff;
              border-color: #e2a0c9;
            "
            size="small"
          >
            <i class="el-icon-delete"></i>
            批量审核
          </el-button>
          <el-button
            @click="deleteEmpType"
            size="small"
            :disabled="this.multipleSelection.length === 0"
          >
            <i class="el-icon-delete"></i>
            删除
          </el-button>
        </el-col>
        <el-col :span="11" class="ys">
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
        </el-col>
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
        :header-cell-style="{ background: '#994a8e', color: 'white' }"
        style="width: 100%"
      >
        <el-table-column
          type="selection"
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
        <el-table-column
          prop="healthCondition"
          label="身体状况"
          width="100"
          fixed
          align="center"
          :filters="[
            { text: '健康', value: '健康' },
            { text: '已感染', value: '已感染' },
          ]"
          :filter-method="filterCon"
          filter-placement="bottom-end"
        >
          <template slot-scope="scope">
            <el-tag
              :type="scope.row.healthCondition === 0 ? 'success' : 'warning'"
              disable-transitions
              ><span v-if="scope.row.healthCondition == 0">健康</span>
              <span v-if="scope.row.healthCondition == 1">已感染</span></el-tag
            >
          </template>
        </el-table-column>

        <el-table-column fixed="right" label="操作" width="130" align="center">
          <template slot-scope="scope">
            <!-- <el-button @click="handleCheck(scope.row)" type="text" size="small"
              >查看</el-button
            > -->
            <el-button type="text" size="small" @click="handleModify(scope.row,1)"
              >修改</el-button
            >
            <el-button type="text" size="small" v-if="scope.row.status == 0" @click="handleReview(scope.row)"
              >审核</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <review-dialog ref="reviewDialog" @refresh="search(1)"></review-dialog>
      <modify-dialog ref="modifyDialog" @refresh="search(1)"></modify-dialog>
      <check-dialog ref="checkDialog" @refresh="search(1)"></check-dialog>
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
import reviewDialog from "./reviewDialog.vue";
import CheckDialog from "./checkDialog.vue";
import ModifyDialog from "./ModifyDialog.vue";
import userDailyApi from "../../../api/userDaily";
export default {
  components: {
    CheckDialog,
    ModifyDialog,
    reviewDialog,
  },
  data() {
    return {
      pageSize: 10,
      currentPage: 1,
      total: 0,
      userName: "",
      recordDate: "",
      status: "",
      querySearch:{
        userName:"",
        recordDate:"",
        healthCondition:""
      },
      healthCondition: "",
      multipleSelection: [],
      ids: [],
      tableData: [],
    };
  },
  mounted() {
    this.getRecordDtoList();
  },
  methods: {
    // handleCheck(item) {
    //   this.$refs.checkDialog.open(1, item);
    // },
    getRowKey(row) {
      return row.id;
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
      this.ids = this.multipleSelection.map((item) => {
        return item.uuid;
      });
    },
    handleModify(item,type) {
      this.$refs.modifyDialog.openH(item,type);
    },
    handleReview(item) {
      this.$refs.reviewDialog.open(1, item);
    },
    reset() {
      this.userName = "";
      this.recordDate = "";
      this.status = "";
      this.healthCondition = "";
      this.getRecordDtoList();
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
            this.getRecordDtoList();
            this.isSelected = false;
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    auditEmpType() {
      //批量审核的方法
      if (this.multipleSelection == [] || this.multipleSelection.length == 0) {
        this.$message.info("请选择要审核的数据");
        return;
      }
      this.$confirm("批量审核操作不可逆，是否继续 ?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          //参数
          userDailyApi.checkHealthyRecord(this.ids).then((response) => {
            this.$message.success("审核成功");
            this.getRecordDtoList();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消审核",
          });
        });
    },
    search() {
      this.getRecordDtoList();
    },
    getRecordDtoList() {
      userDailyApi
        .getRecordDtoList(this.currentPage, this.pageSize, this.querySearch)
        .then((response) => {
          console.log(response.data);
          if (response.code==20000) {
            this.tableData = response.data.items;
            this.currentPage = response.data.current;
            this.total = response.data.total;
            this.pageSize = response.data.size;
          } else {
            this.$message.warning("暂无打卡记录");
          }
        });
    },
    updateHealthyRecord() {},
  },
};
</script>
<style scoped>
.search {
  border-bottom: 1px solid #eeeeee;
}
.el-col {
  margin-right: 10px;
}
.search-item {
  margin: 15px 0 20px 0px;
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
.ys {
  text-align: right;
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