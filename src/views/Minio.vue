<script setup>
import { getList, getFileByName, deleteFileByName } from "@/api/minio.js";
import { useRouter } from "vue-router";
import {
  EyeOutlined,
  CloudOutlined,
  RetweetOutlined,
  DeleteOutlined,
  CloudDownloadOutlined,
} from "@ant-design/icons-vue";
const router = useRouter();
const list = ref([]);
const loading = ref(false);
async function getFileList() {
  loading.value = true;
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
}

const handleChange = (info) => {
  if (info.file.status !== "uploading") {
    console.log(info.file, info.fileList);
  }
  if (info.file.status === "done") {
    console.log("Hello, Ant Design Vue!");
    getFileList();
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
</script>
<template>
  <a-upload
    name="file"
    :action="`http://localhost:5173/minio/uploadObject`"
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
    :action="`http://localhost:5173/minio/uploadObject?name=${active}`"
    :headers="headers"
    @change="handleChange"
    class="changePic animate__animated animate__zoomIn"
    v-show="active"
  >
    <a-button type="primary">
      <RetweetOutlined />
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
    <DeleteOutlined />
    <span>删除</span>
  </a-button>
  <div class="main-page">
    <a-spin tip="minio列表加载中" v-if="loading" />
    <template v-else>
      <a-card
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
  .minio {
    &.files {
      background: 25px 25px / 40px 40px no-repeat url(@/assets/files.png),
        #ffffff1a;
      &.active {
        background: 25px 25px / 40px 40px no-repeat url(@/assets/files.png),
          rgb(141 116 116 / 10%);
      }
    }
    &.file {
      background: 25px 25px / 40px 40px no-repeat url(@/assets/file.png),
        #ffffff1a;
      &.active {
        background: 25px 25px / 40px 40px no-repeat url(@/assets/file.png),
          rgb(141 116 116 / 10%);
      }
    }
  }
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
