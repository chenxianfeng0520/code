<script setup>
import * as monaco from "monaco-editor";
import { nextTick } from "vue";

const value = "";
const containerRef = ref();
onMounted(() => {
  const editor = monaco.editor.create(containerRef.value, {
    value,
    language: "dockerfile",
    automaticLayout: true,
    theme: "vs-dark",
  });
});

// function changeLanguage(data) {}
</script>
<template>
  <!-- <button
    type="button"
    class="btn btn-success yulang"
    @click="changeLanguage(data)"
  >
    <span>javascript</span>
  </button>
  <button
    type="button"
    class="btn btn-success yulang"
    @click="changeLanguage(data)"
  >
    <span>dockerfile</span>
  </button> -->
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
