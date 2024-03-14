<script setup>
import { useRouter } from "vue-router";
// import DownToTopTip from "@/components/downToTopTip.vue"
const router = useRouter();
function toLottery() {
  console.log(111111111111);
  router.push({
    path: "/lottery",
  });
}
</script>
<template>
  <!-- <h1>11111</h1> -->
  <!-- <div class="main">
    <a-button type="primary">弹窗</a-button>
  </div> -->
  <!-- <DownToTopTip></DownToTopTip> -->
  <div class="main-page">
    <a-card :bordered="false" class="experiment" @click="toLottery">
      <span>生成随机数</span>
    </a-card>
    <a-card :bordered="false">
      <span>Card content</span>
    </a-card>
    <a-card :bordered="false">
      <span>Card content</span>
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
      padding: 32px 34px 34px 70px;
    }
    &:hover {
      opacity: 0.9;
    }
  }
  .experiment {
    background: 70% 45% / 15% 60% no-repeat url(@/assets/experiment.png),
      #ffffff;
  }
}
</style>
