<template>
    <div>
        <div style="padding-bottom:30px;">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item >首页</el-breadcrumb-item>
                <el-breadcrumb-item v-text="this.$router.currentRoute.name"></el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div style="background-color:white">
            <keep-alive>
            <router-view v-if="this.$route.meta.keepAlive"></router-view>
            </keep-alive>
            <router-view v-if="!this.$route.meta.keepAlive"></router-view>
        </div>
    </div>
</template>
<script>
  export default{

   
  }
</script>
<style>
 
</style>
