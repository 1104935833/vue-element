<template>
  <div>
    <el-container>
      <el-aside width="200px" style="background-color: rgb(238, 241, 246);margin-right:20px;">
        <div  class="tree">
          <el-tree
            :props="props"
            :load="loadNode"
            accordion
            style="height:100%;"
            lazy
            :expand-on-click-node="false"
            @node-click="handleCheckChange"
          ></el-tree>
        </div>
      </el-aside>
      <el-container>
        <el-header
          style="padding: 0px;display:flex;justify-content:space-between;align-items: center"
        >
          <div style="display: inline">
            <el-input
              placeholder="通过员工名搜索员工,记得回车哦..."
              clearable
              style="width: 300px;margin: 0px;padding: 0px;"
              size="mini"
              :disabled="advanceSearchViewVisible"
              @keyup.enter.native="searchEmp"
              prefix-icon="el-icon-search"
              ref="search"
            ></el-input>
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
                v-bind:class="[advanceSearchViewVisible ? faangledoubleup:faangledoubledown]"
                style="margin-right: 5px"
              ></i>高级搜索
            </el-button>
          </div>
          <div style="margin-left: 5px;margin-right: 20px;display: inline">
            <el-upload
              :show-file-list="false"
              accept="application/vnd.ms-excel"
              action="/employee/basic/importEmp"
              :on-success="fileUploadSuccess"
              :on-error="fileUploadError"
              :disabled="fileUploadBtnText=='正在导入'"
              :before-upload="beforeFileUpload"
              style="display: inline"
            >
              <el-button size="mini" type="success" :loading="fileUploadBtnText=='正在导入'">
                <i class="fa fa-lg fa-level-up" style="margin-right: 5px"></i>
                {{fileUploadBtnText}}
              </el-button>
            </el-upload>
            <el-button type="success" size="mini" @click="exportEmps">
              <i class="fa fa-lg fa-level-down" style="margin-right: 5px"></i>导出数据
            </el-button>
            <el-button type="success" size="mini" @click="template">
              <i class="fa fa-lg fa-level-down" style="margin-right: 5px"></i>模板下载
            </el-button>
            <el-button type="primary" size="mini" icon="el-icon-plus" @click="showAddEmpView">添加员工</el-button>
          </div>
        </el-header>
        <el-main style="padding-left: 0px;padding-top: 0px">
          <div>
            <!-- 高级搜索 -->
            <transition name="slide-fade">
              <div
                style="margin-bottom: 10px;border: 1px;border-radius: 5px;border-style: solid;padding: 5px 0px 5px 0px;box-sizing:border-box;border-color: #20a0ff"
                v-show="advanceSearchViewVisible"
              >
                <el-row>
                  <el-col :span="5">
                    政治面貌:
                    <el-select
                      v-model="emp.politicId"
                      style="width: 130px"
                      size="mini"
                      placeholder="政治面貌"
                    >
                      <el-option
                        v-for="item in politics"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                      ></el-option>
                    </el-select>
                  </el-col>
                  <el-col :span="4">
                    民族:
                    <el-select
                      v-model="emp.nationId"
                      style="width: 130px"
                      size="mini"
                      placeholder="请选择民族"
                    >
                      <el-option
                        v-for="item in nations"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                      ></el-option>
                    </el-select>
                  </el-col>
                  <el-col :span="4">
                    职位:
                    <el-select
                      v-model="emp.posId"
                      style="width: 130px"
                      size="mini"
                      placeholder="请选择职位"
                    >
                      <el-option
                        v-for="item in positions"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                      ></el-option>
                    </el-select>
                  </el-col>
                  <el-col :span="4">
                    职称:
                    <el-select
                      v-model="emp.jobLevelId"
                      style="width: 130px"
                      size="mini"
                      placeholder="请选择职称"
                    >
                      <el-option
                        v-for="item in joblevels"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                      ></el-option>
                    </el-select>
                  </el-col>
                  <el-col :span="7">
                    聘用形式:
                    <el-radio-group v-model="emp.engageForm">
                      <el-radio label="劳动合同">劳动合同</el-radio>
                      <el-radio style="margin-left: 15px" label="劳务合同">劳务合同</el-radio>
                    </el-radio-group>
                  </el-col>
                </el-row>
                <el-row style="margin-top: 10px">
                  <el-col :span="5">
                    所属部门:
                    <el-popover
                      v-model="showOrHidePop2"
                      placement="right"
                      title="请选择部门"
                      trigger="manual"
                    >
                      <el-tree
                        :data="deps"
                        :default-expand-all="true"
                        :props="defaultProps"
                        :expand-on-click-node="false"
                        @node-click="handleNodeClick2"
                      ></el-tree>
                      <div
                        slot="reference"
                        style="width: 130px;height: 26px;display: inline-flex;font-size:13px;border: 1px;border-radius: 5px;border-style: solid;padding-left: 13px;box-sizing:border-box;border-color: #dcdfe6;cursor: pointer;align-items: center"
                        @click="showDepTree2"
                        v-bind:style="{color: depTextColor}"
                      >{{emp.departmentName}}</div>
                    </el-popover>
                  </el-col>
                  <el-col :span="10">
                    入职日期:
                    <el-date-picker
                      v-model="beginDateScope"
                      unlink-panels
                      size="mini"
                      type="daterange"
                      value-format="yyyy-MM-dd"
                      range-separator="至"
                      start-placeholder="开始日期"
                      end-placeholder="结束日期"
                    ></el-date-picker>
                  </el-col>
                  <el-col :span="5" :offset="4">
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
              :data="emps"
              v-loading="tableLoading"
              border
              stripe
              @selection-change="handleSelectionChange"
              size="mini"
              height="650"
              style="width: 100%"
            >
              <el-table-column type="selection" align="left"></el-table-column>
              <el-table-column prop="name" align="left" fixed label="姓名"></el-table-column>
              <el-table-column prop="workID" align="left" label="工号"></el-table-column>
              <el-table-column prop="gender" label="性别"></el-table-column>
              <el-table-column align="left" label="出生日期">
                <template slot-scope="scope">{{ scope.row.birthday | formatDate}}</template>
              </el-table-column>
              <el-table-column prop="idCard" align="left" label="身份证号码"></el-table-column>
              <el-table-column prop="email" align="left" label="电子邮件"></el-table-column>
              <el-table-column prop="phone" label="电话号码"></el-table-column>
              <el-table-column prop="address" align="left" label="联系地址"></el-table-column>
              <el-table-column align="left" label="是否有效">
                <template slot-scope="scope">{{ scope.row.enabled=='1' ?'有效':'无效' }}</template>
              </el-table-column>
              <el-table-column fixed="right" label="操作" width="120px;">
                <template slot-scope="scope">
                  <el-button
                    @click="showEditEmpView(scope.row)"
                    style="padding: 3px 4px 3px 4px;margin: 2px"
                    size="mini"
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
                type="danger"
                size="mini"
                v-if="emps.length>0"
                :disabled="multipleSelection.length==0"
                @click="deleteManyEmps()"
              >批量删除</el-button>
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
    <!-- 添加员工 -->
    <el-form ref="addEmpForm" style="margin: 0px;padding: 0px;">
      <div style="text-align: left">
        <el-dialog
          :title="dialogTitle"
          style="padding: 0px;"
          :close-on-click-modal="false"
          :visible.sync="dialogVisible"
          width="60%"
        >
          <el-row>
            <el-col :span="7">
              <div>
                <el-form-item label="姓名:" prop="name">
                  <el-input
                    prefix-icon="el-icon-edit"
                    v-model="emp.name"
                    size="mini"
                    style="width: 150px"
                    placeholder="请输入员工姓名"
                  ></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="7">
              <div>
                <el-form-item label="性别:" prop="gender">
                  <el-radio-group v-model="emp.gender">
                    <el-radio label="男">男</el-radio>
                    <el-radio style="margin-left: 15px" label="女">女</el-radio>
                  </el-radio-group>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="6">
              <div>
                <el-form-item label="出生日期:" prop="birthday">
                  <el-date-picker
                    v-model="emp.birthday"
                    size="mini"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    style="width: 150px"
                    type="date"
                    placeholder="出生日期"
                  ></el-date-picker>
                </el-form-item>
              </div>
            </el-col>
            
          </el-row>
          <el-row>
           
            
            <el-col :span="7">
              <div>
                <el-form-item label="电子邮箱:" prop="email">
                  <el-input
                    prefix-icon="el-icon-message"
                    v-model="emp.email"
                    size="mini"
                    style="width: 150px"
                    placeholder="电子邮箱地址..."
                  ></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="7">
              <div>
                <el-form-item label="联系地址:" prop="address">
                  <el-input
                    prefix-icon="el-icon-edit"
                    v-model="emp.address"
                    size="mini"
                    style="width: 200px"
                    placeholder="联系地址..."
                  ></el-input>
                </el-form-item>
              </div>
            </el-col>
             
            <el-col :span="6">
              <div>
                <el-form-item label="电话号码:" prop="phone">
                  <el-input
                    prefix-icon="el-icon-phone"
                    v-model="emp.phone"
                    size="mini"
                    style="width: 200px"
                    placeholder="电话号码..."
                  ></el-input>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
          <el-row>
           
              
            <el-col :span="7">
              <div>
                <el-form-item label="身份证号码:" prop="idCard">
                  <el-input
                    prefix-icon="el-icon-edit"
                    v-model="emp.idCard"
                    size="mini"
                    style="width: 180px"
                    placeholder="请输入员工身份证号码..."
                  ></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="8">
              <div>
                <el-form-item label="是否有效:" prop="gender">
                  <el-radio-group v-model="emp.gender">
                    <el-radio label="1">有效</el-radio>
                    <el-radio style="margin-left: 15px" label="0">无效</el-radio>
                  </el-radio-group>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
         
          <span slot="footer" class="dialog-footer">
            <el-button size="mini" @click="cancelEidt">取 消</el-button>
            <el-button size="mini" type="primary" @click="addEmp('addEmpForm')">确 定</el-button>
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
      props: {
        label: "name"
      },
      count: 1,
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
        gender: "",
        birthday: "",
        idCard: "",
        email: "",
        phone: "",
        address: "",
        workID: ""
      },
      rules: {
        name: [{ required: true, message: "必填:姓名", trigger: "blur" }],
        gender: [{ required: true, message: "必填:性别", trigger: "blur" }],
        birthday: [
          { required: true, message: "必填:出生日期", trigger: "blur" }
        ],
        idCard: [
          {
            required: true,
            message: "必填:身份证号码",
            trigger: "blur"
          },
          {
            pattern: /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/,
            message: "身份证号码格式不正确",
            trigger: "blur"
          }
        ],
        email: [
          { required: true, message: "必填:电子邮箱", trigger: "blur" },
          {
            type: "email",
            message: "邮箱格式不正确",
            trigger: "blur"
          }
        ],
        phone: [{ required: true, message: "必填:电话号码", trigger: "blur" }],
        address: [
          { required: true, message: "必填:联系地址", trigger: "blur" }
        ],
      }
    };
  },
  mounted: function() {
    this.initData();
    this.loadEmps();
  },
  methods: {
    handleCheckChange(data, checked, indeterminate) {
      this.keywords = checked.data.name;
      this.currentPage = 1;
      this.loadEmps();
      this.initData();
      console.log(data, checked, indeterminate);
    },
    // 加载树
    loadNode(node, resolve) {
      if (node.level === 0) {
        var data;
        this.getRequest("/system/role/treepeople", { name: "" }).then(res => {
          data = res.data;
          return resolve(data);
        });
      }
      if (node.level > 3) return resolve([]);
      setTimeout(() => {
        var data;
        if (node.level == 1) {
          this.getRequest("/system/role/treepeople", {
            name: node.data.name
          }).then(res => {
            data = res.data;
            resolve(data);
          });
        } else if (node.level == 2) {
          var data;
          this.getRequest("/system/role/treepeople", {
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
      window.open("/employee/basic/exportEmp", "_parent");
    },
    cancelSearch() {
      this.advanceSearchViewVisible = false;
      this.emptyEmpData();
      this.beginDateScope = "";
      this.loadEmps();
    },
    showAdvanceSearchView() {
      this.advanceSearchViewVisible = !this.advanceSearchViewVisible;
      this.keywords = "";
      if (!this.advanceSearchViewVisible) {
        this.emptyEmpData();
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
            ids += this.multipleSelection[i].id + ",";
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
          this.doDelete(row.id);
        })
        .catch(() => {});
    },
    doDelete(id) {
      this.getRequest("/employee/basic/delByUserId", { id: id }).then(res => {
        this.initData();
        this.loadEmps();
      });
    },
    searchEmp() {
      this.keywords = this.$refs.search.currentValue;
      this.currentPage = 1;
      this.initData();
      this.loadEmps();
    },
    currentChange(currentChange) {
      this.currentPage = currentChange;
      this.loadEmps();
    },
    loadEmps() {
      var _this = this;
      this.tableLoading = true;
      this.getRequest(
        "/employee/basic/getUserByPage?page=" +
          this.currentPage +
          "&size=10&keywords=" +
          this.keywords
      ).then(resp => {
        console.log(resp)
        this.tableLoading = false;
        if (resp && resp.status == 200) {
          var data = resp.data;
          _this.emps = data.users;
        }
      });
    },
    cancelEidt() {
      this.dialogVisible = false;
      this.emptyEmpData();
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
      this.getRequest("/employee/basic/count?keywords=" + this.keywords).then(
        resp => {
          if (resp && resp.status == 200) {
            _this.totalCount = resp.data.count;
          }
        }
      );
    },
    showEditEmpView(row) {
      this.dialogTitle = "编辑员工";
      this.emp = row;
      this.emp.birthday = this.formatDate(row.birthday);
      this.emp.conversionTime = this.formatDate(row.conversionTime);
      this.emp.beginContract = this.formatDate(row.beginContract);
      this.emp.endContract = this.formatDate(row.endContract);
      this.emp.beginDate = this.formatDate(row.beginDate);
      this.emp.nationId = row.nation.id;
      this.emp.politicId = row.politicsStatus.id;
      this.emp.departmentId = row.department.id;
      this.emp.departmentName = row.department.name;
      this.emp.jobLevelId = row.jobLevel.id;
      this.emp.posId = row.position.id;
      delete this.emp.salary;
      delete this.emp.workAge;
      delete this.emp.notWorkDate;
      this.dialogVisible = true;
    },
    template() {
      window.open("/test/template", "_parent");
    },
    showAddEmpView() {
      this.dialogTitle = "添加员工";
      this.dialogVisible = true;
      var _this = this;
      this.getRequest("/").then(resp => {
        if (resp && resp.status == 200) {
          _this.emp.workID = resp.data;
        }
      });
    },
    emptyEmpData() {
      this.emp = {
        name: "",
        gender: "",
        birthday: "",
        idCard: "",
        wedlock: "",
        nationId: "",
        nativePlace: "",
        politicId: "",
        email: "",
        phone: "",
        address: "",
        departmentId: "",
        departmentName: "所属部门...",
        jobLevelId: "",
        posId: "",
        engageForm: "",
        tiptopDegree: "",
        specialty: "",
        school: "",
        beginDate: "",
        workState: "",
        workID: "",
        contractTerm: "",
        conversionTime: "",
        notWorkDate: "",
        beginContract: "",
        endContract: "",
        workAge: ""
      };
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
.tree {
  overflow-y: auto;
  height: 700px;
  background-color: white;
  /*width:200px;*/
}

</style>
