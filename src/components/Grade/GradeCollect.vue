<template>
  <div>
    <el-container>
      <el-header
        style="padding: 0px;display:flex;justify-content:space-between;align-items: center"
      >
        <div style="display: inline">
          <el-input
            placeholder="输入名称"
            clearable
            style="width: 300px;margin: 0px;padding: 0px;"
            size="mini"
            v-model="keyword"
            prefix-icon="el-icon-search"
          ></el-input>
          <el-select v-model="treeValue" clearable placeholder="请选择">
            <el-option
              v-for="item in treeOption"
              :key="item.tree_code"
              :label="item.name"
              :value="item.tree_code"
            ></el-option>
          </el-select>
          <el-button
            type="primary"
            size="mini"
            style="margin-left: 5px"
            icon="el-icon-search"
            @click="getList"
          >搜索</el-button>
        </div>
      </el-header>
    </el-container>
    <el-table :data="list" border stripe size="mini" style="width: 100%">
      <el-table-column prop="id" align="left" fixed label="序号"></el-table-column>
      <el-table-column prop="name" align="left" fixed label="姓名"></el-table-column>
      <el-table-column prop="table_name" label="业绩类别"></el-table-column>
      <el-table-column align="left" label="申请时间" prop="create_time">
        <template slot-scope="scope">{{scope.row.proposer_time | dateFormat}}</template>
      </el-table-column>
      <el-table-column prop="grade" label="业绩点"></el-table-column>
    </el-table>
    <el-row :gutter="10">
      <el-col :span="3" :offset="19">
        <h2>汇总:{{count}}</h2>
      </el-col>
    </el-row>
    <el-pagination
      style="float:right;"
      background
      :page-size="10"
      :current-page="currentPage"
      @current-change="currentChange"
      layout="prev, pager, next"
      :total="total"
    ></el-pagination>
  </div>
</template>
<script>
export default {
  data() {
    return {
      total: 0,
      list: [],
      keyword: "",
      treeOption: [],
      treeValue: "",
      count: 0,
      currentPage: 1,
    };
  },
  mounted: function() {
    this.getList();
    this.getTree();
  },
  methods: {
    currentChange(currentChange) {
      this.currentPage = currentChange;
      this.getList();
    },
    getTree() {
      this.getRequest("/system/user/treepeople", { name: "理工分院" }).then(
        res => {
          this.treeOption = res.data;
        }
      );
    },
    getList() {
      this.getRequest("/grade/getGradeListByTeacher", {
        size: 10,
        page: this.currentPage,
        name: this.keyword,
        office: this.treeValue
      }).then(res => {
        this.list = res.data.obj.data;
        this.total = res.data.obj.total;
        this.count = res.data.obj.count;
      });
    }
  }
};
</script>
<style lang="scss">
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}

.result-foot {
  float: right;
}
.active {
  background: #2d8cf0;
}
.active a {
  color: #fff !important;
}
.ul {
  list-style: none;
  margin: 20px;
}
.ul li {
  float: left;
  line-height: 28px;
  width: 30px;
  border: 1px solid #ccc;
  border-radius: 4px;
  height: 30px;
  text-align: center;
  margin: 5px;
}
.ul li.disabled {
  color: #333;
}
.ul li a {
  color: #333;
}
</style>
