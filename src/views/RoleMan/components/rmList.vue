<template>
  <div>
    <div class="tool">
      <el-row>
        <el-col :span="21">
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
            ><i class="el-icon-delete"></i>
            删除
          </el-button>
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
        <el-table-column type="index" label="序号" fixed align="center">
        </el-table-column>

        <el-table-column prop="patName" label="角色ID" fixed align="center">
        </el-table-column>

        <el-table-column
          prop="patAddress"
          label="角色名称"
          fixed
          align="center"
        >
        </el-table-column>
        <el-table-column prop="tag" label="备注" fixed align="center">
        </el-table-column>

        <el-table-column fixed="right" label="操作" width="130" align="center">
          <template slot-scope="scope">
            <el-button
              type="text"
              size="small"
              @click="handleModify(scope.row, 1)"
              >修改</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <modify-dialog ref="modifyDialog" @refresh="search(1)"></modify-dialog>
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
import ModifyDialog from "./ModifyDialog.vue";
export default {
  components: {
    ModifyDialog,
  },
  data() {
    return {
      pageSize: 10,
      currentPage: 1,
      total: 0,
      tableData: [],
      multipleSelection: [],
      currentRow: null,
      ids: [],
    };
  },
  mounted() {
    this.getManagerList();
  },
  methods: {
    getRowKey(row) {
      return row.id;
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
      this.ids = this.multipleSelection.map((item) => {
        //删除这里需要把uuid改成别的
        return item.uuid;
      });
    },
    handleModify(item, type) {
      this.$refs.modifyDialog.open(item, type);
    },
    addEmpType() {
      this.$refs.modifyDialog.open(1);
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
    getManagerList() {
      adApi.getManagerList(this.userName).then((response) => {
        if (response.code === 20000) {
          this.tableData = response.data.manager;
        } else {
          this.$message.warning(response.message);
        }
      });
    },
    search() {
      this.getManagerList();
    },
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