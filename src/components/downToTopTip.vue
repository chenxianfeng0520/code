<script setup name="DownToTopTip">
import { CheckCircleFilled } from "@ant-design/icons-vue";


const props = defineProps({
    text:String,
})

const show = ref(false);
setTimeout(() => {
  show.value = true;
});
setTimeout(() => {
  show.value = false;
}, 4000);
</script>
<template>
  <Transition
    enter-active-class="animate__animated animate__bounceInUp"
    leave-active-class="animate__animated animate__backOutDown"
    name="custom-classes"
  >
    <div class="alert alert-success down-to-top-tip" role="alert" v-if="show">
      <CheckCircleFilled />
      <span>{{ text }}</span>
    </div>
  </Transition>
</template>
<style lang="scss" scoped>
.down-to-top-tip {
  min-width: 120px;
  position: fixed;
  left: 30px;
  bottom: 30px;
  background-color: #20a64e;
  color: #ffffff;
  border-radius: 12px;
  font-size: 16px;
  border: none;
  padding: 10px 20px 13px 20px;
  span {
    vertical-align: middle;
    margin-right: 5px;
  }
}
</style>
