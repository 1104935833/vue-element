<template>
  <div>
    <!-- 荣誉 -->
    <HonerGroup v-if="this.tableName.state=='4'" v-bind="$attrs"></HonerGroup>
    <HonerSelf v-if="this.tableName.state=='3'" v-bind="$attrs"></HonerSelf>
    <!-- 专利 -->
    <patentInvent
      v-if="this.tableName.state=='9'"
      v-bind="$attrs"
    ></patentInvent>
    <!-- 科研 -->
    <academic v-if="this.tableName.state=='21'" v-bind="$attrs" v-on:listenToChild="showMsgFromChild"></academic>
    <firstSubject v-if="this.tableName.state=='17'" v-bind="$attrs" v-on:listenToChild="showMsgFromChild"></firstSubject>
    <lab v-if="this.tableName.state=='18'" v-bind="$attrs" v-on:listenToChild="showMsgFromChild"></lab>
    <monographs v-if="this.tableName.state=='8'" v-bind="$attrs" v-on:listenToChild="showMsgFromChild"></monographs>
    <paper v-if="this.tableName.state=='7'" v-bind="$attrs" v-on:listenToChild="showMsgFromChild"></paper>
    <production v-if="this.tableName.state=='20'" v-bind="$attrs" v-on:listenToChild="showMsgFromChild"></production>
    <portrait v-if="this.tableName.state=='10'" v-bind="$attrs" v-on:listenToChild="showMsgFromChild"></portrait>
    <technological v-if="this.tableName.state=='19'" v-bind="$attrs" v-on:listenToChild="showMsgFromChild"></technological>
    <transverse v-if="this.tableName.state=='11'" v-bind="$attrs" v-on:listenToChild="showMsgFromChild"></transverse>
  </div>
</template>
<script>
import HonerGroup from "../achievementInput/Hornor/Perhonorgroup";
import HonerSelf from "../achievementInput/Hornor/Perhonorpersonal";
import patentInvent from "../achievementInput/Scientific/zhuanli/patentInvent";
import academic from "../achievementInput/Scientific/academic";
import firstSubject from "../achievementInput/Scientific/firstSubject";
import lab from "../achievementInput/Scientific/lab";
import monographs from "../achievementInput/Scientific/monographs";
import paper from "../achievementInput/Scientific/paper";
import production from "../achievementInput/Scientific/production";
import portrait from "../achievementInput/Scientific/portrait";
import technological from "../achievementInput/Scientific/technological";
import transverse from "../achievementInput/Scientific/transverse";

export default {
  props: ["message"],
  components: {
    HonerGroup: HonerGroup,
    HonerSelf: HonerSelf,
    patentInvent: patentInvent,
    academic: academic,
    firstSubject: firstSubject,
    lab: lab,
    monographs: monographs,
    paper: paper,
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