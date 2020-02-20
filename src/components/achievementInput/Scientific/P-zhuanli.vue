<template>
  <div>
    <span>选择专利类型</span>
    <el-select v-model="value" placeholder="请选择">
      <el-option v-for="item in options" :key="item.id" :label="item.label" :value="item.id"></el-option>
    </el-select>
    <Famin v-if="value==40"></Famin>
    <Xinxing v-if="value==41"></Xinxing>
    <Sheji v-if="value==42"></Sheji>
    <Zhuzuo v-if="value==43"></Zhuzuo>
    <Zhuanrang v-if="value==44"></Zhuanrang>
  </div>
</template>
<script>
import famin from "./zhuanli/P-famingzhuanli";
import xinxing from "./zhuanli/P-shiyongxinxingzhuanli";
import sheji from "./zhuanli/P-waiguanshejizhuanli";
import zhuzuo from "./zhuanli/P-ruanjianzhuzuozhuanli";
import zhuanrang from "./zhuanli/P-zhuanlizhuanrang";
export default {
  components: {
    Famin: famin,
    Xinxing: xinxing,
    Sheji: sheji,
    Zhuzuo: zhuzuo,
    Zhuanrang: zhuanrang
  },
  data() {
    return {
      options: [],
      value: ""
    };
  },
  mounted() {
    this.getRequest("/common/getOption", {
      option: "scientific",
      title: "researchSelfPatent",
      value: ""
    }).then(res => {
      this.options = res.data.options;
    });
  },
  methods: {
    
  }
};
</script>
<style scoped>
</style>