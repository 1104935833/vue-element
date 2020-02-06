<template>
  <div>
    <el-container>
      <el-container>
        <el-header
          style="padding: 0px;display:flex;justify-content:space-between;align-items: center"
        >
          <div style="margin-left: 5px;margin-right: 20px;display: inline">
            <el-button type="primary" size="mini" icon="el-icon-plus" @click="showAddEmpView">添加菜单</el-button>
          </div>
        </el-header>
        <el-main style="padding-left: 0px;padding-top: 0px">
          <div>
            <!-- 表格 -->
            <el-table
              :data="tableData"
              v-loading="tableLoading"
              style="width: 100%"
              :cell-style="tableHeaderColor"
            >
              <el-table-column prop="id" align="left" fixed label="id"></el-table-column>
              <el-table-column align="left" fixed label="图标">
                <template slot-scope="scope">
                  <i v-bind:class="[scope.row.iconCls]"></i>
                  <svg-icon :icon-class="scope.row.iconCls+''" style="height: 15px;width: 15px;"  />
                </template>
              </el-table-column>
              <el-table-column prop="path" align="left" fixed label="访问路径"></el-table-column>
              <el-table-column prop="url" align="left" fixed label="请求路径"></el-table-column>
              <el-table-column prop="component" align="left" fixed label="模块名称"></el-table-column>
              <el-table-column prop="name" align="left" fixed label="标题"></el-table-column>
              <el-table-column prop="parent" align="left" fixed label="类型"></el-table-column>
              <el-table-column align="left" fixed label="状态">
                <template slot-scope="scope">
                  <span v-if="scope.row.type=='有效'" style="color:green">{{scope.row.type}}</span>
                  <span v-if="scope.row.type=='无效'" style="color:red">{{scope.row.type}}</span>
                </template>
              </el-table-column>
              <el-table-column label="操作" width="300px">
                <template slot-scope="scope">
                  <el-button size="mini" @click="showEditView(scope.$index, scope.row)">编辑</el-button>
                  <el-button
                    size="mini"
                    v-if="scope.row.enabled=='1'"
                    type="warning"
                    @click="handleHide(scope.$index, scope.row,0)"
                  >禁用</el-button>
                  <el-button
                    size="mini"
                    v-if="scope.row.enabled=='0'"
                    type="warning"
                    @click="handleHide(scope.$index, scope.row,1)"
                  >启用</el-button>

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
    <!-- 编辑菜单 -->
    <el-form ref="EditForm" style="margin: 0px;padding: 0px;">
      <div style="text-align: left">
        <el-dialog
          :title="dialogTitle"
          style="padding: 0px;"
          :close-on-click-modal="false"
          :visible.sync="EditVisible"
          width="50%"
        >
          <el-row>
            <el-col :span="24">
              <div>
                <el-form-item label="菜单类型：">
                  <el-radio-group v-model="stateValue" :disabled="isDisabled" @change="typeChange">
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
                <el-form-item label="上级菜单：">
                  <el-select v-model="form.parentId" placeholder="请选择" @focus="this.getAllParent" >
                    <el-option
                      v-for="item in parentData"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <div>
                <el-form-item label="菜单名称：">
                  <el-input
                    v-model="form.name"
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
                <el-form-item label="模块名称：">
                  <el-input
                    v-model="form.component"
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
                <el-form-item label="访问路径：">
                  <el-input
                    v-model="form.path"
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
                <el-form-item label="请求路径：">
                  <el-input
                    v-model="form.url"
                    prefix-icon="el-icon-edit"
                    size="mini"
                    style="width: 90%"
                    placeholder="必填，请填写系统节点（如：admin/user/index），如果是上级菜单时，请填写'/'符号"
                  ></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="24" v-if="!isType">
              <div>
                <el-form-item label="目录图标:">
                  <el-button type="button" @click="centerDialogVisible = true">选择目录图标</el-button>
                  <svg-icon :icon-class="this.form.iconCls" style="height: 40px;width: 40px;"  />
                </el-form-item>
              </div>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="24">
              <div>
                <el-form-item label="是否有效：">
                  <el-radio-group v-model="enabled">
                    <el-radio label="1">有效</el-radio>
                    <el-radio label="0">无效</el-radio>
                  </el-radio-group>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
          <span slot="footer" class="dialog-footer">
            <el-button size="mini" @click="cancelEidt">取 消</el-button>
            <el-button size="mini" type="primary" @click="addEmp()">确 定</el-button>
          </span>
        </el-dialog>
        <el-dialog title="提示" :visible.sync="centerDialogVisible" width="30%" style="height:800px;" center>
          <div class="icon-body">
            <div class="icon-list">
              <div v-for="(item, index) in iconList" :key="index" @click="selectedIcon(item)" >
                <svg-icon :icon-class="item" style="height: 30px;width: 16px;"  />
                <span style="height: 35px;">{{ item }}</span>
              </div>
            </div>
          </div>
        </el-dialog>
      </div>
    </el-form>
  </div>
</template>
<script>
import icons from './IconSelect/requireIcons'
export default {
  name: 'IconSelect',
  data() {
    return {
      name: '',
      iconList: icons,
      centerDialogVisible: false,
      tableData: [],
      parentData: [],
      enabled: "1",
      stateValue: "1",
      
      form: {
        component: "",
        iconCls:"",
        url: "",
        parentId: "",
        name: "",
        path: ""
      },
      
      isDisabled: false,
      isEdit: false,
      count: 1,
      dialogTitle: "",
      multipleSelection: [],
      totalCount: -1,
      currentPage: 1,
      dialogVisible: false,
      EditVisible: false,
      tableLoading: false,
      isType: true
    };
  },
  mounted: function() {
    this.loadEmps();
    this.getAllParent();
  },
  methods: {
    filterIcons() {
      if (this.name) {
        this.iconList = this.iconList.filter(item => item.includes(this.name))
      } else {
        this.iconList = icons
      }
    },
    selectedIcon(name) {
      this.centerDialogVisible=false;
      this.form.iconCls=name
    },
    reset() {
      this.name = ''
      this.iconList = icons
    },
    addEmp() {
      //添加菜单
      this.$set(this.form, "enabled", this.enabled);
      if (!this.isEdit) {
        this.postRequest("/system/menu/addMenu", this.form).then(res => {
          this.init();
          this.EditVisible = false;
        });
      } else {
        this.postRequest("/system/menu/upMenu", this.form).then(res => {
          this.init();
          this.loadEmps();
          this.EditVisible = false;
        });
        
      }
    },
    init(){
      this.form={
        
        component: "",
        iconCls:"",
        url: "",
        parentId: "",
        name: "",
        path: ""
      
      }
    },
    getAllParent() {
      this.getRequest("/system/menu/getAllParent").then(res => {
        this.parentData = res.data;
      });
    },
    tableHeaderColor({ row, column, rowIndex, columnIndex }) {
      if (row.type === "有效" && columnIndex === 7) {
        return "color: green";
      }
      if (row.type === "无效" && columnIndex === 7) {
        return "color: red;";
      }
    },
    typeChange() {
      var val = this.stateValue;
      if (val == "1") {
        this.isType = true;
      } else {
        this.form.parentId = "";
        this.isType = false;
      }
    },
    handleHide(index, row, type) {
      let tmp;
      if (type == 0) tmp = "此操作将禁用[" + row.name + "], 是否继续?";
      else tmp = "此操作将启用[" + row.name + "], 是否继续?";
      this.$confirm(tmp, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.getRequest("/system/menu/menuhide", {
            id: row.id,
            type: type
          }).then(res => {
            this.loadEmps();
          });
        })
        .catch(() => {});
    },
    cancelEidt() {
      this.init();

      this.EditVisible = false;
    },
    handleDelete(index, row) {
      this.$confirm("此操作将永久删除[" + row.name + "], 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.getRequest("/system/menu/menudel", { id: row.id }).then(res => {
            this.loadEmps();
          });
        })
        .catch(() => {});
    },
    currentChange(currentChange) {
      this.currentPage = currentChange;
      this.loadEmps();
    },
    loadEmps() {
      var _this = this;
      this.tableLoading = true;
      this.getRequest("/system/menu/getAllMenus?page=" + this.currentPage).then(
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
      this.isEdit = false;
      this.init();
      this.enabled = "1";
      this.stateValue = "1";
      this.stateValue = "1";
      this.dialogTitle = "添加菜单";
      this.isDisabled = false;
      this.EditVisible = true;
      var _this = this;
    },
    showEditView(index, row) {
      this.isEdit = true;
      this.dialogTitle = "编辑菜单";
      this.form = row;
      if (row.enabled) this.enabled = "1";
      else this.enabled = "0";
      this.isDisabled = true; //菜单类型不可选
      if (row.parent == "菜单") {
        this.stateValue = "1";
        this.isType = true; //是否显示下拉框
        this.form.parentId = row.parentId;
      } else {
        this.stateValue = "0";
        this.isType = false;
      }
      this.EditVisible = true;
      var _this = this;
    }
  }
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
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
  .icon-body {
    width: 100%;
    height: 400px;
    padding: 10px;
    .icon-list {
      margin-top:-30px;
      height: 400px;
      float: left;
      overflow-y: scroll;
      div {
        height: 40px;
        line-height:50px;
        margin-bottom: 10px;
        cursor: pointer;
        width: 33%;
        float: left;
      }
      span {
        display: inline-block;
        vertical-align: -0.15em;
        fill: currentColor;
        overflow: hidden;
      }
    }
  }
</style>
