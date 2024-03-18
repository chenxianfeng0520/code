<script setup>
import { useRouter } from "vue-router";
import DownToTopTip from "@/components/downToTopTip.vue";
const router = useRouter();
function toPage(pagekey) {
  if (pagekey == 1) {
    router.push({
      path: "/lottery",
    });
  }
  if (pagekey == 2) {
    router.push({
      path: "/Dockerfile",
    });
  }
  if (pagekey == 3) {
    router.push({
      path: "/MonacoEditor",
    });
  }
}
</script>
<template>
  <DownToTopTip></DownToTopTip>
  <div class="main-page">
    <a-card
      :bordered="false"
      class="experiment animate__animated animate__bounceIn"
      @click="toPage(1)"
    >
      <span>调用pyhon接口生成随机数</span>
    </a-card>
    <a-card
      :bordered="false"
      class="Docker animate__animated animate__bounceIn"
      @click="toPage(2)"
    >
      <span>基于vue-codemirror生成Dockerfile编辑器</span>
    </a-card>
    <a-card
      :bordered="false"
      class="Docker animate__animated animate__bounceIn"
      @click="toPage(3)"
    >
      <span>基于monaco-editor生成Dockerfile编辑器</span>
    </a-card>
  </div>
</template>

<style lang="scss" scoped>
.main-page {
  padding: 40px;
  display: grid;
  grid-template-columns: repeat(auto-fill, calc(25% - 25px));
  grid-column-gap: 50px;
  cursor: pointer;
  .ant-card {
    font-size: 16px;
    line-height: 22px;
    color: #294d95;
    border-radius: 20px;
    height: 110px;
    :deep(.ant-card-body) {
      padding: 30px 15px 0 90px;
    }
  }
  .experiment {
    background: 15px 25px / 60px 60px no-repeat url(@/assets/experiment.png),
      #ffffff;
  }
  .Docker {
    background: 15px 25px / 60px 60px no-repeat url(@/assets/Docker.png),
      #ffffff;
  }
}
</style>
