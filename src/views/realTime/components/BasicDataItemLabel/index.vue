<template>
  <div class="basic-data-item">
    <div class="basic-data-item-title">{{label}}
      <i v-if="inCrValue > 0" class="el-icon-caret-top" style="color: #60FE5E;"></i>
      <i v-else class="el-icon-caret-bottom" style="color: #F44182;"></i>
      <span :class="[ inCrValue > 0 ? valueUpClass: valueDownClass, valueClass]">
        {{ inCrValue }}
      </span>
    </div>
    <div class="basic-data-item-value">
      <dv-digital-flop
        :config="config"
        style="width: 60px; height: 30px"
      />
    </div>
  </div>
</template>
<script>
export default {
  props: {
    label: String,
    config: Object,
    inCrValue: Number
  },
  data() {
    return {
      valueUpClass: 'incremento-up-value',
      valueDownClass: 'incremento-down-value',
      valueClass: 'basic-data-item-incremento-value'
    }
  }
}
</script>
<style scoped>
.basic-data-item {
  background: #84317fea;
  margin: 0 5px 5px 5px;
  padding: 10px 10px 10px 10px;
  border-radius: 5px;
}
.incremento-up-value {
  color: #60FE5E;
}
.incremento-down-value {
  color: #F44182;
}
.basic-data-item-title {
  color: #d3d0d0;
  font-size: 14px;
  padding-bottom: 0px;
}
.basic-data-item-value {
  color: #fff;
  font-size: 40px;
  font-weight: bolder;
}
</style>