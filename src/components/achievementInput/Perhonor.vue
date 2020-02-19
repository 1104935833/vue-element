<template>
  <div>
    <el-row>
      <el-col :span="12">
        <Personal></Personal>
      </el-col>
      <el-col :span="12">
        <Group></Group>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import personal from "./Hornor/Perhonorpersonal";
import group from "./Hornor/Perhonorgroup";
export default {
  components: {
    Personal: personal,
    Group: group
  }
};
</script>