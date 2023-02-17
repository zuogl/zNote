<template>
  <div>
    <router-link to="/">首页</router-link>
    <router-link to="/about" style="margin-left: 20px;">鼠标</router-link>
    <router-link to="/sudoku" style="margin-left: 20px;">数独</router-link>
    <router-link to="/test" style="margin-left: 20px;">测试</router-link>
  </div>
  <router-view></router-view>
</template>

<script>
export default {
  name: 'App',
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
