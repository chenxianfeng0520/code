<script setup>
import * as monaco from "monaco-editor";
import DownToTopTip from "@/components/downToTopTip.vue";
import { addBlog, updateBlog, getBlogById } from "@/api/mysql.js";
import {
  EyeOutlined,
  FormOutlined,
  TableOutlined,
  PictureOutlined,
  SaveOutlined,
  EyeInvisibleOutlined,
} from "@ant-design/icons-vue";
import * as marked from "marked";
import "github-markdown-css/github-markdown-light.css";

import { useRoute } from "vue-router";
import { onMounted } from "vue";
const route = useRoute();
var rendererMD = new marked.Renderer();
marked.marked.setOptions({
  renderer: rendererMD,
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: false,
  smartLists: true,
  smartypants: false,
});

const markdownHtml = ref("");

const title = ref("");
const initInfo = ref(null);
async function getInfo() {
  initInfo.value = null;
  if (route.query.id) {
    const res = await getBlogById({
      id: route.query.id,
    });
    initInfo.value = res.data.data?.[0]?.content_text;
    title.value = res.data.data?.[0]?.name;
    markdownHtml.value = marked.marked(initInfo.value);
  }
}
onMounted(() => {
  getInfo();
});
</script>
<template>
  <div class="bloginfo_page">
    <div class="markdown-html animate__animated animate__bounceIn">
      <h1 class="title">
        <span>{{ title }}</span>
      </h1>
      <div class="tagList">
        <a-tag color="#9999a7cf">#ES6</a-tag>
        <a-tag color="#9999a7cf">#python</a-tag>
        <a-tag color="#9999a7cf">#javaScript</a-tag>
      </div>

      <div v-html="markdownHtml" class="markdown-body"></div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.bloginfo_page {
  height: 100vh;
  width: 100vw;
  background-color: #716b6b7a;
  padding-top: 30px;
  overflow: auto;
}
.markdown-html {
  width: 1100px;
  margin: auto;
  min-height: calc(100% - 40px);
  border-radius: 4px;
  overflow: hidden;
  box-sizing: border-box;
  background-color: #ffffff;
  padding: 15px 0px;

  .title {
    color: #330707;
    margin-bottom: 4px;
    font-size: 28px;
    font-weight: 600;
    word-break: break-all;
    word-wrap: break-word;
    padding: 0px 30px 0 20px;

    span {
      vertical-align: middle;
    }
  }

  .tagList {
    padding: 0 4px 20px 0px;
    border-bottom: 1px dashed #c7c7c7;
    margin: 0 20px;
    margin-bottom: 10px;
  }

  .markdown-body {
    height: calc(100% - 100px);
    padding: 0px 0px 0 20px;
  }
}
</style>
