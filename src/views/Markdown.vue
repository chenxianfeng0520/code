<script setup>
import * as monaco from "monaco-editor";
import { addBlog, updateBlog, getBlogById } from "@/api/mysql.js";
import {
  EyeOutlined,
  SendOutlined,
  DeliveredProcedureOutlined,
  CloseCircleOutlined,
  PictureOutlined,
} from "@ant-design/icons-vue";
import { useRoute, useRouter } from "vue-router";
import { message } from "ant-design-vue";
import * as marked from "marked";
import "github-markdown-css/github-markdown-light.css";
import SelectPic from "./SelectPic.vue";

const route = useRoute();
const router = useRouter();
const title = ref("");
const initInfo = ref(null);
const publish = ref(null);
const blogInfo = ref(null);

async function getInfo() {
  initInfo.value = null;
  if (route.query.id) {
    const res = await getBlogById({
      id: route.query.id,
    });
    initInfo.value = res.data.data?.[0]?.content_text;
    title.value = res.data.data?.[0]?.name;
    publish.value = res.data.data?.[0]?.publish;
    blogInfo.value = res.data.data?.[0];
  }
}

const value = "";
const containerRef = ref();
let editor = null;

onMounted(async () => {
  await getInfo();
  editor = monaco.editor.create(containerRef.value, {
    value: initInfo.value || value,
    language: "markdown",
    automaticLayout: true,
    theme: "vs-dark",
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

async function onAddBlog() {
  if (!title.value?.length) {
    message.error("博文名称不可为空");
    return false;
  }
  if (route.query.id) {
    await updateBlog({
      name: title.value,
      content_text: editor.getValue(),
      id: route.query.id,
      publish: 1,
    });
    message.success("保存成功");
  } else {
    await addBlog({
      name: title.value,
      content_text: editor.getValue(),
      publish: 1,
    });
    router.push({
      path: "/back",
    });
    message.success("保存成功");
  }
}

async function onPublishBlog() {
  if (!title.value?.length) {
    message.error("博文名称不可为空");
    return false;
  }
  if (route.query.id) {
    await updateBlog({
      name: title.value,
      content_text: editor.getValue(),
      id: route.query.id,
      publish: 2,
    });
    message.success("发布成功");
  } else {
    await addBlog({
      name: title.value,
      content_text: editor.getValue(),
      publish: 2,
    });
    router.push({
      path: "/back",
    });
    message.success("发布成功");
  }
}

const markdownHtml = ref("");
const isPreview = ref(false);

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

async function onPreview(item) {
  markdownHtml.value = marked.marked(editor.getValue());
  isPreview.value = true;
}

const isSelectPic = ref(false);
async function close() {
  isSelectPic.value = false;
  isPreview.value = false;
}

function onSelectPic() {
  isSelectPic.value = true;
}
const coverPic = ref(null);
async function changeSelectPic(data) {
  coverPic.value = data;
}

async function onSubmitSelectPic() {
  await updateBlog({
    id: route.query.id,
    cover: coverPic.value,
  });
  message.success("封面修改成功");
  if (route.query.id) {
    blogInfo.value.cover = coverPic.value;
  }
  close();
}
</script>
<template>
  <div class="markdown_page">
    <div
      class="cover_pic animate__animated animate__zoomInDown"
      v-if="route.query.id"
      @click="onSelectPic"
    >
      <a-image
        :src="`http://139.224.72.78:9000/picturegallery/${blogInfo?.cover}`"
        v-if="blogInfo?.cover"
        :preview="false"
      >
      </a-image>
      <span v-if="!blogInfo?.cover">选择封面</span>
    </div>
    <button
      type="button"
      class="btn btn-secondary save_btn animate__animated animate__zoomInDown"
      @click="onAddBlog"
    >
      <DeliveredProcedureOutlined />
      <span>保存</span>
    </button>
    <button
      type="button"
      class="btn btn-primary p_btn animate__animated animate__zoomInDown"
      @click="onPreview()"
    >
      <EyeOutlined />
      <span>预览</span>
    </button>
    <button
      type="button"
      class="btn btn-success add_btn animate__animated animate__zoomInDown"
      @click="onPublishBlog"
    >
      <SendOutlined />
      <span>发布</span>
    </button>
    <a-input
      class="title animate__animated animate__zoomInDown"
      v-model:value="title"
      placeholder="点击输入博文标题"
    ></a-input>
    <div class="monaco-editor-editor animate__animated animate__zoomInUp">
      <div ref="containerRef" style="height: 100%; width: 100%"></div>
    </div>

    <div
      class="popups_box animate__animated animate__zoomInDown"
      v-if="isPreview"
    >
      <div class="preview_html">
        <h1 class="preview_title">
          <span class="logo">
            <a-image
              :src="`http://139.224.72.78:9000/picturegallery/${blogInfo?.cover}`"
              :preview="false"
              v-show="!loading"
            />
          </span>
          <span>{{ title }}</span>
        </h1>
        <div class="preview_body" v-html="markdownHtml"></div>
      </div>
    </div>
    <div
      class="popups_box animate__animated animate__zoomInDown"
      v-if="isSelectPic"
    >
      <SelectPic @change="changeSelectPic"></SelectPic>
    </div>
    <CloseCircleOutlined
      v-if="isPreview || isSelectPic"
      class="close animate__animated animate__backInLeft"
      @click="close"
    />
    <button
      type="button"
      class="btn btn-success submit animate__animated animate__backInLeft"
      @click="onSubmitSelectPic"
      v-if="isSelectPic && coverPic"
    >
      <span>确定</span>
    </button>
  </div>
</template>
<style lang="scss" scoped>
.close {
  position: fixed;
  left: 80px;
  top: 22px;
  font-size: 30px;
  color: #fff;
  cursor: pointer;
}
.submit {
  position: fixed;
  left: 130px;
  top: 18px;
  color: #fff;
  cursor: pointer;
}
.popups_box {
  position: fixed;
  left: 0px;
  top: 0px;
  height: 100vh;
  width: 100vw;
  background-color: #201b1be0;
  padding-top: 30px;
  overflow: auto;
  .preview_html {
    width: 1100px;
    margin: auto;
    border-radius: 0px;
    overflow: hidden;
    box-sizing: border-box;
    background-color: #ffffff;
    padding: 20px 0px 30px 0px;

    .preview_title {
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

      .logo {
        width: 30px;
        height: 30px;
        display: inline-block;
        :deep(.ant-image) {
          vertical-align: middle;
        }
      }
    }

    .preview_body {
      height: calc(100% - 100px);
      padding: 0px 20px 0 20px;
    }
  }
}
.markdown_page {
  height: 100vh;
  width: 100vw;
  background-color: #4d4a4a66;
}
.monaco-editor-editor {
  width: 1200px;
  height: 840px;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-left: -600px;
  margin-top: -390px;
  border-radius: 8px;
  overflow: hidden;
  padding: 12px 4px;
  box-sizing: border-box;
  background-color: #1e1e1ee8;
}

.title {
  position: absolute;
  top: 14px;
  left: 50%;
  margin-left: -600px;
  width: 1200px;
  height: 46px;
  border-radius: 0px;
  font-size: 20px;
  color: #fff;
  padding: 5px 16px;
  background-color: transparent;
  border: none;
  box-shadow: none;
  border-bottom: 2px solid transparent;
  &:focus {
    outline: none;
    border-bottom: 2px solid #e47f2cc7;
  }
  &::placeholder {
    opacity: 0.5;
    color: rgb(182, 135, 135);
  }
}

.add_btn {
  position: fixed;
  left: 20px;
  bottom: 20px;

  span {
    vertical-align: middle;
    display: inline-block;
    margin: 0 2px;
  }
}

.p_btn {
  position: fixed;
  left: 20px;
  bottom: 70px;

  span {
    vertical-align: middle;
    display: inline-block;
    margin: 0 2px;
  }
}

.save_btn {
  position: fixed;
  left: 20px;
  bottom: 120px;

  span {
    vertical-align: middle;
    display: inline-block;
    margin: 0 2px;
  }
}

.cover_pic {
  position: fixed;
  left: 20px;
  bottom: 170px;

  width: 70px;
  height: auto;
  height: 70px;
  background-color: #49494954;
  border: 1px solid #635656a1;
  border-radius: 50%;
  padding: 4px;

  cursor: pointer;
  span {
    font-size: 14px;
    color: #c0a5a5a1;
    display: block;
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
