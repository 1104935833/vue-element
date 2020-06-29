<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="12">
        <el-card style="height:700px;">
          <Personal />
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card>
          <Group />
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import personal from './Hornor/Perhonorpersonal'
import group from './Hornor/Perhonorgroup'
export default {
  components: {
    Personal: personal,
    Group: group
  }
}
</script>
