<template>
  <div>
    <el-row>
      <!--第1行-->
      <el-col :span="24">
        <div>
          创新团队名称：
          <el-input v-model="input" placeholder="请输入内容"></el-input>
        </div>
      </el-col>
    </el-row>
    <!--第2行-->
    <el-row>
      <el-col :span="24">
        <div class="grid-content bg-purple">
          团队人员：
          <el-input v-model="input" placeholder="请输入内容"></el-input>
        </div>
      </el-col>
    </el-row>
    <!--第3行-->
    <el-row>
      <el-col :span="24">
        <div class="grid-content bg-purple">
          研究方向：
          <el-input v-model="input" placeholder="请输入内容"></el-input>
        </div>
      </el-col>
    </el-row>
    <!--第4行-->
    <el-row>
      <el-col :span="24">
        <div class="grid-content bg-purple">
          所在学校：
          <el-input v-model="input" placeholder="请输入内容"></el-input>
        </div>
      </el-col>
    </el-row>
    <!--第5行-->
    <el-row>
      <el-col :span="24">
        <div class="grid-content bg-purple">
          通讯地址：
          <el-input v-model="input" placeholder="请输入内容"></el-input>
        </div>
      </el-col>
    </el-row>
    <!--第6行-->
    <el-row>
      <el-col :span="24">
        <div class="grid-content bg-purple">
          负责人联系电话：
          <el-input v-model="input" placeholder="请输入内容"></el-input>
        </div>
      </el-col>
    </el-row>
<!--第7行-->
    <el-row>
      <el-col :span="24">
        <div class="grid-content bg-purple">
          申报日期：
          <el-input v-model="input" placeholder="请输入内容"></el-input>
        </div>
      </el-col>
    </el-row>
    <!--第8行-->
    <el-row>
      <el-col :span="24">
        <div class="grid-content bg-purple">
          主管部门：
          <el-input v-model="input" placeholder="请输入内容"></el-input>
        </div>
      </el-col>
    </el-row>
    <el-row>
        <el-col>&nbsp;</el-col>
        <el-col align="center">
            <el-radio v-model="radio" label="1">国家级</el-radio>
            <el-radio v-model="radio" label="2">省部级</el-radio>
            <el-radio v-model="radio" label="3">市厅级</el-radio>
            <el-radio v-model="radio" label="4">校院级</el-radio>
        </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  data() {
    return {
      input: ""
    };
  }
};
</script>
