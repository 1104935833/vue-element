<template>
  <div>
    <el-form ref="form" :rules="rules" :model="form">
      <el-row>
        <!--第1行-->
        <el-col :span="10">
          <el-form-item label="联盟名称(全称)：" prop="name">
            <el-input v-model="form.name" placeholder="请输入内容" :disabled="disable" />
          </el-form-item>
        </el-col>
        <el-col :span="2">&nbsp;</el-col>
        <el-col :span="12">
          <el-form-item label="联盟协议生效时间：" prop="unionEffectTime">
            <el-date-picker
              v-model="form.unionEffectTime"
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
      <!--第2行-->
      <el-row>
        <el-col :span="10">
          <el-form-item label="技术领域：" prop="technologyField">
            <el-input v-model="form.technologyField" placeholder="请输入内容" :disabled="disable" />
          </el-form-item>
        </el-col>
        <el-col :span="2">&nbsp;</el-col>
        <el-col :span="12">
          <el-form-item label="联盟理事长：" prop="unionDirector">
            <el-input v-model="form.unionDirector" placeholder="请输入内容" :disabled="disable" />
          </el-form-item>
        </el-col>
      </el-row>
      <!--第3行-->
      <el-row>
        <!--第3行第1列-->
        <el-col :span="10">
          <el-form-item label="所在单位：" prop="unitPlace">
            <el-input v-model="form.unitPlace" placeholder="请输入内容" :disabled="disable" />
          </el-form-item>
        </el-col>
        <el-col :span="2">&nbsp;</el-col>
        <!--第3行第2列-->
        <el-col :span="12">
          <el-form-item label="联系方式：" prop="phone">
            <el-input v-model="form.phone" placeholder="请输入内容" :disabled="disable" />
          </el-form-item>
        </el-col>
      </el-row>
      <!--第4行-->
      <el-row>
        <!--第4行第1列-->
        <el-col>
          <el-form-item label="联盟常设机构的依托单位名称：" prop="standingBodyName">
            <el-input v-model="form.standingBodyName" placeholder="请输入内容" :disabled="disable" />
          </el-form-item>
        </el-col>
      </el-row>
      <!--第5行-->
      <el-row>
        <el-col>
          <el-form-item label="常设机构通讯地址：" prop="standingBodyAddress">
            <el-input v-model="form.standingBodyAddress" placeholder="请输入内容" :disabled="disable" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="10">
          <el-form-item label="批准部门：" prop="approvalDepartment">
            <el-input v-model="form.approvalDepartment" placeholder="请输入内容" :disabled="disable" />
          </el-form-item>
        </el-col>
        <el-col :span="2">&nbsp;</el-col>
        <!--第6行第1列-->
        <el-col :span="12">
          <el-form-item label="批准时间：" prop="approvalTime">
            <el-date-picker
              v-model="form.approvalTime"
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
      <!--第7行-->
      <el-row>
        <el-col align="center">上传佐证材料：</el-col>
      </el-row>
      <!--上传文件-->
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
import { getUserRole, getFileNameById, check, delFile,getProductionUnion,updataProductionUnion,insertProductionUnion } from "@/api/achievementinput";
export default {
  props: ["table"],
  data() {
    return {
      form: {
        id: '',
        name: '',
        unionEffectTime: '',
        technologyField: '',
        unionDirector: '',
        unitPlace: '',
        phone: '',
        standingBodyName: '',
        standingBodyAddress: '',
        approvalDepartment: '',
        approvalTime: '',
        fileId: ''
      },
      fileUrl: '',
      msgType: '',
      msg: '',
      buttonShow: '',
      role: '',
      disable: true,
      rules: {
        name: [{ required: true, message: '请输入联盟名称', trigger: 'blur' }],
        unionEffectTime: [
          { required: true, message: '请输入联盟协议生效时间', trigger: 'blur' }
        ],
        technologyField: [
          { required: true, message: '请输入技术领域', trigger: 'blur' }
        ],
        unionDirector: [
          { required: true, message: '请输入联盟理事长', trigger: 'blur' }
        ],
        unitPlace: [
          { required: true, message: '请输入所在单位', trigger: 'blur' }
        ],
        phone: [{ required: true, message: '请输入联系方式', trigger: 'blur' },
          { pattern: /^1[34578]\d{9}$/, message: '目前只支持中国大陆的手机号码' }],
        standingBodyName: [
          {
            required: true,
            message: '请输入联盟常设机构的依托单位名称',
            trigger: 'blur'
          }
        ],
        standingBodyAddress: [
          { required: true, message: '请输入常设机构通讯地址', trigger: 'blur' }
        ],
        approvalDepartment: [
          { required: true, message: '请输入批准部门', trigger: 'blur' }
        ],
        approvalTime: [
          { required: true, message: '请输入批准时间', trigger: 'blur' }
        ]
      }
    }
  },
  mounted() {
    if (this.table != undefined && this.table != null) {
      getProductionUnion({ tableId: this.table.tableId }).then(res => {
        this.form = res.data.res;
      });
      if (this.table.type == 2) {
       if (this.form.unionEffectTime.length == 13) {
          this.form.unionEffectTime = this.$options.filters['dateFormat'](
            this.form.unionEffectTime
          )
        }
        if (this.form.approvalTime.length == 13) {
          this.form.approvalTime = this.$options.filters['dateFormat'](
            this.form.approvalTime
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
          insertProductionUnion(this.form).then(res => {
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


