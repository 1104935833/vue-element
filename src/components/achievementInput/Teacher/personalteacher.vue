<template>
  <div>
    <el-tabs type="border-card">
      <el-tab-pane label="学生科研指导">
        <xueshengkeyanzhidao></xueshengkeyanzhidao>
      </el-tab-pane>
      <el-tab-pane label="教学技能竞赛">
        <Jiaoxuejinengjingsai></Jiaoxuejinengjingsai>
      </el-tab-pane>
      <el-tab-pane label="学科竞赛指导">
        <Xuekejingsaizhidao></Xuekejingsaizhidao>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import xuekejingsaizhidao from "./P-xuekejingsaizhidao";
import jiaoxuejinengjingsai from "./P-jiaoxuejinengjingsai";
import xueshengkeyanzhidao from "./P-xueshengkeyanzhidao";
export default {
  components: {
    Xuekejingsaizhidao: xuekejingsaizhidao,
    Jiaoxuejinengjingsai: jiaoxuejinengjingsai,
    Xueshengkeyanzhidao: xueshengkeyanzhidao
  }
};
</script>