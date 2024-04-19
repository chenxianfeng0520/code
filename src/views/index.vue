<script setup>
import { useRouter } from "vue-router";
import DownToTopTip from "@/components/downToTopTip.vue";
import { BookOutlined } from "@ant-design/icons-vue";
import { getBlog, deleteBlog } from "@/api/mysql.js";
import { message } from "ant-design-vue";
const router = useRouter();
function toPage(pagekey, item) {
  if (pagekey == 1) {
    router.push({
      path: "/lottery",
    });
  }
  if (pagekey == 2) {
    router.push({
      path: "/Dockerfile",
    });
  }
  if (pagekey == 3) {
    router.push({
      path: "/MonacoEditor",
    });
  }
  if (pagekey == 4) {
    router.push({
      path: "/Markdown",
    });
  }
  if (pagekey == 5) {
    router.push({
      path: "/lotteryOld",
    });
  }
  if (pagekey == 6) {
    router.push({
      path: "/Minio",
    });
  }
  if (pagekey == 7) {
    router.push({
      path: "/Markdown",
      query: {
        id: item.id,
      },
    });
  }
}

const blogList = ref([]);
async function getBlogList() {
  const res = await getBlog();
  blogList.value = res.data.data || [];
}

getBlogList();

function toBack() {
  router.push({
    path: "/blog",
  });
}

async function onDelete(item) {
  await deleteBlog({
    id: item.id,
  });
  getBlogList();
  message.success("博客删除成功");
}
const minioType = ref("minio_front");
function minioBack() {
  minioType.value = "minio_back";
}
function minioFront() {
  minioType.value = "minio_front";
}

const lotteryType = ref("lottery_back");
function lotteryBack() {
  lotteryType.value = "lottery_back";
}
function lotteryFront() {
  lotteryType.value = "lottery_front";
}

const blogType = ref("blog_front");
function blogBack() {
  blogType.value = "blog_back";
}
function blogFront() {
  blogType.value = "blog_front";
}
</script>
<template>
  <img class="back" src="@/assets/back.png" alt="" @click="toBack" />
  <img
    class="minio_back"
    src="@/assets/minio_back.png"
    alt=""
    @click="minioFront"
    v-if="minioType == 'minio_back'"
  />
  <img
    class="minio_back"
    src="@/assets/minio_front.png"
    alt=""
    @click="minioBack"
    v-if="minioType == 'minio_front'"
  />
  <img
    class="lottery_back"
    src="@/assets/lottery_back.png"
    alt=""
    @click="lotteryFront"
    v-if="lotteryType == 'lottery_back'"
  />
  <img
    class="lottery_back"
    src="@/assets/lottery_front.png"
    alt=""
    @click="lotteryBack"
    v-if="lotteryType == 'lottery_front'"
  />
  <img
    class="blog_back"
    src="@/assets/blog_back.png"
    alt=""
    @click="blogFront"
    v-if="blogType == 'blog_back'"
  />
  <img
    class="blog_back"
    src="@/assets/blog_front.png"
    alt=""
    @click="blogBack"
    v-if="blogType == 'blog_front'"
  />
  <div class="main-page">
    <a-card
      :bordered="false"
      class="blog animate__animated animate__bounceIn"
      @click="toPage(4)"
      v-if="blogType == 'blog_front'"
    >
      <span>新建博文</span>
    </a-card>

    <a-card
      :bordered="false"
      class="blog animate__animated animate__bounceIn"
      v-for="item in blogList"
      @click="toPage(7, item)"
      v-if="blogType == 'blog_front'"
    >
      <span>{{ item.name }}</span>
      <a-button type="link" danger class="delete" @click.stop="onDelete(item)"
        >- 删除博文 -</a-button
      >
    </a-card>
    <a-card
      :bordered="false"
      class="experiment animate__animated animate__bounceIn"
      @click="toPage(1)"
      v-if="lotteryType == 'lottery_front'"
    >
      <span>生成随机数</span>
    </a-card>
    <a-card
      :bordered="false"
      class="minio animate__animated animate__bounceIn"
      @click="toPage(6)"
      v-if="minioType == 'minio_front'"
    >
      <span>管理minio桶文件</span>
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

.minio_back {
  position: fixed;
  right: 80px;
  bottom: 31px;
  height: 24px;
  cursor: pointer;
}

.lottery_back {
  position: fixed;
  right: 250px;
  bottom: 25px;
  height: 38px;
  cursor: pointer;
}

.blog_back {
  position: fixed;
  right: 312px;
  bottom: 31px;
  height: 30px;
  cursor: pointer;
}

.main-page {
  padding: 100px 100px;
  display: grid;
  grid-template-columns: repeat(auto-fill, calc(25% - 50px));
  grid-column-gap: 50px;
  cursor: pointer;

  .ant-card {
    font-size: 18px;
    line-height: 22px;
    color: #d8dfee;
    border-radius: 20px;
    height: 90px;
    font-family: sans-serif;
    margin-bottom: 60px;

    &:hover {
      text-decoration: underline;
    }

    :deep(.ant-card-body) {
      padding: 20px 15px 0 100px;
    }
  }

  .experiment {
    background: 0px 10px / 110px 110px no-repeat url(@/assets/chouqian.png),
      #2c2b2b30;
  }

  .suiji {
    background: 0px 10px / 110px 110px no-repeat url(@/assets/suiji.png),
      #2c2b2b30;
  }

  .Docker {
    background: 10px 15px / 90px 90px no-repeat url(@/assets/Docker.png),
      #2c2b2b30;
  }

  .Monaco {
    background: 0px 25px / 90px 90px no-repeat url(@/assets/experiment.png),
      #2c2b2b30;
  }

  .markdown {
    background: 0px 25px / 100px 70px no-repeat url(@/assets/markdown.png),
      #2c2b2b30;
  }

  .blog {
    background: 10px 15px / 90px 90px no-repeat url(@/assets/blog.png),
      #2c2b2b30;
    span {
      display: block;
    }
    .delete {
      padding-left: 10px;
    }
  }

  .minio {
    background: 0px 25px / 90px 90px no-repeat url(@/assets/minio.png),
      #2c2b2b30;
  }

  .excel {
    background: 0px 25px / 70px 70px no-repeat url(@/assets/excel.png),
      #363030ad;
  }
}
</style>
