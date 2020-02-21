<template>
  <div>
    <el-tabs type="border-card">
      <el-tab-pane label="学生科研指导">
        <xueshengkeyanzhidao></xueshengkeyanzhidao>
      </el-tab-pane>
      <el-tab-pane label="教学技能竞赛">
        <jiaoxuejinengjingsai></jiaoxuejinengjingsai>
      </el-tab-pane>
      <el-tab-pane label="学科竞赛指导">
        <xuekejingsaizhidao></xuekejingsaizhidao>
      </el-tab-pane>
      <el-tab-pane label="学科竞赛指导">
        <jiaogaixiangmu></jiaogaixiangmu>
      </el-tab-pane>
      <el-tab-pane label="学科竞赛指导">
        <jiaoxuechengguojiang></jiaoxuechengguojiang>
      </el-tab-pane>
      <el-tab-pane label="学科竞赛指导111111">
        <jiaoxuejinengjingsai></jiaoxuejinengjingsai>
      </el-tab-pane>
      <el-tab-pane label="学科竞赛指导">
        <jiaoyanjiaogailunwen></jiaoyanjiaogailunwen>
      </el-tab-pane>
      <el-tab-pane label="学科竞赛指导">
        <kechengjiansheyukechenggaige></kechengjiansheyukechenggaige>
      </el-tab-pane>
       <el-tab-pane label="学科竞赛指导">
         <xueshengkeyanzhidao></xueshengkeyanzhidao>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>


            
    
            
    
            
           

<script>
import jiaocaibianxie from "./P-jiaocaibianxie";
import jiaogaixiangmu from "./P-jiaogaixiangmu";
import jiaoxuechengguojiang from "./P-jiaoxuechengguojiang";
import jiaoxuejinengjingsai from "./P-jiaoxuejinengjingsai";
import jiaoyanjiaogailunwen from "./P-jiaoyanjiaogailunwen";
import kechengjiansheyukechenggaige from "./P-kechengjiansheyukechenggaige";
import xuekejingsaizhidao from "./P-xuekejingsaizhidao";
import xueshengkeyanzhidao from "./P-xueshengkeyanzhidao";
export default {
  components: {
    jiaocaibianxie: jiaocaibianxie,
    jiaogaixiangmu: jiaogaixiangmu,
    jiaoxuechengguojiang: jiaoxuechengguojiang,
    jiaoxuejinengjingsai: jiaoxuejinengjingsai,
    jiaoyanjiaogailunwen: jiaoyanjiaogailunwen,
    kechengjiansheyukechenggaige: kechengjiansheyukechenggaige,
    xuekejingsaizhidao: xuekejingsaizhidao,
    xueshengkeyanzhidao: xueshengkeyanzhidao
  }
};
</script>