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
                background-color: #e2a0c9;
                color: #ffffff;
                border-color: #e2a0c9;
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
            background-color: #e2a0c9;
            color: #ffffff;
            border-color: #e2a0c9;
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
          prop="tag"
          label="是否打卡"
          width="100"
          fixed
          align="center"
          :filters="[
            { text: '已打卡', value: '已打卡' },
            { text: '被退回', value: '被退回' },
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
        <el-table-column prop="condition" label="退回理由" fixed align="center">
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
      pageSize: 1,
      currentPage: 10,
      total: 0,
      tableData: [
        //   {
        //     clockTime: "2021-09-27 11:13:33",
        //     patTemperature:'36.5',
        //     patName: "王小虎",
        //     patAddress: "上海市普陀区金沙江路 1518 弄",
        //     condition:"",
        //     tag: "已打卡",
        //   },
        //   {
        //     clockTime: "2021-09-27 11:15:15",
        //     patTemperature:'35.9',
        //     patName: "赵小虎",
        //     patAddress: "上海市普陀区金沙江路 1518 弄",
        //     condition:"",
        //     tag: "已打卡",
        //   },
        //   {
        //     clockTime: "2021-09-27 11:11:28",
        //     patName: "钱小虎",
        //     patTemperature:'36.1',
        //     patAddress: "上海市普陀区金沙江路 1518 弄",
        //     condition:"",
        //     tag: "已打卡",
        //   },
        //   {
        //     clockTime: "2021-09-27 11:16:26",
        //     patName: "孙小虎",
        //     patTemperature:'38',
        //     patAddress: "上海市普陀区金沙江路 1518 弄",
        //     condition:"体温错误",
        //     tag: "被退回",
        //   },
        //   {
        //     clockTime: "2021-09-27 11:11:25",
        //     patName: "李小虎",
        //     patTemperature:'36.8',
        //     patAddress: "上海市普陀区金沙江路 1518 弄",
        //     condition:"已感染",
        //     tag: "被退回",
        //   },
        //   {
        //     clockTime: "2021-09-27 11:14:32",
        //     patName: "周小虎",
        //     patTemperature:'37',
        //     patAddress: "上海市普陀区金沙江路 1518 弄",
        //     condition:"",
        //     tag: "已打卡",
        //   },
        //   {
        //     clockTime: "2021-09-27 11:15:23",
        //     patName: "吴小虎",
        //     patTemperature:'36',
        //     patAddress: "上海市普陀区金沙江路 1518 弄",
        //     condition:"时间错误",
        //     tag: "被退回",
        //   },
        // ],
        // currentRow: null,
        // bodyList:[
        //   {
        //       value:1,name:"健康"
        //     },
        //     {
        //       value:0,name:"已感染"
        //     },
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
          name: "被退回",
        },
      ],
    };
  },
  created() {
    this.getHealthyRecordList();
  },
  methods: {
    addEmpType() {
      this.$router.push({
        path: "userDailyIndex",
        query: { userType: this.userType },
      });
    },
    modify() {
      this.$router.push({
        path: "userDailyIndex",
        query: { userType: this.userType, gai: 1 },
      });
    },
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
    deleteEmpType() {
      console.log(2);
    },
    getHealthyRecordList() {
      userDailyApi
        .getHealthyRecordList(this.pageSize, this.currentPage)
        .then((response) => {
          if (response.data.map.items.length > 0) {
            console.log(response.data.map);
            console.log(response.data.map.items.length);
            this.currentPage = response.data.map.current;
            this.total = response.data.map.total;
            this.pageSize = response.data.map.size;
            this.tableData = response.data.map.items;
          } else {
            this.$message.warning("暂无打卡记录");
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