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

import { useRoute, useRouter } from "vue-router";

import { message } from "ant-design-vue";

const route = useRoute();
const router = useRouter();
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
  await getInfo();
  editor = monaco.editor.create(containerRef.value, {
    value: initInfo.value || value,
    language: "markdown",
    automaticLayout: true,
    theme: "vs-dark",
  });
  markdownHtml.value = marked.marked(initInfo.value || value);
  editor.onDidChangeModelContent(() => {
    markdownHtml.value = marked.marked(editor.getValue());
  });
  window.addEventListener("keydown", handleKeyDown);
});

onUnmounted(() => {
  // 组件卸载时移除键盘事件监听
  window.removeEventListener("keydown", handleKeyDown);
});

function handleKeyDown(event) {
  console.log(event);
  if (event.ctrlKey & (event.keyCode == 83)) {
    console.log("按下了CTRL+S");
    onAddBlog();
    event.preventDefault();
  }
}

const showPage = ref(true);
function hidePage() {
  showPage.value = !showPage.value;
}

const markdownHtml = ref("");

function onAddBlog() {
  if (!title.value?.length) {
    message.error("名称不可为空");
    return false;
  }
  if (route.query.id) {
    updateBlog({
      name: title.value,
      content_text: editor.getValue(),
      id: route.query.id,
    });
    message.success("博客修改成功");
  } else {
    addBlog({
      name: title.value,
      content_text: editor.getValue(),
    });
    router.push({
      path: "/back",
    });
    message.success("博客新增成功");
  }
}
</script>
<template>
  <a-input class="title" v-model:value="title" placeholder="请输入标题"></a-input>
  <!-- <DownToTopTip text="markdown"></DownToTopTip> -->
  <!-- <button type="button" class="btn btn-primary table-btn animate__animated animate__zoomInDown">
    <TableOutlined />
  </button>
  <button type="button" class="btn btn-primary pic-btn animate__animated animate__zoomInDown">
    <PictureOutlined />
  </button> -->
  <button type="button" class="btn btn-primary editor-btn animate__animated animate__zoomInDown" @click="hidePage">
    <template v-if="!showPage">
      <EyeOutlined />
      <span>显示预览框</span>
    </template>

    <template v-else>
      <EyeInvisibleOutlined />
      <span>隐藏预览框</span>
    </template>
  </button>
  <button type="button" class="btn btn-success yulang animate__animated animate__zoomInDown" @click="onAddBlog">
    <SaveOutlined />
    <span>保存</span>
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
  height: 840px;
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
  right: 310px;
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
  height: 840px;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-left: 0px;
  margin-top: -380px;
  border-radius: 0px;
  overflow: auto;
  padding: 10px;
  box-sizing: border-box;
  background-color: #ffffff;
}

.yulang {
  position: fixed;
  right: 190px;
  top: 20px;

  span {
    vertical-align: middle;
    display: inline-block;
    margin: 0 2px;
  }
}

.editor-btn {
  position: fixed;
  right: 50px;
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
