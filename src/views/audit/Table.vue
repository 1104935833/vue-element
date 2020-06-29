<template>
  <div>
    <!-- 荣誉 -->
    <HonerGroup
      v-if="this.tableName.state=='23'"
      :table="tableName"
      @listenToChild="showMsgFromChild"
    />
    <HonerSelf
      v-if="this.tableName.state=='22'"
      :table="tableName"
      @listenToChild="showMsgFromChild"
    />
    <!-- 专利 -->
    <patentInvent
      v-if="this.tableName.state=='9'"
      :table="tableName"
      @listenToChild="showMsgFromChild"
    />
    <!-- 科研 -->
    <academic
      v-if="this.tableName.state=='21'"
      :table="tableName"
      @listenToChild="showMsgFromChild"
    />
    <firstSubject
      v-if="this.tableName.state=='17'"
      :table="tableName"
      @listenToChild="showMsgFromChild"
    />
    <lab v-if="this.tableName.state=='18'" :table="tableName" @listenToChild="showMsgFromChild" />
    <monographs
      v-if="this.tableName.state=='8'"
      :table="tableName"
      @listenToChild="showMsgFromChild"
    />
    <paper v-if="this.tableName.state=='7'" :table="tableName" @listenToChild="showMsgFromChild" />
    <production
      v-if="this.tableName.state=='20'"
      :table="tableName"
      @listenToChild="showMsgFromChild"
    />
    <portrait
      v-if="this.tableName.state=='10'"
      :table="tableName"
      @listenToChild="showMsgFromChild"
    />
    <technological
      v-if="this.tableName.state=='19'"
      :table="tableName"
      @listenToChild="showMsgFromChild"
    />
    <transverse
      v-if="this.tableName.state=='11'"
      :table="tableName"
      @listenToChild="showMsgFromChild"
    />
    <professional
      v-if="this.tableName.state=='32'"
      :table="tableName"
      @listenToChild="showMsgFromChild"
    />
    <textBook
      v-if="this.tableName.state=='31'"
      :table="tableName"
      @listenToChild="showMsgFromChild"
    />
    <educational
      v-if="this.tableName.state=='27'"
      :table="tableName"
      @listenToChild="showMsgFromChild"
    />
    <achiecement
      v-if="this.tableName.state=='28'"
      :table="tableName"
      @listenToChild="showMsgFromChild"
    />
    <skill v-if="this.tableName.state=='25'" :table="tableName" @listenToChild="showMsgFromChild" />
    <teachingReform
      v-if="this.tableName.state=='29'"
      :table="tableName"
      @listenToChild="showMsgFromChild"
    />
    <course v-if="this.tableName.state=='30'" :table="tableName" @listenToChild="showMsgFromChild" />
    <competition
      v-if="this.tableName.state=='26'"
      :table="tableName"
      @listenToChild="showMsgFromChild"
    />
    <studentResearch
      v-if="this.tableName.state=='24'"
      :table="tableName"
      @listenToChild="showMsgFromChild"
    />
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
import professional from "../achievementInput/Teacher/professional";
import textBook from "../achievementInput/Teacher/textBook";
import educational from "../achievementInput/Teacher/educational";
import achiecement from "../achievementInput/Teacher/achiecement";
import skill from "../achievementInput/Teacher/skill";
import teachingReform from "../achievementInput/Teacher/teachingReform";
import course from "../achievementInput/Teacher/course";
import competition from "../achievementInput/Teacher/competition";
import studentResearch from "../achievementInput/Teacher/studentResearch";
export default {
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
  props: ["message"],
  data() {
    return {
      tableName: this.message,
      chilData: ""
    };
  },
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
