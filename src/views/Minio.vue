<script setup>
import { getList, getFileByName, deleteFileByName } from "@/api/minio.js";
import { cxf_Multiple } from "@/Multiple.js";
import { useRouter } from "vue-router";
import { CloseOutlined, ToTopOutlined } from "@ant-design/icons-vue";
import { message } from "ant-design-vue";
import { onMounted } from "vue";

const router = useRouter();
const list = ref([]);
const loading = ref(false);
const activeList = ref([]);

async function getFileList() {
  loading.value = true;
  const res = await getList();
  list.value = res.data.data;
  loading.value = false;
}
getFileList();

// 查看
function getInfo(item) {
  router.push({
    path: "/MinioInfo",
    query: {
      name: getConent(item),
    },
  });
}

async function deleteInfo() {
  await deleteFileByName({
    names: activeList.value,
  });
  activeList.value = [];
  getFileList();
  message.success("删除成功");
}

function onClickInfo(item) {
  if (activeList.value.some((v) => v == getConent(item))) {
    activeList.value = activeList.value.filter((v) => v != getConent(item));
  } else {
    activeList.value.push(getConent(item));
  }
}

const handleChange = (info) => {
  if (info.file.status === "done") {
    getFileList();
    message.success("上传成功");
  }
};

const headers = {
  authorization: "authorization-text",
};

function getConent(item) {
  return item.name || item.prefix?.split("/")?.[0];
}

onMounted(() => {
  cxf_Multiple("cxf", activeList);
});
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
      <ToTopOutlined />
      <span>新增</span>
    </a-button>
  </a-upload>
  <a-button
    type="primary"
    danger
    class="deletePic animate__animated animate__zoomIn"
    v-show="activeList?.length"
    @click.stop="deleteInfo"
  >
    <CloseOutlined />
    <span>删除</span>
  </a-button>
  <div class="main-page">
    <a-spin tip="minio列表加载中" v-if="loading" />
    <template v-else>
      <a-card
        :bordered="false"
        class="minio files animate__animated animate__zoomIn cxf"
        :class="{
          file: item.name,
          files: item.prefix,
          cxf_multiple_active: activeList.some((v) => v == getConent(item)),
        }"
        :data-id="getConent(item)"
        @click="onClickInfo(item)"
        @dblclick="getInfo(item)"
        v-for="item in list"
      >
        <a-image
          class="minio_pic"
          :src="`http://139.224.72.78:9000/picturegallery/${getConent(
            item
          )}?x-oss-process=image/blur,r_50,s_50/quality,q_1/resize,m_mfit,h_30,w_30`"
          :preview="false"
        />
        <span class="content" :title="getConent(item)">{{
          getConent(item)
        }}</span>
      </a-card>
    </template>
  </div>
</template>
<style lang="scss" scoped>
.main-page {
  padding: 80px 80px;
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
      padding: 20px 15px 0 20px;

      .content {
        vertical-align: middle;
        display: inline-block;
        width: calc(100% - 60px);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        margin-left: 10px;
      }
    }
  }

  .minio {
    :deep(.minio_pic) {
      width: 50px;
      height: auto;
      display: inline-block;
      max-height: 60px;
    }

    &.file {
      background-color: #2c2b2b30;
      &.cxf_multiple_active {
        border-radius: 20px;
        background-color: #30c54647;
      }
    }
  }
}

.deletePic {
  position: fixed;
  left: 180px;
  top: 20px;
}

.uploadPic {
  position: fixed;
  left: 80px;
  top: 20px;
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
