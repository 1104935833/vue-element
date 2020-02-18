<template>
  <div>
    <div>
      <!-- 第一行 -->
      <el-row>
        <el-col :span="12">
          <h1 align="center">个人教学业绩</h1>
        </el-col>
        <el-col :span="12">
          <h1 align="center">集体教学业绩</h1>
        </el-col>
      </el-row>
      <!-- 第二行 -->
      <el-row>
        <el-col :span="12">
          <el-row>
            <el-col>
              <h5 align="center">工会</h5>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-checkbox v-model="checked">巾帼文明示范岗先进个人</el-checkbox>
            </el-col>
            <el-col :span="12">
              <el-checkbox v-model="checked">事业家庭兼顾型先进个人</el-checkbox>
            </el-col>
            <el-col :span="12">
              <el-checkbox v-model="checked">师德标兵</el-checkbox>
            </el-col>
            <el-col :span="12">
              <el-checkbox v-model="checked">三育人先进个人</el-checkbox>
            </el-col>
            <el-col :span="12">
              <el-checkbox v-model="checked">“杭州教育工匠”暨“最美思政教师</el-checkbox>
            </el-col>
            <el-col :span="12">
              <el-checkbox v-model="checked">最美班主任</el-checkbox>
            </el-col>
            <el-col :span="12">
              <el-checkbox v-model="checked">优秀共产党员</el-checkbox>
            </el-col>
            <el-col :span="12">
              <el-checkbox v-model="checked">工会活动积极分子</el-checkbox>
            </el-col>
            <el-col :span="12">
              <el-checkbox v-model="checked">优秀工会工作者</el-checkbox>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <h5 align="center">人事</h5>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-checkbox v-model="checked">年度考核优秀</el-checkbox>
            </el-col>
            <el-col :span="12">
              <el-checkbox v-model="checked">优秀教师</el-checkbox>
            </el-col>
            <el-col :span="12">
              <el-checkbox v-model="checked">优秀教育工作者</el-checkbox>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <h5 align="center">组织</h5>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="12">
          <el-row>
            <el-col>
              <el-checkbox v-model="checked">巾帼文明示范岗先进集体</el-checkbox>
            </el-col>
          </el-row>
        </el-col>
        </el-row>
    </div>
  </div>  
</script>