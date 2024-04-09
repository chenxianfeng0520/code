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
      <img src="@/assets/maozi.png" alt="" class="maozi" />
      <img src="@/assets/lingjie.png" alt="" class="lingjie" />
      <span>{{ title }}</span>
    </h1>
    <div class="tagList">
      <a-tag color="#6060e2">#ES6</a-tag>
      <a-tag color="#6060e2">#python</a-tag>
      <a-tag color="#6060e2">#javaScript</a-tag>
    </div>

    <div v-html="markdownHtml" class="markdown-body"></div>
  </div>
</template>
<style lang="scss" scoped>
.markdown-html {
  width: 1100px;
  margin: auto;
  margin-top: 20px;
  height: calc(100% - 40px);
  border-radius: 8px;
  overflow: hidden;
  box-sizing: border-box;
  background-color: #ffffff;
  padding: 35px 0px;

  .title {
    color: #ff2323;
    margin-bottom: 4px;
    font-size: 28px;
    font-weight: 600;
    word-break: break-all;
    word-wrap: break-word;
    padding: 0px 30px 0 80px;

    img {
      width: 36px;
      position: absolute;
      left: 28px;
      top: 52px;
    }

    .maozi {
      position: absolute;
      top: 35px;
      left: 18px;
      width: 46px;
      transform: rotate(345deg);
    }

    .lingjie {
      position: absolute;
      top: 82px;
      left: 29px;
      width: 46px;
      transform: rotate(355deg);
    }



    span {
      vertical-align: middle;
    }
  }

  .tagList {
    padding: 0 4px 20px 50px;
    border-bottom: 1px dashed #c7c7c7;
    margin: 0 30px;
    margin-bottom: 10px;
  }

  .markdown-body {
    overflow: auto;
    height: calc(100% - 100px);
    padding: 10px 0px 0 30px;
  }
}
</style>
