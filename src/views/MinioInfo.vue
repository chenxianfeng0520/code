<script setup>
import { getList, getFileByName } from "@/api/minio.js";
import { useRoute } from "vue-router";
const route = useRoute();
const pic = ref();
const loading = ref(false);
async function getInfo() {
  loading.value = true;
  const res = await getFileByName({ name: route.query.name });
  pic.value = "data:image/png;base64," + res.data.data;
  // console.log(atob(pic.value),atob(res.data.data))
  // const file = base64ToFile(pic.value, route.query.name);
  // console.log(file, "file");

  // const reader = new FileReader();
 
  // reader.onload = function(e) {
  //   const content = e.target.result;
  //   console.log(content,'content')
  // };

  // reader.readAsText(file)

  loading.value = false;
}

// function base64ToFile(base64Data, filename) {
//   // 将base64的数据部分提取出来
//   const parts = base64Data.split(";base64,");
//   const contentType = parts[0].split(":")[1];
//   const raw = window.atob(parts[1]);
//   const rawLength = raw.length;
//   const uInt8Array = new Uint8Array(rawLength);

//   for (let i = 0; i < rawLength; ++i) {
//     uInt8Array[i] = raw.charCodeAt(i);
//   }

//   // 使用Blob和createObjectURL创建一个文件对象
//   const blob = new Blob([uInt8Array], { type: contentType });
//   const file = new File([blob], filename, { type: contentType });
//   return file;
// }

getInfo();
</script>
<template>
  <div class="main-page">
    <a-spin :tip="`${route.query.name} 加载中`" v-if="loading" />
    <img :src="pic" alt="" v-else />
  </div>
</template>
<style lang="scss" scoped>
.main-page {
  padding: 120px 160px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    max-width: 1100px;
    max-height: 1100px;
  }
}
</style>
