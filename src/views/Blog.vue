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
async function getBlogList() {
  const res = await getBlog();
  blogList.value = res.data.data || [];
}

getBlogList();
</script>
<template>
  <img class="back" src="@/assets/back.png" alt="" @click="toBack" />
  <div class="main-page">
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
      <div class="desc">- {{ item.name }}</div>
    </a-card>
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
    color: #ff8484;
    border-radius: 20px;
    height: 115px;
    font-family: sans-serif;
    margin-bottom: 60px;

    :deep(.ant-card-body) {
      padding: 20px 15px 0 90px;
    }
  }

  .blogging {
    background: 10px 20px / 70px 70px no-repeat url(@/assets/blogging.png),
    #532a5c57;
    .title {
      display: block;
      width: 100%;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      &:hover {
        text-decoration: underline;
      }
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
</style>
