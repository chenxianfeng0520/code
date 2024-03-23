<script setup>
import * as monaco from "monaco-editor";
import {
  EyeOutlined
} from "@ant-design/icons-vue";
const value = "";
const containerRef = ref();
onMounted(() => {
  monaco.editor.create(containerRef.value, {
    value,
    language: "markdown",
    automaticLayout: true,
    theme: "vs-dark",
  });
});
</script>
<template>
  <button type="button" class="btn btn-success yulang">
    <EyeOutlined /><span>预览</span>
  </button>
  <div class="monaco-editor-editor animate__animated animate__backInDown">
    <div ref="containerRef" style="height: 100%; width: 100%"></div>
  </div>
</template>
<style lang="scss" scoped>
.monaco-editor-editor {
  width: 1200px;
  height: 820px;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-left: -600px;
  margin-top: -380px;
  border-radius: 20px;
  overflow: hidden;
  padding: 10px;
  box-sizing: border-box;
  background-color: #1e1e1e;
}
.yulang {
  position: fixed;
  right: 120px;
  top: 40px;
  span {
    vertical-align: middle;
    display: inline-block;
    margin: 0 2px;
  }

}
</style>
