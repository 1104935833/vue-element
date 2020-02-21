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
          <el-radio :label=0>本校老师</el-radio>
          <el-radio :label=1>本校学生</el-radio>
          <el-radio :label=2>外校人员</el-radio>
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
        <!-- 修改 -->
        <div>
          <el-button type="primary" @click="updata()">修改</el-button>
        </div>
        <div v-if="msgType==0 || msgType==1">
          <el-button type="primary" @click="check('1','1')">通过</el-button>
          <el-button @click="check('2','0')">不通过</el-button>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  props: ["msgs"],
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
      msgType: "",
      msg: "",
    };
  },
  mounted() {
    this.getComponents();
    if(this.msgType!=undefined){
    this.getRequest("/getPaper", { id: this.msg.message.table_id }).then(
      res => {
        this.form = res.data.res;
        console.log(this.form);
      }
    );
    }
  },
  created() {},
  methods: {
    sendMsgToParent:function(){
      this.$emit("listenToChild",false);
    },
    check(state,agree){
     
      this.getRequest("/check",{tableId:this.msg.message.table_id,status:state,id:this.msg.tableid.id,agree:agree}).then(res=>{
         this.sendMsgToParent();
      })
    },
    updata() {
      this.post("/updataPaper", {
        paper: this.form,
        tableId: this.msg.tableid.table_id,
        id: this.msg.tableid.id
      });
    },
    getComponents() {
      let msg = this.$attrs.msgType;

      if (msg === undefined) {
        this.msgType = undefined;
      } else {
        this.msgType = msg.type;
        this.msg = msg;
      }
      console.log(this.msg);
    },
    onSubmit() {
      this.postRequest("/insertPaper", this.form).then(res => {
        this.clear()
      });
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
    },
    handleSuccess(response, file, fileList) {
      console.log(file);
      if (file.status == "success") {
        this.$message({ message: "文件上传成功", type: "success" });
      }
    },
    submitUpload() {
      this.$refs.upload.submit();
    },
    handleRemove(file, fileList) {
      //文件移除钩子
      this.getRequest("/common/delFile", {
        fileName: file.response.obj.fileName,
        fileId: file.response.obj.fileId
      }).then(res => {});
    },
    handleError(err, file, fileList) {
      //上传失败钩子
      this.$message.error("文件上传失败");
    },
    handlePreview(file) {
      //点击文件列表中已上传的文件时的钩子
      // console.log(file);
    }
  }
};
</script>
