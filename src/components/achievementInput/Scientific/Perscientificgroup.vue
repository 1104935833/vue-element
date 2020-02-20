<template>
  <div>
    <el-tabs type="border-card">
      <el-tab-pane label="重点(一流学科)">
        <Xueke></Xueke>
      </el-tab-pane>
      <el-tab-pane label="重点实验室">
        <Shiyanshi></Shiyanshi>
      </el-tab-pane>
      <el-tab-pane label="科技创新平台">
        <Pintai></Pintai>
      </el-tab-pane>
      <el-tab-pane label="产学科研联盟">
        <Lianmen></Lianmen>
      </el-tab-pane>
      <el-tab-pane label="学术创新团队">
        <Team></Team>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import xueke from "./G-yiliuxueke";
import shiyanshi from "./G-zhongdianshiyanshi";
import pintai from "./G-kejichuangxinpingtai";
import lianmen from "./G-chanxuekeyanlianmeng";
import team from "./G-xueshuchuangxintuandui";
export default {
  components: {
    Xueke: xueke,
    Shiyanshi: shiyanshi,
    Pintai: pintai,
    Lianmen: lianmen,
    Team: team
  }
};
</script>