<template>
  <div>
    <el-row>
      <el-col>
        软件全称：
        <el-input placeholder="请输入..." v-model="form.softwareFullName"></el-input>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="10">
        软件简称：
        <el-input placeholder="请输入..." v-model="form.softwareShortName"></el-input>
      </el-col>
      <el-col :span="2">&nbsp;</el-col>
      <el-col :span="12">
        版本号：
        <el-input placeholder="请输入..." v-model="form.versionNumber"></el-input>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        开发完成日期：
        <el-date-picker v-model="form.finishTime" type="date" placeholder="选择日期"></el-date-picker>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="10">
        编程语言：
        <el-input placeholder="请输入..." v-model="form.programmingLanguage"></el-input>
      </el-col>
      <el-col :span="2">&nbsp;</el-col>
      <el-col :span="12">
        源程序量：
        <el-input placeholder="请输入..." v-model="form.programAmount"></el-input>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="10">
        硬件环境：
        <el-input placeholder="请输入..." v-model="form.hardwareEnvironment"></el-input>
      </el-col>
      <el-col :span="2">&nbsp;</el-col>
      <el-col :span="12">
        软件环境：
        <el-input placeholder="请输入..." v-model="form.softwareEnvironment"></el-input>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="10">
        著作人姓名：
        <el-input placeholder="请输入..." v-model="form.inventor"></el-input>
      </el-col>
      <el-col :span="2">&nbsp;</el-col>
      <el-col :span="12">
        著作人通讯地址：
        <el-input placeholder="请输入..." v-model="form.inventAddress"></el-input>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="10">
        申请人：
        <el-input placeholder="请输入..." v-model="form.applicant"></el-input>
      </el-col>
      <el-col :span="2">&nbsp;</el-col>
      <el-col :span="12">
        代理人：
        <el-input placeholder="请输入..." v-model="form.agent"></el-input>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        专利代理机构名称：
        <el-input placeholder="请输入..." v-model="form.agencyName"></el-input>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        专利代理机构所在地区：
        <el-input placeholder="请输入..." v-model="form.agencyAddress"></el-input>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="10">
        代理机构代码：
        <el-input placeholder="请输入..." v-model="form.agencyCode"></el-input>
      </el-col>
      <el-col :span="2">&nbsp;</el-col>
      <el-col :span="12">
        专利号：
        <el-input placeholder="请输入..." v-model="form.patentNumber"></el-input>
      </el-col>
    </el-row>
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
      this.form.tableState=15;
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
