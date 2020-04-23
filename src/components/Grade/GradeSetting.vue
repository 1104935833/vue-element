<template>
  <div>
    <h1>业绩点配置</h1>

    <el-card>
        <el-row v-for="item in list" :key="item.index">
          <el-col :span="24">
              <span>{{item}}</span>
          </el-col>
        </el-row>
    </el-card>
  </div>
</template>
<script>
export default {
    data(){
        return {
            list:[1,2,3]
        }
    },
    created(){
        this.getList()
    },
    methods:{
        getList(){
            this.getRequest("").then(res=>{
                
            })
        }
    }
};
</script>
<style scoped>

</style>