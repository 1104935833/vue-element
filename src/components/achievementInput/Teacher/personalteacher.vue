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
      <el-tab-pane label="教改项目">
        <jiaogaixiangmu></jiaogaixiangmu>
      </el-tab-pane>
      <el-tab-pane label="教学成果奖">
        <jiaoxuechengguojiang></jiaoxuechengguojiang>
      </el-tab-pane>
      <el-tab-pane label="教研教改论文">
        <jiaoyanjiaogailunwen></jiaoyanjiaogailunwen>
      </el-tab-pane>
      <el-tab-pane label="课程建设与课程改革">
        <kechengjiansheyukechenggaige></kechengjiansheyukechenggaige>
      </el-tab-pane>
      <el-tab-pane label="教材编写">
        <jiaocaibianxie></jiaocaibianxie>
      </el-tab-pane>
      <el-tab-pane label="专业建设">
        <zhuanuejianshe></zhuanuejianshe>
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
<<<<<<< HEAD
import jiaoxuejinengjingsai from "./P-jiaoxuejinengjingsai";
import xueshengkeyanzhidao from "./P-xueshengkeyanzhidao"
export default {
  components: {
    Xuekejingsaizhidao:xuekejingsaizhidao,
    Jiaoxuejinengjingsai:jiaoxuejinengjingsai,
    Xueshengkeyanzhidao:xueshengkeyanzhidao,
  },
}
=======
import xueshengkeyanzhidao from "./P-xueshengkeyanzhidao";
import zhuanuejianshe from "./G-zhuanyejianshe";
export default {
  components: {
    jiaocaibianxie: jiaocaibianxie,
    jiaogaixiangmu: jiaogaixiangmu,
    jiaoxuechengguojiang: jiaoxuechengguojiang,
    jiaoxuejinengjingsai: jiaoxuejinengjingsai,
    jiaoyanjiaogailunwen: jiaoyanjiaogailunwen,
    kechengjiansheyukechenggaige: kechengjiansheyukechenggaige,
    xuekejingsaizhidao: xuekejingsaizhidao,
    xueshengkeyanzhidao: xueshengkeyanzhidao,
    zhuanuejianshe: zhuanuejianshe
  }
};
>>>>>>> a3aa6a891df37c445f7d2d757ca76e3646d51219
</script>