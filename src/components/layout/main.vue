<template>
  <div>
    <div>
      <keep-alive>
        <router-view v-if="this.$route.meta.keepAlive"></router-view>
      </keep-alive>
      <router-view v-if="!this.$route.meta.keepAlive"></router-view>
    </div>
  </div>
</template>
<script>
export default {};
</script>
<style>


</style>
