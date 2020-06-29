<template>
  <div id="search">
    <div v-if="types=='3' || types=='4' || types=='22' || types=='23'">
      <!--荣誉-->
      组织名称：
      <el-input placeholder="请输入内容" v-model="form.data1"></el-input>
    </div>
    <div v-if="types=='7'">
      <!--论文-->
      第一作者：
      <el-input placeholder="请输入内容" v-model="form.data1"></el-input>发表时间：
      <el-date-picker
        placeholder="选择日期"
        type="date"
        v-model="form.data2"
        format="yyyy-MM-dd"
        value-format="yyyy-MM-dd"
        @change="dateChangebirthday"
      ></el-date-picker>第一作者类型：
      <el-input placeholder="发表范围" v-model="form.data3"></el-input>
    </div>
    <div v-if="types=='8'">
      <!--专著-->
      所属学科：
      <el-input placeholder="请输入内容" v-model="form.data1"></el-input>主题词：
      <el-input placeholder="请输入内容" v-model="form.data2"></el-input>作者名称：
      <el-input placeholder="请输入内容" v-model="form.data3"></el-input>
    </div>
    <div v-if="types=='9'">
      <!--专利-->
      专利号：
      <el-input placeholder="请输入内容" v-model="form.data1"></el-input>完成者：
      <el-input placeholder="请输入内容" v-model="form.data2"></el-input>类别：
      <el-input placeholder="请输入内容" v-model="form.data3"></el-input>
    </div>
    <div v-if="types=='10'">
      <!--纵向科研项目-->
      项目负责人：
      <el-input placeholder="请输入内容" v-model="form.data1"></el-input>项目类型：
      <el-input placeholder="请输入内容" v-model="form.data2"></el-input>依托单位：
      <el-input placeholder="请输入内容" v-model="form.data3"></el-input>
    </div>
    <div v-if="types=='11'">
      <!--横向科研项目-->
      所属一级学科:
      <el-input placeholder="请输入内容" v-model="form.data1"></el-input>研究类别：
      <el-input placeholder="请输入内容" v-model="form.data2"></el-input>项目负责人：
      <el-input placeholder="请输入内容" v-model="form.data3"></el-input>
    </div>
    <div v-if="types=='24'">
      <!--学生科研指导-->
      项目负责人：
      <el-input placeholder="请输入内容" v-model="form.data1"></el-input>
    </div>
    <div v-if="types=='25'">
      <!--教学技能竞赛-->
      负责人：
      <el-input placeholder="请输入内容" v-model="form.data1"></el-input>
    </div>
    <div v-if="types=='26'">
      <!--学科竞赛指导-->
      主办单位：
      <el-input placeholder="请输入内容" v-model="form.data1"></el-input>竞赛负责人：
      <el-input placeholder="请输入内容" v-model="form.data2"></el-input>
    </div>
    <div v-if="types=='17'">
      <!--重点(一流学科)-->
      依托学校：
      <el-input placeholder="请输入内容" v-model="form.data1"></el-input>申报学科名称：
      <el-input placeholder="请输入内容" v-model="form.data2"></el-input>学科带头人：
      <el-input placeholder="请输入内容" v-model="form.data3"></el-input>
    </div>
    <div v-if="types=='18'">
      <!--重点实验室-->
      负责人：
      <el-input placeholder="请输入内容" v-model="form.data1"></el-input>
    </div>
    <div v-if="types=='19'">
      <!--科技创新平台-->
      专题名称：
      <el-input placeholder="请输入内容" v-model="form.data1"></el-input>
    </div>
    <div v-if="types=='21'">
      <!--学术创新平台-->
      研究方向：
      <el-input placeholder="请输入内容" v-model="form.data1"></el-input>
    </div>
    <div v-if="types=='27'">
      <!--教改项目-->
      项目负责人：
      <el-input placeholder="请输入内容" v-model="form.data1"></el-input>讲授的主要课程名称：
      <el-input placeholder="请输入内容" v-model="form.data2"></el-input>讲授的主要课程类别：
      <el-input placeholder="请输入内容" v-model="form.data3"></el-input>
    </div>
    <div v-if="types=='28'">
      <!--教学成果奖-->
      成果完成人：
      <el-input placeholder="请输入内容" v-model="form.data1"></el-input>成果完成单位：
      <el-input placeholder="请输入内容" v-model="form.data2"></el-input>成果科类：
      <el-input placeholder="请输入内容" v-model="form.data3"></el-input>
    </div>
    <div v-if="types=='29'">
      <!--教研教改-->
      等级：
      <el-input placeholder="请输入内容" v-model="form.data1"></el-input>
    </div>
    <div v-if="types=='30'">
      <!--课程建设与课程改革-->
      所属专业：
      <el-input placeholder="请输入内容" v-model="form.data1"></el-input>课程负责人：
      <el-input placeholder="请输入内容" v-model="form.data2"></el-input>主讲教师：
      <el-input placeholder="请输入内容" v-model="form.data3"></el-input>
    </div>
    <div v-if="types=='31'">
      <!--教材编写-->
      主编姓名：
      <el-input placeholder="请输入内容" v-model="form.data1"></el-input>参编姓名：
      <el-input placeholder="请输入内容" v-model="form.data2"></el-input>
    </div>
    <div v-if="types=='32'">
      <!--专业建设-->
      所在院系：
      <el-input placeholder="请输入内容" v-model="form.data1"></el-input>专业负责人：
      <el-input placeholder="请输入内容" v-model="form.data2"></el-input>
    </div>
  </div>
</template>
<script>
export default {
  props: ["type"],
  data() {
    return {
      types: "",
      form: { data1: "", data2: "", data3: "", data4: "" }
    };
  },
  mounted() {
    this.types = this.type;
    this.form = { data1: "", data2: "", data3: "", data4: "" };
  },
  methods: {
    dateChangebirthday(val) {
      this.form.data2 = val;
    },
    getVal() {
      return this.form;
    }
  }
};
</script>
<style scoped>
#search .el-input {
  position: relative;
  font-size: 14px;
  display: inline-block;
  width: 250px;
  padding-right: 5%;
}
</style>
