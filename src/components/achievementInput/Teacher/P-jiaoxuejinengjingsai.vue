<template>
  <div>
    <el-row>
      <el-col :span="10">
        所在单位：
        <el-input v-model="input" placeholder="请输入内容"></el-input>
      </el-col>
      <el-col :span="2">&nbsp;</el-col>
      <el-col :span="12">
        专业学科：
        <el-input v-model="input" placeholder="请输入内容"></el-input>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="10">
        负责人：
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
            获奖等级：
        </el-col>
    </el-row>
    <el-row>
      <el-col>
        <div>
          <el-radio-group v-model="radio1">
            <el-radio-button label="省级"></el-radio-button>
            <el-radio-button label="校级"></el-radio-button>
            <el-radio-button label="院级"></el-radio-button>
            
          </el-radio-group>
        </div>
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
            <el-radio-button label="特等奖"></el-radio-button>
            <el-radio-button label="一等奖"></el-radio-button>
            <el-radio-button label="二等奖"></el-radio-button>
            <el-radio-button label="三等奖"></el-radio-button>
            <el-radio-button label="优胜奖"></el-radio-button>
          </el-radio-group>
        </div>
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

<script>
  export default {
    data () {
      return {
        radio1: '上海',
        radio2: '上海',
      };
    }
  }
</script>