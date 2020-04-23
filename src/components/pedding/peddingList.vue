<template>
  <div>
    <el-table :data="peddingList" stripe style="width: 100%" height="650">
      <el-table-column prop="id" label="序号" width="180"></el-table-column>
      <el-table-column prop="main" label="待办内容" width="180"></el-table-column>
      <el-table-column prop="name" label="待办名称"></el-table-column>
      <el-table-column prop="operator" label="发起人"></el-table-column>
      <el-table-column prop="state" label="审核状态"></el-table-column>
      <el-table-column prop="createTime" label="发起时间"></el-table-column>
      <el-table-column prop="updateTime" label="处理时间"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="success" size="mini" @click="showPeddingInfo(scope.row)">查看</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      style="float:right;"
      background
      :page-size="10"
      :current-page="currentPage"
      @current-change="currentChange"
      layout="prev, pager, next"
      :total="totalCount"
    ></el-pagination>
  </div>
</template>
<script>
export default {
  data() {
    return {
      peddingList: [],
      totalCount: -1,
      currentPage: 1
    };
  },
  created() {
    this.getpeddingList();
  },
  methods: {
    currentChange(currentChange) {
      this.currentPage = currentChange;
      this.getpeddingList();
    },
    showPeddingInfo(row) {
      this.$router.push({ path: row.url });
    },
    getpeddingList() {
      this.getRequest("/getPeddingName", {
        page: this.currentPage,
        size: 10
      }).then(res => {
        let list = res.data.list;
        for (let i = 0; i < list.length; i++) {
          switch (list[i].state) {
            case "0":
              list[i].state = "待审核";
              break;
            case "1":
              list[i].state = "教研室通过";
              break;
            case "2":
              list[i].state = "教研室未通过";
              break;
            case "3":
              list[i].state = "分院通过";
              break;
            case "4":
              list[i].state = "分院未通过";
              break;
          }
        }
        this.peddingList = list;
        this.totalCount = res.data.count;
      });
    }
  }
};
</script>