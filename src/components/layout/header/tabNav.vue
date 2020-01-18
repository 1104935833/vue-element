<template>
  <div style="margin-top:20px;margin-left:30px;padding-bottom:10px;">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{path: this.path}" :key="routername" >{{routername}}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
  name: "tabNav",
  data() {
    return {
      routername: "主页",
      path: "/home"
    };
  },
  created:function(){
    this.path = this.$route.path;
      this.routername = this.$route.name;
  },
  watch: {
    $route(to, from) {
      this.path = this.$route.path;
      this.routername = this.$route.name;
    }
  }
};
</script>
<style scoped>
</style>
