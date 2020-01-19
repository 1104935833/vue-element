<template>
  <div>
    <el-tabs v-model="defaultTab" type="card">
      <el-tab-pane label="用户权限分配" name="depMana">
        <dep-mana></dep-mana>
      </el-tab-pane>
      <el-tab-pane label="权限菜单分配" name="positionMana">
        <pos-mana state="position"></pos-mana>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
  import MenuRole from './basic/MenuRole.vue'
  import DepMana from './basic/DepMana.vue'
  import ECMana from './basic/ECMana.vue'
  import JobTitleMana from './basic/JobTitleMana.vue'
  import PosMana from './basic/PosMana.vue'
  export default {
    data() {
      return {
        defaultTab: 'depMana'
      };
    },
    methods: {},
    components: {
      'menu-role': MenuRole,
      'dep-mana': DepMana,
      'ec-mana': ECMana,
      'jobtitle-mana': JobTitleMana,
      'pos-mana': PosMana
    }
  };
</script>
