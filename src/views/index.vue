<script setup>
import { useRouter } from "vue-router";
import DownToTopTip from "@/components/downToTopTip.vue"
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
      class="Monaco animate__animated animate__bounceIn"
      @click="toPage(3)"
    >
      <span>基于monaco-editor生成Dockerfile编辑器</span>
    </a-card>
  </div>
</template>

<style lang="scss" scoped>
.main-page {
  padding: 120px;
  display: grid;
  grid-template-columns: repeat(auto-fill, calc(20% - 25px));
  grid-column-gap: 50px;
  cursor: pointer;
  .ant-card {
    font-size: 16px;
    line-height: 22px;
    color: #4678dd;
    border-radius: 16px;
    height: 90px;
    &:hover{
      text-decoration: underline;
    }
    :deep(.ant-card-body) {
      padding: 20px 15px 0 100px;
    }
  }
  .experiment {
    background: 0px 10px / 110px 110px no-repeat url(@/assets/chouqian.png),
      #ffffff;
  }
  .Docker {
    background: 20px 15px / 60px 60px no-repeat url(@/assets/Docker.png),
      #ffffff;
  }
  .Monaco {
    background: 20px 15px / 60px 60px no-repeat url(@/assets/experiment.png),
      #ffffff;
  }
}
</style>
