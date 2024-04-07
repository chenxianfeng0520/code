<script setup>
import { getList, getFileByName } from "@/api/minio.js";
import { useRouter } from "vue-router";
const router = useRouter();
const list = ref([]);
getList().then((res) => {
  list.value = res.data.data;
});

function getInfo(item) {
  if (item.prefix) {
    return false;
  } else {
    router.push({
      path: "/MinioInfo",
      query: {
        name: item.name,
      },
    });
  }
}
</script>
<template>
  <div class="main-page">
    <a-card
      :bordered="false"
      class="minio files animate__animated animate__zoomIn"
      :class="{ file: item.name, files: item.prefix }"
      @click="getInfo(item)"
      v-for="item in list"
      >{{ item.name || item.prefix?.split("/")?.[0] }}</a-card
    >
  </div>
</template>
<style lang="scss" scoped>
.main-page {
  padding: 120px 160px;
  display: grid;
  grid-template-columns: repeat(auto-fill, calc(25% - 50px));
  grid-column-gap: 50px;
  cursor: pointer;
  .ant-card {
    font-size: 16px;
    line-height: 22px;
    color: #cedeff;
    border-radius: 30px;
    height: 90px;
    font-family: sans-serif;
    margin-bottom: 60px;
    &:hover {
      text-decoration: underline;
    }
    :deep(.ant-card-body) {
      padding: 20px 15px 0 80px;
    }
  }
  .minio {
    &.files {
      background: 25px 25px / 40px 40px no-repeat url(@/assets/files.png),
        #ffffff1a;
    }
    &.file {
      background: 25px 25px / 40px 40px no-repeat url(@/assets/file.png),
        #ffffff1a;
    }
  }
}
</style>
