<script setup>
import * as monaco from "monaco-editor";
import DownToTopTip from "@/components/downToTopTip.vue";
import { addBlog, updateBlog,getBlogById } from "@/api/mysql.js";
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

import { useRoute } from 'vue-router'
const route = useRoute()

const title = ref('')
const initInfo = ref(null)
async function getInfo() {
  initInfo.value = null;
  if (route.query.id) {
    const res = await getBlogById({
      id: route.query.id
    })
    initInfo.value = res.data.data?.[0]?.content_text;
    title.value = res.data.data?.[0]?.name;
  }
}
const value = "";
const containerRef = ref();
let editor = null;

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

onMounted(async () => {
  await getInfo()
  editor = monaco.editor.create(containerRef.value, {
    value: initInfo.value || value,
    language: "markdown",
    automaticLayout: true,
    theme: "vs-dark",
  });
  editor.onDidChangeModelContent(() => {
    markdownHtml.value = marked.marked(editor.getValue());
  });
});

const showPage = ref(true);
function hidePage() {
  showPage.value = !showPage.value;
}

const markdownHtml = ref("");

function onAddBlog() {
  if (route.query.id) {
    updateBlog({
    name: title.value,
    content_text: editor.getValue(),
    id: route.query.id
  })
  } else {
    addBlog({
    name: title.value,
    content_text: editor.getValue()
  })
  }

}


</script>
<template>
  <a-input class="title" v-model:value="title" placeholder="请输入标题" ></a-input>
  <DownToTopTip text="markdown"></DownToTopTip>
  <button type="button" class="btn btn-primary table-btn animate__animated animate__zoomInDown">
    <TableOutlined />
  </button>
  <button type="button" class="btn btn-primary pic-btn animate__animated animate__zoomInDown">
    <PictureOutlined />
  </button>
  <button type="button" class="btn btn-primary editor-btn animate__animated animate__zoomInDown" @click="hidePage">
    <EyeOutlined v-if="!showPage" />
    <EyeInvisibleOutlined v-else />
  </button>
  <button type="button" class="btn btn-success yulang animate__animated animate__zoomInDown" @click="onAddBlog">
    <SaveOutlined />
  </button>
  <div class="markdown-html animate__animated animate__bounceInUp" v-show="showPage">
    <div v-html="markdownHtml" class="markdown-body"></div>
  </div>
  <div class="monaco-editor-editor animate__animated animate__bounceInDown" :class="{ showPage: !showPage }">
    <div ref="containerRef" style="height: 100%; width: 100%"></div>
  </div>
</template>
<style lang="scss" scoped>
.monaco-editor-editor {
  width: 800px;
  height: 820px;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-left: -800px;
  margin-top: -380px;
  border-radius: 0px;
  overflow: hidden;
  padding: 10px;
  box-sizing: border-box;
  background-color: #1e1e1e;
}

.title {
  position: fixed;
  right: 320px;
  top: 20px;
  width: 700px;
  height: 38px;
}

.showPage {
  width: 1200px;
  margin-left: -600px;
}

.markdown-html {
  width: 800px;
  height: 820px;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-left: 0px;
  margin-top: -380px;
  border-radius: 0px;
  overflow: hidden;
  padding: 10px;
  box-sizing: border-box;
  background-color: #ffffff;
}

.yulang {
  position: fixed;
  right: 60px;
  top: 20px;

  span {
    vertical-align: middle;
    display: inline-block;
    margin: 0 2px;
  }
}

.editor-btn {
  position: fixed;
  right: 140px;
  top: 20px;

  span {
    vertical-align: middle;
    display: inline-block;
    margin: 0 2px;
  }
}

.pic-btn {
  position: fixed;
  right: 190px;
  top: 20px;

  span {
    vertical-align: middle;
    display: inline-block;
    margin: 0 2px;
  }
}

.table-btn {
  position: fixed;
  right: 240px;
  top: 20px;

  span {
    vertical-align: middle;
    display: inline-block;
    margin: 0 2px;
  }
}
</style>
