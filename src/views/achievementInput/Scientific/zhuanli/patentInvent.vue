<template>
  <div>
    <el-form ref="form" :rules="rules" :model="form">
      <el-row>
        <el-col>
          <el-form-item label="专利名称：" prop="name">
            <el-input v-model="form.name" placeholder="请输入..." :disabled="disable" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item label="类别：" prop="patentCategory">
            <el-radio-group v-model="form.patentCategory" :disabled="disable">
              <el-radio label="0">发明专利</el-radio>
              <el-radio label="1">实用新型专利</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item label="完成者：" prop="completer">
            <el-input v-model="form.completer" placeholder="请输入..." :disabled="disable" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item label="专利号：" prop="patentNumber">
            <el-input v-model="form.patentNumber" placeholder="请输入..." :disabled="disable" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item label="署名次序：" prop="signOorder">
            <el-input v-model="form.signOrder" placeholder="请输入..." :disabled="disable" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item label="完成者单位：" prop="unitName">
            <el-input v-model="form.unitName" placeholder="请输入..." :disabled="disable" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item label="完成者单位地址：" prop="unitAddress">
            <el-input v-model="form.unitAddress" placeholder="请输入..." :disabled="disable" />
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
import { getPatent, getOption, getUserRole, getFileNameById,insertPatent,updataPatent, check, delFile } from "@/api/achievementinput";
export default {
  props: ["table"],
  data() {
    return {
      form: {
        id: '',
        name: '',
        patentCategory: '',
        completer: '',
        patentNumber: '',
        signOrder: '',
        unitName: '',
        unitAddress: '',
        fileId: ''
      },
      fileUrl: '',
      msgType: '',
      msg: '',
      buttonShow: '',
      role: '',
      disable: true,
      rules: {
        name: [{ required: true, message: '请输入专利名称', trigger: 'blur' }],
        patentCategory: [
          { required: true, message: '请选择类型', trigger: 'blur' }
        ],
        completer: [
          { required: true, message: '请输入完成者', trigger: 'blur' }
        ],
        patentNumber: [
          { required: true, message: '请输入专利号', trigger: 'blur' }
        ],
        signOrder: [
          { required: true, message: '请输入署名次序', trigger: 'blur' }
        ],
        unitName: [
          { required: true, message: '请输入完成者单位名称', trigger: 'blur' }
        ],
        unitAddress: [
          { required: true, message: '请输入完成者单位地址', trigger: 'blur' }
        ]
      }
    }
  },
  mounted() {
    if (this.table != undefined && this.table != null) {
      getPatent({ tableId: this.table.tableId }).then(res => {
          this.form = res.data.res;
        });
      if (this.table.type == 2) {
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
        getFileNameById({
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
          insertPatent(this.form).then(res => {
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
      delFile({
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


