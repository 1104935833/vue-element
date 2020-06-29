<template>
  <div>
    <el-button type="success" size="mini" style="margin-bottom:10px;" @click="showAddPart()">添加</el-button>
    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column align="center" prop="id" label="角色编码" />
      <el-table-column align="center" prop="name" label="角色名称" />
      <el-table-column align="center" prop="nameZh" label="角色说明" />
      <el-table-column align="center" label="是否有效">
        <template slot-scope="scope">
          <span v-if="scope.row.state==1" style="color:green">有效</span>
          <span v-if="scope.row.state==0" style="color:red">无效</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button v-if="scope.row.state==1" type="text" @click="deleteRow(scope.row,0)">禁用</el-button>
          <el-button v-if="scope.row.state==0" type="text" @click="deleteRow(scope.row,1)">启用</el-button>
          <span>|</span>
          <el-button type="text" @click="handleClick(scope.row,scope.row.state)">编辑</el-button>
          <span>|</span>
          <el-button type="text" @click="transferClick(scope.row,1,scope.row.state)">分配用户</el-button>
          <span>|</span>
          <el-button type="text" @click="transferClick(scope.row,2,scope.row.state)">设置管理员</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分配用户与管理员 -->
    <el-dialog :title="title" width="610px" :visible.sync="dialogUserVisible">
      <template>
        <el-transfer
          ref="transfer"
          v-model="value"
          filterable
          :titles="['选择用户', '授权角色用户']"
          filter-placeholder="请输入搜索内容"
          :props="{
            key: 'value',
            label: 'label'
          }"
          :data="Transferdata"
        />
      </template>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogUserVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit()">确 定</el-button>
      </div>
    </el-dialog>
    <!-- dialog -->
    <el-dialog title="角色修改" width="500px" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="角色编码">
          <el-input v-model="form.id" disabled />
        </el-form-item>
        <el-form-item label="角色名称">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="角色说明">
          <el-input v-model="form.nameZh" />
        </el-form-item>
        <el-form-item>
          <template>
            <span>分配菜单</span>
            <el-tree
              ref="tree"
              v-loading="fullscreenLoading"
              element-loading-text="拼命加载中"
              element-loading-spinner="el-icon-loading"
              element-loading-background="#ffffff"
              :data="menudata"
              show-checkbox
              default-expand-all
              node-key="id"
              highlight-current
              :props="defaultProps"
            />
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
          <el-input v-model="form.name" placeholder="请输入内容">
            <template slot="prepend">ROLE_</template>
          </el-input>
        </el-form-item>
        <el-form-item label="角色说明">
          <el-input v-model="form.nameZh" />
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
import { isNotNullORBlank } from '@/utils/validate'
import { getAllRole, delPart, getPartMenuById, getAllMenus, editPart, editPartUser, getTrandferUser, addPart } from "@/api/system";
export default {
  data() {
    return {
      submitId: '', // 分配用户提交时的角色编码
      Transferdata: [],
      value: [],
      title: '分配用户',
      rightTransData: [], // 定义一个空数组保存选中的值
      menudata: [],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      form: {
        id: '',
        name: '',
        nameZh: '',
        menu: ''
      },
      tableData: [],
      dialogUserVisible: false,
      dialogAddVisible: false,
      dialogFormVisible: false,
      fullscreenLoading: false // 分配菜单下面的加载
    }
  },

  mounted: function() {
    this.initAllRole()
  },
  methods: {
    add() {
      if (
        isNotNullORBlank(this.form.name) &&
        isNotNullORBlank(this.form.nameZh)
      ) {
        // 非空判断
        addPart({
          name: 'ROLE_' + this.form.name,
          nameZh: this.form.nameZh
        }).then(res => {
          if (res.msg == '添加成功!' && status == 200) {
          }
          this.dialogAddVisible = false
        })
      }
    },
    showAddPart() {
      this.initForm()
      this.dialogAddVisible = true
    },
    // 初始化分配用户的所有人员
    initTransfer(row, type) {
      this.Transferdata = []
      this.value = []
      this.submitId = row.id
      getTrandferUser({ rid: row.id, type: type }).then(
        res => {
          const leftLabel = res.data.leftLabel
          const leftValue = res.data.leftValue
          const rightVlaue = res.data.rightValue
          for (let i = 0; i < leftLabel.length; i++) {
            this.Transferdata.push({
              label: leftLabel[i],
              value: leftValue[i]
            })
          }
          this.value = rightVlaue
        })
    },
    // 分配用户提交
    submit() {
      let type
      if (this.title == '分配用户') type = 0; else type = 1
      editPartUser({
        parts: JSON.stringify(this.value),
        partId: this.submitId,
        type: type,
        length: this.value.length
      }).then(res => {
        this.dialogUserVisible = false
      })
    },
    // 显示分配用户|管理员dialog
    transferClick(row, type, state) {
      if (state == 1) {
        if (type == '2') {
          this.title = '设置管理员'
        } else {
          this.title = '分配用户'
        }
        this.dialogUserVisible = true
        this.initTransfer(row, type)
      } else {
        this.$message.error('此角色已禁用!')
      }
    },
    // 编辑
    edit() {
      if (
        isNotNullORBlank(this.form.name) &&
        isNotNullORBlank(this.form.nameZh)
      ) {
        // 非空判断
        const node = this.$refs.tree.getCheckedNodes(true, false)
        var nodes = new Array()
        for (let i = 0; i < node.length; i++) {
          nodes[i] = node[i].id
        }
        this.menudata.forEach(element => {
          element.children.forEach(child => {
            if (nodes.indexOf(child.id) != -1) { // 判断有没有子节点
              if (nodes.indexOf(element.id) == -1) { // 判断父节点是否已添加
                nodes.push(element.id)
              }
            }
          })
        })
        editPart({
          form: this.form,
          nodes: nodes
        }).then(res => {
          this.initAllRole()
          this.dialogFormVisible = false
        })
      }
    },
    // 初始化选中的菜单
    initNodes(id) {
      getPartMenuById({ id: id }).then(res => {
        this.$refs.tree.setCheckedKeys(res.data.part)
      })
    },
    // 获取所有菜单
    getCheckedNodes(id) {
      getPartMenuById({ id: '' }).then(res => {
        if (res.msg == 'success' && res.code == 200) {
          this.menudata = res.data.part
          this.initNodes(id)
        }
      })
    },
    // 角色的启用/禁用
    deleteRow(row, state) {
      let msg
      state == '1'
        ? (msg = '此操作将启用此角色, 是否继续?')
        : (msg = '此操作将禁用此角色, 是否继续?')
      this.$confirm(msg, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          delPart({
            id: row.id,
            state: state
          }).then(res => {
            this.initAllRole()
          })
        })
        .catch(() => {})
    },
    // 显示编辑的dialog
    handleClick(row, state) {
      if (state == 1) {
        this.form = JSON.parse(JSON.stringify(row))
        this.dialogFormVisible = true
        this.openFullScreen1()
        this.getCheckedNodes(row.id)
      } else {
        this.$message.error('此角色已禁用!')
      }
    },
    // 一跳出编辑的dialog，不会立马显示menu
    openFullScreen1() {
      this.fullscreenLoading = true
      setTimeout(() => {
        this.fullscreenLoading = false
      }, 1500)
    },
    // 情况form表单
    initForm() {
      this.form = {
        id: '',
        name: '',
        nameZh: '',
        menu: ''
      }
    },
    // 获取所有权限列表AllRole
    initAllRole() {
      this.tableData = []
      getAllRole().then(res => {
        this.tableData = res.data.role
      })
    }
  }
}
</script>
<style>
.el-button + .el-button {
  margin-left: -2px;
}
</style>
