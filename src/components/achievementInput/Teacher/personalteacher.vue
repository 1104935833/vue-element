<template>
  <div>
    <xueshengkeyanzhidao></xueshengkeyanzhidao>
    <Jiaoxuejinengjingsai></Jiaoxuejinengjingsai>
    <Xuekejingsaizhidao></Xuekejingsaizhidao>
  </div>
</template>

<script>
import xuekejingsaizhidao from "./P-xuekejingsaizhidao";
import jiaoxuejinengjingsai from "./P-jiaoxuejinengjingsai";
import xueshengkeyanzhidao from "./P-xueshengkeyanzhidao";
export default {
  components: {
    Xuekejingsaizhidao: xuekejingsaizhidao,
    Jiaoxuejinengjingsai: jiaoxuejinengjingsai,
    Xueshengkeyanzhidao: xueshengkeyanzhidao
  }
};
</script>