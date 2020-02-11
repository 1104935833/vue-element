<template>
  <div>
    <el-container>
      <el-header
        style="padding: 0px;display:flex;justify-content:space-between;align-items: center"
      >
        <div style="display: inline">
          <el-input
            placeholder="请输入..."
            clearable
            style="width: 300px;margin: 0px;padding: 0px;"
            size="mini"
            :disabled="advanceSearchViewVisible"
            @keyup.enter.native="searchEmp"
            prefix-icon="el-icon-search"
            v-model="keywords"
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
      </el-header>
      <el-main style="padding-left: 0px;padding-top: 0px">
        <div>
          <transition name="slide-fade">
            <div
              style="margin-bottom: 10px;border: 1px;border-radius: 5px;border-style: solid;padding: 5px 0px 5px 0px;box-sizing:border-box;border-color: #20a0ff"
              v-show="advanceSearchViewVisible"
            >
              <el-row>
                <el-col :span="5">
                  业绩名称:
                  <el-input
                    v-model="emp.performance_name"
                    style="width: 130px"
                    size="mini"
                    placeholder="请输入"
                  ></el-input>
                </el-col>
                <el-col :span="5">
                  业绩类别:
                  <el-input
                    v-model="emp.performance_class"
                    style="width: 130px"
                    size="mini"
                    placeholder="请输入"
                  ></el-input>
                </el-col>
                <el-col :span="4">
                  级别:
                  <el-input v-model="emp.grade" style="width: 130px" size="mini" placeholder="请输入"></el-input>
                </el-col>
                <el-col :span="4">
                  完成者:
                  <el-input
                    v-model="emp.complete_author"
                    style="width: 120px"
                    size="mini"
                    placeholder="请输入"
                  ></el-input>
                </el-col>
                <el-col :span="6">
                  是否第一作者:
                  <el-select
                    v-model="emp.first_author"
                    style="width: 130px"
                    size="mini"
                    placeholder="请选择"
                  >
                    <el-option label value></el-option>
                    <el-option label="是" value="1"></el-option>
                    <el-option label="否" value="0"></el-option>
                  </el-select>
                </el-col>
              </el-row>
              <el-row style="margin-top: 10px">
                <el-col :span="5">
                  审核情况:
                  <el-select
                    v-model="emp.audit_condition"
                    style="width: 130px"
                    size="mini"
                    placeholder="请选择"
                  >
                    <el-option label value></el-option>
                    <el-option label="通过" value="1"></el-option>
                    <el-option label="审核中" value="2"></el-option>
                    <el-option label="未通过" value="3"></el-option>
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
                    end-placeholder="结束日期"
                  ></el-date-picker>
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
            size="mini"
            style="width: 100%"
          >
            <el-table-column prop="id" align="left" fixed label="序号" width="50"></el-table-column>
            <el-table-column prop="performance_name" width="100" align="left" label="业绩名称"></el-table-column>
            <el-table-column prop="performance_class" label="业绩类别" width="80"></el-table-column>
            <el-table-column width="85" align="left" label="时间" prop="time"></el-table-column>
            <el-table-column prop="first_author" width="110" align="left" label="是否是第一作者"></el-table-column>
            <el-table-column prop="complete_author" width="70" label="完成者"></el-table-column>
            <el-table-column width="60" prop="grade" label="级别"></el-table-column>
            <el-table-column prop="performance_point" width="80" label="业绩点"></el-table-column>
            <el-table-column prop="performance_point" width="100" label="审核情况"></el-table-column>
            <el-table-column prop="material_condition" width="130" align="left" label="佐证材料上交情况"></el-table-column>
            <el-table-column prop="note" label="备注"></el-table-column>
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
  </div>
</template>
<script>
export default {
  data() {
    return {
      emps: [],
      keywords: "",
      beginDateScope: "",
      faangledoubleup: "fa-angle-double-up",
      faangledoubledown: "fa-angle-double-down",
      totalCount: -1,
      currentPage: 1,
      tableLoading: false,
      advanceSearchViewVisible: false,
      emp: {
        performance_name: "",
        performance_class: "",
        grade: "",
        complete_author: "",
        first_author: "",
        audit_condition: "",
        auditsituation: ""
      }
    };
  },
  mounted: function() {
    this.initData();
  },
  methods: {
    cancelSearch() {
      this.advanceSearchViewVisible = false;
      this.emptyEmpData();
      this.beginDateScope = "";
      this.initData();
    },
    showAdvanceSearchView() {
      this.advanceSearchViewVisible = !this.advanceSearchViewVisible;
      this.keywords = "";
      if (!this.advanceSearchViewVisible) {
        this.emptyEmpData();
        this.beginDateScope = "";
        
      }
    },

    searchEmp() {
      this.post("/base/serchPerformance", {
        info: this.emp,
        keywords:this.keywords,
        page: this.currentPage,
        size: 10,
        time: this.beginDateScope
      }).then(res => {
        this.emps = res.data.performance;
        this.totalCount = res.data.count;
      });
    },
    currentChange(currentChange) {
      this.currentPage = currentChange;
      this.loadEmps();
    },
    loadEmps() {
      var _this = this;
      this.tableLoading = true;
      this.getRequest("/base/getPerformanceByUserId",{
        page: this.currentPage,size: 10
      }).then(resp => {
        this.tableLoading = false;
        if (resp && resp.status == 200) {
          var data = resp.data;
          _this.emps = data.performance;
          _this.totalCount = data.count;
          _this.emptyEmpData();
        }
      })
    },
    initData() {
      this.getRequest("/base/getPerformanceByUserId", {
        page: this.currentPage,
        size: 10
      }).then(resp => {
        this.emps = resp.data.performance;
        this.totalCount = resp.data.count;
      });
    },

    emptyEmpData() {
      this.emp = {
        number: "",
        birthday: "",
        category: "",
        name: "",
        consummator: "",
        rank: "",
        firstauthor: "",
        auditsituation: ""
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
</style>
