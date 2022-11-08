<template>
    <div>
        <h1>这是关于页面</h1>
        <div>这是鼠标的X方向的位置:{{ x }}</div>
        <div>这是鼠标的Y方向的位置:{{ y }}</div>
        <h1 @click="add">{{count}}</h1>
    </div>
</template>

<script setup>
import {ref} from "vue"
import useMouse from '@/utils/mouse';
let { x, y } = useMouse();
let count = ref(1)
let color = ref('red')
function add (){
    count.value++
    color.value = Math.random() > 0.5 ?'blue' :'red'
}
</script>

<style lang="scss" scoped>
    h1{
        color: v-bind(color);
    }
</style>