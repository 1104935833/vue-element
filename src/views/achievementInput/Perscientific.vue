<template>
  <div>
    <el-row>
      <el-col :span="12" align="center">
        <h1>个人科研</h1>
      </el-col>
      <el-col :span="12" align="center">
        <h1>集体科研</h1>
      </el-col>
    </el-row>
    <el-row :gutter="8">
      <el-col :span="11">
        <Personal />
      </el-col>
      <el-col :span="11" :offset="1">
        <Group />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import personal from './Scientific/Perscientificpersonal'
import group from './Scientific/Perscientificgroup'
export default {
  components: {
    Personal: personal,
    Group: group
  },
  data() {
    return {

    }
  }

}
</script>
