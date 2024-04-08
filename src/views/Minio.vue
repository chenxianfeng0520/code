<script setup>
import { getList, getFileByName, deleteFileByName } from "@/api/minio.js";

import { useRouter } from "vue-router";
import {
  EyeOutlined,
  CloudOutlined,
  RetweetOutlined,
  ClearOutlined,
  CloudDownloadOutlined,
  InsertRowAboveOutlined,
} from "@ant-design/icons-vue";
import { message } from "ant-design-vue";
const router = useRouter();
const list = ref([]);
const loading = ref(false);
async function getFileList() {
  // loading.value = true;
  const res = await getList();
  list.value = res.data.data;
  loading.value = false;
}
getFileList();

function getInfo() {
  router.push({
    path: "/MinioInfo",
    query: {
      name: active.value,
    },
  });
}

const active = ref(null);
function onClickInfo(item) {
  if (getConent(item) == active.value) {
    active.value = null;
  } else {
    active.value = getConent(item);
  }
}

async function deleteInfo() {
  await deleteFileByName({ name: active.value });
  getFileList();
  message.success("删除成功");
}

const handleChange = (info) => {
  if (info.file.status !== "uploading") {
    console.log(info.file, info.fileList);
  }
  if (info.file.status === "done") {
    console.log("Hello, Ant Design Vue!");
    getFileList();
    message.success("上传成功");
  } else if (info.file.status === "error") {
    console.log(`${info.file.name} file upload failed.`);
  }
};

const fileList = ref([]);
const headers = {
  authorization: "authorization-text",
};

function getConent(item) {
  return item.name || item.prefix?.split("/")?.[0];
}

const cardType = ref(0);

function changeType() {
  cardType.value = cardType.value ? 0 : 1;
}
</script>
<template>
  <a-upload
    name="file"
    :action="`http://139.224.72.78/minio/uploadObject`"
    :headers="headers"
    @change="handleChange"
    class="uploadPic animate__animated animate__zoomIn"
  >
    <a-button type="primary">
      <CloudOutlined />
      <span>新增文件</span>
    </a-button>
  </a-upload>
  <a-button
    type="primary"
    class="preview animate__animated animate__zoomIn"
    @click="changeType"
  >
    <InsertRowAboveOutlined />
    <span>切换视图</span>
  </a-button>
  <a-button
    type="primary"
    class="seePic animate__animated animate__zoomIn"
    v-show="active"
    @click="getInfo"
  >
    <EyeOutlined />
    <span>查看</span>
  </a-button>
  <!-- <a-button
    type="primary"
    class="dPic animate__animated animate__zoomIn"
    v-show="active"
  >
    <CloudDownloadOutlined />
    <span>下载</span>
  </a-button> -->
  <a-upload
    name="file"
    :action="`http://139.224.72.78/minio/uploadObject?name=${active}`"
    :headers="headers"
    @change="handleChange"
    class="changePic animate__animated animate__zoomIn"
    v-show="active"
  >
    <a-button type="primary">
      <CloudOutlined />
      <span>替换</span>
    </a-button>
  </a-upload>
  <a-button
    type="primary"
    danger
    class="deletePic animate__animated animate__zoomIn"
    v-show="active"
    @click.stop="deleteInfo"
  >
    <ClearOutlined />
    <span>删除</span>
  </a-button>
  <div class="main-page" :class="{ pre_page: cardType }">
    <a-spin tip="minio列表加载中" v-if="loading" />
    <template v-else>
      <a-image
        v-for="item in list"
        class="minio_pic animate__animated animate__zoomIn"
        :src="`http://139.224.72.78:9000/picturegallery/${getConent(
          item
        )}?x-oss-process=image/blur,r_50,s_50/quality,q_1/resize,m_mfit,h_200,w_200`"
        @click="onClickInfo(item)"
        :class="{
          active: active == getConent(item),
        }"
        :preview="false"
        v-if="cardType"
      />
      <a-card
        v-else
        :bordered="false"
        class="minio files animate__animated animate__zoomIn"
        :class="{
          file: item.name,
          files: item.prefix,
          active: active == getConent(item),
        }"
        @click="onClickInfo(item)"
        v-for="item in list"
      >
        <span class="content" :title="getConent(item)">{{
          getConent(item)
        }}</span>
      </a-card>
    </template>
  </div>
</template>
<style lang="scss" scoped>
.main-page {
  padding: 120px 160px;
  display: grid;
  grid-template-columns: repeat(auto-fill, calc(25% - 20px));
  grid-column-gap: 20px;
  cursor: pointer;
  &.pre_page {
    grid-template-columns: repeat(auto-fill, calc(12.5% - 15px));
    grid-column-gap: 15px;
    padding: 120px 80px;
  }
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
      .content {
        vertical-align: middle;
        display: inline-block;
        width: 100%;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }
  :deep(.ant-image) {
    .minio_pic {
      max-width: 70%;
      width: auto;
      height: 70%;
      max-height: 70%;
      &.active {
        border: 2px solid #fff;
        border-radius: 20px;
      }
    }
  }

  .minio {
    &.files {
      background: 25px 25px / 40px 40px no-repeat url(@/assets/files.png),
        #ffffff1a;
      &.active {
        background: 25px 25px / 40px 40px no-repeat url(@/assets/files.png),
          #5853531a;
        color: #8b9ab9;
      }
    }
    &.file {
      background: 25px 25px / 40px 40px no-repeat url(@/assets/file.png),
        #ffffff1a;
      &.active {
        background: 25px 25px / 40px 40px no-repeat url(@/assets/file.png),
          #5853531a;
        color: #8b9ab9;
      }
    }
  }
}
.preview {
  position: fixed;
  left: 550px;
  top: 30px;
}
.seePic {
  position: fixed;
  left: 460px;
  top: 30px;
}
.dPic {
  position: fixed;
  left: 120px;
  top: 30px;
}
.changePic {
  position: fixed;
  left: 250px;
  top: 30px;
}
.deletePic {
  position: fixed;
  left: 20px;
  top: 30px;
}
.uploadPic {
  position: fixed;
  left: 340px;
  top: 30px;
}
:deep(.ant-upload-list) {
  display: none;
}
.ant-btn {
  span {
    vertical-align: middle;
  }
}
</style>
