<script setup>
import { getList, getFileByName, deleteFileByName } from "@/api/minio.js";
const list = ref([]);
const loading = ref(false);
const active = ref(null);
async function getFileList() {
  loading.value = true;
  const res = await getList();
  list.value = res.data.data;
  loading.value = false;
}
function getConent(item) {
  return item.name || item.prefix?.split("/")?.[0];
}

const emit = defineEmits(["change"]);
function onActivePic(item) {
  active.value = getConent(item);
  emit("change", active.value);
}
getFileList();
</script>
<template>
  <div class="select_pic">
    <div
      class="pic"
      :class="{ active: active == getConent(item) }"
      v-for="item in list"
    >
      <a-image
        :src="`http://139.224.72.78:9000/picturegallery/${getConent(
          item
        )}?x-oss-process=image/blur,r_50,s_50/quality,q_1/resize,m_mfit,h_30,w_30`"
        :preview="false"
        @click="onActivePic(item)"
      ></a-image>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.select_pic {
  display: grid;
  grid-template-columns: repeat(auto-fill, calc(20% - 10px));
  grid-column-gap: 10px;
  width: 1200px;
  margin: auto;
  padding: 30px 0;
  .pic {
    width: 180px;
    height: auto;
    display: inline-block;
    max-height: 180px;
    margin-bottom: 40px;
    cursor: pointer;
    padding: 10px;
    &.active {
      background-color: #373737;
      border-radius: 8px;
    }
  }
}
</style>
