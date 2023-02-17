<template>
    <div class="f-wraper">
        <p :class="isGreen ? 'green' : 'red'">这是用v-html指令渲染的，该指令内部有动态的类名！</p>
        <button id="counter" @click="increment">{{ count }}</button>
        <input type="number" v-model="num">
        <p>父组件中输入的值是：{{ num }}</p>
        <p v-lower="UpperCase"></p>
    </div>
    <Child ref="child" class="test" id="child" v-model:num="num" @click="handleClick" />
</template>

<script name="Test" setup>
import { ref, reactive, nextTick, onBeforeUpdate, onUpdated, onMounted } from 'vue'
import Child from './Child.vue'
let isGreen = ref(true)
const count = ref(0)

const num = ref(0)
const UpperCase = ref('Hello World!')
const vLower = {
    mounted(el,binding,vnode,prevNode){
        let {value} = binding
        let content = value.toLowerCase()
        el.innerHTML=content
    },
    updated(el,binding,vnode,prevNode){
        let {value} = binding
        let content = value.toLowerCase()
        el.innerHTML=content
    }
}


async function increment() {
    count.value++
}

function handleNoValidateClick(num) {
    console.log('父组件中 ---- handleNoValidateClick：', num)
}

function handleNeedValidateClick(num) {
    console.log('父组件中 ---- handleNeedValidateClick', num)
}


function handleClick(){
    console.log(666)
}

setTimeout(() => {
    isGreen.value = false
    UpperCase.value = 'Hello Vue3!!'
}, 3000);


</script>

<style lang="scss" scoped>
.f-wraper{
    border: 1px solid red;
}
.red {
    color: red;
}

.green {
    color: green;
}
</style>