<template>
  <div>
    <el-row>
      <!--第1行-->
      <el-col :span="10">
        <div>
          联盟名称(全称)：
          <el-input v-model="input" placeholder="请输入内容"></el-input>
        </div>
      </el-col>
      <el-col :span="2">&nbsp;</el-col>
      <el-col :span="12">
        <div class="grid-content bg-purple">
          联盟协议生效时间：
          <el-input v-model="input" placeholder="请输入内容"></el-input>
        </div>
      </el-col>
    </el-row>
    <!--第2行-->
    <el-row>
      <el-col :span="10">
        <div class="grid-content bg-purple">
          技术领域：
          <el-input v-model="input" placeholder="请输入内容"></el-input>
        </div>
      </el-col>
      <el-col :span="2">&nbsp;</el-col>
      <el-col :span="12">
        <div class="grid-content bg-purple">
          联盟理事长：
          <el-input v-model="input" placeholder="请输入内容"></el-input>
        </div>
      </el-col>
    </el-row>
    <!--第3行-->
    <el-row>
      <!--第3行第1列-->
      <el-col :span="10">
        <div class="grid-content bg-purple">
          所在单位：
          <el-input v-model="input" placeholder="请输入内容"></el-input>
        </div>
      </el-col>
      <el-col :span="2">&nbsp;</el-col>
      <!--第3行第2列-->
      <el-col :span="12">
        <div class="grid-content bg-purple">
          联系方式：
          <el-input v-model="input" placeholder="请输入内容"></el-input>
        </div>
      </el-col>
    </el-row>
    <!--第4行-->
    <el-row>
      <!--第4行第1列-->
      <el-col>
        <div class="grid-content bg-purple">
          联盟常设机构的依托单位名称：
          <el-input v-model="input" placeholder="请输入内容"></el-input>
        </div>
      </el-col>
    </el-row>
    <!--第5行-->
    <el-row>
      <el-col>
        <div class="grid-content bg-purple">
          常设机构通讯地址：
          <el-input v-model="input" placeholder="请输入内容"></el-input>
        </div>
      </el-col>
    </el-row>
    <!--第6行-->
    <el-row>
        <el-col>
            <el-row>
      <!--第6行第1列-->
      <el-col :span="10">
        <div class="grid-content bg-purple">
          批准部门：
          <el-input v-model="input" placeholder="请输入内容"></el-input>
        </div>
      </el-col>
      <el-col :span="2">&nbsp;</el-col>
      <!--第6行第1列-->
      <el-col :span="12">
        <div class="grid-content bg-purple">
          批准时间：
          <el-input v-model="input" placeholder="请输入内容"></el-input>
        </div>
      </el-col>
    </el-row>
        </el-col>
    </el-row>
    <!--第7行-->
    <el-row>
        <el-col align="center">
            上传佐证材料：
        </el-col>
    </el-row>
    <!--上传文件-->
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
          将文件拖到此处，或<em>点击上传</em>
        </div>
      </el-upload>
      </el-col>
    </el-row>
    <!--提交重置-->
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
        union_name:"",
        union_effect_time:"",
        technology_field:"",
        union_director:"",
        unit_place:"",
        phone:"",
        standing_body_name:"",
        standing_body_address:"",
        approval_department:"",
        approval_time:"",
        file_id:"",
      },
      input: "",
      msgType:2,
    };
  },
  clear(){
    this.form={
      union_name:"",
        union_effect_time:"",
        technology_field:"",
        union_director:"",
        unit_place:"",
        phone:"",
        standing_body_name:"",
        standing_body_address:"",
        approval_department:"",
        approval_time:"",
        file_id:"",
    }
  }
};
</script>
