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
  <div class="markdown-html animate__animated animate__bounceIn">
    <h1 class="title">
      <img src="@/assets/blogging.png" alt="" />
      <span>{{ title }}</span>
    </h1>
    <div class="tagList">
      <a-button type="link" class="tag">#ES6</a-button>
      <a-button type="link" class="tag">#ES6</a-button>
    </div>
    <a-divider />
    <div v-html="markdownHtml" class="markdown-body"></div>
  </div>
</template>
<style lang="scss" scoped>
.markdown-html {
  width: 1100px;
  margin: auto;
  margin-top: 20px;
  min-height: calc(100% - 20px);
  border-radius: 2px;
  overflow: hidden;
  padding: 10px;
  box-sizing: border-box;
  background-color: #fff8f8;
  padding: 20px;
  .title {
    color: #9b3333;
    margin-bottom: 10px;
    font-size: 28px;
    font-weight: 600;
    word-break: break-all;
    word-wrap: break-word;
    img {
      width: 30px;
      vertical-align: middle;
      margin-right: 10px;
    }
    span {
      vertical-align: middle;
    }
  }
  .tagList {
    padding: 0 10px;
    .tag {
      padding-left: 0px;
      color: #108ee9;
    }
  }
}
</style>
