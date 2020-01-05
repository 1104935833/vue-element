<template>
  <div>
    <el-container>
      <el-container>
        <el-header
          style="padding: 0px;display:flex;justify-content:space-between;align-items: center"
        >
          <div style="margin-left: 5px;margin-right: 20px;display: inline">
            <el-button type="primary" size="mini" icon="el-icon-plus"  @click="showAddEmpView">添加菜单</el-button>
          </div>
        </el-header>
        <el-main style="padding-left: 0px;padding-top: 0px">
          <div>
            
            <!-- 表格 -->
            <el-table :data="tableData" style="width: 100%" :cell-style="tableHeaderColor">
              <el-table-column prop="id" align="left" fixed label="id"></el-table-column>
              <el-table-column prop="iconCls" align="left" fixed label="图标"></el-table-column>
              <el-table-column prop="path" align="left" fixed label="访问路径"></el-table-column>
              <el-table-column prop="url" align="left" fixed label="请求路径"></el-table-column>
              <el-table-column prop="component" align="left" fixed label="模块名称"></el-table-column>
              <el-table-column prop="name" align="left" fixed label="标题"></el-table-column>
              <el-table-column prop="parentId" align="left" fixed label="类型"></el-table-column>
              <el-table-column prop="type" align="left" fixed label="状态" ></el-table-column>
              <el-table-column label="操作" width="300px">
                <template slot-scope="scope">
                  <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                  <el-button size="mini" v-if="scope.row.enabled=='1'" type="warning" @click="handleHide(scope.$index, scope.row,0)">禁用</el-button>
                  <el-button size="mini"  v-if="scope.row.enabled=='0'" type="warning" @click="handleHide(scope.$index, scope.row,1)">启用</el-button>

                  <el-button
                    size="mini"
                    type="danger"
                    @click="handleDelete(scope.$index, scope.row)"
                  >删除</el-button>
                </template>
              </el-table-column>
            </el-table>

            <div style="display: flex;justify-content: space-between;margin: 2px">
              <el-pagination
                background
                :page-size="10"
                :current-page="currentPage"
                @current-change="currentChange"
                layout="prev, pager, next"
                :total="totalCount"
              ></el-pagination>
            </div>
          </div>
        </el-main>
      </el-container>
    </el-container>
    <!-- 添加菜单 -->
    <el-form ref="addEmpForm" style="margin: 0px;padding: 0px;">
      <div style="text-align: left">
        <el-dialog
          :title="dialogTitle"
          style="padding: 0px;"
          :close-on-click-modal="false"
          :visible.sync="dialogVisible"
          width="50%"
        >
          <el-row>
            <el-col :span="24">
              <div>
                <el-form-item label="菜单类型：" prop="isMenu">
                  <el-radio-group v-model="stateValue" @change="typeChange">
                    <el-radio label="1">菜单</el-radio>
                    <el-radio label="0">目录</el-radio>
                  </el-radio-group>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
          <el-row v-if="isType">
            <el-col :span="24">
              <div>
                <el-form-item label="上级菜单：" prop="parentId">
                  <el-select v-model="value" placeholder="请选择">
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <div>
                <el-form-item label="菜单名称：" prop="name">
                  <el-input
                    prefix-icon="el-icon-edit"
                    size="mini"
                    style="width: 90%"
                    placeholder="必填，请填写菜单名称（如：系统管理），建议字符不要太长，一般4-6个汉字"
                  ></el-input>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <div>
                <el-form-item label="模块名称：" prop="component">
                  <el-input
                    prefix-icon="el-icon-edit"
                    size="mini"
                    style="width: 90%"
                    placeholder="必填，请填写菜单的文件名称"
                  ></el-input>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <div>
                <el-form-item label="访问路径：" prop="path">
                  <el-input
                    prefix-icon="el-icon-edit"
                    size="mini"
                    style="width: 90%"
                    placeholder="必填，请填写浏览器访问路径（如：/sys/menu）"
                  ></el-input>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <div>
                <el-form-item label="请求路径：" prop="url">
                  <el-input
                    prefix-icon="el-icon-edit"
                    size="mini"
                    style="width: 90%"
                    placeholder="必填，请填写系统节点（如：admin/user/index），如果是上级菜单时，请填写'/'符号"
                  ></el-input>
                </el-form-item>
              </div>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="24">
              <div>
                <el-form-item label="菜单类型：" prop="enabled">
                  <el-radio-group v-model="typeValue">
                    <el-radio label="1">有效</el-radio>
                    <el-radio label="0">无效</el-radio>
                  </el-radio-group>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
          <span slot="footer" class="dialog-footer">
            <el-button size="mini">取 消</el-button>
            <el-button size="mini" type="primary">确 定</el-button>
          </span>
        </el-dialog>
      </div>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      options: [
        {
          value: "选项1",
          label: "黄金糕"
        },
        {
          value: "选项2",
          label: "双皮奶"
        },
        {
          value: "选项3",
          label: "蚵仔煎"
        },
        {
          value: "选项4",
          label: "龙须面"
        },
        {
          value: "选项5",
          label: "北京烤鸭"
        }
      ],
      value: "",
      tableData: [],
      typeValue: "1",
      stateValue: "1",
      props: {
        label: "name",
        isLeaf: "数学教研室"
      },
      count: 1,
      dialogTitle: "",
      multipleSelection: [],
      totalCount: -1,
      currentPage: 1,
      dialogVisible: false,
      tableLoading: false,
      isType: true
    };
  },
  mounted: function() {
    this.loadEmps();
  },
  methods: {
    tableHeaderColor({ row, column, rowIndex, columnIndex }) {
      if (row.type === "有效" && columnIndex === 7) {
        return 'color: green'
      }
      if (row.type === "无效" && columnIndex === 7) {
        return 'color: red;'
      }
    },
    typeChange() {
      var val = this.stateValue;
      if (val == "1") {
        this.isType = true;
      } else {
        this.isType = false;
      }
    },
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleHide(index, row,type) {
      console.log(index, row);
      this.getRequest("/system/role/menuhide",{id:row.id,type:type}).then(res=>{
        this.loadEmps();
        console.log(res);
      });
    },
    handleDelete(index, row) {
      console.log(index, row);
      this.getRequest("/system/role/menudel",{id:row.id}).then(res=>{
        this.loadEmps();
        console.log(res);
      });
    },
    handleCheckChange(data, checked, indeterminate) {
      this.keywords = checked.data.name;
      this.currentPage = 1;
      this.loadEmps();
      this.initData();
      console.log(data, checked, indeterminate);
    },
    currentChange(currentChange) {
      this.currentPage = currentChange;
      this.loadEmps();
    },
    loadEmps() {
      var _this = this;
      this.tableLoading = true;
      this.getRequest("/system/role/getAllMenus?page=" + this.currentPage).then(
        resp => {
          this.tableLoading = false;
          if (resp && resp.status == 200) {
            var data = resp.data;
            _this.tableData = data.list;
            _this.totalCount = resp.data.count;
          }
        }
      );
    },
    showAddEmpView() {
      this.dialogTitle = "添加菜单";
      this.dialogVisible = true;
      var _this = this;
    }
  }
};
</script>
<style>
.el-dialog__body {
  padding-top: 0px;
  padding-bottom: 0px;
}

.slide-fade-enter-active {
  transition: all 0.8s ease;
}

.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateX(10px);
  opacity: 0;
}
.activeClass {
  color: rgb(255, 65, 65);
}
.errorClass {
  color: rgb(29, 253, 96);
}
</style>
