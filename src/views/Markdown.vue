<script setup>
import * as monaco from "monaco-editor";
import DownToTopTip from "@/components/downToTopTip.vue";
import { EyeOutlined, FormOutlined } from "@ant-design/icons-vue";
import * as marked from "marked";
import "github-markdown-css/github-markdown-light.css";

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

onMounted(() => {
  editor = monaco.editor.create(containerRef.value, {
    value,
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
</script>
<template>
  <DownToTopTip text="markdown"></DownToTopTip>
  <button type="button" class="btn btn-primary table-btn animate__animated animate__zoomInDown" >
    <span>表格</span>
  </button>
  <button type="button" class="btn btn-primary pic-btn animate__animated animate__zoomInDown">
    <span>图片</span>
  </button>
  <button type="button" class="btn btn-primary editor-btn animate__animated animate__zoomInDown" @click="hidePage">
    <span>隐藏/显示预览</span>
  </button>
  <button type="button" class="btn btn-success yulang animate__animated animate__zoomInDown">
    <span>保存</span>
  </button>
  <div
    class="markdown-html animate__animated animate__bounceInUp"
    v-show="showPage"
  >
    <div v-html="markdownHtml" class="markdown-body"></div>
  </div>
  <div
    class="monaco-editor-editor animate__animated animate__bounceInDown"
    :class="{ showPage: !showPage }"
  >
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
  right: 290px;
  top: 20px;
  span {
    vertical-align: middle;
    display: inline-block;
    margin: 0 2px;
  }
}

.table-btn {
  position: fixed;
  right: 370px;
  top: 20px;
  span {
    vertical-align: middle;
    display: inline-block;
    margin: 0 2px;
  }
}
</style>
