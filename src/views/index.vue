<script setup>
import { useRouter } from "vue-router";
// import DownToTopTip from "@/components/downToTopTip.vue"
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
}
</script>
<template>
  <!-- <h1>11111</h1> -->
  <!-- <div class="main">
    <a-button type="primary">弹窗</a-button>
  </div> -->
  <!-- <DownToTopTip></DownToTopTip> -->
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
  </div>
</template>

<style lang="scss" scoped>
.main-page {
  padding: 40px;
  display: grid;
  grid-template-columns: repeat(auto-fill, calc(20% - 20px));
  grid-column-gap: 40px;
  cursor: pointer;
  .ant-card {
    font-size: 16px;
    line-height: 20px;
    color: #3a6cd0;
    :deep(.ant-card-body) {
      padding: 32px 14px 34px 72px;
    }
    &:hover {
      opacity: 0.9;
    }
  }
  .experiment {
    background: 12px 28px / 50px 50px no-repeat url(@/assets/experiment.png),
      #ffffff;
  }
  .Docker {
    background: 12px 28px / 50px 50px no-repeat url(@/assets/Docker.png),
      #ffffff;
  }
}
</style>
