<template>
  <div>
    <el-tabs type="border-card">
      <el-tab-pane label="论文">
        <Paper></Paper>
      </el-tab-pane>
      <el-tab-pane label="专著">
        <Monographs></Monographs>
      </el-tab-pane>
      <el-tab-pane label="专利">
        <Patent></Patent>
      </el-tab-pane>
      <el-tab-pane label="纵向科研项目">
        <Portrait></Portrait>
      </el-tab-pane>
      <el-tab-pane label="横向科研项目">
        <Transverse></Transverse>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import paper from "./paper.vue";
import monographs from "./monographs.vue";
import patent from "./zhuanli/patentInvent";
import portrait from "./portrait.vue";
import transverse from "./transverse.vue";
export default {
  components:{
    Paper:paper,
    Monographs:monographs,
    Portrait:portrait,
    Transverse:transverse,
    Patent:patent
  },

};
</script>