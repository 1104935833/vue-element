<template>
  <div>
    <el-tabs type="border-card">
      <el-tab-pane label="学生科研指导">
        <studentResearch />
      </el-tab-pane>
      <el-tab-pane label="教学技能竞赛">
        <skill />
      </el-tab-pane>
      <el-tab-pane label="学科竞赛指导">
        <competition />
      </el-tab-pane>
      <el-tab-pane label="教改项目">
        <educational />
      </el-tab-pane>
      <el-tab-pane label="教学成果奖">
        <achiecement />
      </el-tab-pane>
      <el-tab-pane label="教研教改论文">
        <teachingReform />
      </el-tab-pane>
      <el-tab-pane label="课程建设与课程改革">
        <course />
      </el-tab-pane>
      <el-tab-pane label="教材编写">
        <textBook />
      </el-tab-pane>
      <el-tab-pane label="专业建设">
        <professional />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import textBook from './textBook'
import educational from './educational'
import achiecement from './achiecement'
import skill from './skill'
import teachingReform from './teachingReform'
import course from './course'
import competition from './competition'
import xueshengkeyanzhidao from './studentResearch'
import professional from './professional'
import studentResearch from './studentResearch'
export default {
  components: {
    textBook: textBook,
    educational: educational,
    achiecement: achiecement,
    skill: skill,
    teachingReform: teachingReform,
    course: course,
    competition: competition,
    studentResearch: studentResearch,
    professional: professional
  }
}
</script>
