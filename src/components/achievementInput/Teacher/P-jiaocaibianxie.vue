<template>
  <div>
    <el-row>
      <el-col>
        教材名称：
        <el-input v-model="form.textbook_name" placeholder="请输入..."></el-input>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="10">
        主编姓名：
        <el-input v-model="form.editor_chief" placeholder="请输入..."></el-input>
      </el-col>
      <el-col :span="2">&nbsp;</el-col>
      <el-col :span="12">
        参编姓名：
        <el-input v-model="form.ginseng_name" placeholder="请输入..."></el-input>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        本课程在专业课程体系中的地位：
        <el-input
            type="textarea"
            :rows="2"
            placeholder="请输入内容"
            v-model="form.course_status">
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
            v-model="form.course_condition">
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
            v-model="form.course_feature">
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
            v-model="form.write_person">
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
            v-model="form.write_finish_time">
        </el-input>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        申报日期：
        <el-date-picker v-model="form.declare_time" type="date" placeholder="选择日期"></el-date-picker>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        等级:
        <el-radio-group v-model="form.grade">
          <el-radio label="0">国家级</el-radio>
        <el-radio  label="1">省部级</el-radio>
        <el-radio  label="2">市厅级</el-radio>
        <el-radio  label="3">校级</el-radio>
        <el-radio  label="4">院级</el-radio>
        <el-radio  label="5">未立项</el-radio>
        </el-radio-group>
        
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
      form:{
        id:"",
        textbook_name:"",
        editor_chief:"",
        ginseng_name:"",
        course_status:"",
        course_condition:"",
        course_feature:"",
        write_person:"",
        write_finish_time:"",
        declare_time:"",
        grade:"",
        file_id:"",
      },
      input: "",
      textarea:"",
      radio:"",
      msgType:2
    };
  },
  clear(){
    this.form={
       id:"",
        textbook_name:"",
        editor_chief:"",
        ginseng_name:"",
        course_status:"",
        course_condition:"",
        course_feature:"",
        write_person:"",
        write_finish_time:"",
        declare_time:"",
        grade:"",
        file_id:"",
    }
  }
};
</script>
