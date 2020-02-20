<template>
  <div>
    <el-row>
      <el-col :span="10">
        著作名称：
        <el-input placeholder="请输入..." v-model="form.monographsName"></el-input>
      </el-col>
      <el-col :span="2">&nbsp;</el-col>
      <el-col :span="12">
        所属学科：
        <el-input placeholder="请输入..." v-model="form.subordinateSubject"></el-input>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="10">
        主&nbsp;题&nbsp;词：
        <el-input placeholder="请输入..." v-model="form.themeWord"></el-input>
      </el-col>
      <el-col :span="2">&nbsp;</el-col>
      <el-col :span="12">
        联系电话：
        <el-input placeholder="请输入..." v-model="form.phone"></el-input>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="10">
        作者名称：
        <el-input placeholder="请输入..." v-model="form.authorName"></el-input>
      </el-col>
      <el-col :span="2">&nbsp;</el-col>
      <el-col :span="12">
        总&nbsp;字&nbsp;数：
        <el-input placeholder="请输入..." v-model="form.wordNumber"></el-input>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="10">
        出版册数：
        <el-input placeholder="请输入..." v-model="form.publishedNumber"></el-input>
      </el-col>
      <el-col :span="2">&nbsp;</el-col>
      <el-col :span="12">
        著作完成时间：
        <el-date-picker v-model="finishTime" type="date" placeholder="选择日期"></el-date-picker>
      </el-col>
    </el-row>
    <el-row>
      <el-col align="center">上传佐证材料：</el-col>
    </el-row>
    <el-row>
      <el-col :span="24" align="center">
        <el-upload
          class="upload-demo"
          drag
          action="https://jsonplaceholder.typicode.com/posts/"
          multiple
        >
          <i class="el-icon-upload"></i>

          <div class="el-upload__text">
            将文件拖到此处，或
            <em>点击上传</em>
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
        monographsName: "",
        themeWord: "",
        authorName: "",
        finishTime: "",
        subordinateSubject: "",
        phone: "",
        wordNumber: "",
        publishedNumber: "",
        fileId: ""
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
      this.postRequest("/insertPaper", this.form).then(res => {});
    },
    clear() {
      this.form = {
        id: "",
        paperTitle: "",
        firstAuthor: "",
        correspondenceAuthor: "",
        firstAuthorType: "",
        publication: "",
        time: "",
        paperSchool: "",
        paperVolume: "",
        paperPage: "",
        paperGrade: ""
      };
    }
  }
};
</script>