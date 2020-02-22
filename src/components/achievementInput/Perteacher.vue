<template>
  <div>
    <el-row>
      <el-col :span="22">
        <Personal></Personal>
      </el-col>
    </el-row>
    
  </div>  
</template>
<script>
import personal from "./Teacher/personalteacher";
export default {
  components:{
    Personal:personal,
  }
}
</script>