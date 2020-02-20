<template>
  <div>
    <el-row>
      <el-col>
        实用新型专利名称：
        <el-input placeholder="请输入..."></el-input>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        发明人：
        <el-input placeholder="请输入..."></el-input>
      </el-col>
      <el-col :span="12">
        联系电话：
        <el-input placeholder="请输入..."></el-input>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        申请人：
        <el-input placeholder="请输入..."></el-input>
      </el-col>
      <el-col :span="12">
        申请号：
        <el-input placeholder="请输入..."></el-input>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        申请人通讯地址：
        <el-input placeholder="请输入..."></el-input>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        专利代理机构名称：
        <el-input placeholder="请输入..."></el-input>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        专利代理机构所在地区：
        <el-input placeholder="请输入..."></el-input>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        代理机构代码：
        <el-input placeholder="请输入..."></el-input>
      </el-col>
      <el-col :span="12">
        专利号：
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
