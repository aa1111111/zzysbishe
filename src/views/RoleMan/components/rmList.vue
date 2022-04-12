<template>
  <div>
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
          label="角色ID"
          fixed
          align="center"
        >
        </el-table-column>
        

        <el-table-column
          prop="patAddress"
          label="角色名称"
          fixed
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="tag"
          label="备注"
          fixed
          align="center"
        >
        </el-table-column>
        
        
        <el-table-column fixed="right" label="操作" width="130" align="center">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="handleModify(scope.row,1)"
              >修改</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    <modify-dialog ref="modifyDialog" @refresh="search(1)"></modify-dialog>
    </div>
    <div class="block">
      <el-pagination layout="prev, pager, next" :total="50"> </el-pagination>
    </div>
  </div>
</template>
<script>
import ModifyDialog from './ModifyDialog.vue';
export default {
    components:{
      ModifyDialog,
    },
  data() {
    return {
      tableData: [
        {
          clockTime: "2021-09-27 11:13:33",
          patTemperature: "36.5",
          patName: "王小虎",
          patAddress: "上海市普陀区金沙江路 1518 弄",
          condition: "健康",
          tag: "已打卡",
        },
        {
          clockTime: "2021-09-27 11:15:15",
          patTemperature: "35.9",
          patName: "赵小虎",
          patAddress: "上海市普陀区金沙江路 1518 弄",
          condition: "健康",
          tag: "已打卡",
        },
        {
          clockTime: "2021-09-27 11:11:28",
          patName: "钱小虎",
          patTemperature: "36.1",
          patAddress: "上海市普陀区金沙江路 1518 弄",
          condition: "健康",
          tag: "已打卡",
        },
        {
          clockTime: "2021-09-27 11:16:26",
          patName: "孙小虎",
          patTemperature: "36",
          patAddress: "上海市普陀区金沙江路 1518 弄",
          condition: "健康",
          tag: "未打卡",
        },
        {
          clockTime: "2021-09-27 11:11:25",
          patName: "李小虎",
          patTemperature: "36.8",
          patAddress: "上海市普陀区金沙江路 1518 弄",
          condition: "已感染",
          tag: "未打卡",
        },
        {
          clockTime: "2021-09-27 11:14:32",
          patName: "周小虎",
          patTemperature: "37",
          patAddress: "上海市普陀区金沙江路 1518 弄",
          condition: "健康",
          tag: "已打卡",
        },
        {
          clockTime: "2021-09-27 11:15:23",
          patName: "吴小虎",
          patTemperature: "36",
          patAddress: "上海市普陀区金沙江路 1518 弄",
          condition: "健康",
          tag: "未打卡",
        },
      ],
      currentRow: null,
      bodyList: [
        {
          value: 1,
          name: "健康",
        },
        {
          value: 0,
          name: "已感染",
        },
      ],
      searchQuery: {
        idCard: "",
        patName: "",
        clockCon: [],
        bodyCon: [],
      },
      clockList: [
        {
          value: 1,
          name: "已打卡",
        },
        {
          value: 0,
          name: "未打卡",
        },
      ],
    };
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
      this.$refs.modifyDialog.open(1);
    },
    deleteEmpType() {
      console.log(2);
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