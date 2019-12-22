<template>
  <div style="margin-top:20px;margin-left:30px;padding-bottom:10px;">        
    <el-breadcrumb separator-class="el-icon-arrow-right" >
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item v-bind:key="routername"><span></span></el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
  export default {
    name: 'tabNav',
    data () {
      return {
        routername : this.$router.currentRoute.name
      }
    },
    methods:{

    }

   
  }
</script>
