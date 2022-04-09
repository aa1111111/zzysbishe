<template>
  <div>
    <h2>全国新冠肺炎疫情实时状态</h2>
    <p>更新于当地时间：{{date}}</p>
    <el-row>
      <el-col :span="12"><p class="p1">现有确诊</p></el-col>
      <el-col :span="12"><p class="p1">累计确诊</p></el-col>
    </el-row>
    <el-row>
      <el-col :span="12"><p class="p1">累计死亡</p></el-col>
      <el-col :span="12"><p class="p1">累计治愈</p></el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  name: "MapText",
  data() {
    return {
      date:"",
      timer:null
    };
  },
  methods:{
    timeFormate(timeStamp) {
          let year = new Date(timeStamp).getFullYear();
          let month =new Date(timeStamp).getMonth() + 1 < 10? "0" + (new Date(timeStamp).getMonth() + 1): new Date(timeStamp).getMonth() + 1;
          let date =new Date(timeStamp).getDate() < 10? "0" + new Date(timeStamp).getDate(): new Date(timeStamp).getDate();
          let hh =new Date(timeStamp).getHours() < 10? "0" + new Date(timeStamp).getHours(): new Date(timeStamp).getHours();
          let mm =new Date(timeStamp).getMinutes() < 10? "0" + new Date(timeStamp).getMinutes(): new Date(timeStamp).getMinutes();
          let ss =new Date(timeStamp).getSeconds() < 10? "0" + new Date(timeStamp).getSeconds(): new Date(timeStamp).getSeconds();
          // return year + "年" + month + "月" + date +"日"+" "+hh+":"+mm ;
          this.date = year + "年" + month + "月" + date +"日"+" "+hh+":"+mm+":"+ss;
          // console.log(this.date);
    },
    setTimer() {
          if(this.timer == null) {
              this.timer = setInterval( () => {
                  // console.log('开始定时...每过一秒执行一次')
                  this.timeFormate(new Date());
              }, 1000)
          }
    }
  },
  //调用定时器
    created() {
      clearInterval(this.timer)
      this.timer = null
      this.setTimer()
  },
  destroyed: function () {
      // 每次离开当前界面时，清除定时器
      clearInterval(this.timer)
      this.timer = null
  }
};
</script>
<style scoped>
h2 {
  color: #0276a1;
  padding: 10px 0 10px 0;
}
p {
  color: #009dc0;
  padding: 15px 0px 15px 0px;
  margin-right: 10px;
  margin-bottom: 10px;
  
}
.p1{
    background-color: rgba(147, 182, 187, 0.3);
    border-radius:10px;
    text-align: center;
}

</style>