<template>
  <div>
    <el-form ref="form" :rules="rules" :model="form">
      <el-row>
        <el-col :span="10">
          <el-form-item label="新增专业名称：" prop="name">
            <el-input v-model="form.name" placeholder="请输入内容" :disabled="disable"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12" :offset="2">
          <el-form-item label="所在院系：" prop="departmentPlace">
            <el-input v-model="form.departmentPlace" placeholder="请输入内容" :disabled="disable"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="10">
          <el-form-item label="专业负责人：" prop="professionalLeader">
            <el-input v-model="form.professionalLeader" placeholder="请输入内容" :disabled="disable"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12" :offset="2">
          <el-form-item label="联系方式：" prop="phone">
            <el-input v-model="form.phone" placeholder="请输入内容" :disabled="disable"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <div>
            <el-form-item label="等级：" prop="grade">
              <el-radio-group v-model="form.grade" :disabled="disable">
                <el-radio :label="0">国家级</el-radio>
                <el-radio :label="1">省级</el-radio>
                <el-radio :label="2">市厅级</el-radio>
                <el-radio :label="3">校院级</el-radio>
                <el-radio :label="4">新专业</el-radio>
              </el-radio-group>
            </el-form-item>
          </div>
        </el-col>
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
        name: "",
        departmentPlace: "",
        professionalLeader: "",
        phone: "",
        grade: "",
        fileId: ""
      },
      fileUrl: "",
      msgType: "",
      msg: "",
      buttonShow: "",
      role: "",
      disable: true,
      rules: {
        name: [
          { required: true, message: "请输入新增专业名称", trigger: "blur" }
        ],
        departmentPlace: [
          { required: true, message: "请输入所在院系", trigger: "blur" }
        ],
        professionalLeader: [
          { required: true, message: "请输入专业负责人", trigger: "blur" }
        ],
        phone: [{ required: true, message: "请输入联系方式", trigger: "blur" },
        { pattern: /^1[34578]\d{9}$/, message: '目前只支持中国大陆的手机号码' }],
        grade: [{ required: true, message: "请选择等级", trigger: "blur" }]
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
          departmentPlace: tableStatus.department_place,
          professionalLeader: tableStatus.professional_leader,
          phone: tableStatus.phone,
          grade: tableStatus.grade,
          fileId: tableStatus.file_id
        };
        this.disable = true;
      } else {
        this.getRequest("/getProfessional", {
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
      this.post("/updataProfessional", {
        professional: this.form,
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
          this.postRequest("/insertProfessional", this.form).then(res => {
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