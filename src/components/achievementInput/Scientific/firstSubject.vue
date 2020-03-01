<template>
  <div>
    <el-form ref="form" :rules="rules" :model="form">
      <el-row>
        <!--第1行-->
        <el-col :span="10">
          <el-form-item label="依托学校：" prop="supportSchool">
            <el-input v-model="form.supportSchool" placeholder="请输入内容" :disabled="disable"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12" :offset="2">
          <el-form-item label="学科名称：" prop="name">
            <el-input v-model="form.name" placeholder="请输入内容" :disabled="disable"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <!--第2行-->
      <el-row>
        <el-col :span="10">
          <el-form-item label="联系人：" prop="contact">
            <el-input v-model="form.contact" placeholder="请输入内容" :disabled="disable"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12" :offset="2">
          <el-form-item label="联系电话：" prop="phone">
            <el-input v-model="form.phone" placeholder="请输入内容" :disabled="disable"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <!--第3行-->
      <el-row>
        <!--第3行第1列-->
        <el-col :span="10">
          <el-form-item label="申报学科名称：" prop="declareSubjectName">
            <el-input v-model="form.declareSubjectName" placeholder="请输入内容" :disabled="disable"></el-input>
          </el-form-item>
        </el-col>
        <!--第3行第2列-->
        <el-col :span="12" :offset="2">
          <el-form-item label="学科带头人：" prop="subjectLeader">
            <el-input v-model="form.subjectLeader" placeholder="请输入内容" :disabled="disable"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <!--第4行-->
      <el-row>
        <!--第4行第1列-->
        <el-col :span="10">
          <el-form-item label="获得学位授权情况（名称）：" prop="inceptName">
            <el-input v-model="form.inceptName" placeholder="请输入内容" :disabled="disable"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12" :offset="2">
          <el-form-item label="获得学位授权情况（时间）：" prop="inceptTime">
            <el-date-picker
              :disabled="disable"
              v-model="form.inceptTime"
              type="date"
              placeholder="选择日期"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              @change="dateChangebirthday"
            ></el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <!--第5行-->
      <el-row>
        <el-col>
          <el-form-item label="学科第三方评价情况（各类国际国内权威学科评估等）：" prop="subjectThirdEvaluation">
            <el-input v-model="form.subjectThirdEvaluation" placeholder="请输入内容" :disabled="disable"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <!--第6行-->
      <el-row>
        <el-col>
          <el-row>
            <!--第6行第1列-->
            <el-col :span="10">
              <el-form-item label="批准部门：" prop="approvalDepartment">
                <el-input v-model="form.approvalDepartment" placeholder="请输入内容" :disabled="disable"></el-input>
              </el-form-item>
            </el-col>
            <!--第6行第1列-->
            <el-col :span="12" :offset="2">
              <el-form-item label="批准时间：" prop="approvalTime">
                <el-date-picker
                  :disabled="disable"
                  v-model="form.approvalTime"
                  type="date"
                  placeholder="选择日期"
                  format="yyyy-MM-dd"
                  value-format="yyyy-MM-dd"
                  @change="dateChangebirthday"
                ></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
      <!--第7行-->
      <el-row>
        <el-col align="center">上传佐证材料：</el-col>
      </el-row>
      <!--上传文件-->
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
        supportSchool: "",
        name: "",
        contact: "",
        phone: "",
        declareSubjectName: "",
        subjectLeader: "",
        inceptName: "",
        inceptTime: "",
        subjectThirdEvaluation: "",
        approvalDepartment: "",
        approvalTime: "",
        fileId: ""
      },
      fileUrl: "",
      msgType: "",
      msg: "",
      buttonShow: "",
      role: "",
      disable: true,
      rules: {
        name: [{ required: true, message: "请输入学科名称", trigger: "blur" }],
        supportSchool: [
          { required: true, message: "请输入依托学校", trigger: "blur" }
        ],
        contact: [
          { required: true, message: "请输入联系人", trigger: "blur" }
        ],
        phone: [
          { required: true, message: "请输入联系电话", trigger: "blur" }
        ],
        declareSubjectName: [
          { required: true, message: "请输入申报学科名称", trigger: "blur" }
        ],
        subjectLeader: [{ required: true, message: "请输入学科带头人", trigger: "blur" }],
        inceptName: [
          { required: true, message: "请输入获得学位授权情况", trigger: "blur" }
        ],
        inceptTime: [
          { required: true, message: "请输入获得学位授权情况", trigger: "blur" }
        ],
        subjectThirdEvaluation: [
          { required: true, message: "请输入学科第三方评价情况", trigger: "blur" }
        ],
        approvalDepartment: [{ required: true, message: "请输入批准部门", trigger: "blur" }],
        approvalTime: [{ required: true, message: "请选择批准时间", trigger: "blur" }],
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
          supportSchool: tableStatus.support_school,
          contact: tableStatus.contact,
          phone: tableStatus.phone,
          declareSubjectName: tableStatus.declare_subject_name,
          subjectLeader: tableStatus.subject_leader,
          inceptName: tableStatus.incept_name,
          inceptTime: tableStatus.incept_time,
          subjectThirdEvaluation: tableStatus.subject_third_evaluation,
          approvalDepartment: tableStatus.approval_department,
          approvalTime: tableStatus.approval_time,
          fileId: tableStatus.file_id
        };
        if(this.form.inceptTime.length==13){
          this.form.inceptTime = this.$options.filters['dateFormat'](this.form.inceptTime)
        }
        if(this.form.approvalTime.length==13){
          this.form.approvalTime = this.$options.filters['dateFormat'](this.form.approvalTime)
        }
        this.disable = true;
      } else {
        this.getRequest("/getFirstSubject", {
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
      this.post("/updataFirstSubject", {
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
          this.postRequest("/insertFirstSubject", this.form).then(res => {
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
      // console.log(file);
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