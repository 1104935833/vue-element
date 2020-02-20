<template>
    <div>
        <el-row>
      <el-col :span="10">
        新增专业名称：
        <el-input v-model="input" placeholder="请输入内容"></el-input>
      </el-col>
      <el-col :span="2">&nbsp;</el-col>
      <el-col :span="12">
        所在院系：
        <el-input v-model="input" placeholder="请输入内容"></el-input>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="10">
        专业负责人：
        <el-input v-model="input" placeholder="请输入内容"></el-input>
      </el-col>
      <el-col :span="2">&nbsp;</el-col>
      <el-col :span="12">
        联系方式：
        <el-input v-model="input" placeholder="请输入内容"></el-input>
      </el-col>
    </el-row>

    <el-row>
        <el-col>
            <div>&nbsp;</div>
        </el-col>
    </el-row>
    <el-row>
      <el-col>
        <div>
          <el-radio-group v-model="radio2">
            <el-radio-button label="国家级"></el-radio-button>
            <el-radio-button label="省级"></el-radio-button>
            <el-radio-button label="市厅级"></el-radio-button>
            <el-radio-button label="校院级"></el-radio-button>
            <el-radio-button label="新专业"></el-radio-button>
          </el-radio-group>
        </div>
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
            将文件拖到此处，或
            <em>点击上传</em>
          </div>
        </el-upload>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24" align="center">
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