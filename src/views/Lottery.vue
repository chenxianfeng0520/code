<script setup>
import { lottery } from "@/api/lottery.js";
import {
  CalculatorOutlined,
  CopyOutlined,
  SyncOutlined,
} from "@ant-design/icons-vue";
import { h } from "vue";
import { message } from "ant-design-vue";

const length = ref("10");
const min = ref("0");
const max = ref("20");
const result = ref([]);
const resultList = ref([]);
async function getLottery() {
  if (result.value?.length) {
    resultList.value.push(result.value.join(" "));
  }
  result.value = [];
  const res = await lottery({
    length: length.value,
    min: min.value,
    max: max.value,
  });
  result.value = res.data.lottery?.split(" ");
}

// getLottery();

function copy(text) {
  if (window.clipboardData) {
    window.clipboardData.setData("text", text);
  } else {
    document.oncopy = function (e) {
      e.clipboardData.setData("text", text);
      e.preventDefault();
      document.oncopy = null;
    };
    document.execCommand("Copy", false, null);
  }
  message.success("复制成功");
}

const colorList = [
  "border-primary",
  "border-primary-subtle",
  "border-secondary",
  "border-secondary-subtle",
  "border-success",
  "border-success-subtle",
  "border-danger",
  "border-danger-subtle",
  "border-warning",
  "border-warning-subtle",
  "border-info",
  "border-info-subtle",
  "border-light",
  "border-light-subtle",
  "border-dark",
  "border-dark-subtle",
  "border-black",
  "border-white",
];

function theFormat(number) {
  return number.toFixed(2);
}
</script>

<template>
  <div class="box center">
    <div class="lottery animate__animated animate__backInDown">
      <div class="mb-3 input-box">
        <label for="exampleInputEmail1" class="form-label">总个数</label>
        <input type="text" class="form-control" v-model="length" />
      </div>
      <div class="mb-3 input-box">
        <label for="exampleInputEmail1" class="form-label">最小数</label>
        <input type="text" class="form-control" v-model="min" />
      </div>
      <div class="mb-3 input-box">
        <label for="exampleInputEmail1" class="form-label">最大数</label>
        <input type="text" class="form-control" v-model="max" />
      </div>
      <button type="button" class="btn btn-primary chouqian" @click="getLottery">
        <span>生成</span>
      </button>
      <div class="flex-box-space-evenly">
        <div
          v-for="(item, index) in result"
          :class="`result border ${colorList[index]} center animate__animated animate__tada`"
        >
          {{ item }}
        </div>
      </div>
      <ul class="list-group list-box">
        <li
          class="list-group-item"
          v-for="(item, index) in resultList"
          :key="item"
        >
          <span class="badge text-bg-success">#{{ index + 1 }}</span>
          <span>{{ item }}</span>
          <CopyOutlined @click="copy(item)"></CopyOutlined>
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.box {
  height: 100vh;
  width: 100vw;
}
.center {
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
  flex-direction: column;
  flex-wrap: nowrap;
}
.flex-box-space-evenly {
  display: flex;
  justify-content: space-evenly;
}
.lottery {
  width: 800px;
  height: 800px;
  border-radius: 20px;
  border: 1px solid #495057;
  padding: 20px;
  box-sizing: border-box;
  background-color: #2b3035cf;

  .result {
    width: 60px;
    height: 60px;
    color: #fff;
    font-size: 40px;
    font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS",
      sans-serif;
    margin-top: 30px;
  }
}
.max-min {
  max-width: 600px;
}
.input-group-text {
  width: 80px;
  justify-content: center;
}
.chouqian {
  width: calc(100% - 30px);
  height: 50px;
  font-size: 23px;
  margin-left: 15px;
  margin-top: 30px;
  img {
    width: 40px;
    height: 40px;
    position: relative;
    margin-bottom: -8px;
    margin-left: -10px;
  }
}
.input-box {
  width: calc(100% - 40px);
  margin-left: 20px;
  margin-top: 20px;
}
.form-label {
  color: #fff;
  font-size: 20px;
  font-weight: 600;
}
.list-box {
  margin-top: 30px;
  width: calc(100% - 30px);
  margin-left: 15px;
  max-height: 240px;
  overflow: auto;
}
.list-group-item {
  background-color: transparent;
  color: #fff;
  border: none;
  font-style:oblique;
  span {
    vertical-align: middle;
    margin-right: 10px;
  }
}
.form-control {
  background-color: transparent;
  color: #ffffff;
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS";
  font-size: 20px;
  border-color: #ffc107;
  text-align: center;
}
.form-control:focus {
  background-color: transparent;
}
</style>
