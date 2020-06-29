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
              style="width:100%"
              :disabled="disable"
              @change="this.changeOption"
            >
              <el-option
                v-for="item in optionsType"
                :key="item.id"
                :label="item.label"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="荣誉名称" prop="honeNameId">
            <el-select
              v-model="form.honeNameId"
              placeholder="请选择"
              :disabled="disable"
              style="width:100%"
            >
              <el-option
                v-for="item in optionsName"
                :key="item.id"
                :label="item.label"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="组织名称" prop="organizationName">
            <el-input
              v-model="form.organizationName"
              placeholder="请输入内容"
              clearable
              :disabled="disable"
            />
          </el-form-item>
          <el-form-item label="组织成员" prop="organizationMember">
            <el-input
              v-model="form.organizationMember"
              placeholder="请输入内容,各成员之间用、隔开"
              clearable
              :disabled="disable"
            />
          </el-form-item>
          <el-form-item label="获得时间" prop="personalGainTime">
            <el-col>
              <el-date-picker
                v-model="form.personalGainTime"
                type="date"
                placeholder="选择日期"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                style="width:100%"
                :disabled="disable"
                @change="dateChangebirthday"
              />
            </el-col>
          </el-form-item>
          <!-- 调用后端接口的路径 -->
          <el-row>
            <el-col :span="24" align="center">
              <el-upload
                ref="file"
                :disabled="disable"
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
                <i class="el-icon-upload" />
                <div class="el-upload__text">
                  将文件拖到此处，或
                  <em>点击上传</em>
                </div>
                <div slot="tip" class="el-upload__tip">只能上传jpg/pdf/zip/rar文件</div>
              </el-upload>
            </el-col>
            <el-col
              v-if="form.fileId!=null && form.fileId!=''"
              :span="24"
              align="center"
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
import { getIsCheck } from "@/api/check";
import { isNumber } from "@/utils/validate";
import {
  getHoner,
  getOption,
  getUserRole,
  getFileNameById,
  check,
  updataHoner,
  insertHoner,
  delFile
} from "@/api/achievementinput";
export default {
  props: ["table"],
  data() {
    return {
      isDisable: true,
      optionsType: [],
      optionsName: [],
      form: {
        id: "",
        personalHonorType: "", // 荣誉类型
        name: "", // 荣誉名称
        personalGainTime: "", // 获得时间
        organizationName: "", // 组织名称
        organizationMember: "", // 组织成员
        type: "2", // 1个人、2集体
        honeNameId: "",
        fileId: ""
      },
      fileUrl: "",
      msgType: "",
      msg: "",
      buttonShow: "",
      role: "",
      disable: true,
      rules: {
        honeNameId: [{ required: true, message: "请选择荣誉名称" }],
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
    if (this.table != undefined && this.table != null) {
      getHoner({ tableId: this.table.tableId }).then(res => {
        this.form = res.data.res;
        getOption({
          option: "honor",
          title: "",
          value: this.form.personalHonorType
        }).then(res => {
          this.optionsName = res.data.options;
        });
      });
      if (this.table.type == 2) {
        if (this.form.personalGainTime.length == 13) {
          this.form.personalGainTime = this.$options.filters["dateFormat"](
            this.form.personalGainTime
          );
        }
        this.disable = true;
      } else {
        getIsCheck({
          tableId: this.table.tableId,
          auditStatus: this.table.auditStatus
        }).then(res => {
          if (
            (this.table.auditStatus == 0 || this.table.auditStatus == 1) &&
            res.data == "True"
          ) {
            //教研室
            this.buttonShow = 2;
          } else if (this.table.auditStatus == 2 && res.data == "True") {
            this.buttonShow = 3;
          } else {
            this.buttonShow = 0;
          }
        });
      }
    } else {
      // 提交
      this.buttonShow = 1;
      this.disable = false;
    }
  },
  methods: {
    changeOption() {
      this.form.honeNameId = "";
      getOption({
        option: "honor",
        title: "",
        value: this.form.personalHonorType
      }).then(res => {
        this.optionsName = res.data.options;
      });
      this.isDisable = false;
    },
    init() {
      getOption({
        option: "honor",
        title: "honorGroupTitle",
        value: ""
      }).then(res => {
        this.optionsType = res.data.options;
      });
    },
    down() {
      if (isNumber(this.form.fileId) && this.fileUrl == "") {
        getFileNameById({
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
      check({
        tableId: this.table.tableId,
        status: state,
        id: this.table.id,
        agree: agree
      }).then(res => {
        this.sendMsgToParent();
      });
    },
    updata() {
      updataHoner({
        honer: this.form,
        tableId: this.table.tableId,
        id: this.table.id
      }).then(res => {
        this.sendMsgToParent();
      });
    },
    onSubmit(form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          insertHoner(this.form).then(res => {
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
      // 文件移除钩子
      delFile({
        fileName: file.response.obj.fileName,
        fileId: file.response.obj.fileId
      }).then(res => {});
    },
    handleError(err, file, fileList) {
      // 上传失败钩子
      this.$message.error("文件上传失败");
    },
    handlePreview(file) {
      // 点击文件列表中已上传的文件时的钩子
    }
  }
};
</script>

