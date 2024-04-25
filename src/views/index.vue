<script setup>
import { useRouter } from "vue-router";
import DownToTopTip from "@/components/downToTopTip.vue";
import { PlusSquareOutlined, CheckCircleOutlined } from "@ant-design/icons-vue";
import { getBlog, deleteBlog, updateBlog } from "@/api/mysql.js";
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
const loading = ref(true);
async function getBlogList() {
  loading.value = true;
  const res = await getBlog();
  blogList.value = res.data.data || [];
  loading.value = false;
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
  message.success("博文删除成功");
}

async function onPublish(item, publish) {
  if (item.publish == 1) {
    await updateBlog({
      publish: 2,
      id: item.id,
    });
    router.push({
      path: "/back",
    });
    message.success("博文发布成功");
  }

  if (item.publish == 2) {
    await updateBlog({
      publish: 1,
      id: item.id,
    });
    router.push({
      path: "/back",
    });
    message.success("博文撤回成功");
  }

  getBlogList();
}
const minioType = ref("minio_front");
function minioBack() {
  minioType.value = "minio_back";
}
function minioFront() {
  minioType.value = "minio_front";
}

const lotteryType = ref("lottery_front");
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

const publishList = {
  1: "发布",
  2: "撤回",
};

function onSee(item) {
  router.push({
    path: "/blogInfo",
    query: {
      id: item.id,
    },
  });
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
  <button
    type="button"
    class="btn btn-primary add_btn animate__animated animate__zoomInDown"
    @click="toPage(4)"
    v-if="blogType == 'blog_front'"
  >
    <PlusSquareOutlined />
    <span>新建博文</span>
  </button>
  <div class="main-page">
    <a-card
      :bordered="false"
      class="blog animate__animated animate__bounceIn"
      :style="{
        background:
          item.cover &&
          `10px 11px / 70px 70px no-repeat url(http://139.224.72.78:9000/picturegallery/${item.cover}),#2c2b2bf5;`,
      }"
      v-for="item in blogList"
      v-if="blogType == 'blog_front'"
      :class="{ publish: item.publish == 2 }"
      v-show="!loading"
    >
      <div class="title">
        <span class="name">{{ item.name }}</span>
        <CheckCircleOutlined v-if="item.publish == 2" class="icon" />
      </div>
      <a-button type="link" @click.stop="onSee(item)">查看</a-button>
      <a-button
        type="link"
        @click.stop="toPage(7, item)"
        v-if="item.publish != 2"
        >修改</a-button
      >
      <a-button
        type="link"
        :class="{
          publish: true,
          publish_1: item.publish == 1,
          publish_2: item.publish == 2,
        }"
        @click.stop="onPublish(item)"
        >{{ publishList[item.publish] }}</a-button
      >
      <a-button
        type="link"
        danger
        class="delete"
        @click.stop="onDelete(item)"
        v-if="item.publish != 2"
        >删除</a-button
      >
    </a-card>
    <a-spin v-show="loading" />
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
.add_btn {
  position: fixed;
  left: 20px;
  bottom: 20px;

  span {
    vertical-align: middle;
    display: inline-block;
    margin: 0 2px;
  }
}

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
  padding: 50px 50px;
  display: grid;
  grid-template-columns: repeat(auto-fill, calc(25% - 30px));
  grid-column-gap: 30px;
  cursor: pointer;

  .ant-card {
    font-size: 18px;
    line-height: 22px;
    color: #d8dfee;
    border-radius: 12px;
    height: 90px;
    font-family: sans-serif;
    margin-bottom: 30px;

    :deep(.ant-card-body) {
      padding: 20px 15px 0 100px;
    }
  }

  .experiment {
    background: 0px 10px / 110px 110px no-repeat url(@/assets/chouqian.png),
      #2c2b2bf5;
  }

  .suiji {
    background: 0px 10px / 110px 110px no-repeat url(@/assets/suiji.png),
      #2c2b2bf5;
  }

  .Docker {
    background: 10px 15px / 90px 90px no-repeat url(@/assets/Docker.png),
      #2c2b2bf5;
  }

  .Monaco {
    background: 0px 25px / 90px 90px no-repeat url(@/assets/experiment.png),
      #2c2b2bf5;
  }

  .markdown {
    background: 0px 25px / 100px 70px no-repeat url(@/assets/markdown.png),
      #2c2b2bf5;
  }

  .blog {
    background: 10px 11px / 70px 70px no-repeat url(@/assets/blog.png),
      #2c2b2bf5;
    .title {
      .name {
        vertical-align: middle;
        display: inline-block;
        margin: 0 4px 0 0;
        max-width: calc(100% - 90px);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .icon {
        vertical-align: middle;
        display: inline-block;
        font-size: 16px;
      }
    }
    &.publish {
      background: 10px 11px / 70px 70px no-repeat url(@/assets/blog.png),
        #0c3e1ff5;
      color: #19ff95;
    }
    button {
      padding-left: 1px;
      padding-top: 8px;
    }
    .publish {
      &.publish_1 {
        color: #29d15c;
      }
      &.publish_2 {
        color: #ebd974;
        &:hover {
          color: #f3e8ad;
        }
      }
    }
  }

  .minio {
    background: 0px 25px / 90px 90px no-repeat url(@/assets/minio.png),
      #2c2b2bf5;
  }

  .excel {
    background: 0px 25px / 70px 70px no-repeat url(@/assets/excel.png),
      #363030ad;
  }
}
</style>
