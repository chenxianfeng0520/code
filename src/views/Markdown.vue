<script setup>
import * as monaco from "monaco-editor";
import { addBlog, updateBlog, getBlogById } from "@/api/mysql.js";
import { EyeOutlined, SendOutlined,SaveOutlined } from "@ant-design/icons-vue";
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
      publish: 1
    });
    message.success("保存成功");
  } else {
    await addBlog({
      name: title.value,
      content_text: editor.getValue(),
      publish: 1
    });
    router.push({
      path: "/back",
    });
    message.success("保存成功");
  }
}

async function onPublishBlog(){
  if (!title.value?.length) {
    message.error("博文名称不可为空");
    return false;
  }
  if (route.query.id) {
    await updateBlog({
      name: title.value,
      content_text: editor.getValue(),
      id: route.query.id,
      publish: 2
    });
    message.success("发布成功");
  } else {
    await addBlog({
      name: title.value,
      content_text: editor.getValue(),
      publish: 2
    });
    router.push({
      path: "/back",
    });
    message.success("发布成功");
  }
}
</script>
<template>
  <div class="markdown_page">
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
      class="btn btn-secondary save_btn animate__animated animate__zoomInDown"
      @click="onAddBlog"
    >
    <SaveOutlined />
      <span>保存</span>
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
  </div>
</template>
<style lang="scss" scoped>
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
  margin-top: -384px;
  border-radius: 8px;
  overflow: hidden;
  padding: 12px 4px;
  box-sizing: border-box;
  background-color: #1e1e1ee8;
}

.title {
  position: absolute;
  top: 24px;
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
  right: 20px;
  top: 20px;

  span {
    vertical-align: middle;
    display: inline-block;
    margin: 0 2px;
  }
}

.p_btn {
  position: fixed;
  right: 220px;
  top: 20px;

  span {
    vertical-align: middle;
    display: inline-block;
    margin: 0 2px;
  }
}

.save_btn {
  position: fixed;
  right: 120px;
  top: 20px;

  span {
    vertical-align: middle;
    display: inline-block;
    margin: 0 2px;
  }
}
</style>
