<template>
  <div>
    <!-- 荣誉 -->
    <HonerGroup v-if="this.tableName.state=='4'" v-bind="$attrs"></HonerGroup>
    <HonerSelf v-if="this.tableName.state=='3'" v-bind="$attrs"></HonerSelf>
    <!-- 专利 -->

    <famingzhuanli
      v-if="this.tableName.state=='12'"
      v-bind="$attrs"
    ></famingzhuanli>
    <ruanjianzhuzuozhuanli
      v-if="this.tableName.state=='15'"
      v-bind="$attrs"
    ></ruanjianzhuzuozhuanli>
    <shiyongxinxingzhuanli
      v-if="this.tableName.state=='13'"
      v-bind="$attrs"
    ></shiyongxinxingzhuanli>
    <waiguanshejizhuanli
      v-if="this.tableName.state=='14'"
      v-bind="$attrs"
    ></waiguanshejizhuanli>
    <zhuanlizhuanrang
      v-if="this.tableName.state=='16'"
      v-bind="$attrs"
    ></zhuanlizhuanrang>
    <!-- 科研 -->
    <academic v-if="this.tableName.state=='21'" v-bind="$attrs"></academic>
    <firstSubject v-if="this.tableName.state=='17'" v-bind="$attrs"></firstSubject>
    <lab v-if="this.tableName.state=='18'" v-bind="$attrs"></lab>
    <monographs v-if="this.tableName.state=='8'" v-bind="$attrs"></monographs>
    <paper v-if="this.tableName.state=='7'" v-bind="$attrs" v-on:listenToChild="showMsgFromChild"></paper>
    <production v-if="this.tableName.state=='20'" v-bind="$attrs"></production>
    <portrait v-if="this.tableName.state=='10'" v-bind="$attrs"></portrait>
    <technological v-if="this.tableName.state=='19'" v-bind="$attrs"></technological>
    <transverse v-if="this.tableName.state=='11'" v-bind="$attrs"></transverse>
  </div>
</template>
<script>
import HonerGroup from "../achievementInput/Hornor/Perhonorgroup";
import HonerSelf from "../achievementInput/Hornor/Perhonorpersonal";
import famingzhuanli from "../achievementInput/Scientific/zhuanli/P-famingzhuanli";
import ruanjianzhuzuozhuanli from "../achievementInput/Scientific/zhuanli/P-ruanjianzhuzuozhuanli";
import shiyongxinxingzhuanli from "../achievementInput/Scientific/zhuanli/P-shiyongxinxingzhuanli";
import waiguanshejizhuanli from "../achievementInput/Scientific/zhuanli/P-waiguanshejizhuanli";
import zhuanlizhuanrang from "../achievementInput/Scientific/zhuanli/P-zhuanlizhuanrang";
import academic from "../achievementInput/Scientific/academic";
import firstSubject from "../achievementInput/Scientific/firstSubject";
import lab from "../achievementInput/Scientific/lab";
import monographs from "../achievementInput/Scientific/monographs";
import paper from "../achievementInput/Scientific/paper";
import patent from "../achievementInput/Scientific/patent";
import production from "../achievementInput/Scientific/production";
import portrait from "../achievementInput/Scientific/portrait";
import technological from "../achievementInput/Scientific/technological";
import transverse from "../achievementInput/Scientific/transverse";

export default {
  props: ["message"],
  components: {
    HonerGroup: HonerGroup,
    HonerSelf: HonerSelf,
    famingzhuanli: famingzhuanli,
    ruanjianzhuzuozhuanli: ruanjianzhuzuozhuanli,
    shiyongxinxingzhuanli: shiyongxinxingzhuanli,
    waiguanshejizhuanli: waiguanshejizhuanli,
    zhuanlizhuanrang: zhuanlizhuanrang,
    academic: academic,
    firstSubject: firstSubject,
    lab: lab,
    monographs: monographs,
    paper: paper,
    patent: patent,
    production: production,
    portrait: portrait,
    technological: technological,
    transverse: transverse
  },
  data() {
    return {
      tableName: this.message,
      chilData:""
    };
  },
  mounted(){
     this.getComponents();
  },

  created() {
    // this.showMsgFromChild();
  },
  methods: {
    sendMsgToGrand(){
      this.$emit("listenToGrand",this.chilData);
    },
    showMsgFromChild(data){
      this.chilData = data;
      this.sendMsgToGrand()
    },
    getComponents(){
        this.tableName= this.message
    }
  }
};
</script>