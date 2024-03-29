<script setup>
import { getList } from "@/api/lottery.js";
const list = ref([]);
getList().then((res) => {
  list.value = res.data.data;
});
</script>
<template>
  <div class="main-page">
    <a-card
      :bordered="false"
      class="minio animate__animated animate__bounceIn"
      v-for="item in list"
      >{{ item.name || item.prefix }}</a-card
    >
  </div>
</template>
<style lang="scss" scoped>
.main-page {
  padding: 120px 160px;
  display: grid;
  grid-template-columns: repeat(auto-fill, calc(25% - 70px));
  grid-column-gap: 70px;
  cursor: pointer;
  .ant-card {
    font-size: 16px;
    line-height: 22px;
    color: #cedeff;
    border-radius: 25px;
    height: 90px;
    font-family: sans-serif;
    margin-bottom: 60px;
    &:hover {
      text-decoration: underline;
    }
    :deep(.ant-card-body) {
      padding: 20px 15px 0 70px;
    }
  }
  .minio {
    background: 15px 25px / 40px 40px no-repeat url(@/assets/files.png),
      #ffffff1a;
  }
}
</style>
