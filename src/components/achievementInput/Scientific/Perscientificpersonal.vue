<template>
  <div>
    <el-tabs type="border-card">
      <el-tab-pane label="论文">
        <Lunwen></Lunwen>
      </el-tab-pane>
      <el-tab-pane label="专著">
        <Zhuanzhu></Zhuanzhu>
      </el-tab-pane>
      <el-tab-pane label="专利">
        <Zhuanli></Zhuanli>
      </el-tab-pane>
      <el-tab-pane label="纵向科研项目">
        <Zhongxiang></Zhongxiang>
      </el-tab-pane>
      <el-tab-pane label="横向科研项目">
        <Henxiang></Henxiang>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import lunwen from "./P-lunwen";
import zhuanzhu from "./P-zhuanzhu";
import zhuanli from "./P-zhuanli";
import zhongxiang from "./P-zongxiangkeyanxiangmu";
import henxiang from "./P-waixiangkeyanxiangmu";
export default {
  components:{
    Lunwen:lunwen,
    Zhuanzhu:zhuanzhu,
    Zhongxiang:zhongxiang,
    Henxiang:henxiang,
    Zhuanli:zhuanli
  },

};
</script>