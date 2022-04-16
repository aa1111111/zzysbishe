<template>
  <div class="box">
    <div class="fl">
      <el-link href="https://element.eleme.io" target="_blank">全部</el-link>
      <el-link type="info">通知公告</el-link>
      <el-link href="https://element.eleme.io" target="_blank"
        >新闻时事</el-link
      >
    </div>
    <div
      class="cardList"
      v-for="(item, index) in assessList"
      :data="
        assessList.slice((currentPage - 1) * pagesize, currentPage * pagesize)
      "
      :key="index"
    >
      <el-row :gutter="20" class="card">
        <el-col :span="4"
          ><div class="tp">
            <img src="../../assets/public_images/laba.jpg" alt="" /></div
        ></el-col>
        <el-col :span="20"
          >
          <el-link href="https://k.sina.com.cn/article_7517400647_1c0126e4705901sn5n.html" target="_blank">
          <div class="title">【通知公告】{{ item.announcementTitle }}</div></el-link>
          
          <div class="nr">{{item.releaseTime}}</div>
          <div class="nr">{{ item.announcementContent }}</div></el-col
        >
      </el-row>
      <el-divider></el-divider>
    </div>
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="5"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>
  </div>
</template>
<script>
import noticeApi from '../../api/noticeList';
export default {
  data() {
    return {
      currentPage: 1, //初始页
      pagesize: 5, //    每页的数据
      assessList: [
      ],
      total:0,
      userType: null,
    };
  },
   methods: {
    // 初始页currentPage、初始每页数据数pagesize和数据data
    handleSizeChange: function(size) {
      this.pagesize = size; //当前显示页数
      console.log(this.pagesize); //每页下拉显示数据
    },
    handleCurrentChange: function(currentPage) {
      this.currentPage = currentPage; //第几页
      console.log(this.currentPage); //点击第几页
    },
    getAnnouncementList(){
      noticeApi.getAnnouncementList(this.currentPage,this.pagesize).then(response =>{
        if(response.code === 20000){
          this.assessList = response.data.items
          this.total = response.data.total
          console.log("total="+this.total);
        }else{
          this.$message.warning(response.message)
          this.$router.push({path:"login"})
        }
      })
    }
  },
  created(){
    this.getAnnouncementList();
    console.log("11111")
  },
  mounted() {
    this.userType = this.$route.query.userType;
  },
};
</script>
<style scoped>
.box {
  padding: 200px 100px 0 100px;
  /* color: #d6aac58c; */
}
.fl {
  padding-top: 20px;
  text-align: left;
  margin: 0 auto;
  width: 70%;
}
.cardList {
  /* padding-top: 20px; */
  text-align: left;
  margin: 0 auto;
  width: 70%;
}
img {
  width: 90px;
  height: 90px;
}
.title {
  padding-top: 10px;
}
.card {
  padding-top: 20px;
}
.nr {
  padding-top: 12px;
  font-size: 12px;
  color: dimgrey;
  display: -webkit-box;
  /* -webkit-box-orient: vertical; */
  /*! autoprefixer: off */
  -webkit-box-orient: vertical;
  /* autoprefixer: on */
  -webkit-line-clamp: 2;
  overflow: hidden;
}
.block {
  padding-top: 50px;
  padding-bottom: 50px;
  text-align: center;
}
</style>