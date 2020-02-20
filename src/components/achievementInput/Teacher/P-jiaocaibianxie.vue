<template>
  <div>
    <el-row>
      <el-col>
        教材名称：
        <el-input placeholder="请输入..."></el-input>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="10">
        主编姓名：
        <el-input placeholder="请输入..."></el-input>
      </el-col>
      <el-col :span="2">&nbsp;</el-col>
      <el-col :span="12">
        参编姓名：
        <el-input placeholder="请输入..."></el-input>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        本课程在专业课程体系中的地位：
        <el-input
            type="textarea"
            :rows="2"
            placeholder="请输入内容"
            v-model="textarea">
        </el-input>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        本课程现有教材状况分析：
        <el-input
            type="textarea"
            :rows="2"
            placeholder="请输入内容"
            v-model="textarea">
        </el-input>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        本课程的主要特色与创新：
        <el-input
            type="textarea"
            :rows="2"
            placeholder="请输入内容"
            v-model="textarea">
        </el-input>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        教材目录及编写人员：
        <el-input
            type="textarea"
            :rows="2"
            placeholder="请输入内容"
            v-model="textarea">
        </el-input>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        教材编写计划完成时间：
        <el-input
            type="textarea"
            :rows="2"
            placeholder="请输入内容"
            v-model="textarea">
        </el-input>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        申报日期：
        <el-date-picker v-model="value1" type="date" placeholder="选择日期"></el-date-picker>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        等级:
        <el-radio v-model="radio" label="1">国家级</el-radio>
        <el-radio v-model="radio" label="2">省部级</el-radio>
        <el-radio v-model="radio" label="3">市厅级</el-radio>
        <el-radio v-model="radio" label="4">校级</el-radio>
        <el-radio v-model="radio" label="3">院级</el-radio>
        <el-radio v-model="radio" label="4">未立项</el-radio>
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
      textarea:"",
      radio:"",
      msgType:2
    };
  }
};
</script>
