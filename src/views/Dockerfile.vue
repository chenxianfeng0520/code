<script setup>
import { Codemirror } from "vue-codemirror";
import { StreamLanguage } from "@codemirror/language";
import { oneDark } from "@codemirror/theme-one-dark";
import { dockerFile } from "@codemirror/legacy-modes/mode/dockerfile";

const code = ref();
const extensions = [StreamLanguage.define(dockerFile), oneDark];
</script>
<template>
  <div class="docker-file-editor animate__animated animate__backInDown">
    <codemirror
      v-model="code"
      placeholder="Code gose here..."
      :autofocus="true"
      :indent-with-tab="true"
      :tabSize="2"
      :extensions="extensions"
    />
  </div>
</template>
<style lang="scss" scoped>
.docker-file-editor {
  width: 820px;
  height: 620px;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-left: -410px;
  margin-top: -310px;
  :deep(.cm-editor) {
    width: 100%;
    height: 100%;
  }
}
</style>
