<template>
  <div>
    <el-row>
      <el-col :span="12">
        日期：
        <el-date-picker v-model="value1" type="date" placeholder="选择日期"></el-date-picker>
      </el-col>
      <el-col :span="12">
        所在部门：
      <el-input placeholder="请输入..."></el-input>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        项目负责人：
        <el-input placeholder="请输入..."></el-input>
      </el-col>
      <el-col :span="12">
        职称：
        <el-input placeholder="请输入..."></el-input>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        联系电话：
        <el-input placeholder="请输入..."></el-input>
      </el-col>
      <el-col :span="12">
        申请总额：
        <el-input placeholder="请输入..."></el-input>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        项目名称：
        <el-input placeholder="请输入..."></el-input>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        项目依托单位：
        <el-input placeholder="请输入..."></el-input>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        项目类型：
        <el-input placeholder="请输入..."></el-input>
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
            <el-button >提  交</el-button>
        </el-col>
        <el-col :span="12" align="center">
            <el-button >重  置</el-button>
        </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  data() {
    return {
      radio: ""
    };
  }
};
</script>
