<template>
  <div>
    <el-row>
      <el-col :span="10">
        课程名称：
        <el-input placeholder="请输入..."></el-input>
      </el-col>
      <el-col :span="2">&nbsp;</el-col>
      <el-col :span="12">
        所属专业：
        <el-input placeholder="请输入..."></el-input>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="10">
        课程负责人：
        <el-input placeholder="请输入..."></el-input>
      </el-col>
      <el-col :span="2">&nbsp;</el-col>
      <el-col :span="12">
        主讲教师：
        <el-input placeholder="请输入..."></el-input>
      </el-col>
    </el-row>
        <el-row>
      <el-col :span="10">
        主讲教师的专业领域：
        <el-input placeholder="请输入..."></el-input>
      </el-col>
      <el-col :span="2">&nbsp;</el-col>
      <el-col :span="12">
        主讲教师的职业资格证书：
        <el-input placeholder="请输入..."></el-input>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        申报时间：
        <el-date-picker v-model="value1" type="date" placeholder="选择日期"></el-date-picker>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        课程类型:
        <el-radio v-model="radio" label="1">优质核心课程</el-radio>
        <el-radio v-model="radio" label="2">一般教改课程</el-radio>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        等级:
        <el-radio v-model="radio" label="1">国家级</el-radio>
        <el-radio v-model="radio" label="2">省部级</el-radio>
        <el-radio v-model="radio" label="3">市厅级</el-radio>
        <el-radio v-model="radio" label="3">校院级</el-radio>
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
      radio:"",
      msgType:2
    };
  }
};
</script>
