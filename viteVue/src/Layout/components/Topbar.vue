<template>
    <div class="top-bar-wraper">
        <Navbar style="width: 80%;" />
        <Right />
    </div>
</template>

<script name="Topbar" setup>
import Navbar from "./Navbar.vue";
import Right from "./Right.vue";
</script>

<style lang="scss" scoped>
.top-bar-wraper {
    width: 100%;
    display: flex;
}
</style>