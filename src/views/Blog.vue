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
      <span class="title">{{ item.name || '-#-' }}</span>
      <a-button class="tag" type="link">#javaScript</a-button>
      <a-button class="tag" type="link">#python</a-button>
      <a-button class="tag" type="link">#ES6</a-button>
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
  padding: 80px 80px;
  display: grid;
  grid-template-columns: repeat(auto-fill, calc(25% - 35px));
  grid-column-gap: 35px;
  cursor: pointer;

  .ant-card {
    font-size: 18px;
    line-height: 22px;
    color: rgb(210, 121, 121);
    border-radius: 10px;
    height: 90px;
    font-family: sans-serif;
    margin-bottom: 60px;

    &:hover {
      text-decoration: underline;
    }

    :deep(.ant-card-body) {
      padding: 20px 15px 0 90px;
    }
  }

  .blogging {
    background: 10px 12px / 70px 70px no-repeat url(@/assets/blogging.png),
      #2c2b2ba8;
    .title {
      vertical-align: middle;
      display: inline-block;
      width: 100%;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .tag {
      padding-left: 0px;
      color: #108ee9;
    }
  }
}
</style>
