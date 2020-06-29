<template>
  <div>
    <el-container>
      <el-aside width="200px" style="background-color: rgb(238, 241, 246);margin-right:20px;">
        <div class="tree">
          <el-tree
            :props="props"
            :load="loadNode"
            accordion
            style="height:100%;"
            lazy
            :expand-on-click-node="false"
            @node-click="handleCheckChange"
          />
        </div>
      </el-aside>
      <el-container>
        <el-header
          style="padding: 0px;display:flex;justify-content:space-between;align-items: center"
        >
          <div style="display: inline">
            <el-input
              v-model="empsearch.name"
              placeholder="通过员工名搜索员工,记得回车哦..."
              clearable
              style="width: 300px;margin: 0px;padding: 0px;"
              size="mini"
              :disabled="advanceSearchViewVisible"
              prefix-icon="el-icon-search"
              @keyup.enter.native="searchEmp"
            />
            <el-button
              type="primary"
              size="mini"
              style="margin-left: 5px"
              icon="el-icon-search"
              @click="searchEmp"
            >搜索</el-button>
            <el-button
              slot="reference"
              type="primary"
              size="mini"
              style="margin-left: 5px"
              @click="showAdvanceSearchView"
            >
              <i
                class="fa fa-lg"
                :class="[advanceSearchViewVisible ? faangledoubleup:faangledoubledown]"
                style="margin-right: 5px"
              />高级搜索
            </el-button>
          </div>
          <div style="margin-left: 5px;margin-right: 20px;display: inline">
            <el-upload
              :show-file-list="false"
              accept="application/vnd.ms-excel"
              action="/system/user/importEmp"
              :on-success="fileUploadSuccess"
              :on-error="fileUploadError"
              :disabled="fileUploadBtnText=='正在导入'"
              :before-upload="beforeFileUpload"
              style="display: inline"
            >
              <el-button size="mini" type="success" :loading="fileUploadBtnText=='正在导入'">
                <i class="fa fa-lg fa-level-up" style="margin-right: 5px" />
                {{ fileUploadBtnText }}
              </el-button>
            </el-upload>
            <el-button type="success" size="mini" @click="exportEmps">
              <i class="fa fa-lg fa-level-down" style="margin-right: 5px" />导出数据
            </el-button>
            <el-button type="success" size="mini" @click="template">
              <i class="fa fa-lg fa-level-down" style="margin-right: 5px" />模板下载
            </el-button>
            <el-button type="primary" size="mini" icon="el-icon-plus" @click="showAddEmpView">添加员工</el-button>
          </div>
        </el-header>
        <el-main style="padding-left: 0px;padding-top: 0px">
          <div>
            <!-- 高级搜索 -->
            <transition name="slide-fade">
              <div
                v-show="advanceSearchViewVisible"
                style="margin-bottom: 10px;border: 1px;border-radius: 5px;border-style: solid;padding: 5px 0px 5px 0px;box-sizing:border-box;border-color: #20a0ff"
              >
                <el-row>
                  <el-col :span="4">
                    工号:
                    <el-input
                      v-model="empsearch.workID"
                      style="width: 130px"
                      size="mini"
                      placeholder="工号"
                    />
                  </el-col>
                  <el-col :span="4">
                    姓名:
                    <el-input
                      v-model="empsearch.name"
                      style="width: 130px"
                      size="mini"
                      placeholder="姓名"
                    />
                  </el-col>
                  <!-- <el-col :span="5">
                    身份证号码:
                    <el-input
                      v-model="empsearch.idCard"
                      style="width: 130px"
                      size="mini"
                      placeholder="身份证号码"
                    ></el-input>
                  </el-col>-->
                  <el-col :span="5">
                    所属部门:
                    <el-select v-model="empsearch.tree" style="width: 130px;" placeholder="请选择">
                      <el-option value>请选择</el-option>
                      <el-option
                        v-for="item in options"
                        :key="item.tree_code"
                        :label="item.name"
                        :value="item.tree_code"
                      />
                    </el-select>
                  </el-col>
                  <el-col :span="4">
                    有否有效:
                    <el-radio-group v-model="empsearch.enable">
                      <el-radio :label="1">有效</el-radio>
                      <el-radio style="margin-left: 15px" :label="0">无效</el-radio>
                    </el-radio-group>
                  </el-col>

                  <el-col :span="3" :offset="18">
                    <el-button size="mini" @click="cancelSearch">取消</el-button>
                    <el-button
                      icon="el-icon-search"
                      type="primary"
                      size="mini"
                      @click="searchEmp"
                    >搜索</el-button>
                  </el-col>
                </el-row>
              </div>
            </transition>
            <!-- 表格 -->
            <el-table
              v-loading="tableLoading"
              :data="emps"
              border
              stripe
              size="mini"
              height="650"
              style="width: 100%"
              @selection-change="handleSelectionChange"
            >
              <el-table-column type="selection" align="left" />
              <el-table-column prop="name" align="left" fixed label="姓名" />
              <el-table-column prop="workID" align="left" label="工号" />
              <el-table-column label="性别">
                <template slot-scope="scope">{{ scope.row.gender=='1' ?'男':'女' }}</template>
              </el-table-column>
              <!-- <el-table-column align="left" label="出生日期">
                <template slot-scope="scope">{{ scope.row.birthday | formatDate}}</template>
              </el-table-column>-->
              <el-table-column prop="office_id" align="left" label="办公室">
                <template slot-scope="scope" class="select">
                  <el-select v-model="scope.row.office_id" disabled>
                    <el-option
                      v-for="item in officeOption"
                      :key="item.office"
                      :label="item.office"
                      :value="item.id"
                    />
                  </el-select>
                </template>
              </el-table-column>
              <el-table-column prop="email" align="left" label="电子邮件" />
              <el-table-column prop="phone" label="电话号码" />
              <!-- <el-table-column prop="address" align="left" label="联系地址"></el-table-column> -->
              <el-table-column align="left" label="是否有效">
                <template slot-scope="scope">{{ scope.row.enable=='1' ?'有效':'无效' }}</template>
              </el-table-column>
              <el-table-column fixed="right" label="操作" width="120px;">
                <template slot-scope="scope">
                  <el-button
                    style="padding: 3px 4px 3px 4px;margin: 2px"
                    size="mini"
                    @click="showEditEmpView(scope.row)"
                  >编辑</el-button>
                  <el-button
                    type="danger"
                    style="padding: 3px 4px 3px 4px;margin: 2px"
                    size="mini"
                    @click="deleteEmp(scope.row)"
                  >删除</el-button>
                </template>
              </el-table-column>
            </el-table>
            <div style="display: flex;justify-content: space-between;margin: 2px">
              <el-button
                v-if="emps.length>0"
                type="danger"
                size="mini"
                :disabled="multipleSelection.length==0"
                @click="deleteManyEmps()"
              >批量删除</el-button>
              <el-pagination
                background
                :page-size="10"
                :current-page="currentPage"
                layout="prev, pager, next"
                :total="totalCount"
                @current-change="currentChange"
              />
            </div>
          </div>
        </el-main>
      </el-container>
    </el-container>
    <!-- 添加员工 -->
    <el-form ref="addEmpForm" style="margin: 0px;padding: 0px;" :model="emp" :rules="empRule">
      <div style="text-align: left">
        <el-dialog
          :title="dialogTitle"
          style="padding: 0px;"
          :close-on-click-modal="false"
          :visible.sync="dialogVisible"
          width="50%"
        >
          <el-row>
            <el-col :span="5">
              <div>
                <el-form-item label="姓名:" prop="name">
                  <el-input
                    v-model="emp.name"
                    prefix-icon="el-icon-edit"
                    size="mini"
                    style="width: 150px"
                    placeholder="请输入员工姓名"
                  />
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="7">
              <div>
                <el-form-item label="性别:" prop="gender">
                  <el-radio-group v-model="emp.gender">
                    <el-radio label="1">男</el-radio>
                    <el-radio label="0">女</el-radio>
                  </el-radio-group>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="7">
              <div>
                <el-form-item label="电子邮箱:" prop="email">
                  <el-input
                    v-model="emp.email"
                    prefix-icon="el-icon-message"
                    size="mini"
                    style="width: 190px"
                    placeholder="电子邮箱地址..."
                  />
                </el-form-item>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="5">
              <div>
                <el-form-item label="电话号码:" prop="phone">
                  <el-input
                    v-model="emp.phone"
                    prefix-icon="el-icon-phone"
                    size="mini"
                    style="width: 130px"
                    placeholder="电话号码..."
                  />
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="7">
              <div>
                <el-form-item label="所在教研室:" prop="tree">
                  <el-select v-model="emp.tree" style="width:150px;" placeholder="请选择">
                    <el-option
                      v-for="item in options"
                      :key="item.tree_code"
                      :label="item.name"
                      :value="item.tree_code"
                    />
                  </el-select>
                </el-form-item>
              </div>
            </el-col>
            <el-col v-if="this.isEdit" :span="5">
              <div>
                <el-form-item label="工号:" prop="workID">
                  <el-input
                    v-model="emp.workID"
                    prefix-icon="el-icon-edit"
                    disabled
                    size="mini"
                    style="width: 130px"
                    placeholder="请输入员工身份证号码..."
                  />
                </el-form-item>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="5">
              <div>
                <el-form-item label="办公室:" prop="office_id">
                  <el-select v-model="emp.office_id" style="width:150px;" placeholder="请选择">
                    <el-option
                      v-for="item in officeOption"
                      :key="item.office"
                      :label="item.office"
                      :value="item.id"
                    />
                  </el-select>
                </el-form-item>
              </div>
            </el-col>

            <el-col :span="7">
              <div>
                <el-form-item label="是否有效:" prop="enable">
                  <el-radio-group v-model="emp.enable">
                    <el-radio :label="1">有效</el-radio>
                    <el-radio :label="0">无效</el-radio>
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
      </div>
    </el-form>
  </div>
</template>
<script>
import {
  getTreePeople,
  getOffice,
  addUser,
  editUser,
  delByUserId,
  searchInfo,
  getUserByPage,
  count
} from "@/api/system";
export default {
  data() {
    return {
      isEdit: false,
      options: [],
      officeOption: [],
      props: {
        label: "name"
      },
      count: 1,
      emps: [],
      keywords: "",
      fileUploadBtnText: "导入数据",
      beginDateScope: "",
      faangledoubleup: "fa-angle-double-up",
      faangledoubledown: "fa-angle-double-down",
      dialogTitle: "",
      multipleSelection: [],
      depTextColor: "#c0c4cc",
      nations: [],
      politics: [],
      positions: [],
      joblevels: [],
      totalCount: -1,
      currentPage: 1,

      deps: [],
      defaultProps: {
        label: "name",
        isLeaf: "leaf",
        children: "children"
      },
      dialogVisible: false,
      tableLoading: false,
      advanceSearchViewVisible: false,
      showOrHidePop: false,
      showOrHidePop2: false,
      emp: {
        name: "",
        username: "",
        gender: "1",
        email: "",
        office_id: "",
        enable: 1,
        tree: "",
        phone: "",
        address: "",
        workID: ""
      },
      empsearch: {
        name: "",
        username: "",
        gender: "1",
        office_id: "",
        email: "",
        enable: 1,
        tree: "",
        phone: "",
        address: "",
        workID: ""
      },
      empRule: {
        phone: [
          { required: true, message: "请输入联系方式", trigger: "blur" },
          {
            pattern: /^1[34578]\d{9}$/,
            message: "目前只支持中国大陆的手机号码"
          }
        ],
        name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        gender: [{ required: true, message: "请选择性别", trigger: "blur" }],
        tree: [{ required: true, message: "请选择教研室", trigger: "blur" }],
        office_id: [
          { required: true, message: "请选择办公室", trigger: "blur" }
        ],
        enable: [{ required: true, message: "请选择状态", trigger: "blur" }],
        workID: [
          { required: true, message: "请输入工号", trigger: "blur" },
          {
            pattern: /[0-9]\d$/,
            message: "请输入正确的工号"
          }
        ],
        email: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          {
            pattern: /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/,
            message: "请输入正确的邮箱地址"
          }
        ]
      }
    };
  },
  mounted: function() {
    this.initData();
    this.loadEmps();
    getTreePeople({ name: "理工分院" }).then(res => {
      this.options = res.data;
    });
  },
  created() {
    getOffice().then(res => {
      this.officeOption = res.data;
    });
  },

  methods: {
    addEmp() {
      this.$refs["addEmpForm"].validate(valid => {
        if (valid) {
          if (!this.isEdit) {
            addUser(this.emp).then(res => {
              this.dialogVisible = false;
              this.initData();
              this.loadEmps();
              this.initEmp();
            });
          } else {
            editUser(this.emp).then(res => {
              this.dialogVisible = false;
              this.initEmp();
              this.initData();
              this.loadEmps();
            });
          }
        } else {
          return false;
        }
      });
    },
    handleCheckChange(data, checked, indeterminate) {
      this.keywords = checked.data.name;
      this.currentPage = 1;
      this.loadEmps();
      this.initData();
    },
    // 加载树
    loadNode(node, resolve) {
      if (node.level === 0) {
        var data;
        getTreePeople({ name: "" }).then(res => {
          data = res.data;
          return resolve(data);
        });
      }
      if (node.level > 3) return resolve([]);
      setTimeout(() => {
        var data;
        if (node.level == 1) {
          getTreePeople({
            name: node.data.name
          }).then(res => {
            data = res.data;
            resolve(data);
          });
        } else if (node.level == 2) {
          var data;
          getTreePeople({
            name: node.data.name
          }).then(res => {
            data = res.data;
            resolve(data);
          });
        } else {
          data = [];
          resolve(data);
        }
      }, 200);
    },

    fileUploadSuccess(response, file, fileList) {
      if (response) {
        this.$message({ type: response.status, message: response.msg });
      }
      this.loadEmps();
      this.fileUploadBtnText = "导入数据";
    },
    fileUploadError(err, file, fileList) {
      this.$message({ type: "error", message: "导入失败!" });
      this.fileUploadBtnText = "导入数据";
    },
    beforeFileUpload(file) {
      this.fileUploadBtnText = "正在导入";
    },
    exportEmps() {
      window.open("/system/user/exportEmp", "_parent");
    },
    cancelSearch() {
      this.advanceSearchViewVisible = false;
      this.initEmp();
      this.beginDateScope = "";
      this.loadEmps();
      this.initData();
    },
    showAdvanceSearchView() {
      this.advanceSearchViewVisible = !this.advanceSearchViewVisible;
      if (!this.advanceSearchViewVisible) {
        this.initEmp();

        this.beginDateScope = "";
        this.loadEmps();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    deleteManyEmps() {
      this.$confirm(
        "此操作将删除[" + this.multipleSelection.length + "]条数据, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      )
        .then(() => {
          var ids = "";
          for (var i = 0; i < this.multipleSelection.length; i++) {
            ids += this.multipleSelection[i].user_id + ",";
          }
          this.doDelete(ids);
        })
        .catch(() => {});
    },
    deleteEmp(row) {
      this.$confirm("此操作将永久删除[" + row.name + "], 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.doDelete(row.user_id);
        })
        .catch(() => {});
    },
    doDelete(id) {
      delByUserId({ id: id }).then(res => {
        this.initData();
        this.loadEmps();
      });
    },
    // 搜索
    searchEmp() {
      this.tableLoading = true;
      this.$set(this.empsearch, "page", this.currentPage);
      this.postRequest("", this.empsearch).then(res => {
        this.tableLoading = false;
        this.emps = res.data.users;
        this.totalCount = res.data.count;
      });
      this.initEmp();
    },

    currentChange(currentChange) {
      this.currentPage = currentChange;
      this.loadEmps();
    },
    loadEmps() {
      this.tableLoading = true;
      getUserByPage({
        page: this.currentPage,
        size: 10,
        keywords: this.keywords
      }).then(resp => {
        this.tableLoading = false;
        if (resp && resp.code == 200) {
          this.emps = resp.data.users;
        }
      });
    },
    cancelEidt() {
      this.dialogVisible = false;
      this.initData();
      this.loadEmps();
    },
    showDepTree() {
      this.showOrHidePop = !this.showOrHidePop;
    },
    showDepTree2() {
      this.showOrHidePop2 = !this.showOrHidePop2;
    },
    handleNodeClick(data) {
      this.emp.departmentName = data.name;
      this.emp.departmentId = data.id;
      this.showOrHidePop = false;
      this.depTextColor = "#606266";
    },
    handleNodeClick2(data) {
      this.emp.departmentName = data.name;
      this.emp.departmentId = data.id;
      this.showOrHidePop2 = false;
      this.depTextColor = "#606266";
    },
    initData() {
      var _this = this;
      count({ keywords: this.keywords }).then(resp => {
        if (resp && resp.code == 200) {
          _this.totalCount = resp.data.count;
        }
      });
    },
    showEditEmpView(row) {
      this.isEdit = true;
      this.dialogTitle = "编辑员工";
      this.emp = row;
      this.dialogVisible = true;
    },
    template() {
      window.open("/test/template", "_parent");
    },
    showAddEmpView() {
      this.isEdit = false;
      this.dialogTitle = "添加员工";
      this.initEmp();
      this.dialogVisible = true;
    },
    initEmp() {
      (this.emp = {
        name: "",
        username: "",
        gender: "1",
        office_id: "",
        email: "",
        enabled: 1,
        tree: "",
        phone: "",
        address: "",
        workID: ""
      }),
        (this.empsearch = {
          name: "",
          username: "",
          gender: "1",
          office_id: "",
          email: "",
          enabled: 1,
          tree: "",
          phone: "",
          address: "",
          workID: ""
        });
      this.currentPage = 1;
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
.el-input__inner {
  height: 30px;
}
.el-input__icon {
  line-height: 10px;
}
.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateX(10px);
  opacity: 0;
}
.tree {
  overflow-y: auto;
  height: 700px;
  background-color: white;
  /*width:200px;*/
}
.el-select .el-input.is-disabled .el-input__inner {
  cursor: text;
  border: 0px;
}
.cell .el-select .el-icon-arrow-up:before {
  content: none;
}
.el-input.is-disabled .el-input__inner {
  background-color: transparent;
  color: #606266;
  cursor: text;
}
.cell .el-input.is-disabled .el-input__icon {
  cursor: text;
}
</style>
