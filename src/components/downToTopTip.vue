<script setup name="DownToTopTip">
import { CheckCircleOutlined } from "@ant-design/icons-vue";
</script>
<template>
  <div class="alert alert-success down-to-top-tip animate__animated animate__bounceInUp" role="alert">
    <CheckCircleOutlined /> 
    <span>页面加载成功</span>
  </div>
</template>
<style lang="scss" scoped>
.down-to-top-tip {
  min-width: 280px;
  position: fixed;
  left: 30px;
  bottom: 30px;
  background-color: #45d995;
  color: #000;
  border-radius: 14px;
  font-size: 18px;
  span {
    vertical-align: middle;
    margin-right: 5px;
  }
}
</style>
