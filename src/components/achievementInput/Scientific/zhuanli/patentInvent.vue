<template>
  <div>
    <el-row>
      <el-col>
        专利名称：
        <el-input placeholder="请输入..." v-model="form.projectName"></el-input>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        类别：
        <el-radio-group v-model="form.firstAuthorType">
          <el-radio :label="0">发明专利</el-radio>
          <el-radio :label="1">软件专著专利</el-radio>
          <el-radio :label="2">实用型专利</el-radio>
          <el-radio :label="3">外观设计专利</el-radio>
          <el-radio :label="4">专利转让</el-radio>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        完成者：
        <el-input placeholder="请输入..." v-model="form.projectLeader"></el-input>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        专利号：
        <el-input placeholder="请输入..." v-model="form.inventName"></el-input>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        署名次序：
        <el-input placeholder="请输入..." v-model="form.patentNumber"></el-input>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        完成者单位：
        <el-input placeholder="请输入..." v-model="form.patentNumber"></el-input>
      </el-col>
    </el-row>
    <!-- <el-row>
      <el-col :span="12">
        起始时间：
        <el-date-picker v-model="form.startTime" type="date" placeholder="选择日期"></el-date-picker>
      </el-col>
      <el-col :span="12">
        结束时间：
        <el-date-picker v-model="form.finishTime" type="date" placeholder="选择日期"></el-date-picker>
      </el-col>
    </el-row> -->
    <!-- <el-row>
      <el-col :span="10">
        受让单位名称：
        <el-input placeholder="请输入..." v-model="form.acceptingUniName"></el-input>
      </el-col>
      <el-col :span="2">&nbsp;</el-col>
      <el-col :span="12">
        受让单位法定代表人：
        <el-input placeholder="请输入..." v-model="form.acceptingUnitRepresentative"></el-input>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        受让单位联系方式或通讯地址：
        <el-input placeholder="请输入..." v-model="form.acceptingUnitPhone"></el-input>
      </el-col>
    </el-row> -->
    <el-row>
        <el-col align="center">
            上传佐证材料：
        </el-col>
    </el-row>
    <el-row>
      <el-col :span="24" align="center">
          <el-upload
        class="upload-demo"
        drag
        action="https://jsonplaceholder.typicode.com/posts/"
        multiple>
        <i class="el-icon-upload"></i>

        <div class="el-upload__text">
          将文件拖到此处，或<em>点击上传</em>
        </div>
      </el-upload>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12" align="center">
        <div v-if="msgType==undefined">
          <el-button type="primary" @click="onSubmit">提交</el-button>
          <el-button @click=" clear">取消</el-button>
        </div>

        <div v-if="msgType==1">
          <el-button type="primary" @click="onSubmit">通过</el-button>
          <el-button @click="clear">不通过</el-button>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  data() {
    return {
      form: {
        id: "",
        inventName: "",
        inventor: "",
        phone: "",
        inventAddress: "",
        applicant: "",
        agent: "",
        applicationNumber: "",
        applicantAddress: "",
        agencyName: "",
        agencyAddress: "",
        agencyCode: "",
        patentNumber: "",
        softwareFullName: "",
        softwareShortName: "",
        versionNumber: "",
        startTime: "",
        finishTime: "",
        programmingLanguage: "",
        programAmount: "",
        hardwareEnvironment: "",
        softwareEnvironment: "",
        projectName: "",
        inventionUnit: "",
        projectLeader: "",
        acceptingUniName: "",
        acceptingUnitRepresentative: "",
        acceptingUnitPhone: "",
        acceptingUnitAddress: "",
        fileId: "",
        type: "",
        tableState: -1
      },
      input: "",
      msgType: 2
    };
  },
  mounted() {
    let msg = this.$attrs.msgType;
    if (msg === undefined) {
      this.msgType = undefined;
    } else this.msgType = msg.type;
  },
  created() {},
  methods: {
    onSubmit() {
      this.form.tableState=16;
      this.postRequest("/insertPatentInvent", this.form).then(res => {});
    },
    clear() {
      this.form = {
        id: "",
        inventName: "",
        inventor: "",
        phone: "",
        inventAddress: "",
        applicant: "",
        agent: "",
        applicationNumber: "",
        applicantAddress: "",
        agencyName: "",
        agencyAddress: "",
        agencyCode: "",
        patentNumber: "",
        softwareFullName: "",
        softwareShortName: "",
        versionNumber: "",
        startTime: "",
        finishTime: "",
        programmingLanguage: "",
        programAmount: "",
        hardwareEnvironment: "",
        softwareEnvironment: "",
        projectName: "",
        inventionUnit: "",
        projectLeader: "",
        acceptingUniName: "",
        acceptingUnitRepresentative: "",
        acceptingUnitPhone: "",
        acceptingUnitAddress: "",
        fileId: "",
        type: "",
        tableState: -1
      };
    }
  }
};
</script>