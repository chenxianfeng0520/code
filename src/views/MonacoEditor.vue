<script setup>
import * as monaco from "monaco-editor";

const value = "";
const containerRef = ref();
onMounted(() => {
  monaco.editor.create(containerRef.value, {
    value,
    language: "dockerfile",
    automaticLayout: true,
    theme: "vs-dark",
  });
});
</script>
<template>
  <div class="monaco-editor-editor animate__animated animate__backInDown">
    <div ref="containerRef" style="height: 100%; width: 100%"></div>
  </div>
</template>
<style lang="scss" scoped>
.monaco-editor-editor {
  width: 820px;
  height: 620px;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-left: -410px;
  margin-top: -310px;
}
</style>
