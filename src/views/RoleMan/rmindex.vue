<template>
    <div class="box">
        <rm-list></rm-list>
    </div>
</template>
<script>
import rmList from './components/rmList.vue'
export default {
  components: { rmList },
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