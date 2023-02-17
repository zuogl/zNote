<template>
    <div>
        <el-menu  class="el-menu-demo" >
            <el-menu-item index="1">Processing Center</el-menu-item>
            <el-sub-menu index="2">
                <template #title>Workspace</template>
                <el-menu-item index="2-1">item one</el-menu-item>
                <el-menu-item index="2-2">item two</el-menu-item>
                <el-menu-item index="2-3">item three</el-menu-item>
                <el-sub-menu index="2-4">
                    <template #title>item four</template>
                    <el-menu-item index="2-4-1">item one</el-menu-item>
                    <el-menu-item index="2-4-2">item two</el-menu-item>
                    <el-menu-item index="2-4-3">item three</el-menu-item>
                </el-sub-menu>
            </el-sub-menu>
            <el-menu-item index="4">Orders</el-menu-item>
        </el-menu>

        <el-menu mode="horizontal" @select="handleSelect" :default-active="activeIndex">
                <el-menu-item :index="item.path" :key="item.path" v-for="item in constantRoutes" >{{ item.name }}</el-menu-item>
                
        </el-menu>
    </div>
</template>

<script name="Navbar" setup>
import { onMounted } from "vue";

import { constantRoutes } from "@/router"
import { ref } from 'vue'

const activeIndex = ref(constantRoutes[0].path)

const handleSelect = (key, keyPath) => {
    console.log(key, keyPath)
}




onMounted(() => {
    console.log('constantRoutes', constantRoutes)
})

</script>

<style lang="scss" scoped></style>