<template>
  <div>
    <el-form ref="form" :rules="rules" :model="form">
      <el-row>
        <el-col>
          <el-form-item label="论文标题：" prop="name">
            <el-input v-model="form.name" placeholder="请输入..." maxlength="20" :disabled="disable" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="10">
          <el-form-item label="第一作者：" prop="firstAuthor">
            <el-input
              v-model="form.firstAuthor"
              placeholder="请输入..."
              maxlength="10"
              :disabled="disable"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12" :offset="1">
          <el-form-item label="通讯作者：" prop="correspondenceAuthor">
            <el-input
              v-model="form.correspondenceAuthor"
              placeholder="请输入..."
              maxlength="10"
              :disabled="disable"
            />
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
            <el-input v-model="form.publication" placeholder="请输入..." :disabled="disable" />
          </el-form-item>
        </el-col>
        <el-col :span="12" :offset="1">
          <el-form-item label="发表出版时间：" prop="time">
            <el-date-picker
              v-model="form.time"
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
            <el-input v-model="form.paperVolume" placeholder="请输入..." :disabled="disable" />
          </el-form-item>
        </el-col>
        <el-col :span="12" :offset="1">
          <el-form-item label="页码范围：" prop="paperPage">
            <el-input v-model="form.paperPage" placeholder="请输入..." :disabled="disable" />
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
  getPaper,
  updataPaper,
  insertPaper
} from "@/api/achievementinput";
export default {
  props: ["table"],
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
    if (this.table != undefined && this.table != null) {
      getPaper({ tableId: this.table.tableId }).then(res => {
        this.form = res.data.res;
      });
      if (this.table.type == 2) {
        if (this.form.time.length == 13) {
          this.form.time = this.$options.filters["dateFormat"](this.form.time);
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
          insertPaper(this.form).then(res => {
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


