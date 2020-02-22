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
import group from "./Teacher/groupteacher"
export default {
  components:{
    Personal:personal,
    Group:group,
  }
}
</script>