<template>
  <div>
    <!-- 荣誉 -->
    <HonerGroup v-if="this.tableName.state=='23'" v-bind="$attrs"></HonerGroup>
    <HonerSelf v-if="this.tableName.state=='22'" v-bind="$attrs"></HonerSelf>
    <!-- 专利 -->
    <patentInvent v-if="this.tableName.state=='9'" v-bind="$attrs"></patentInvent>
    <!-- 科研 -->
    <academic
      v-if="this.tableName.state=='21'"
      v-bind="$attrs"
      v-on:listenToChild="showMsgFromChild"
    ></academic>
    <firstSubject
      v-if="this.tableName.state=='17'"
      v-bind="$attrs"
      v-on:listenToChild="showMsgFromChild"
    ></firstSubject>
    <lab v-if="this.tableName.state=='18'" v-bind="$attrs" v-on:listenToChild="showMsgFromChild"></lab>
    <monographs
      v-if="this.tableName.state=='8'"
      v-bind="$attrs"
      v-on:listenToChild="showMsgFromChild"
    ></monographs>
    <paper v-if="this.tableName.state=='7'" v-bind="$attrs" v-on:listenToChild="showMsgFromChild"></paper>
    <production
      v-if="this.tableName.state=='20'"
      v-bind="$attrs"
      v-on:listenToChild="showMsgFromChild"
    ></production>
    <portrait
      v-if="this.tableName.state=='10'"
      v-bind="$attrs"
      v-on:listenToChild="showMsgFromChild"
    ></portrait>
    <technological
      v-if="this.tableName.state=='19'"
      v-bind="$attrs"
      v-on:listenToChild="showMsgFromChild"
    ></technological>
    <transverse
      v-if="this.tableName.state=='11'"
      v-bind="$attrs"
      v-on:listenToChild="showMsgFromChild"
    ></transverse>
    <professional
      v-if="this.tableName.state=='32'"
      v-bind="$attrs"
      v-on:listenToChild="showMsgFromChild"
    ></professional>
    <textBook
      v-if="this.tableName.state=='31'"
      v-bind="$attrs"
      v-on:listenToChild="showMsgFromChild"
    ></textBook>
    <educational
      v-if="this.tableName.state=='27'"
      v-bind="$attrs"
      v-on:listenToChild="showMsgFromChild"
    ></educational>
    <achiecement
      v-if="this.tableName.state=='28'"
      v-bind="$attrs"
      v-on:listenToChild="showMsgFromChild"
    ></achiecement>
    <skill v-if="this.tableName.state=='25'" v-bind="$attrs" v-on:listenToChild="showMsgFromChild"></skill>
    <teachingReform
      v-if="this.tableName.state=='29'"
      v-bind="$attrs"
      v-on:listenToChild="showMsgFromChild"
    ></teachingReform>
    <course v-if="this.tableName.state=='30'" v-bind="$attrs" v-on:listenToChild="showMsgFromChild"></course>
    <competition
      v-if="this.tableName.state=='26'"
      v-bind="$attrs"
      v-on:listenToChild="showMsgFromChild"
    ></competition>
    <studentResearch
      v-if="this.tableName.state=='24'"
      v-bind="$attrs"
      v-on:listenToChild="showMsgFromChild"
    ></studentResearch>
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
import professional from "../achievementInput/Teacher/G-zhuanyejianshe";
import textBook from "../achievementInput/Teacher/P-jiaocaibianxie";
import educational from "../achievementInput/Teacher/P-jiaogaixiangmu";
import achiecement from "../achievementInput/Teacher/P-jiaoxuechengguojiang";
import skill from "../achievementInput/Teacher/P-jiaoxuejinengjingsai";
import teachingReform from "../achievementInput/Teacher/P-jiaoyanjiaogailunwen";
import course from "../achievementInput/Teacher/P-kechengjiansheyukechenggaige";
import competition from "../achievementInput/Teacher/P-xuekejingsaizhidao";
import studentResearch from "../achievementInput/Teacher/P-xueshengkeyanzhidao";
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
    transverse: transverse,
    professional: professional,
    textBook: textBook,
    educational: educational,
    achiecement: achiecement,
    skill: skill,
    teachingReform: teachingReform,
    course: course,
    competition: competition,
    studentResearch: studentResearch
  },
  data() {
    return {
      tableName: this.message,
      chilData: ""
    };
  },
  mounted() {
    this.getComponents();
  },

  created() {},
  methods: {
    sendMsgToGrand() {
      this.$emit("listenToGrand", this.chilData);
    },
    showMsgFromChild(data) {
      this.chilData = data;
      this.sendMsgToGrand();
    },
    getComponents() {
      this.tableName = this.message;
    }
  }
};
</script>