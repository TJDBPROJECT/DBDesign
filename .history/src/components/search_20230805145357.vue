<!-- eslint-disable vue/multi-word-component-names -->
<template>
      <el-container>
        <!-- 搜索栏 --><!-- 导航栏 -->
        <el-header>
          <seach :fa-msg="products"></seach>
        </el-header>
    </el-container>
  </template>
  
  <script>
  import header from '../components/header.vue'
  export default {
    data() {
      return {
      }
    },
    components: {
      "seach": header,
    },
    methods: {
    
    },
    created() {
    }
  };
  </script>
<style scoped>

</style>