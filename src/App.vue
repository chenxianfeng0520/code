<script setup>
import { useRouter, useRoute } from "vue-router";
const router = useRouter();
const route = useRoute();
function toBack() {
  console.log(route, "route");
  router.go(-1);
}

const whiteList = ["/blog", "/back"];
</script>

<template>
  <router-view></router-view>
  <img
    class="home animate__animated animate__backInLeft"
    src="@/assets/home.png"
    alt=""
    @click="toBack"
    v-if="whiteList.every((v) => v != route.path)"
  />
</template>

<style lang="scss">
.home {
  position: fixed;
  left: 30px;
  top: 20px;
  width: 32px;
  cursor: pointer;
}
#app {
  height: 100vh;
  width: 100vw;
  background-image: url(@/assets/back.jpg);
  background-size: cover;
  position: fixed;
  left: 0;
  top: 0;
}
/* 滚动槽 */
::-webkit-scrollbar {
  width: 8px;
  height: 6px;
}
::-webkit-scrollbar-track {
  border-radius: 6px;
  background: transparent;
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.08);
}
/* 滚动条滑块 */
::-webkit-scrollbar-thumb {
  border-radius: 6px;
  background: rgba(117, 19, 19, 0.253);
  -webkit-box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.2);
}
</style>
