
<template >
    <el-sub-menu :index="propRoute.path">
        <template #title>{{ propRoute.name }}</template>
        <template :key="route.path" v-for="route in propRoute.children">
            <el-menu-item :index="propRoute.path + '/' + route.path" v-if="!route.children">{{ route.name
            }}</el-menu-item>
            <SubMenu :prop-route="route" v-if="route.children && route.children.length" />
        </template>
    </el-sub-menu>
</template>


<script name="SubMenu" setup>
defineProps({
    propRoute: {
        required: true,
        type: Object,
        default: () => { }
    },
})
</script>

<style lang="scss" scoped></style>