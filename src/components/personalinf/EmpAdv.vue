<template>
  <div>
    <el-container>
      <el-header style="padding: 0px;display:flex;justify-content:space-between;align-items: center">
        <div style="display: inline">
          <el-input
            placeholder="请输入..."
            clearable
            @change="keywordsChange"
            style="width: 300px;margin: 0px;padding: 0px;"
            size="mini"
            :disabled="advanceSearchViewVisible"
            @keyup.enter.native="searchEmp"
            prefix-icon="el-icon-search"
            v-model="keywords">
          </el-input>
          <el-button type="primary" size="mini" style="margin-left: 5px" icon="el-icon-search" @click="searchEmp">搜索
          </el-button>
          <el-button slot="reference" type="primary" size="mini" style="margin-left: 5px"
             @click="showAdvanceSearchView"><i
            class="fa fa-lg" v-bind:class="[advanceSearchViewVisible ? faangledoubleup:faangledoubledown]"
            style="margin-right: 5px"></i>高级搜索
          </el-button>
        </div>
      </el-header>
      <el-main style="padding-left: 0px;padding-top: 0px">
        <div>
          <transition name="slide-fade">
            <div
              style="margin-bottom: 10px;border: 1px;border-radius: 5px;border-style: solid;padding: 5px 0px 5px 0px;box-sizing:border-box;border-color: #20a0ff"
              v-show="advanceSearchViewVisible">
              <el-row>
                <el-col :span="5">
                  业绩名称:
                    <el-input v-model="emp.name" style="width: 130px" size="mini" placeholder="请输入">
                    </el-input>
                </el-col>
                <el-col :span="5">
                  业绩类别:
                  <el-input v-model="emp.category" style="width: 130px" size="mini" placeholder="请输入">
                  </el-input>
                </el-col>
                <el-col :span="4">
                  级别:
                  <el-input v-model="emp.rank" style="width: 130px" size="mini" placeholder="请输入">
                  </el-input>
                </el-col>
                <el-col :span="4">
                  完成者:
                  <el-input v-model="emp.consummator" style="width: 120px" size="mini" placeholder="请输入">
                  </el-input>
                </el-col>
                <el-col :span="6">
                  是否第一作者:
                  <el-select v-model="emp.firstauthor" style="width: 130px" size="mini" placeholder="请选择">
                    <el-option label="是" value="yes"></el-option>
                    <el-option label="否" value="no"></el-option>
                  </el-select>
                </el-col>
              </el-row>
              <el-row style="margin-top: 10px">
                <el-col :span="5">
                  审核情况:
                  <el-select v-model="emp.auditsituation" style="width: 130px" size="mini" placeholder="请选择">
                    <el-option label="是" value="yes"></el-option>
                    <el-option label="否" value="no"></el-option>
                  </el-select>
                </el-col>
                <el-col :span="10">
                  日期:
                  <el-date-picker
                    v-model="beginDateScope"
                    unlink-panels
                    size="mini"
                    type="daterange"
                    value-format="yyyy-MM-dd"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
                  </el-date-picker>
                </el-col>
                <el-col :span="5" :offset="4">
                  <el-button size="mini" @click="cancelSearch">取消</el-button>
                  <el-button icon="el-icon-search" type="primary" size="mini" @click="searchEmp">搜索</el-button>
                </el-col>
              </el-row>
            </div>
          </transition>
          <el-table
            :data="emps"
            v-loading="tableLoading"
            border
            stripe
            @selection-change="handleSelectionChange"
            size="mini"
            style="width: 100%">
            <el-table-column
              prop="number"
              align="left"
              fixed
              label="序号"
              width="50">
            </el-table-column>
            <el-table-column
              prop="name"
              width="100"
              align="left"
              label="业绩名称">
            </el-table-column>
            <el-table-column
              prop="category"
              label="业绩类别"
              width="80">
            </el-table-column>
            <el-table-column
              width="85"
              align="left"
              label="时间">
              <template slot-scope="scope">{{ scope.row.birthday | formatDate}}</template>
            </el-table-column>
            <el-table-column
              prop="firstauthor"
              width="110"
              align="left"
              label="是否是第一作者">
            </el-table-column>
            <el-table-column
              prop="consummator"
              width="70"
              label="完成者">
            </el-table-column>
            <el-table-column
              width="60"
              prop="rank"
              label="级别">
            </el-table-column>
            <el-table-column
              prop="achievement"
              width="80"
              label="业绩点">
            </el-table-column>
            <el-table-column
              prop="auditsituation"
              width="100"
              label="审核情况">
            </el-table-column>
            <el-table-column
              prop="evidence"
              width="130"
              align="left"
              label="佐证材料上交情况">
            </el-table-column>
            <el-table-column
              prop="remark"
              label="备注">
            </el-table-column>
          </el-table>
          <div style="display: flex;justify-content: space-between;margin: 2px">
            <el-pagination
              background
              :page-size="10"
              :current-page="currentPage"
              @current-change="currentChange"
              layout="prev, pager, next"
              :total="totalCount">
            </el-pagination>
          </div>
        </div>
      </el-main>
    </el-container>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        emps: [],
        keywords: '',
        beginDateScope: '',
        faangledoubleup: 'fa-angle-double-up',
        faangledoubledown: 'fa-angle-double-down',
        totalCount: -1,
        currentPage: 1,
        tableLoading: false,
        advanceSearchViewVisible: false,
        emp: {
          number: '',
          birthday: '',
          category: '',
          name: '',
          consummator: '',
          rank: '',
          firstauthor: '',
          auditsituation:''
        },
      };
    },
    mounted: function () {
      this.initData();
      this.loadEmps();
    },
    methods: {
      cancelSearch() {
        this.advanceSearchViewVisible = false;
        this.emptyEmpData();
        this.beginDateScope = '';
        this.loadEmps();
      },
      showAdvanceSearchView() {
        this.advanceSearchViewVisible = !this.advanceSearchViewVisible;
        this.keywords = '';
        if (!this.advanceSearchViewVisible) {
          this.emptyEmpData();
          this.beginDateScope = '';
          this.loadEmps();
        }
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },

      doDelete(ids) {
        this.tableLoading = true;
        var _this = this;
        this.deleteRequest("/employee/basic/emp/" + ids).then(resp => {
          _this.tableLoading = false;
          if (resp && resp.status == 200) {
            var data = resp.data;

            _this.loadEmps();
          }
        })
      },
      keywordsChange(val) {
        if (val == '') {
          this.loadEmps();
        }
      },
      searchEmp() {
        this.loadEmps();
      },
      currentChange(currentChange) {
        this.currentPage = currentChange;
        this.loadEmps();
      },
      loadEmps() {
        var _this = this;
        this.tableLoading = true;
        this.getRequest("/employee/basic/emp?page=" + this.currentPage + "&size=10&keywords=" + this.keywords + "&politicId=" + this.emp.politicId + "&nationId=" + this.emp.nationId + "&posId=" + this.emp.posId + "&jobLevelId=" + this.emp.jobLevelId + "&engageForm=" + this.emp.engageForm + "&departmentId=" + this.emp.departmentId + "&beginDateScope=" + this.beginDateScope).then(resp => {
          this.tableLoading = false;
          if (resp && resp.status == 200) {
            var data = resp.data;
            _this.emps = data.emps;
            _this.totalCount = data.count;
//            _this.emptyEmpData();
          }
        })
      },
      initData() {
        var _this = this;
        this.getRequest("/employee/basic/basicdata").then(resp => {
          if (resp && resp.status == 200) {
            var data = resp.data;
            _this.nations = data.nations;
            _this.politics = data.politics;
            _this.deps = data.deps;
            _this.positions = data.positions;
            _this.joblevels = data.joblevels;
            _this.emp.workID = data.workID;
          }
        })
      },

      emptyEmpData() {
        this.emp = {
          number: '',
          birthday: '',
          category: '',
          name: '',
          consummator: '',
          rank: '',
          firstauthor: '',
          auditsituation:''
        }
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
    transition: all .8s ease;
  }

  .slide-fade-leave-active {
    transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }

  .slide-fade-enter, .slide-fade-leave-to {
    transform: translateX(10px);
    opacity: 0;
  }
</style>
