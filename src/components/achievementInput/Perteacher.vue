<template>
  <div>
    <el-row>
      <el-col :span="12" align="center">
        <h1>个人教学业绩</h1>
      </el-col>
      
      <el-col :span="12" align="center">
        <h1>集体教学业绩</h1>
      </el-col>
    </el-row>
    <el-row>
      <el-col>&nbsp;</el-col>
    </el-row>
    <el-row>
      <el-col :span="10">
        <Personal></Personal>
      </el-col>
      <el-col :span="4">&nbsp;</el-col>
      <el-col :span="10">
        <Group></Group>
      </el-col>
    </el-row>
    
  </div>  
</template>
<script>
import personal from "./Teacher/personalteacher";
import group from "./Teacher/groupteacher"
export default {
  components:{
    Personal:personal,
    Group:group,
  }
}
</script>