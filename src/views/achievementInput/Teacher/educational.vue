<template>
  <div>
    <el-form ref="form" :rules="rules" :model="form">
      <el-row>
        <el-col :span="10">
          <el-form-item label="项目名称：" prop="name">
            <el-input v-model="form.name" placeholder="请输入..." :disabled="disable" />
          </el-form-item>
        </el-col>
        <el-col :span="2">&nbsp;</el-col>
        <el-col :span="12">
          <el-form-item label="项目负责人：" prop="projectLeader">
            <el-input v-model="form.projectLeader" placeholder="请输入..." :disabled="disable" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="10">
          <el-form-item label="所属单位：" prop="unitPlace">
            <el-input v-model="form.unitPlace" placeholder="请输入..." :disabled="disable" />
          </el-form-item>
        </el-col>
        <el-col :span="2">&nbsp;</el-col>
        <el-col :span="12">
          <el-form-item label="项目所属专业：" prop="professionalPlace">
            <el-input v-model="form.professionalPlace" placeholder="请输入..." :disabled="disable" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="10">
          <el-form-item label="讲授的主要课程名称：" prop="courseName">
            <el-input v-model="form.courseName" placeholder="请输入..." :disabled="disable" />
          </el-form-item>
        </el-col>
        <el-col :span="2">&nbsp;</el-col>
        <el-col :span="12">
          <el-form-item label="讲授的主要课程类别：" prop="courseCategory">
            <el-input v-model="form.courseCategory" placeholder="请输入..." :disabled="disable" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="10">
          <el-form-item label="主持的教学研究课题名称：" prop="subjectName">
            <el-input v-model="form.subjectName" placeholder="请输入..." :disabled="disable" />
          </el-form-item>
        </el-col>
        <el-col :span="2">&nbsp;</el-col>
        <el-col :span="12">
          <el-form-item label="主持的教学研究课题来源：" prop="subjectSource">
            <el-input v-model="form.subjectSource" placeholder="请输入..." :disabled="disable" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item label="申报时间：" prop="declareTime">
            <el-date-picker
              v-model="form.declareTime"
              type="date"
              placeholder="选择日期"
              :disabled="disable"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              @change="dateChangebirthday"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item label="项目类别" prop="projectCategory">
            :
            <el-radio-group v-model="form.projectCategory" :disabled="disable">
              <el-radio label="0">总体研究</el-radio>
              <el-radio label="1">专业大类</el-radio>
              <el-radio label="2">教学管理</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item label="申报项目类别：" prop="declareCategory">
            <el-radio-group v-model="form.declareCategory" :disabled="disable">
              <el-radio label="0">重点项目</el-radio>
              <el-radio label="1">一般项目</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item label="等级：" prop="grade">
            <el-radio-group v-model="form.grade" :disabled="disable">
              <el-radio label="0">国家级</el-radio>
              <el-radio label="1">省部级</el-radio>
              <el-radio label="2">市厅级</el-radio>
              <el-radio label="3">校院级</el-radio>
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
import { isNumber } from '@/utils/validate'
import { getUserRole, getFileNameById, check, delFile,getEducational,updataEducational,insertEducational } from "@/api/achievementinput";
export default {
  props: ["table"],
  data() {
    return {
      form: {
        id: '',
        name: '',
        projectLeader: '',
        unitPlace: '',
        professionaPlace: '',
        courseName: '',
        courseCategory: '',
        subjectName: '',
        subjectSource: '',
        declareTime: '',
        projectCategory: '',
        declareCategory: '',
        grade: '',
        fileId: ''
      },
      fileUrl: '',
      msgType: '',
      msg: '',
      buttonShow: '',
      role: '',
      disable: true,
      rules: {
        name: [{ required: true, message: '请输入项目名称', trigger: 'blur' }],
        projectLeader: [
          { required: true, message: '请输入项目负责人', trigger: 'blur' }
        ],
        unitPlace: [
          { required: true, message: '请输入所属单位', trigger: 'blur' }
        ],
        professionaPlace: [
          { required: true, message: '请输入项目所属专业', trigger: 'blur' }
        ],
        courseName: [
          {
            required: true,
            message: '请输入讲授的主要课程名称',
            trigger: 'blur'
          }
        ],
        courseCategory: [
          {
            required: true,
            message: '请输入讲授的主要课程类别',
            trigger: 'blur'
          }
        ],
        subjectName: [
          {
            required: true,
            message: '请输入主持的教学研究课题名称',
            trigger: 'blur'
          }
        ],
        subjectSource: [
          {
            required: true,
            message: '请输入主持的教学研究课题来源',
            trigger: 'blur'
          }
        ],
        declareTime: [
          { required: true, message: '请输入申报时间', trigger: 'blur' }
        ],
        projectCategory: [
          { required: true, message: '请选择项目类别', trigger: 'blur' }
        ],
        declareCategory: [
          { required: true, message: '请选择申报项目类别', trigger: 'blur' }
        ],
        grade: [{ required: true, message: '请选择等级', trigger: 'blur' }]
      }
    }
  },
  mounted() {
    if (this.table != undefined && this.table != null) {
      getEducational({ tableId: this.table.tableId }).then(res => {
        this.form = res.data.res;
      });
      if (this.table.type == 2) {
        if (this.form.declareTime.length == 13) {
          this.form.declareTime = this.$options.filters['dateFormat'](
            this.form.declareTime
          )
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
      if (isNumber(this.form.fileId) && this.fileUrl == '') {
        getFileNameById( {
          id: this.form.fileId
        }).then(res => {
          window.location.href = this.$fileUrl + res.data.file.fileName
        })
      } else if (isNumber(this.form.fileId)) {
        window.location.href = this.$fileUrl + this.fileUrl
      } else {
        window.location.href = this.$fileUrl + this.form.fileId
      }
    },
    dateChangebirthday(val) {
      this.form.time = val
    },
    sendMsgToParent: function() {
      this.$emit('listenToChild', false)
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
          insertEducational(this.form).then(res => {
            this.clear()
          })
        } else {
          return false
        }
      })
    },
    clear(form) {
      this.$nextTick(() => {
        this.$refs.form.resetFields()
        this.$refs.file.clearFiles()
      })
    },
    handleSuccess(response, file, fileList) {
      if (file.status == 'success') {
        this.$message({ message: '文件上传成功', type: 'success' })
        this.fileUrl = file.response.obj.fileName
        this.form.fileId = file.response.obj.fileId
      }
    },
    submitUpload() {
      this.$refs.upload.submit()
    },
    handleRemove(file, fileList) {
      // 文件移除钩子
      delFile( {
        fileName: file.response.obj.fileName,
        fileId: file.response.obj.fileId
      }).then(res => {})
    },
    handleError(err, file, fileList) {
      // 上传失败钩子
      this.$message.error('文件上传失败')
    },
    handlePreview(file) {
      // 点击文件列表中已上传的文件时的钩子
    }
  }
}
</script>


