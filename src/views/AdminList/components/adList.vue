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
          <el-button @click="deleteEmpType" size="small">
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
          prop="patName"
          label="用户名"
          fixed
          align="center"
        >
        </el-table-column>
        

        <el-table-column
          prop="patAddress"
          label="手机号"
          fixed
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="condition"
          label="身体状况"
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
              :type="scope.row.condition === '健康' ? 'success' : 'danger'"
              disable-transitions
              >{{ scope.row.condition }}</el-tag
            >
          </template>
        </el-table-column>
        <el-table-column
          prop="clockTime"
          label="创建时间"
          fixed
          align="center"
        >
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ scope.row.clockTime }}</span>
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
      <el-pagination layout="prev, pager, next" :total="50"> </el-pagination>
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
      userName:"",
      tableData: [
      ],
      currentRow: null,
    };
  },
  created(){
    this.getManagerList()
  },
  methods: {
    handleModify(item,type) {
      this.$refs.modifyDialog.open(item,type);
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
    addEmpType() {
      this.$refs.modifyDialog.open(1);
    },
    deleteEmpType() {
      console.log(2);
    },
    getManagerList(){
      adApi.getManagerList(this.userName).then(response =>{
        if(response.code===20000){
          this.tableData = response.data.manager
        }else{
          this.$message.warning(response.message)
        }
      })
    },
    search(){
      this.getManagerList();
    }
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