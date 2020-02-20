<template>
  <div>
    <el-row>
      <el-col>
        项目名称：
        <el-input placeholder="请输入..."></el-input>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        所属一级学科：
        <el-input placeholder="请输入..."></el-input>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        研究类别:
        <el-radio v-model="radio" label="1">基础研究</el-radio>
        <el-radio v-model="radio" label="2">应用研究</el-radio>
        <el-radio v-model="radio" label="3">实验与发展</el-radio>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        项目发起时间：
        <el-date-picker v-model="value1" type="date" placeholder="选择日期"></el-date-picker>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        委托单位全称：
        <el-input placeholder="请输入..."></el-input>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        委托单位所在地：
        <el-input placeholder="请输入..."></el-input>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        合同性质:
        <el-radio v-model="radio" label="1">技术开发</el-radio>
        <el-radio v-model="radio" label="2">技术转让</el-radio>
        <el-radio v-model="radio" label="3">技术咨询</el-radio>
        <el-radio v-model="radio" label="4">技术服务</el-radio>
        <el-radio v-model="radio" label="5">其他</el-radio>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        项目负责人：
        <el-input placeholder="请输入..."></el-input>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        等级:
        <el-radio v-model="radio" label="1">国家级</el-radio>
        <el-radio v-model="radio" label="2">省部级</el-radio>
        <el-radio v-model="radio" label="3">市厅级</el-radio>
        <el-radio v-model="radio" label="3">校园级</el-radio>
      </el-col>
    </el-row>
    <el-row>
        <el-col align="center">
            上传佐证材料：
        </el-col>
    </el-row>
    <el-row>
      <el-col :span="24" align="center">
          <el-upload
        class="upload-demo"
        drag
        action="https://jsonplaceholder.typicode.com/posts/"
        multiple>
        <i class="el-icon-upload"></i>

        <div class="el-upload__text">
          将文件拖到此处，或<em>点击上传</em>
        </div>
      </el-upload>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12" align="center">
        <div v-if="msgType==undefined">
          <el-button type="primary" @click="onSubmit">提交</el-button>
          <el-button @click=" clear">取消</el-button>
        </div>

        <div v-if="msgType==1">
          <el-button type="primary" @click="onSubmit">通过</el-button>
          <el-button @click="clear">不通过</el-button>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  data() {
    return {
      input: "",
      radio: "",
      msgType:2
    };
  }
};
</script>
