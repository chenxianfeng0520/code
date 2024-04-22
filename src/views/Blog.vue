<script setup>
import { getBlog } from "@/api/mysql.js";
import { useRouter } from "vue-router";
const router = useRouter();
function toPage(item) {
  router.push({
    path: "/blogInfo",
    query: {
      id: item.id,
    },
  });
}

function toBack() {
  router.push({
    path: "/back",
  });
}

const blogList = ref([]);
const loading = ref(true)
async function getBlogList() {
  loading.value = true
  const res = await getBlog();
  blogList.value = res.data.data.filter(v=>v.publish == 2) || [];
  loading.value = false
}

getBlogList();
</script>
<template>
  <img class="back" src="@/assets/front.png" alt="" @click="toBack" />
  <div class="main-page" v-if="blogList?.length && !loading">
    <a-card
      :bordered="false"
      class="blogging animate__animated animate__pulse"
      v-for="item in blogList"
      @click="toPage(item)"
    >
      <div class="title">{{ item.name || "-#-" }}</div>
      <a-button class="tag" type="link">#javaScript</a-button>
      <a-button class="tag" type="link">#python</a-button>
      <a-button class="tag" type="link">#ES6</a-button>
      <!-- <div class="desc">- {{ item.name }}</div> -->
    </a-card>
  </div>
  <div v-if="!blogList?.length && !loading" class="none_data">
    <div>
      <img src="@/assets/none_data.png" alt="">
      <div class="text">暂无数据</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.back {
  position: fixed;
  right: 20px;
  bottom: 30px;
  width: 30px;
  cursor: pointer;
}
.main-page {
  padding: 80px 70px;
  display: grid;
  grid-template-columns: repeat(auto-fill, calc(25% - 50px));
  grid-column-gap: 50px;
  cursor: pointer;

  .ant-card {
    font-size: 18px;
    line-height: 22px;
    color: #c56464;
    border-radius: 16px;
    height: 95px;
    font-family: sans-serif;
    margin-bottom: 60px;

    :deep(.ant-card-body) {
      padding: 20px 15px 0 90px;
    }
  }

  .blogging {
    background: 15px 20px / 60px 60px no-repeat url(@/assets/blogging.png),
    #532a5c57;
    .title {
      display: block;
      width: 100%;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      font-size: 20px;
      padding-bottom: 3px;
    }
    .tag {
      padding-left: 0px;
      color: #87d068;
    }
    .desc {
      font-size: 15px;
      color: #607d92;
      font-style: italic;
      width: 100%;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
}
.none_data {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #433c3cbd;
  .text {
    text-align: center;
    font-size: 22px;
    padding: 50px 0;
    color: #ffeaeab5;
    font-style: italic;
  }
}
</style>
