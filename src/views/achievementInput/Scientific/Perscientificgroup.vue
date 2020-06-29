<template>
  <div>
    <el-tabs type="border-card">
      <el-tab-pane label="重点(一流学科)">
        <FirstSubject />
      </el-tab-pane>
      <el-tab-pane label="重点实验室">
        <Lab />
      </el-tab-pane>
      <el-tab-pane label="科技创新平台">
        <Technological />
      </el-tab-pane>
      <el-tab-pane label="产学科研联盟">
        <Production />
      </el-tab-pane>
      <el-tab-pane label="学术创新团队">
        <Academic />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import firstSubject from './firstSubject.vue'
import lab from './lab.vue'
import technological from './technological.vue'
import production from './production.vue'
import academic from './academic.vue'
export default {
  components: {
    FirstSubject: firstSubject,
    Lab: lab,
    Technological: technological,
    Production: production,
    Academic: academic
  }
}
</script>
