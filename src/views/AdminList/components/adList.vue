<template>
  <div>
    <div class="search">
      <el-row :gutter="90">
        <el-col :span="7">
          <div class="search-item">
             <span style="width: 100px">用户名</span>
            <el-input
              v-model="userName"
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
        <el-col :span="21">
          <!-- <el-button
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
          </el-button> -->
          <el-button
          @click="deleteEmpType"
          size="small"
          :disabled="this.multipleSelection.length === 0"
        >
          <i class="el-icon-delete"></i>
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
          :reserve-selection="true"
          align="center"
        >
        </el-table-column>
        <el-table-column
          type="index"
          label="序号"
          fixed
          align="center"
        >
        </el-table-column>

        <el-table-column
          prop="userName"
          label="用户名"
          fixed
          align="center"
        >
        </el-table-column>
        

        <el-table-column
          prop="phone"
          label="手机号"
          fixed
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="address"
          label="所在地"
          fixed
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="创建时间"
          fixed
          align="center"
        >
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ scope.row.createTime }}</span>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="130" align="center">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="handleModify(scope.row,1)"
              >修改</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    <modify-dialog ref="modifyDialog" @refresh="search()"></modify-dialog>
    </div>
    <div class="block">
      <el-pagination layout="prev, pager, next" 
      :current-page="currentPage"
        :page-size="pageSize"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrrentChange" > </el-pagination>
    </div>
  </div>
</template>
<script>
import ModifyDialog from './ModifyDialog.vue';
import adApi from '../../../api/ad';
export default {
    components:{
      ModifyDialog,
    },
  data() {
    return {
      currentPage:1,
      pageSize:10,
      total:0,
      userName:"",
      tableData: [
      ],
      multipleSelection: [],
      ids: [],
      currentRow: null,
    };
  },
  created(){
    this.getManagerList()
  },
  activated(){
    this.getManagerList()
  },
  methods: {
    handleModify(item,type) {
      this.$refs.modifyDialog.open(item,type);
    },
    handleCurrrentChange(val) {
      this.currentPage=val
      this.getManagerList()
    },
    handleSizeChange(val) {
      console.log(`每页${val}条`)
    },
    filterTag(value, row) {
      return row.tag === value;
    },
    filterCon(value, row) {
      return row.condition === value;
    },
    auditEmpType() {
    },
    reset() {
      this.userName=""
      this.search();
    },
    getRowKey(row) {
      return row.id;
    },
    handleSelectionChange (val) {
      this.multipleSelection = val;
      this.ids = this.multipleSelection .map((item) => {
        return item.userId
      })
    },
    addEmpType() {
      this.$refs.modifyDialog.open(1);
    },
    deleteEmpType() {
      console.log(2);
    },
    getManagerList(){
      adApi.getManagerList(this.currentPage,this.pageSize,this.userName).then(response =>{
        if(response.code===20000){
          this.tableData = response.data.items
          this.total=response.data.total
          console.log(this.tableData)
        }else{
          this.$message.warning(response.message)
        }
      })
    },
    search(){
      this.getManagerList();
    },
    deleteEmpType() {
      //批量删除的方法
      if (this.multipleSelection == [] ||
        this.multipleSelection.length == 0) {
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
          adApi.deleteManager(this.ids).then((response) => {
            this.$message.success("删除成功");
            this.getManagerList();
            this.isSelected=false
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
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