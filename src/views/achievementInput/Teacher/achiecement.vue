<template>
  <div>
    <el-form ref="form" :rules="rules" :model="form">
      <el-row>
        <el-col>
          <el-form-item label="成果名称：" prop="name">
            <el-input v-model="form.name" placeholder="请输入..." :disabled="disable" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item label="成果完成人：" prop="completePerson">
            <el-input v-model="form.completePerson" placeholder="请输入..." :disabled="disable" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item label="成果完成单位：" prop="completeUnit">
            <el-input v-model="form.completeUnit" placeholder="请输入..." :disabled="disable" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item label="成果科类：" prop="sectionCategory">
            <el-input v-model="form.sectionCategory" placeholder="请输入..." :disabled="disable" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item label="申报单位：" prop="declareUnit">
            <el-input v-model="form.declareUnit" placeholder="请输入..." :disabled="disable" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item label="代码：" prop="code">
            <el-input v-model="form.code" placeholder="请输入..." :disabled="disable" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item label="申请时间：" prop="applyTime">
            <el-date-picker
              v-model="form.applyTime"
              :disabled="disable"
              type="date"
              placeholder="选择日期"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              @change="dateChangebirthday"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item label="等级：" prop="grade">
            <el-select v-model="form.grade" placeholder="请选择等级" :disabled="disable">
              <el-option v-for=" i in options" :key="i.id" :value="i.value" :label="i.label" />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col align="center">上传佐证材料：</el-col>
      </el-row>
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
  </div>
</template>
<script>
import { getIsCheck } from "@/api/check";
import { isNumber } from "@/utils/validate";
import {
  getUserRole,
  getFileNameById,
  check,
  delFile,
  getAchievement,
  updataAchievement,
  insertAchievement,
  getOption
} from "@/api/achievementinput";
export default {
  props: ["table"],
  data() {
    return {
      form: {
        id: "",
        name: "",
        completePerson: "",
        completeUnit: "",
        sectionCategory: "",
        declareUnit: "",
        code: "",
        applyTime: "",
        grade: "",
        fileId: ""
      },
      options: [],
      fileUrl: "",
      msgType: "",
      msg: "",
      buttonShow: "",
      role: "",
      disable: true,
      rules: {
        name: [{ required: true, message: "请输入成果名称", trigger: "blur" }],
        completePerson: [
          { required: true, message: "请输入成果完成人", trigger: "blur" }
        ],
        completeUnit: [
          { required: true, message: "请输入成果完成单位", trigger: "blur" }
        ],
        sectionCategory: [
          {
            required: true,
            message: "请输入成果科类",
            trigger: "blur"
          }
        ],
        declareUnit: [
          {
            required: true,
            message: "请输入申报单位",
            trigger: "blur"
          }
        ],
        code: [
          {
            required: true,
            message: "请输入代码",
            trigger: "blur"
          }
        ],
        applyTime: [
          {
            required: true,
            message: "请输入申请时间",
            trigger: "blur"
          }
        ],
        grade: [
          {
            required: true,
            message: "请输入等级",
            trigger: "blur"
          }
        ]
      }
    };
  },

  mounted() {
    getOption({
      option: "achiecement",
      value: "",
      title: "grade"
    }).then(res => {
      this.options = res.data.options;
    });
    if (this.table != undefined && this.table != null) {
      getAchievement({ tableId: this.table.tableId }).then(res => {
        this.form = res.data.res;
      });
      if (this.table.type == 2) {
        if (this.form.applyTime.length == 13) {
          this.form.applyTime = this.$options.filters["dateFormat"](
            this.form.applyTime
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
          insertAchievement(this.form).then(res => {
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


