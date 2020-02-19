<template>
  <div>
    <!-- 第一行 -->
    <el-row>
      <el-col>
        <h1 align="center">个人荣誉</h1>
      </el-col>
    </el-row>
    <el-row style="padding: 10px 0;">
      <el-col :span="8">&nbsp;</el-col>
      <el-col :span="11">
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="荣誉类型">
            <el-select
              v-model="form.personalHonorType"
              placeholder="请选择"
              @change="this.changeOption"
              style="width:100%"
            >
              <el-option
                v-for="item in optionsType"
                :key="item.id"
                :label="item.label"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="荣誉名称">
            <el-select
              v-model="form.personalHonorName"
              multiple
              placeholder="请选择"
              :disabled="isDisable"
              style="width:100%"
            >
              <el-option
                v-for="item in optionsName"
                :key="item.id"
                :label="item.label"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="获得时间">
            <el-col>
              <el-date-picker
                v-model="form.personalGainTime"
                type="date"
                placeholder="选择日期"
                style="width:100%"
              ></el-date-picker>
            </el-col>
          </el-form-item>
          <!-- 调用后端接口的路径 -->
          <el-form-item label="材料上传">
            <el-col>
              <el-upload
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
          </el-form-item>

          <el-form-item v-if="msgType!=1">
            <el-button type="primary" @click="onSubmit">提交</el-button>
            <el-button @click="clear">取消</el-button>
          </el-form-item>
          <el-form-item v-if="msgType==1">
            <el-button type="primary" @click="onSubmit">通过</el-button>
            <el-button @click="clear">不通过</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="5"></el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isDisable: true,
      form: {
        personalHonorType: "", //页面选择传递数据的来源
        personalHonorName: "",
        personalGainTime: "",
        type: "" //1个人、2集体
      },
      optionsType: [],
      optionsName: [],
      msgType: ""
    };
  },
  mounted() {
    this.msgType = this.$attrs.msgType;
  },
  created() {
    this.init();
  },
  methods: {
    clear() {
      this.form = {
        personalHonorType: "",
        personalHonorName: "",
        personalGainTime: "",
        type: ""
      };
    },
    onSubmit() {
      this.form.type = 1;
      this.postRequest("/honer/insertHoner", this.form).then(res => {
        this.clear();
      });
    },
    changeOption() {
      this.form.honorName = "";
      this.getRequest("/common/getOption", {
        option: "honer",
        title: "",
        value: this.form.personalHonorType
      }).then(res => {
        this.optionsName = res.data.options;
      });
      this.isDisable = false;
    },
    init() {
      this.getRequest("/common/getOption", {
        option: "honer",
        title: "researchSelf",
        value: ""
      }).then(res => {
        this.optionsType = res.data.options;
      });
    },
    handleSuccess(response, file, fileList) {
      if (file.status == "success") {
        this.$message({ message: "文件上传成功", type: "success" });
      }
    },
    submitUpload() {
      this.$refs.upload.submit();
    },
    handleRemove(file, fileList) {
      //文件移除钩子
      this.getRequest("/common/delFile", { fileName: file.response }).then(
        res => {
          if (res.data == "success") {
            this.$message({ message: "文件移除成功", type: "success" });
          } else {
            this.$message.error("文件删除失败");
          }
        }
      );
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

