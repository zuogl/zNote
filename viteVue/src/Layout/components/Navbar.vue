<template>
    <el-menu mode="horizontal" @select="handleSelect" :default-active="activeIndex">
        <template v-for="item in constantRoutes" :key="item.path">
            <el-menu-item v-if="item.children.length == 1" :index="item.path">
                <el-icon v-if="item.meta">
                    <component :is="item.meta.icon"></component>
                </el-icon>
                {{ item.name }}</el-menu-item>
            <SubMenu :prop-route="item" v-if="item.children.length > 1" />
        </template>
    </el-menu>
</template>

<script name="Navbar" setup>
import SubMenu from "./SubMenu.vue";
import { ref } from "vue";
import { constantRoutes } from "@/router"
import getDR from '@/utils/getDR.js'


const { router } = getDR()
const activeIndex = ref(constantRoutes[0].path)

const handleSelect = (key) => {
    router.push(key)
}

</script>

<style lang="scss" scoped>

</style>

