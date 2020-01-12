<template>
  <!-- v-loading="fullloading" -->
  <div style="margin-top: 10px">
    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column align="center" prop="id" label="角色编码"></el-table-column>
      <el-table-column align="center" prop="name" label="角色名称"></el-table-column>
      <el-table-column align="center" prop="nameZh" label="角色说明"></el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button type="text" @click="deleteRow(scope.$index, tableData)">删除</el-button>|
          <el-button type="text" @click="handleClick(scope.row)">编辑</el-button>|
          <el-button type="text" @click="handleClick(scope.row)">分配用户</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="角色修改" width="500px" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="角色编码">
          <el-input v-model="form.id"></el-input>
        </el-form-item>
        <el-form-item label="角色名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="角色说明">
          <el-input v-model="form.nameZh"></el-input>
        </el-form-item>
        <el-form-item>
          <template>
            <span>分配菜单</span>
            <el-tree 
            v-loading="fullscreenLoading"
              element-loading-text="拼命加载中"
              element-loading-spinner="el-icon-loading"
              element-loading-background="#ffffff"
              :data="data"
              show-checkbox
              default-expand-all
              node-key="id"
              ref="tree"
              highlight-current
              :props="defaultProps"
             
            ></el-tree>
          </template>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  methods: {
    //初始化选中的菜单
    initNodes(id) {
      this.getRequest("/system/role/getPartMenuById", { id: id }).then(res => {
        console.log(res.data);
        this.$refs.tree.setCheckedNodes(res.data.part);
      });
    },
    //获取所有菜单
    getCheckedNodes(id) {
      this.getRequest("/system/role/getPartMenuById", { id: "" }).then(res => {
        if (res.statusText == "OK" && res.status == 200) {
          this.data = res.data.part;
          this.initNodes(id);
        }
      });
    },
    deleteRow(index, rows) {
      rows.splice(index, 1);
    },
    handleClick(row) {
      this.form = row;
      this.dialogFormVisible = true;
      this.openFullScreen1();
      this.getCheckedNodes(row.id);
    },
    openFullScreen1() {
      this.fullscreenLoading = true;
      setTimeout(() => {
        this.fullscreenLoading = false;
      }, 1500);
    }
  },
  data() {
    return {
      data: [],
      defaultProps: {
        children: "children",
        label: "label"
      },
      form: {
        id: "",
        name: "",
        nameZh: "",
        menu: ""
      },
      tableData: [],
      dialogFormVisible: false,
      fullscreenLoading: false
    };
  },
  mounted: function() {
    this.getRequest("/system/role/getAllRole").then(res => {
      this.tableData = res.data.role;
      console.log(res);
    });
  }
};
</script>
<style>
.el-button + .el-button {
  margin-left: -2px;
}
</style>
