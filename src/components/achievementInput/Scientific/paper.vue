<template>
  <div>
    <el-form ref="form" :rules="rules" :model="form">
      <el-row>
        <el-col>
          <el-form-item label="论文标题：" prop="name">
            <el-input placeholder="请输入..." v-model="form.name" :disabled="disable"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="10">
          <el-form-item label="第一作者：" prop="firstAuthor">
            <el-input placeholder="请输入..." v-model="form.firstAuthor" :disabled="disable"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12" :offset="1">
          <el-form-item label="通讯作者：" prop="correspondenceAuthor">
            <el-input placeholder="请输入..." v-model="form.correspondenceAuthor" :disabled="disable"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item label="第一作者类型:" prop="firstAuthorType">
            <el-radio-group v-model="form.firstAuthorType" :disabled="disable">
              <el-radio :label="0">本校老师</el-radio>
              <el-radio :label="1">本校学生</el-radio>
              <el-radio :label="2">外校人员</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="10">
          <el-form-item label="发表刊物/论文集：" prop="publication">
            <el-input placeholder="请输入..." v-model="form.publication" :disabled="disable"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12" :offset="1">
          <el-form-item label="发表出版时间：" prop="time">
            <el-date-picker
              :disabled="disable"
              v-model="form.time"
              type="date"
              placeholder="选择日期"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              @change="dateChangebirthday"
            ></el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item label="学校署名：" prop="paperSchool">
            <el-radio-group v-model="form.paperSchool" :disabled="disable">
              <el-radio label="1">第一单位</el-radio>
              <el-radio label="2">非第一单位</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="10">
          <el-form-item label="卷号：" prop="paperVolume">
            <el-input placeholder="请输入..." v-model="form.paperVolume" :disabled="disable"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12" :offset="1">
          <el-form-item label="页码范围：" prop="paperPage">
            <el-input placeholder="请输入..." v-model="form.paperPage" :disabled="disable"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item label="等级:" prop="paperGrade">
            <el-radio-group v-model="form.paperGrade" :disabled="disable">
              <el-radio :label="1">一级</el-radio>
              <el-radio :label="2">二级</el-radio>
              <el-radio :label="3">三级</el-radio>
              <el-radio :label="4">EI</el-radio>
              <el-radio :label="5">SCI</el-radio>
              <el-radio :label="6">CSSCI</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col align="center">上传佐证材料：</el-col>
      </el-row>
      <el-row>
        <el-col :span="24" align="center">
          <el-upload
            :disabled="disable"
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
        <el-col
          :span="24"
          align="center"
          v-if="form.fileId!=null && form.fileId!=''"
          class="upload-demo"
        >
          <a @click="down">下载材料</a>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12" align="center">
          <div v-if="buttonShow==1" class="upload-demo">
            <el-button type="primary" @click="onSubmit('form')">提交</el-button>
            <el-button @click=" clear('form')">取消</el-button>
          </div>
          <!-- 修改 -->
          <div v-if="buttonShow==3" class="upload-demo">
            <el-button type="primary" @click="updata()">修改</el-button>
          </div>
          <div v-if="buttonShow==2" class="upload-demo">
            <el-button type="primary" @click="check('1','1')">通过</el-button>
            <el-button @click="check('2','0')">不通过</el-button>
          </div>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>
<script>
import { isNumber } from "../../../utils/validate";
export default {
  props: ["msgs"],
  data() {
    return {
      form: {
        id: "",
        name: "",
        firstAuthor: "",
        correspondenceAuthor: "",
        firstAuthorType: "",
        publication: "",
        time: "",
        paperSchool: "",
        paperVolume: "",
        paperPage: "",
        paperGrade: "",
        fileId: ""
      },
      fileUrl: "",
      msgType: "",
      msg: "",
      buttonShow: "",
      role: "",
      disable: true,
      rules: {
        name: [{ required: true, message: "请输入论文标题", trigger: "blur" }],
        firstAuthor: [
          { required: true, message: "请输入第一作者", trigger: "blur" }
        ],
        correspondenceAuthor: [
          { required: true, message: "请输入通讯作者", trigger: "blur" }
        ],
        firstAuthorType: [
          { required: true, message: "请选择第一作者类型", trigger: "blur" }
        ],
        publication: [
          { required: true, message: "请输入刊物论文集", trigger: "blur" }
        ],
        time: [{ required: true, message: "请输入发表时间", trigger: "blur" }],
        paperSchool: [
          { required: true, message: "请选择学校署名", trigger: "blur" }
        ],
        paperVolume: [
          { required: true, message: "请输入卷号", trigger: "blur" }
        ],
        paperPage: [
          { required: true, message: "请输入页面范围", trigger: "blur" }
        ],
        paperGrade: [{ required: true, message: "请选择等级", trigger: "blur" }]
      }
    };
  },
  mounted() {
    this.getComponents();
    let tableStatus = this.msg.tableid;
    let user = JSON.parse(localStorage.getItem("user"));
    if (this.msgType != undefined) {
      if (this.msg.type == 2) {
        this.form = {
          id: tableStatus.id,
          name: tableStatus.name,
          firstAuthor: tableStatus.first_author,
          correspondenceAuthor: tableStatus.correspondence_author,
          firstAuthorType: tableStatus.first_author_type,
          publication: tableStatus.publication,
          time: tableStatus.time,
          paperSchool: tableStatus.paper_school + "",
          paperVolume: tableStatus.paper_volume,
          paperPage: tableStatus.paper_page,
          paperGrade: tableStatus.paper_grade,
          fileId: tableStatus.file_id
        };
        if (this.form.time.length == 13) {
          this.form.time = this.$options.filters["dateFormat"](this.form.time);
        }
        this.disable = true;
      } else {
        this.getRequest("/getPaper", { tableId: this.msg.message.id }).then(
          res => {
            this.form = res.data.res;
          }
        );
        this.getRequest("/common/getUserRole").then(res => {
          this.role = res.data;
          if (
            (res.data == 6 &&
              tableStatus.auditor_court_name == undefined &&
              tableStatus.auditor_research_name != undefined &&
              tableStatus.audit_status != 0 &&
              tableStatus.audit_status != 2) ||
            (tableStatus.auditor_research_name == undefined &&
              tableStatus.audit_status == 0 &&
              res.data != 27 &&
              res.data != "")
          ) {
            this.buttonShow = 2;
            this.disable = true;
          } else if (
            res.data == 27 ||
            (res.data == "" && tableStatus.audit_status == 2) ||
            (tableStatus.proposer_name == tableStatus.auditor_research_name &&
              tableStatus.audit_status == 2)
          ) {
            this.buttonShow = 3;
            this.disable = false;
          }
        });
      }
    } else {
      //提交
      this.buttonShow = 1;
      this.disable = false;
    }
  },
  methods: {
    down() {
      if (isNumber(this.form.fileId) && this.fileUrl == "") {
        this.getRequest("/common/getFileNameById", {
          id: this.form.fileId
        }).then(res => {
          window.location.href =
            "http://localhost:8083/data/access/" + res.data.file.fileName;
        });
      } else if (isNumber(this.form.fileId)) {
        window.location.href =
          "http://localhost:8083/data/access/" + this.fileUrl;
      } else {
        window.location.href =
          "http://localhost:8083/data/access/" + this.form.fileId;
      }
    },
    dateChangebirthday(val) {
      this.form.time = val;
    },
    sendMsgToParent: function() {
      this.$emit("listenToChild", false);
    },
    check(state, agree) {
      if (
        this.msg.tableid.auditor_research_name == undefined &&
        this.role == 6
      ) {
        this.$message({ type: "error", message: "请等待教研室审核" });
      } else {
        this.getRequest("/check", {
          tableId: this.msg.message.id,
          status: state,
          id: this.msg.tableid.id,
          agree: agree
        }).then(res => {
          this.sendMsgToParent();
        });
      }
    },
    updata() {
      this.post("/updataPaper", {
        paper: this.form,
        tableId: this.msg.tableid.id,
        id: this.msg.tableid.id
      }).then(res => {
        this.sendMsgToParent();
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
    },
    onSubmit(form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          this.postRequest("/insertPaper", this.form).then(res => {
            this.clear();
          });
        } else {
          return false;
        }
      });
    },
    clear(form) {
      this.$refs[form].resetFields();
      this.$refs.file.clearFiles();
    },
    handleSuccess(response, file, fileList) {
      if (file.status == "success") {
        this.$message({ message: "文件上传成功", type: "success" });
        this.fileUrl = file.response.obj.fileName;
        this.form.fileId = file.response.obj.fileId;
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
    }
  }
};
</script>

<style>
.upload-demo {
  margin-bottom: 30px;
}
a {
  margin-bottom: 30px;
}
</style>