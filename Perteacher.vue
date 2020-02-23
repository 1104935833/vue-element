[1mdiff --cc src/components/achievementInput/Perteacher.vue[m
[1mindex 4b920a3,f9c9270..0000000[m
[1m--- a/src/components/achievementInput/Perteacher.vue[m
[1m+++ b/src/components/achievementInput/Perteacher.vue[m
[36m@@@ -1,25 -1,9 +1,31 @@@[m
  <template>[m
    <div>[m
      <el-row>[m
[32m++<<<<<<< HEAD[m
[32m +      <el-col :span="12" align="center">[m
[32m +        <h1>个人教学业绩</h1>[m
[32m +      </el-col>[m
[32m +      [m
[32m +      <el-col :span="12" align="center">[m
[32m +        <h1>集体教学业绩</h1>[m
[32m +      </el-col>[m
[32m +    </el-row>[m
[32m +    <el-row>[m
[32m +      <el-col>&nbsp;</el-col>[m
[32m +    </el-row>[m
[32m +    <el-row>[m
[32m +      <el-col :span="10">[m
[32m +        <Personal></Personal>[m
[32m +      </el-col>[m
[32m +      <el-col :span="4">&nbsp;</el-col>[m
[32m +      <el-col :span="10">[m
[32m +        <Group></Group>[m
[32m +      </el-col>[m
[32m++=======[m
[32m+       <el-col :span="12">[m
[32m+         <Personal></Personal>[m
[32m+       </el-col>[m
[32m++>>>>>>> 5e5cf001e674e18e8d8ee199fe8f710a03f612dc[m
      </el-row>[m
      [m
    </div>  [m
[1mdiff --cc src/components/achievementInput/Teacher/personalteacher.vue[m
[1mindex 7687537,b0ecfc8..0000000[m
[1m--- a/src/components/achievementInput/Teacher/personalteacher.vue[m
[1m+++ b/src/components/achievementInput/Teacher/personalteacher.vue[m
[36m@@@ -1,18 -1,28 +1,45 @@@[m
  <template>[m
[32m++<<<<<<< HEAD[m
[32m +    <div>[m
[32m +        <xueshengkeyanzhidao></xueshengkeyanzhidao>[m
[32m +    </div>[m
[32m++=======[m
[32m+   <div>[m
[32m+     <el-tabs type="border-card">[m
[32m+       <el-tab-pane label="学生科研指导">[m
[32m+         <xueshengkeyanzhidao></xueshengkeyanzhidao>[m
[32m+       </el-tab-pane>[m
[32m+       <el-tab-pane label="教学技能竞赛">[m
[32m+         <Jiaoxuejinengjingsai></Jiaoxuejinengjingsai>[m
[32m+       </el-tab-pane>[m
[32m+       <el-tab-pane label="学科竞赛指导">[m
[32m+         <Xuekejingsaizhidao></Xuekejingsaizhidao>[m
[32m+       </el-tab-pane>[m
[32m+     </el-tabs>[m
[32m+   </div>[m
[32m++>>>>>>> 5e5cf001e674e18e8d8ee199fe8f710a03f612dc[m
  </template>[m
  [m
  <script>[m
  import xuekejingsaizhidao from "./P-xuekejingsaizhidao";[m
  import jiaoxuejinengjingsai from "./P-jiaoxuejinengjingsai";[m
[32m++<<<<<<< HEAD[m
[32m +import xueshengkeyanzhidao from "./P-xueshengkeyanzhidao"[m
[32m +export default {[m
[32m +  components: {[m
[32m +    Xuekejingsaizhidao:xuekejingsaizhidao,[m
[32m +    Jiaoxuejinengjingsai:jiaoxuejinengjingsai,[m
[32m +    Xueshengkeyanzhidao:xueshengkeyanzhidao,[m
[32m +  },[m
[32m +}[m
[32m++=======[m
[32m+ import xueshengkeyanzhidao from "./P-xueshengkeyanzhidao";[m
[32m+ export default {[m
[32m+   components: {[m
[32m+     Xuekejingsaizhidao: xuekejingsaizhidao,[m
[32m+     Jiaoxuejinengjingsai: jiaoxuejinengjingsai,[m
[32m+     Xueshengkeyanzhidao: xueshengkeyanzhidao[m
[32m+   }[m
[32m+ };[m
[32m++>>>>>>> 5e5cf001e674e18e8d8ee199fe8f710a03f612dc[m
  </script>[m
[1mdiff --git a/config/index.js b/config/index.js[m
[1mindex 096b05f..c4ac856 100644[m
[1m--- a/config/index.js[m
[1m+++ b/config/index.js[m
[36m@@ -12,7 +12,7 @@[m [mmodule.exports = {[m
     assetsPublicPath: '/',[m
     proxyTable: {[m
       '/': {[m
[31m-        target: 'http://39.98.93.238:8082',[m
[32m+[m[32m        target: 'http://localhost:8082',[m
         changeOrigin: true,[m
         pathRewrite: {[m
           '^/': ''[m
