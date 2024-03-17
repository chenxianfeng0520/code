<script setup>
import { lottery } from "@/api/lottery.js";
import { CalculatorOutlined, CopyOutlined, SyncOutlined } from "@ant-design/icons-vue";
import { h } from 'vue';
import { message } from "ant-design-vue";

const length = ref("10");
const min = ref("0");
const max = ref("20");
const result = ref("");

async function getLottery() {
  const res = await lottery({
    length: length.value,
    min: min.value,
    max: max.value,
  });
  result.value = res.data.lottery;
  console.log(result.value, "res");
}

getLottery();

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
</script>

<template>
  <div class="lottery-page animate__animated animate__backInDown">
    <h3 class="title">
      <CalculatorOutlined />
      <span>生成随机数</span>
    </h3>
    <a-space
      class="site-input-group-wrapper"
      direction="vertical"
      size="middle"
    >
      长度
      <a-input v-model:value="length" allowClear></a-input>
      范围
      <a-input-group compact>
        <a-input
          v-model:value="min"
          style="width: 160px; text-align: center"
          placeholder="Minimum"
        />
        <a-input
          class="site-input-split"
          style="width: 36px; border-left: 0; pointer-events: none"
          placeholder="~"
          disabled
        />
        <a-input
          v-model:value="max"
          class="site-input-right"
          style="width: 160px; text-align: center"
          placeholder="Maximum"
        />
      </a-input-group>
      <a-button type="primary" @click="getLottery" :icon="h(SyncOutlined)">点击生成结果</a-button>
      <a-button
        type="link"
        @click="copy(result)"
        :title="result"
        class="result"
      >
        {{ result }}<CopyOutlined />
      </a-button>
    </a-space>
  </div>
</template>

<style lang="scss" scoped>
.lottery-page {
  width: 420px;
  height: 420px;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-left: -210px;
  margin-top: -210px;
  color: #efffda;
  padding: 50px 30px;
  background-color: rgb(46 109 123 / 68%);
  border-radius: 30px;
  font-size: 20px;
  .title {
    text-align: center;
    font-weight: 600;
    span {
      vertical-align: middle;
      display: inline-block;
      margin-right: 10px;
    }
  }

  :deep(.result) {
    span {
      vertical-align: middle;
      font-size: 27px;
      color: #ffc107;
      font-weight: 600;
      &:nth-child(1) {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        max-width: 300px;
      }
      svg {
        color: #15ff92;
      }
    }
  }
  :deep(.ant-btn) {
    span {
      vertical-align: middle;
    }
  }
}
.site-input-group-wrapper .site-input-split {
  background-color: #fff;
}

.site-input-group-wrapper .site-input-right {
  border-left-width: 0;
}

.site-input-group-wrapper .site-input-right:hover,
.site-input-group-wrapper .site-input-right:focus {
  border-left-width: 1px;
}

.site-input-group-wrapper .ant-input-rtl.site-input-right {
  border-right-width: 0;
}

.site-input-group-wrapper .ant-input-rtl.site-input-right:hover,
.site-input-group-wrapper .ant-input-rtl.site-input-right:focus {
  border-right-width: 1px;
}
[data-theme="dark"] .site-input-group-wrapper .site-input-split {
  background-color: transparent;
}
</style>
