<script setup>
import { useRouter } from "vue-router";
import DownToTopTip from "@/components/downToTopTip.vue";
import { PlusOutlined } from "@ant-design/icons-vue";

const router = useRouter();
function toPage(pagekey) {
  if (pagekey == 1) {
    window.open("http://60.204.208.146/#/lottery", "_self");
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
  if (pagekey == 4) {
    router.push({
      path: "/Markdown",
    });
  }
  if (pagekey == 5) {
    window.open("http://60.204.208.146/#/lotteryOld", "_self");
  }
  if (pagekey == 6) {
    router.push({
      path: "/Minio",
    });
  }
}
</script>
<template>
  <DownToTopTip text="欢迎！"></DownToTopTip>
  <div class="main-page">
    <a-card
      :bordered="false"
      class="blog animate__animated animate__bounceIn"
      @click="toPage(4)"
    >
      <PlusOutlined />
    </a-card>
    <a-card
      :bordered="false"
      class="experiment animate__animated animate__bounceIn"
      @click="toPage(1)"
    >
      <span>生成随机数</span>
    </a-card>
    <a-card
      :bordered="false"
      class="suiji animate__animated animate__bounceIn"
      @click="toPage(5)"
    >
      <span>生成随机数（旧）</span>
    </a-card>
    <a-card
      :bordered="false"
      class="Docker animate__animated animate__bounceIn"
      @click="toPage(2)"
    >
      <span>vue-codemirror</span>
    </a-card>
    <a-card
      :bordered="false"
      class="Monaco animate__animated animate__bounceIn"
      @click="toPage(3)"
    >
      <span>monaco-editor</span>
    </a-card>
    <a-card
      :bordered="false"
      class="minio animate__animated animate__bounceIn"
      @click="toPage(6)"
    >
      <span>minio中文件</span>
    </a-card>
    <a-card :bordered="false" class="excel animate__animated animate__bounceIn">
      <span>在线编辑excel文件</span>
    </a-card>
  </div>
</template>

<style lang="scss" scoped>
.main-page {
  padding: 120px 160px;
  display: grid;
  grid-template-columns: repeat(auto-fill, calc(25% - 70px));
  grid-column-gap: 70px;
  cursor: pointer;
  .ant-card {
    font-size: 16px;
    line-height: 22px;
    color: #cedeff;
    border-radius: 25px;
    height: 90px;
    font-family: sans-serif;
    margin-bottom: 60px;
    &:hover {
      text-decoration: underline;
    }
    :deep(.ant-card-body) {
      padding: 20px 15px 0 100px;
    }
  }
  .experiment {
    background: 0px 10px / 110px 110px no-repeat url(@/assets/chouqian.png),
      #ffffff1a;
  }
  .suiji {
    background: 0px 10px / 110px 110px no-repeat url(@/assets/suiji.png),
      #ffffff1a;
  }
  .Docker {
    background: 10px 15px / 90px 90px no-repeat url(@/assets/Docker.png),
      #ffffff1a;
  }
  .Monaco {
    background: 0px 25px / 90px 90px no-repeat url(@/assets/experiment.png),
      #ffffff1a;
  }
  .markdown {
    background: 0px 25px / 100px 70px no-repeat url(@/assets/markdown.png),
      #ffffff1a;
  }
  .blog {
    background: 10px 15px / 90px 90px no-repeat url(@/assets/blog.png),
      #ffffff1a;
    font-size: 36px;
    line-height: 32px;
    padding-left: 46px;
    font-weight: 600;
  }
  .minio {
    background: 0px 25px / 90px 90px no-repeat url(@/assets/minio.png),
      #ffffff1a;
  }
  .excel {
    background: 0px 25px / 70px 70px no-repeat url(@/assets/excel.png),
    #363030ad;
  }
}
</style>
