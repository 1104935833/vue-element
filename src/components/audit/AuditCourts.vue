<template>
  <div>
  {{message}}
  </div>
</template>
<script>
export default {
   props: ["message"],
  
  data(){
    return{
      a:this.message
    }
  },
  
  created() {
    console.log(this.a.proposer_time);
    
  },
  methods: {
   
   
   
  }
};
</script>