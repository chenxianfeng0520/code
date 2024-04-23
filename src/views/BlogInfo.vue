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
const loading = ref(true);
async function getInfo() {
  initInfo.value = null;
  if (route.query.id) {
    loading.value = true;
    const res = await getBlogById({
      id: route.query.id,
    });
    initInfo.value = res.data.data?.[0]?.content_text;
    title.value = res.data.data?.[0]?.name;
    markdownHtml.value = marked.marked(initInfo.value);
    loading.value = false;
  }
}
onMounted(() => {
  getInfo();
});
</script>
<template>
  <div class="bloginfo_page">
    <div
      class="markdown-html animate__animated animate__bounceIn"
    >
      <h1 class="title">
        <span>{{ title }}</span>
        <a-spin v-show="loading" />
      </h1>
      <!-- <div class="tagList">
        <a-tag color="#7c7cffde">#ES6</a-tag>
        <a-tag color="#7c7cffde">#python</a-tag>
        <a-tag color="#7c7cffde">#javaScript</a-tag>
      </div> -->

      <div v-html="markdownHtml" class="markdown-body" v-show="!loading"></div>
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
  border-radius: 0px;
  overflow: hidden;
  box-sizing: border-box;
  background-color: #ffffff;
  padding: 20px 0px 30px 0px;

  .title {
    color: #69c;
    margin-bottom: 4px;
    font-size: 23px;
    font-weight: 600;
    word-break: break-all;
    word-wrap: break-word;
    padding: 4px 30px 5px 1px;
    border-bottom: 1px dashed #c7c7c7;
    width: calc(100% - 30px);
    margin: auto;
    margin-bottom: 10px;

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
    padding: 0px 20px 0 20px;
  }
}
</style>
