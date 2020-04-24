<template>
  <div>
    <el-form ref="form" :rules="rules" :model="form">
      <el-row>
        <el-col :span="10">
          <el-form-item label="著作名称：" prop="name">
            <el-input placeholder="请输入..." v-model="form.name" :disabled="disable"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="2">&nbsp;</el-col>
        <el-col :span="12">
          <el-form-item label="所属学科：" prop="subordinateSubject">
            <el-input placeholder="请输入..." v-model="form.subordinateSubject" :disabled="disable"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="10">
          <el-form-item label="主 题 词：" prop="themeWord">
            <el-input placeholder="请输入..." v-model="form.themeWord" :disabled="disable"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="2">&nbsp;</el-col>
        <el-col :span="12">
          <el-form-item label="联系电话：" prop="phone">
            <el-input placeholder="请输入..." v-model="form.phone" :disabled="disable"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="10">
          <el-form-item label="作者名称：" prop="authorName">
            <el-input placeholder="请输入..." v-model="form.authorName" :disabled="disable"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="2">&nbsp;</el-col>
        <el-col :span="12">
          <el-form-item label="总 字 数：" prop="wordNumber">
            <el-input placeholder="请输入..." v-model="form.wordNumber" :disabled="disable"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="10">
          <el-form-item label="出版册数：" prop="publishedNumber">
            <el-input placeholder="请输入..." v-model="form.publishedNumber" :disabled="disable"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="2">&nbsp;</el-col>
        <el-col :span="12">
          <el-form-item label="著作完成时间：" prop="finishTime">
            <el-date-picker
              v-model="form.finishTime"
              type="date"
              placeholder="选择日期"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              @change="dateChangebirthday"
              :disabled="disable"
            ></el-date-picker>
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
  data() {
    return {
      form: {
        id: "",
        name: "",
        themeWord: "",
        authorName: "",
        finishTime: "",
        subordinateSubject: "",
        phone: "",
        wordNumber: "",
        publishedNumber: "",
        fileId: ""
      },
      fileUrl: "",
      msgType: "",
      msg: "",
      buttonShow: "",
      role: "",
      disable: true,
      rules: {
        name: [{ required: true, message: "请输入著作标题", trigger: "blur" }],
        themeWord: [
          { required: true, message: "请输入主题词", trigger: "blur" }
        ],
        authorName: [
          { required: true, message: "请输入作者名称", trigger: "blur" }
        ],
        finishTime: [
          { required: true, message: "请选择著作完成时间", trigger: "blur" }
        ],
        subordinateSubject: [
          { required: true, message: "请输入所属学科", trigger: "blur" }
        ],
        phone: [{ required: true, message: "请输入联系电话", trigger: "blur" },
        { pattern: /^1[34578]\d{9}$/, message: '目前只支持中国大陆的手机号码' }],
        wordNumber: [
          { required: true, message: "请输入总字数", trigger: "blur" },
          { pattern: /[0-9]\d$/, message: '请输入数字' }
        ],
        publishedNumber: [
          { required: true, message: "请输入出版册数", trigger: "blur" },
          { pattern: /[0-9]\d$/, message: '请输入数字' }
        ]
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
          themeWord: tableStatus.theme_word,
          authorName: tableStatus.author_name,
          finishTime: tableStatus.finish_time,
          subordinateSubject: tableStatus.subordinate_subject,
          phone: tableStatus.time,
          wordNumber: tableStatus.word_number,
          publishedNumber: tableStatus.published_number,
          fileId: tableStatus.file_id
        };
        if (this.form.finishTime.length == 13) {
          this.form.finishTime = this.$options.filters["dateFormat"](
            this.form.finishTime
          );
        }
        this.disable = true;
      } else {
        this.getRequest("/getMonographs", {
          tableId: this.msg.message.id
        }).then(res => {
          this.form = res.data.res;
        });
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
          window.location.href = this.$fileUrl + res.data.file.fileName;
        });
      } else if (isNumber(this.form.fileId)) {
        window.location.href = this.$fileUrl + this.fileUrl;
      } else {
        window.location.href = this.$fileUrl + this.form.fileId;
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
          userId: this.msg.message.user_id,
          status: state,
          id: this.msg.tableid.id,
          agree: agree
        }).then(res => {
          this.sendMsgToParent();
        });
      }
    },
    updata() {
      this.post("/updataMonographs", {
        monographs: this.form,
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
          this.postRequest("/insertMonographs", this.form).then(res => {
            this.clear();
          });
        } else {
          return false;
        }
      });
    },
    clear(form) {
      this.$nextTick(() => {
        this.$refs.form.resetFields();
        this.$refs.file.clearFiles();
      });
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