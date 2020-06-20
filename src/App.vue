<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'app',
    computed: {
      userInfo () {
        return this.$store.state.userInfo
      }
    },
    created () {}
  }
</script>

<style>
@tailwind base;
@tailwind components;
@tailwind utilities;
#app {
  color: #2c3e50;
  height: 100%;
  width: 100%;
  font-size: 14px;
}
</style>
