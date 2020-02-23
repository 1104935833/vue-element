<template>
  <div>
    <el-row>
      <!--第1行-->
      <el-col :span="24">
        <div>
          创新团队名称：
          <el-input v-model="form.team_name" placeholder="请输入内容"></el-input>
        </div>
      </el-col>
    </el-row>
    <!--第2行-->
    <el-row>
      <el-col :span="24">
        <div class="grid-content bg-purple">
          团队人员：
          <el-input v-model="team_personnel" placeholder="请输入内容"></el-input>
        </div>
      </el-col>
    </el-row>
    <!--第3行-->
    <el-row>
      <el-col :span="24">
        <div class="grid-content bg-purple">
          研究方向：
          <el-input v-model="form.direction" placeholder="请输入内容"></el-input>
        </div>
      </el-col>
    </el-row>
    <!--第4行-->
    <el-row>
      <el-col :span="24">
        <div class="grid-content bg-purple">
          所在学校：
          <el-input v-model="form.school_place" placeholder="请输入内容"></el-input>
        </div>
      </el-col>
    </el-row>
    <!--第5行-->
    <el-row>
      <el-col :span="24">
        <div class="grid-content bg-purple">
          通讯地址：
          <el-input v-model="form.address" placeholder="请输入内容"></el-input>
        </div>
      </el-col>
    </el-row>
    <!--第6行-->
    <el-row>
      <el-col :span="24">
        <div class="grid-content bg-purple">
          负责人联系电话：
          <el-input v-model="form.head_phone" placeholder="请输入内容"></el-input>
        </div>
      </el-col>
    </el-row>
<!--第7行-->
    <el-row>
      <el-col :span="24">
        <div class="grid-content bg-purple">
          申报日期：
          <el-input v-model="form.declare_time" placeholder="请输入内容"></el-input>
        </div>
      </el-col>
    </el-row>
    <!--第8行-->
    <el-row>
      <el-col :span="24">
        <div class="grid-content bg-purple">
          主管部门：
          <el-input v-model="form.competent_department" placeholder="请输入内容"></el-input>
        </div>
      </el-col>
    </el-row>
    <el-row>
        <el-col>&nbsp;</el-col>
        <el-col>
          等级：
          <el-radio-group v-model="form.level">
            <el-radio :label="0">国家级</el-radio>
            <el-radio :label="1">省部级</el-radio>
            <el-radio :label="2">市厅级</el-radio>
            <el-radio :label="3">校院级</el-radio>
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
        team_name:"",
        team_personal:"",
        direction:"",
        school_place:"",
        address:"",
        head_phone:"",
        declare_time:"",
        competent_department:"",
        level:"",
        file_id:"",
      },
      input: "",
      msgType:2,
    };
  },
  clear(){
    this.form = {
      id:"",
      team_name:"",
        team_personal:"",
        direction:"",
        school_place:"",
        address:"",
        head_phone:"",
        declare_time:"",
        competent_department:"",
        level:"",
        file_id:"",
    }
  }
};
</script>
