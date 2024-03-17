<script setup name="DownToTopTip"></script>
<template>
  <div class="alert alert-success down-to-top-tip animate__animated animate__bounceInUp" role="alert">
    <font-awesome-icon :icon="['fas', 'check']" /> 页面加载成功
  </div>
</template>
<style lang="scss" scoped>
.down-to-top-tip {
  min-width: 280px;
  position: fixed;
  left: 30px;
  bottom: 30px;
}
</style>
