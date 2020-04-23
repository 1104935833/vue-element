<template>
  <div>
    <el-form ref="form" :rules="rules" :model="form">
      <el-row>
        <!--第1行-->
        <el-col :span="10">
          <el-form-item label="实验室名称：" prop="name">
            <el-input v-model="form.name" placeholder="请输入内容" :disabled="disable"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12" :offset="1">
          <el-form-item label="实验室批准建设时间：" prop="labApprovalTime">
            <div class="block">
              <el-date-picker
                :disabled="disable"
                v-model="form.labApprovalTime"
                type="date"
                placeholder="选择日期"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                @change="dateChangebirthday"
              ></el-date-picker>
            </div>
          </el-form-item>
        </el-col>
      </el-row>
      <!--第2行-->
      <el-row>
        <el-col :span="10">
          <el-form-item label="依托学科：" prop="supportSubject">
            <el-input v-model="form.supportSubject" placeholder="请输入内容" :disabled="disable"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6" :offset="1">
          <el-form-item label="拟申报建设起止时间：" prop="declareStartTime">
            <el-date-picker
              :disabled="disable"
              v-model="form.declareStartTime"
              type="date"
              placeholder="选择日期"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              @change="dateChangebirthday"
              style="width:150px;"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="6" :offset="1">
          <el-form-item label="拟申报建设起止时间：" prop="declareEndTime">
            <el-date-picker
              :disabled="disable"
              v-model="form.declareEndTime"
              type="date"
              placeholder="选择日期"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              @change="dateChangebirthday"
              style="width:150px;"
            ></el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <!--第3行-->
      <el-row>
        <!--第3行第1列-->
        <el-col :span="10">
          <el-form-item label="人员总数：" prop="totalPerson">
            <el-input v-model="form.totalPerson" placeholder="请输入内容" :disabled="disable"></el-input>
          </el-form-item>
        </el-col>
        <!--第3行第2列-->
        <el-col :span="12" :offset="1">
          <el-form-item label="负责人：" prop="head">
            <el-input v-model="form.head" placeholder="请输入内容" :disabled="disable"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <!--第4行-->
      <el-row>
        <!--第4行第1列-->
        <el-col>
          <el-form-item label="实验室地址：" prop="labAddress">
            <el-input v-model="form.labAddress" placeholder="请输入内容" :disabled="disable"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <!--第5行-->
      <el-row>
        <el-col>
          <el-form-item label="研究方向1：" prop="directionOne">
            <el-input v-model="form.directionOne" placeholder="请输入内容" :disabled="disable"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item label="研究方向2：" prop="directionTwo">
            <el-input v-model="form.directionTwo" placeholder="请输入内容" :disabled="disable"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item label="研究方向3：" prop="directionThree">
            <el-input v-model="form.directionThree" placeholder="请输入内容" :disabled="disable"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <!--第9行-->
      <el-row>
        <el-col>
          <el-row>
            <!--第9行第1列-->
            <el-col :span="10">
              <el-form-item label="批准部门：" prop="approvalDepartment">
                <el-input v-model="form.approvalDepartment" placeholder="请输入内容" :disabled="disable"></el-input>
              </el-form-item>
            </el-col>
            <!--第9行第1列-->
            <el-col :span="10" :offset="1">
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
      <!--第10行-->
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
        name: "",
        labApprovalTime: "",
        supportSubject: "",
        declareStartTime: "",
        declareEndTime: "",
        totalPerson: "",
        head: "",
        labAddress: "",
        directionOne: "",
        directionTwo: "",
        directionThree: "",
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
        name: [
          { required: true, message: "请输入实验室名称", trigger: "blur" }
        ],
        labApprovalTime: [
          {
            required: true,
            message: "请输入实验室批准建设时间",
            trigger: "blur"
          }
        ],
        supportSubject: [
          { required: true, message: "请输入依托学科", trigger: "blur" }
        ],
        declareStartTime: [
          {
            required: true,
            message: "请输入拟申报建设起止时间",
            trigger: "blur"
          }
        ],
        declareEndTime: [
          {
            required: true,
            message: "请输入拟申报建设起止时间",
            trigger: "blur"
          }
        ],
        totalPerson: [
          { required: true, message: "请输入人员总数", trigger: "blur" }
        ],
        head: [{ required: true, message: "请输入负责人", trigger: "blur" }],
        labAddress: [
          { required: true, message: "请输入实验室地址", trigger: "blur" }
        ],
        directionOne: [
          { required: true, message: "请输入研究方向1", trigger: "blur" }
        ],

        approvalDepartment: [
          { required: true, message: "请输入批准部门", trigger: "blur" }
        ],
        approvalTime: [
          { required: true, message: "请输入批准时间", trigger: "blur" }
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
          labApprovalTime: tableStatus.lab_approval_time,
          supportSubject: tableStatus.support_subject,
          declareStartTime: tableStatus.declare_start_time,
          declareEndTime: tableStatus.declare_end_time,
          totalPerson: tableStatus.total_person,
          head: tableStatus.head,
          labAddress: tableStatus.lab_address,
          directionOne: tableStatus.direction_one,
          directionTwo: tableStatus.direction_two,
          directionThree: tableStatus.direction_three,
          approvalDepartment: tableStatus.approval_department,
          approvalTime: tableStatus.approval_time,
          fileId: tableStatus.file_id
        };
        if (this.form.labApprovalTime.length == 13) {
          this.form.labApprovalTime = this.$options.filters["dateFormat"](
            this.form.labApprovalTime
          );
        }
        if (this.form.declareStartTime.length == 13) {
          this.form.declareStartTime = this.$options.filters["dateFormat"](
            this.form.declareStartTime
          );
        }
        if (this.form.declareEndTime.length == 13) {
          this.form.declareEndTime = this.$options.filters["dateFormat"](
            this.form.declareEndTime
          );
        }
        if (this.form.approvalTime.length == 13) {
          this.form.approvalTime = this.$options.filters["dateFormat"](
            this.form.approvalTime
          );
        }
        this.disable = true;
      } else {
        this.getRequest("/getLab", { itableIdd: this.msg.message.id }).then(
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
      this.post("/updataLab", {
        lab: this.form,
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
          this.postRequest("/insertLab", this.form).then(res => {
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