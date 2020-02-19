<template>
  <div>
    <HonerGroup v-if="this.tableName=='honer'" v-bind="$attrs"></HonerGroup>
    <HonerSelf v-if="this.tableName=='HonerSelf'" v-bind="$attrs"></HonerSelf>
  </div>
</template>
<script>
import HonerGroup from "../achievementInput/Hornor/Perhonorgroup";
import HonerSelf from "../achievementInput/Hornor/Perhonorpersonal";

export default {
  props: ["message"],
  components: {
    HonerGroup: HonerGroup,
    HonerSelf: HonerSelf
  },
  data() {
    return {
      tableName: this.message
    };
  },

  created() {
    // console.log(this.msgType);
  },
  methods: {}
};
</script>