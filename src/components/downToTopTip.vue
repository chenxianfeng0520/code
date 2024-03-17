<script setup name="DownToTopTip">
import { CheckCircleOutlined } from "@ant-design/icons-vue";
</script>
<template>
  <Transition name="slide-fade">
    <div class="alert alert-success down-to-top-tip" role="alert">
      <CheckCircleOutlined /> 
      <span>页面加载成功</span>
    </div>
  </Transition>
</template>
<style lang="scss" scoped>
.down-to-top-tip {
  min-width: 280px;
  position: fixed;
  left: 30px;
  bottom: 30px;
  background-color: #198754;
  color: #dee2e6;
  border-radius: 12px;
  font-size: 16px;
  border: none;
  padding: 10px 20px 13px 20px;
  span {
    vertical-align: middle;
    margin-right: 5px;
  }
}
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>
