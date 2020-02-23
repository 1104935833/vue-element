<template>
  <div>
    <el-row>
      <el-col>
        成果名称：
        <el-input v-model="form.achievement_name" placeholder="请输入..."></el-input>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        成果完成人：
        <el-input v-model="form.complete_person" placeholder="请输入..."></el-input>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        成果完成单位：
        <el-input v-model="form.complete_unit" placeholder="请输入..."></el-input>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        成果科类：
        <el-input v-model="form.section_category" placeholder="请输入..."></el-input>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        申报单位：
        <el-input v-model="form.delcare_unit" placeholder="请输入..."></el-input>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        代码：
        <el-input v-model="form.code" placeholder="请输入..."></el-input>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        申请时间：
        <el-date-picker v-model="form.apply_time" type="date" placeholder="选择日期"></el-date-picker>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        等级:
        <el-select v-model="form.grade" placeholder="请选择等级">
          <el-option label="国家级--特等"></el-option>
          <el-option label="国家级--一等"></el-option>
          <el-option label="国家级--二等"></el-option>
          <el-option label="省级--一等"></el-option>
          <el-option label="省级--二等"></el-option>
          <el-option label="市厅级--校级"></el-option>
          <el-option label="市厅级--院级"></el-option>
          <el-option label="市厅级--一等"></el-option>
          <el-option label="市厅级--二等"></el-option>
          <el-option label="市厅级--三等"></el-option>
        </el-select>
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
        achievement_name:"",
        complete_person:"",
        complete_unit:"",
        section_category:"",
        declare_unit:"",
        code:"",
        apply_time:"",
        grade:"",
        file_id:"",
      },
      input: "",
      textarea:"",
      region:"",
      msgType:2
    };
  },
  clear(){
    this.form={
      id:"",
      achievement_name:"",
        complete_person:"",
        complete_unit:"",
        section_category:"",
        declare_unit:"",
        code:"",
        apply_time:"",
        grade:"",
        file_id:"",
    }
  }
};
</script>
