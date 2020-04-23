<template>
  <div>
    <h1>业绩点配置</h1>

    <el-card class="tp">
      <el-row v-for="item in list" :key="item.index" style="margin-bottom:10px">
        <el-col :span="3">
          <span>{{item.table_name}}</span>
        </el-col>
        <el-col :span="3">
          <el-input v-model="item.grade" placeholder></el-input>
        </el-col>
        <el-col :span="3">
          <el-button type="primary" style="margin-left:10px" @click="editGrade(item)">提交</el-button>
        </el-col>
      </el-row>
      <el-pagination
        background
        :page-size="10"
        :current-page="currentPage"
        @current-change="currentChange"
        layout="prev, pager, next"
        :total="total"
      ></el-pagination>
    </el-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      list: [],
      total: 0,
      currentPage: 1
    };
  },
  created() {
    this.getList();
  },
  methods: {
      editGrade(row){
          
        this.putRequest("/grade/editGrade",{id:row.id,grade:row.grade}).then(res=>{
            if(res.data.status==200){
                this.$message.success("跟新成功!");
                this.currentPage=1
                this.getList();
            }
        })
      },

    currentChange(currentChange) {
      this.currentPage = currentChange;
      this.getList();
    },
    getList() {
      this.getRequest("/grade/getGradeList", {
        page: this.currentPage,
        size: 10
      }).then(res => {
        this.list = res.data.obj.data;
        this.total = res.data.obj.total;
      });
    }
  }
};
</script>
<style scoped>
.tp {
  margin-top: 10px;
}
</style>