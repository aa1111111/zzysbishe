<template>
  <div>
    <div class="search">
      <el-row :gutter="90">
        <el-col :span="6">
          <div class="search-item">
            <span style="width: 100px">标题</span>
            <el-input
              v-model="searchQuery.patName"
              size="small"
              placeholder="请输入"
            ></el-input>
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
          @click="addEmpType(1)"
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
          prop="patName"
          label="发布人"
          width="100"
          fixed
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="tel"
          label="公告标题"
          width="100"
          fixed
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="patAddress"
          label="公告内容"
          fixed
          align="center"
        >
        </el-table-column>
        <el-table-column prop="remark" label="发布时间" fixed align="center">
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="130" align="center">
          <template slot-scope="scope">
            <!-- <el-button @click="handleCheck(scope.row)" type="text" size="small"
              >查看</el-button
            > -->
            <el-button type="text" size="small" @click="handleModify(scope.row)"
              >编辑</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <check-dialog ref="checkDialog" @refresh="search(1)"></check-dialog>
      <modify-dialog ref="modifyDialog" @refresh="search(1)"></modify-dialog>
      <add-dialog ref="addDialog" @refresh="search(1)"></add-dialog>
    </div>
    <div class="block">
      <el-pagination
        layout="prev, pager, next"
        :current-page="currentPage"
        :page-size="pageSize"
        :total="total"
        @current-change="handleCurrrentChange" 
      >
      </el-pagination>
    </div>
  </div>
</template>
<script>
import AddDialog from "./addDialog.vue";
import CheckDialog from "./checkDialog.vue";
import ModifyDialog from "./ModifyDialog.vue";
import returnWorkApi from "../../../api/returnWork";
export default {
  components: { CheckDialog, ModifyDialog, AddDialog },
  data() {
    return {
      pageSize: 10,
      currentPage: 1,
      total: 0,
      tableData: [
        {
          clockTime: "2021-09-27 11:13:33",
          tel: "13435442668",
          patName: "王小虎",
          patAddress: "上海市普陀区金沙江路 1518 弄",
          remark: "健康",
        },
        {
          clockTime: "2021-09-27 11:13:33",
          tel: "562232333",
          patName: "王小虎2",
          patAddress: "上海市普陀区金沙江路 1518 弄",
          remark: "健康",
        },
        {
          clockTime: "2021-09-27 11:13:33",
          tel: "12223465",
          patName: "王小虎3",
          patAddress: "上海市普陀区金沙江路 1518 弄",
          remark: "健康",
        },
        {
          clockTime: "2021-09-27 11:13:33",
          tel: "1234567676",
          patName: "王小虎4",
          patAddress: "上海市普陀区金沙江路 1518 弄",
          remark: "健康",
        },
      ],
      currentRow: null,
      searchQuery: {
        patName: "",
      },
      multipleSelection: [],
      ids: [],
    };
  },
  created(){
    this.getWorkApplicationList();
  },
  methods: {
    handleCurrrentChange(val) {
      this.currentPage=val
      this.getWorkApplicationList()
    },
    // handleCheck(item) {
    //   this.$refs.checkDialog.open(1, item);
    // },
    getRowKey(row) {
      return row.id;
    },
    handleModify(item) {
      this.$refs.modifyDialog.open(item);
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
      this.ids = this.multipleSelection.map((item) => {
        return item.uuid;
      });
    },
    reset() {
      this.searchQuery = {
        patName: "",
      }
      this.search();
    },
    addEmpType(type) {
      this.$refs.modifyDialog.openA(type);
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
          returnWorkApi.deleteReturnApplication(this.ids).then((response) => {
            this.$message.success("删除成功");
            this.getWorkApplicationList();
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
      this.getWorkApplicationList();
    },
    // getWorkApplicationList() {
    //   returnWorkApi
    //     .getWorkApplicationList(this.currentPage, this.pageSize, this.applyDate,this.userName)
    //     .then((response) => {
    //       console.log(response.data);
    //       if (response.code==20000) {
    //         this.tableData = response.data.items;
    //         this.currentPage = response.data.current;
    //         this.total = response.data.total;
    //         this.pageSize = response.data.size;
    //       } else {
    //         this.tableData = [];
    //         this.$message.warning(response.message);
    //         // this.$router.push({ path: "login" });
    //       }
    //     });
    // },
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