<template>
    <div class="box">
        <ad-list></ad-list>
    </div>
</template>
<script>
import adList from './components/adList.vue'
export default {
  components: { adList },
  data(){
    return{

    }
  }
}
</script>
<style scoped>
.box{
  padding: 200px 100px 0 100px;
/* color: #d6aac58c; */
}
</style>