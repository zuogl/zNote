<template>
  <div class="c-wraper" :class="$attrs.class">
    <p>这是子组件</p>
    <input :value="num" @input="handleInput($event)" />
    <p>子组件中输入的值是：{{ num }}</p>
    <!-- <span>Fallthrough attribute: {{ $attrs }}</span> -->
    <!-- <button @click="handleNoValidateClick">触发了不需要验证的事件:noValidateClick</button>
    <button @click="handleNeedValidateClick">触发了需要验证的事件:needValidateClick</button> -->
  </div>
  <div :id="$attrs.id">这是第二个节点</div>

</template>
<script setup>
import { ref, onMounted } from 'vue'
defineProps(['num'])
let emit = defineEmits(['update:num'])



function handleInput(e) {
  emit('update:num', e.target.value)
}

onMounted(() => {
  // console.log('attrs',$attrs)
})
const a = 1
const b = ref(2)

// 像 defineExpose 这样的编译器宏不需要导入
defineExpose({
  a,
  b
})
</script>




<style lang="scss" scoped>
.c-wraper {
  border: 1px dotted green;
  margin-top: 10px;
}
</style>
