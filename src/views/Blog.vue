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
const loading = ref(true);
async function getBlogList() {
  loading.value = true;
  const res = await getBlog();
  blogList.value = res.data.data.filter((v) => v.publish == 2) || [];
  console.log(blogList.value, "blogList.value");
  loading.value = false;
}

getBlogList();
</script>
<template>
  <div class="blog_index">
    <img class="back" src="@/assets/front.png" alt="" @click="toBack" />
    <a-spin v-show="loading" />
    <div class="main-page" v-if="blogList?.length && !loading">
      <a-card
        :bordered="false"
        class="blogging animate__animated animate__pulse"
        v-for="item in blogList"
        @click="toPage(item)"
        :style="{
          background:
            item.cover &&
            `10px 5px / 110px 110px no-repeat url(http://139.224.72.78:9000/picturegallery/${item.cover}),#313e39d6`,
        }"
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
        <img src="@/assets/none_data.png" alt="" />
        <div class="text">暂无数据</div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.blog_index {
  height: 100vh;
  width: 100vw;
  background-color: #050303a8;
  padding-top: 30px;
  overflow: auto;
}
.back {
  position: fixed;
  right: 20px;
  bottom: 30px;
  width: 30px;
  cursor: pointer;
}
.main-page {
  padding: 50px 50px;
  display: grid;
  grid-template-columns: repeat(auto-fill, calc(25% - 40px));
  grid-column-gap: 40px;
  cursor: pointer;

  .ant-card {
    font-size: 20px;
    line-height: 22px;
    color: #fff6f6;
    border-radius: 22px;
    height: 120px;
    font-family: sans-serif;
    margin-bottom: 40px;

    :deep(.ant-card-body) {
      padding: 25px 15px 0 130px;
    }
  }

  .blogging {
    background: 10px 5px / 110px 110px no-repeat url(@/assets/blogging.png),
      #313e39d6;
    .title {
      display: block;
      width: 100%;
      // white-space: nowrap;
      // overflow: hidden;
      // text-overflow: ellipsis;
      font-size: 20px;
      font-family: fangsong;

      overflow: hidden;
      text-overflow: ellipsis;
      -webkit-line-clamp: 2;
      display: -webkit-box;
      -webkit-box-orient: vertical;
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
