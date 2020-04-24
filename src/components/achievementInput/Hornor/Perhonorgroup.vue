<template>
  <div>
    <!-- 第一行 -->
    <el-row>
      <el-col>
        <h1 align="center">集体荣誉</h1>
      </el-col>
    </el-row>
    <el-row style="padding: 10px 0;">
      <el-col :span="11" :offset="8">
        <el-form ref="form" :model="form" label-width="80px" :rules="rules">
          <el-form-item label="荣誉类型" prop="personalHonorType">
            <el-select
              v-model="form.personalHonorType"
              placeholder="请选择"
              @change="this.changeOption"
              style="width:100%"
              :disabled="disable"
            >
              <el-option
                v-for="item in optionsType"
                :key="item.id"
                :label="item.label"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="荣誉名称" prop="name">
            <el-select v-model="form.name" placeholder="请选择" :disabled="disable" style="width:100%">
              <el-option
                v-for="item in optionsName"
                :key="item.id"
                :label="item.label"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="组织名称" prop="organizationName">
            <el-input
              placeholder="请输入内容"
              v-model="form.organizationName"
              clearable
              :disabled="disable"
            ></el-input>
          </el-form-item>
          <el-form-item label="组织成员" prop="organizationMember">
            <el-input
              placeholder="请输入内容,各成员之间用、隔开"
              v-model="form.organizationMember"
              clearable
              :disabled="disable"
            ></el-input>
          </el-form-item>
          <el-form-item label="获得时间" prop="personalGainTime">
            <el-col>
              <el-date-picker
                v-model="form.personalGainTime"
                type="date"
                placeholder="选择日期"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                @change="dateChangebirthday"
                style="width:100%"
                :disabled="disable"
              ></el-date-picker>
            </el-col>
          </el-form-item>
          <!-- 调用后端接口的路径 -->
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
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { isNumber } from "../../../utils/validate";
export default {
  data() {
    return {
      isDisable: true,
      optionsType: [],
      optionsName: [],
      form: {
        id: "",
        personalHonorType: "", //荣誉类型
        name: "", //荣誉名称
        personalGainTime: "", //获得时间
        organizationName: "", //组织名称
        organizationMember: "", //组织成员
        type: "2", //1个人、2集体
        fileId: ""
      },
      fileUrl: "",
      msgType: "",
      msg: "",
      buttonShow: "",
      role: "",
      disable: true,
      rules: {
        name: [{ required: true, message: "请选择荣誉名称" }],
        personalHonorType: [{ required: true, message: "请选择荣誉类型" }],
        personalGainTime: [
          { required: true, message: "请输入获得时间", trigger: "blur" }
        ],
        organizationName: [
          {
            required: true,
            message: "请输入组织名称",
            trigger: "blur"
          }
        ],
        organizationMember: [
          {
            required: true,
            message: "请输入组织成员",
            trigger: "blur"
          }
        ]
      }
    };
  },
  mounted() {
    this.init();
    this.getComponents();
    let tableStatus = this.msg.tableid;
    let user = JSON.parse(localStorage.getItem("user"));
    if (this.msgType != undefined) {
      if (this.msg.type == 2) {
        this.form = {
          id: tableStatus.id,
          personalHonorType: tableStatus.personal_honor_type, //荣誉类型
          name: tableStatus.name, //荣誉名称
          personalGainTime: tableStatus.personal_gain_time, //获得时间
          organizationName: tableStatus.organization_name, //组织名称
          organizationMember: tableStatus,
          organization_member, //组织成员
          type: tableStatus.type //1个人、2集体
        };
        if (this.form.personalGainTime.length == 13) {
          this.form.personalGainTime = this.$options.filters["dateFormat"](
            this.form.personalGainTime
          );
        }
        this.disable = true;
      } else {
        this.getRequest("/getHoner", {
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
    changeOption() {
      this.form.name = "";
      this.getRequest("/common/getOption", {
        option: "honor",
        title: "",
        value: this.form.personalHonorType
      }).then(res => {
        this.optionsName = res.data.options;
      });
      this.isDisable = false;
    },
    init() {
      this.getRequest("/common/getOption", {
        option: "honor",
        title: "honorGroupTitle",
        value: ""
      }).then(res => {
        this.optionsType = res.data.options;
      });
    },
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
      this.post("/updataHoner", {
        honer: this.form,
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
          this.postRequest("/insertHoner", this.form).then(res => {
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