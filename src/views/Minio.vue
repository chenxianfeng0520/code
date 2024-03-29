<script setup>
import { getList } from "@/api/lottery.js";
const list = ref([]);
getList().then((res) => {
  console.log(res.data.data, "res.data");
  list.value = res.data.data;
});
</script>
<template>
  <div class="card" style="width: 18rem" v-for="item in list">
    <div class="card-body">
      <h5 class="card-title">{{ item.name || item.prefix }}</h5>
    </div>
  </div>
</template>
<style lang="scss" scoped></style>
