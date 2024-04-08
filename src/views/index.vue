<script setup>
import { useRouter } from "vue-router";
import DownToTopTip from "@/components/downToTopTip.vue";
import { BookOutlined } from "@ant-design/icons-vue";
import { getBlog } from "@/api/mysql.js";
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
</script>
<template>
  <img class="back" src="@/assets/front.png" alt="" @click="toBack" />
  <DownToTopTip text="切换后台成功"></DownToTopTip>
  <div class="main-page">
    <a-card
      :bordered="false"
      class="blog animate__animated animate__bounceIn"
      @click="toPage(4)"
    >
      <span>新增博客</span>
    </a-card>
    <a-card
      :bordered="false"
      class="experiment animate__animated animate__bounceIn"
      @click="toPage(1)"
    >
      <span>生成随机数</span>
    </a-card>
    <!-- <a-card :bordered="false" class="suiji animate__animated animate__bounceIn" @click="toPage(5)">
      <span>生成随机数（旧）</span>
    </a-card> -->
    <!-- <a-card :bordered="false" class="Docker animate__animated animate__bounceIn" @click="toPage(2)">
      <span>vue-codemirror</span>
    </a-card>
    <a-card :bordered="false" class="Monaco animate__animated animate__bounceIn" @click="toPage(3)">
      <span>monaco-editor</span>
    </a-card> -->
    <a-card
      :bordered="false"
      class="minio animate__animated animate__bounceIn"
      @click="toPage(6)"
    >
      <span>minio中文件</span>
    </a-card>
    <!-- <a-card :bordered="false" class="excel animate__animated animate__bounceIn">
      <span>在线编辑excel文件</span>
    </a-card> -->
    <a-card
      :bordered="false"
      class="blogging animate__animated animate__bounceIn"
      v-for="item in blogList"
      @click="toPage(7, item)"
    >
      <span>{{ item.name }}</span>
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
  padding: 120px 160px;
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
      #2c2b2ba8;
  }

  .suiji {
    background: 0px 10px / 110px 110px no-repeat url(@/assets/suiji.png),
      #2c2b2ba8;
  }

  .Docker {
    background: 10px 15px / 90px 90px no-repeat url(@/assets/Docker.png),
      #2c2b2ba8;
  }

  .Monaco {
    background: 0px 25px / 90px 90px no-repeat url(@/assets/experiment.png),
      #2c2b2ba8;
  }

  .markdown {
    background: 0px 25px / 100px 70px no-repeat url(@/assets/markdown.png),
      #2c2b2ba8;
  }

  .blogging {
    background: 0px 25px / 70px 70px no-repeat url(@/assets/blogging.png),
      #2c2b2ba8;
  }

  .blog {
    background: 10px 15px / 90px 90px no-repeat url(@/assets/blog.png),
      #2c2b2ba8;
    // font-size: 36px;
    // line-height: 36px;
    // padding-left: 46px;
    // font-weight: 600;
  }

  .minio {
    background: 0px 25px / 90px 90px no-repeat url(@/assets/minio.png),
      #2c2b2ba8;
  }

  .excel {
    background: 0px 25px / 70px 70px no-repeat url(@/assets/excel.png),
      #363030ad;
  }
}
</style>
