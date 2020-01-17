<template>
  <!-- v-loading="fullloading" -->
  <div style="margin-top: 10px">
    <el-button type="success" size="mini" style="margin-bottom:10px;" @click="showAddPart()">添加</el-button>
    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column align="center" prop="id" label="角色编码"></el-table-column>
      <el-table-column align="center" prop="name" label="角色名称"></el-table-column>
      <el-table-column align="center" prop="nameZh" label="角色说明"></el-table-column>
      <el-table-column align="center" label="是否有效">
        <template slot-scope="scope">
          <span v-if="scope.row.state==1" style="color:green">有效</span>
          <span v-if="scope.row.state==0" style="color:red">无效</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button type="text" @click="deleteRow(scope.row,0)" v-if="scope.row.state==1">禁用</el-button>
          <el-button type="text" @click="deleteRow(scope.row,1)" v-if="scope.row.state==0">启用</el-button>
          <span>|</span>
          <el-button type="text" @click="handleClick(scope.row)">编辑</el-button>
          <span>|</span>
          <el-button type="text" @click="transferClick(scope.row)">分配用户</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="分配用户" width="600px" :visible.sync="dialogUserVisible">
      <template>
        <el-transfer
          ref="transfer"
          filterable
          :titles="['选择用户', '授权角色用户']"
          filter-placeholder="请输入搜索内容"
          v-model="value"
          :props="{
              key: 'value',
              label: 'label'
            }"
          :data="Transferdata"
        ></el-transfer>
      </template>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogUserVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit()">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="角色修改" width="500px" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="角色编码">
          <el-input v-model="form.id" disabled="true"></el-input>
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
              :data="menudata"
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
        <el-button type="primary" @click="edit()">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="角色添加" width="500px" :visible.sync="dialogAddVisible">
      <el-form :model="form">
        <el-form-item label="角色名称">
          <el-input
            placeholder="请输入内容"
            v-model="form.name"
          >
            <template slot="prepend">ROLE_</template>
          </el-input>
        </el-form-item>
        <el-form-item label="角色说明">
          <el-input v-model="form.nameZh" ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogAddVisible = false">取 消</el-button>
        <el-button type="primary" @click="add()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  import {isNotNullORBlank} from '../../utils/utils';
export default {
  data() {
    return {
      
      submitId: "", //分配用户提交时的角色编码
      Transferdata: [],
      value: [],
      rightTransData: [], //定义一个空数组保存选中的值
      menudata: [],
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
      dialogUserVisible: false,
      dialogAddVisible: false,
      dialogFormVisible: false,
      fullscreenLoading: false //分配菜单下面的加载
    };
  },
  methods: {
    add() {
      if(isNotNullORBlank(this.form.name) && isNotNullORBlank(this.form.nameZh)){//非空判断
        this.postRequest("/system/role/addPart", {
          name: 'ROLE_'+this.form.name,
          nameZh: this.form.nameZh
        }).then(res => {
          if (res.msg == "添加成功!" && status == 200) {
          }
          this.dialogAddVisible = false;
        });
      }
    },
    showAddPart() {
      this.initForm();
      this.dialogAddVisible = true;
    },
    // 初始化分配用户的所有人员
    initTransfer(row) {
      this.Transferdata = [];
      this.value = [];
      this.submitId = row.id;
      this.getRequest("/system/role/getTrandferUser", { rid: row.id }).then(
        res => {
          let leftLabel = res.data.leftLabel;
          let leftValue = res.data.leftValue;
          let rightVlaue = res.data.rightValue;
          for (let i = 0; i < leftLabel.length; i++) {
            this.Transferdata.push({
              label: leftLabel[i],
              value: leftValue[i]
            });
          }
          this.value = rightVlaue;
        }
      );
    },
    // 分配用户提交
    submit() {
      this.postRequest("/system/role/editPartUser", {
        parts: this.value,
        partId: this.submitId
      }).then(res => {
        this.dialogUserVisible = false;
      });
    },
    // 显示分配用户dialog
    transferClick(row) {
      this.dialogUserVisible = true;
      this.initTransfer(row);
    },
    // 编辑
    edit() {
      if(isNotNullORBlank(this.form.name) && isNotNullORBlank(this.form.nameZh)){//非空判断
        let node = this.$refs.tree.getCheckedNodes();
        var nodes = new Array();
        for (let i = 0; i < node.length; i++) {
          nodes[i] = node[i].id;
        }
        this.post("/system/role/editPart", {
          form: this.form,
          nodes: nodes
        }).then(res => {
          this.initAllRole();
          this.dialogFormVisible = false;
        });
      }
    },
    //初始化选中的菜单
    initNodes(id) {
      this.getRequest("/system/role/getPartMenuById", { id: id }).then(res => {
        // console.log(res.data);
        this.$refs.tree.setCheckedNodes(res.data.part);
      });
    },
    //获取所有菜单
    getCheckedNodes(id) {
      this.getRequest("/system/role/getPartMenuById", { id: "" }).then(res => {
        if (res.statusText == "OK" && res.status == 200) {
          this.menudata = res.data.part;
          this.initNodes(id);
        }
      });
    },
    // 角色的启用/禁用
    deleteRow(row, state) {
      let msg;
      state == "1"
        ? (msg = "此操作将启用此角色, 是否继续?")
        : (msg = "此操作将禁用此角色, 是否继续?");
      this.$confirm(msg, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.getRequest("/system/role/delPart", {
            id: row.id,
            state: state
          }).then(res => {
            this.initAllRole();
          });
        })
        .catch(() => {});
    },
    //显示编辑的dialog
    handleClick(row) {
      this.form = JSON.parse(JSON.stringify(row));
      this.dialogFormVisible = true;
      this.openFullScreen1();
      this.getCheckedNodes(row.id);
    },
    // 一跳出编辑的dialog，不会立马显示menu
    openFullScreen1() {
      this.fullscreenLoading = true;
      setTimeout(() => {
        this.fullscreenLoading = false;
      }, 1500);
    },
    // 情况form表单
    initForm() {
      this.form = {
        id: "",
        name: "",
        nameZh: "",
        menu: ""
      };
    },
    // 获取所有权限列表AllRole
    initAllRole() {
      this.tableData = [];
      this.getRequest("/system/role/getAllRole").then(res => {
        this.tableData = res.data.role;
      });
    }
  },

  mounted: function() {
    this.initAllRole();
  }
};
</script>
<style>
.el-button + .el-button {
  margin-left: -2px;
}
</style>
