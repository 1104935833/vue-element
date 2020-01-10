<template>
<!-- v-loading="fullloading" -->
  <div style="margin-top: 10px" >
    <el-table :data="tableData" stripe style="width: 100%" >
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
        <el-form-item label="角色编码" >
          <el-input v-model="form.id" ></el-input>
        </el-form-item>
        <el-form-item label="角色名称" >
          <el-input v-model="form.name" ></el-input>
        </el-form-item>
        <el-form-item label="角色说明" >
          <el-input v-model="form.nameZh" ></el-input>
        </el-form-item>
        <el-form-item >
          <template>
            <span>分配菜单</span>
            <el-button @click="key()" type="button" />
            <el-tree
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
    key() {
      this.getRequest("/system/role/getPartMenu",{id:6}).then(res=>{
        this.
        console.log(res);
      });
      this.$refs.tree.setCheckedNodes([
        {
          id: 5,
          label:''
        },
        {
          id: 9,
        }
      ]);
    },
    deleteRow(index, rows) {
      rows.splice(index, 1);
    },
    handleClick(row) {
      this.form=row
      this.dialogFormVisible = true;
      console.log(row);
    }
  },
  data() {
    return {
      data: [],
        defaultProps: {
          children: 'children',
          label: 'label'
        },





      form: {
        id: "",
        name: "",
        nameZh: "",
        menu: ""
      },
      tableData: [],
      dialogFormVisible: false
    };
  },
  mounted: function() {
     this.getRequest("/system/role/getAllRole").then(res => {
       this.tableData=res.data.role
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
