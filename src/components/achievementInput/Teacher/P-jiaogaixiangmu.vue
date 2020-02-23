<template>
  <div>
    <el-row>
      <el-col :span="10">
        项目名称：
        <el-input v-model="form.project_name" placeholder="请输入..."></el-input>
      </el-col>
      <el-col :span="2">&nbsp;</el-col>
      <el-col :span="12">
        项目负责人：
        <el-input v-model="form.project_leader" placeholder="请输入..."></el-input>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="10">
        所属单位：
        <el-input v-model="form.unit_place" placeholder="请输入..."></el-input>
      </el-col>
      <el-col :span="2">&nbsp;</el-col>
      <el-col :span="12">
        项目所属专业：
        <el-input v-model="form.professional_place" placeholder="请输入..."></el-input>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="10">
        讲授的主要课程名称：
        <el-input v-model="form.course_name" placeholder="请输入..."></el-input>
      </el-col>
      <el-col :span="2">&nbsp;</el-col>
      <el-col :span="12">
        讲授的主要课程类别：
        <el-input v-model="form.course_category" placeholder="请输入..."></el-input>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="10">
        主持的教学研究课题名称：
        <el-input v-model="form.subject_name" placeholder="请输入..."></el-input>
      </el-col>
      <el-col :span="2">&nbsp;</el-col>
      <el-col :span="12">
        主持的教学研究课题来源：
        <el-input v-model="form.subject_source" placeholder="请输入..."></el-input>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        申报时间：
        <el-date-picker v-model="form.declare_time" type="date" placeholder="选择日期"></el-date-picker>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        项目类别:
        <el-radio-group v-model="form.project_category">
          <el-radio label="0">总体研究</el-radio>
          <el-radio label="1">专业大类</el-radio>
          <el-radio label="2">教学管理</el-radio>
        </el-radio-group>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        申报项目类别:
        <el-radio-group v-model="form.declare_category">
          <el-radio  label="0">重点项目</el-radio>
        <el-radio  label="1">一般项目</el-radio>
        </el-radio-group>
        
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        等级:
        <el-radio-group v-model="form.grade">
          <el-radio  label="0">国家级</el-radio>
        <el-radio  label="1">省部级</el-radio>
        <el-radio  label="2">市厅级</el-radio>
        <el-radio label="3">校院级</el-radio>
        </el-radio-group>
        
      </el-col>
    </el-row>
    <el-row>
      <el-col align="center">上传佐证材料：</el-col>
    </el-row>
    <el-row>
      <el-col :span="24" align="center">
        <el-upload
          class="upload-demo"
          drag
          action="https://jsonplaceholder.typicode.com/posts/"
          multiple
        >
          <i class="el-icon-upload"></i>

          <div class="el-upload__text">
            将文件拖到此处，或
            <em>点击上传</em>
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
      form:{
        id:"",
        project_name:"",
        project_leader:"",
        unit_place:"",
        professional_place:"",
        course_name:"",
        course_categacy:"",
        subjcet_name:"",
        subject_source:"",
        decalre_time:"",
        project_category:"",
        declare_category:"",
        grade:"",
        file_id:"",
      },
      input: "",
      radio: "",
      msgType: 2
    };
  },
  clear(){
    this.form={
      id:"",
        project_name:"",
        project_leader:"",
        unit_place:"",
        professional_place:"",
        course_name:"",
        course_categacy:"",
        subjcet_name:"",
        subject_source:"",
        decalre_time:"",
        project_category:"",
        declare_category:"",
        grade:"",
        file_id:"",
    }
  }
};
</script>
