<template>
  <div>
    <el-row>
      <el-col >
        <Demo1></Demo1>
      </el-col>
      <!-- <el-col :span="12">
        <Demo2></Demo2>
      </el-col> -->
    </el-row>
  </div>
</template>

<script>
import demo1 from "./Chart1.vue";
// import demo2 from "./Chart2.vue";
export default {
  components: {
    Demo1: demo1, //将别名demo 变成 组件 Demo
    // Demo2: demo2 //将别名demo 变成 组件 Demo
  }
};
</script>
<style scoped>
</style>