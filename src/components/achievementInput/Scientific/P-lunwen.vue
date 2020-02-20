<template>
  <div>
    <el-row>
      <el-col>
        论文标题：
        <el-input placeholder="请输入..." v-model="form.paperTitle"></el-input>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="10">
        第一作者：
        <el-input placeholder="请输入..." v-model="form.firstAuthor"></el-input>
      </el-col>
      <el-col :span="2">&nbsp;</el-col>
      <el-col :span="12">
        通讯作者：
        <el-input placeholder="请输入..." v-model="form.correspondenceAuthor"></el-input>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        第一作者类型:
        <el-radio-group v-model="form.firstAuthorType">
          <el-radio :label="1">本校老师</el-radio>
          <el-radio :label="2">本校学生</el-radio>
          <el-radio :label="9">外校人员</el-radio>
        </el-radio-group>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="10">
        发表刊物/论文集：
        <el-input placeholder="请输入..." v-model="form.publication"></el-input>
      </el-col>
      <el-col :span="2">&nbsp;</el-col>
      <el-col :span="12">
        发表出版时间：
        <el-date-picker v-model="form.time" type="date" placeholder="选择日期"></el-date-picker>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        学校署名：
        <el-radio-group v-model="form.paperSchool">
          <el-radio :label="1">第一单位</el-radio>
          <el-radio :label="2">非第一单位</el-radio>
          <el-radio :label="9">备选项</el-radio>
        </el-radio-group>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="10">
        卷号：
        <el-input placeholder="请输入..." v-model="form.paperVolume"></el-input>
      </el-col>
      <el-col :span="2">&nbsp;</el-col>
      <el-col :span="12">
        页码范围：
        <el-input placeholder="请输入..." v-model="form.paperPage"></el-input>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        等级:
        <el-radio-group v-model="form.paperGrade">
          <el-radio label="1">一级</el-radio>
          <el-radio label="2">二级</el-radio>
          <el-radio label="3">三级</el-radio>
          <el-radio label="4">EI</el-radio>
          <el-radio label="5">SCI</el-radio>
          <el-radio label="6">CSSCI</el-radio>
        </el-radio-group>
      </el-col>
    </el-row>
    <el-row>
      <el-col align="center">上传佐证材料：</el-col>
    </el-row>
    <el-row>
      <el-col :span="24" align="center">
        <el-upload
                ref="file"
                class="upload-demo"
                drag
                acceept="application/pdf"
                action="/common/file"
                :on-success="handleSuccess"
                accept=".jpg, .jpeg, .png, .pdf, .JPG, .JPEG, .PDF, .zip, .rar"
                :on-remove="handleRemove"
                :on-error="handleError"
                multiple
              >
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">
                  将文件拖到此处，或
                  <em>点击上传</em>
                </div>
                <div class="el-upload__tip" slot="tip">只能上传jpg/pdf/zip/rar文件</div>
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
      },
      input: "",
      radio: "",
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
