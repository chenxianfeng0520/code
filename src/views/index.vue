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
  if (pagekey == 4) {
    router.push({
      path: "/Markdown",
    });
  }
  if (pagekey == 5) {
    router.push({
      path: "/MonacoEditor",
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
      <span>我的博客</span>
    </a-card>
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
    <a-card
      :bordered="false"
      class="markdown animate__animated animate__bounceIn"
      @click="toPage(4)"
    >
      <span>markdown语法编辑器和预览</span>
    </a-card>

  </div>
</template>

<style lang="scss" scoped>
.main-page {
  padding: 120px 180px;
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
    &:hover{
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
  }
}
</style>
