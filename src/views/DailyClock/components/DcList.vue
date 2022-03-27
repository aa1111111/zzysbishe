<template>
  <div>
    <div class="search">
      <el-row :gutter="0">
        <el-col :span="11">
          <div class="search-item">
            <span style="width: 100px">姓名</span>
            <el-input
              v-model="searchQuery.patName"
              size="small"
              placeholder="请输入"
            ></el-input>
            <span style="width: 100px">日期</span>
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="searchQuery.patName"
            style="width: 100%"
          ></el-date-picker>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="search-item">
            <span style="width: 150px">打卡状态</span>
            <el-select
              filterable
              clearable
              size="small"
              v-model="searchQuery.clockCon"
            >
              <el-option
                v-for="item in clockList"
                :key="item.value"
                :label="item.name"
                :value="item.value"
              />
            </el-select>
          </div>
        </el-col>

        <el-col :span="6">
          <div class="search-item">
            <span>身体状态</span>
            <el-select
              filterable
              clearable
              size="small"
              v-model="searchQuery.bodyCon"
            >
              <el-option
                v-for="item in bodyList"
                :key="item.value"
                :label="item.name"
                :value="item.value"
              />
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
              style="background-color: #e2a0c9; color: #ffffff;border-color: #e2a0c9;"
              size="small"
              class="btnh"
              @click="search(1)"
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
      :header-cell-style="{ background: '#994a8e', color: 'white' }"
      style="width: 100% "
    >
      <el-table-column
        type="selection"
        width="50"
        fixed
        :reserve-selection="true"
        align="center"
      >
      </el-table-column>
      <el-table-column type="index" width="70" label="序号" fixed align="center">
      </el-table-column>
      
      <el-table-column prop="patName" label="姓名" width="100" fixed align="center"> </el-table-column>
      <el-table-column prop="clockTime" label="打卡时间" width="190" fixed align="center">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.clockTime }}</span>
        </template>
      </el-table-column>
      
      <el-table-column prop="patAddress" label="目前所在地" fixed align="center"> </el-table-column>
       <el-table-column
        prop="tag"
        label="是否打卡"
        width="100"
        fixed align="center"
        :filters="[
          { text: '已打卡', value: '已打卡' },
          { text: '未打卡', value: '未打卡' },
        ]"
        :filter-method="filterTag"
        filter-placement="bottom-end"
      >
        <template slot-scope="scope">
          <el-tag
            :type="scope.row.tag === '已打卡' ? 'success' : 'warning'"
            disable-transitions
            >{{ scope.row.tag }}</el-tag
          >
        </template>
      </el-table-column>
      <el-table-column
        prop="condition"
        label="身体状况"
        width="100"
        fixed align="center"
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
     
      <el-table-column fixed="right" label="操作" width="130" align="center">
        <template slot-scope="scope">
          <el-button @click="handleCheck(scope.row)" type="text" size="small"
            >查看</el-button
          >
          <el-button type="text" size="small" @click="handleModify(scope.row)">修改</el-button>
          <el-button type="text" size="small" @click="handleReview(scope.row)">审核</el-button>
        </template>
      </el-table-column>
    </el-table>
    <review-dialog  ref="reviewDialog" @refresh="search(1)"></review-dialog>
    <modify-dialog ref="modifyDialog" @refresh="search(1)"></modify-dialog>
    <check-dialog ref="checkDialog" @refresh="search(1)"></check-dialog>
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
import reviewDialog from './reviewDialog.vue';
import CheckDialog from './checkDialog.vue';
import ModifyDialog from './ModifyDialog.vue';
export default {
  components:{
    CheckDialog,
    ModifyDialog,
    reviewDialog,
  },
  data() {
  return {
      tableData: [
        {
          clockTime: "2021-09-27 11:13:33",
          patTemperature:'36.5',
          patName: "王小虎",
          patAddress: "上海市普陀区金沙江路 1518 弄",
          condition:"健康",
          tag: "已打卡",
        },
        {
          clockTime: "2021-09-27 11:15:15",
          patTemperature:'35.9',
          patName: "赵小虎",
          patAddress: "上海市普陀区金沙江路 1518 弄",
          condition:"健康",
          tag: "已打卡",
        },
        {
          clockTime: "2021-09-27 11:11:28",
          patName: "钱小虎",
          patTemperature:'36.1',
          patAddress: "上海市普陀区金沙江路 1518 弄",
          condition:"健康",
          tag: "已打卡",
        },
        {
          clockTime: "2021-09-27 11:16:26",
          patName: "孙小虎",
          patTemperature:'36',
          patAddress: "上海市普陀区金沙江路 1518 弄",
          condition:"健康",
          tag: "未打卡",
        },
        {
          clockTime: "2021-09-27 11:11:25",
          patName: "李小虎",
          patTemperature:'36.8',
          patAddress: "上海市普陀区金沙江路 1518 弄",
          condition:"已感染",
          tag: "未打卡",
        },
        {
          clockTime: "2021-09-27 11:14:32",
          patName: "周小虎",
          patTemperature:'37',
          patAddress: "上海市普陀区金沙江路 1518 弄",
          condition:"健康",
          tag: "已打卡",
        },
        {
          clockTime: "2021-09-27 11:15:23",
          patName: "吴小虎",
          patTemperature:'36',
          patAddress: "上海市普陀区金沙江路 1518 弄",
          condition:"健康",
          tag: "未打卡",
        },
      ],
      currentRow: null,
      bodyList:[
        {
            value:1,name:"健康"
          },
          {
            value:0,name:"已感染"
          },
      ],
      searchQuery: {
        idCard: "",
        patName: "",
        clockCon: [],
        bodyCon: [],
      },
      clockList:[
        {
            value:1,name:"已打卡"
          },
          {
            value:0,name:"未打卡"
          },
      ]
    };
  },
  methods: {
    handleCheck(item) {
      this.$refs.checkDialog.open(1, item);
    },
    handleModify(item) {
      this.$refs.modifyDialog.open(1, item);
    },
    handleReview(item) {
      this.$refs.reviewDialog.open(1, item);
    },
    filterTag(value, row) {
      return row.tag === value;
    },
    filterCon(value, row) {
      return row.condition === value;
    },
    reset() {
      this.searchQuery= {
        idCard: "",
        patName: "",
        clockCon: [],
        bodyCon: [],
      },
      this.createDataRange = [];
      this.modifyDataRange = [];
      this.search();
    },
    addEmpType() {
      this.$refs.modifyDialog.open(1);
    },
    deleteEmpType() {
      console.log(2)
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
     margin:15px 0 20px 0px;
     display: flex;
     line-height: 200%;
     color: #363636;
   }
   .search-item span{
      padding: 0 10px 0 0;
       display: inline-block;
       width: 90px;
       text-align: right; 
  }
  .el-table{
    opacity: 0.8;
  }
  .ys{
    text-align: right;
  }
.box2{
background-color: #ebcfe03a !important;
}
  .tool{
    padding: 10px 0;
  }
.btnh :hover{
}
.block{
  padding-top: 40px;
  padding-bottom: 40px;
  text-align: center;
}
</style>