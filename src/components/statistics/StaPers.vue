<template>
  <div>
    <el-container>
      <el-header
        style="padding: 0px;display:flex;justify-content:space-between;align-items: center"
      >
        <div style="display: inline">
          <el-input
            placeholder="输入名称"
            clearable
            style="width: 300px;margin: 0px;padding: 0px;"
            size="mini"
            :disabled="advanceSearchViewVisible"
            v-model="form.keyword"
            prefix-icon="el-icon-search"
          ></el-input>
          <el-button
            type="primary"
            size="mini"
            style="margin-left: 5px"
            icon="el-icon-search"
            @click="search"
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
          <!-- 高级搜索 -->
          <transition name="slide-fade">
            <div
              style="margin-bottom: 10px;border: 1px;border-radius: 5px;border-style: solid;padding: 5px 0px 5px 0px;box-sizing:border-box;border-color: #20a0ff"
              v-show="advanceSearchViewVisible"
            >
              <el-row :gutter="20">
                <el-col :span="3" style="padding-top:10px;">
                  名称:
                  <el-input style="width: 130px" size="mini" placeholder="名称" v-model="form.name"></el-input>
                </el-col>
                <el-col :span="4" style="padding-top:10px;">
                  申请人:
                  <el-input
                    style="width: 130px"
                    size="mini"
                    placeholder="姓名"
                    v-model="form.username"
                  ></el-input>
                </el-col>
                <el-col :span="5">
                  业绩类型:
                  <el-select
                    style="width: 200px;"
                    v-model="form.option"
                    @change="optionChange"
                    placeholder="请选择"
                  >
                    <el-option value>请选择</el-option>
                    <el-option
                      v-for="item in perType"
                      :key="item.id"
                      :label="item.table_name"
                      :value="item.id"
                    ></el-option>
                  </el-select>
                </el-col>

                <el-col :span="7">
                  申请时间:
                  <el-date-picker
                    v-model="form.time"
                    format="yyyy-MM-dd"
                    value-format="yyyy-MM-dd"
                    @change="dateChangebirthday"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                  ></el-date-picker>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <SearchType ref="searchType" :type="form.option" v-if="disbale"></SearchType>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="3" :offset="18" style="padding:5px;">
                  <el-button size="mini" @click="cancelSearch">取消</el-button>
                  <el-button icon="el-icon-search" type="primary" size="mini" @click="search">搜索</el-button>
                </el-col>
              </el-row>
            </div>
          </transition>
          <!-- 表格 -->
        </div>
      </el-main>
    </el-container>
    <el-table
      :data="tableData2"
      v-loading="tableLoading"
      border
      stripe
      size="mini"
      style="width: 100%"
    >
      <el-table-column prop="id" align="left" fixed label="序号"></el-table-column>
      <el-table-column prop="name" align="left" label="业绩名称">
        <template slot-scope="scope">
                <span v-if="scope.row.label==null">{{scope.row.name}}</span>
                <span v-else>{{scope.row.label}}</span>
              </template>
      </el-table-column>
      <el-table-column prop="table_name" label="业绩类别"></el-table-column>
      <el-table-column align="left" label="申请时间" prop="create_time">
        <template slot-scope="scope">{{scope.row.create_time | dateFormat}}</template>
      </el-table-column>
      <el-table-column prop="audit_status" align="left" label="审核状态">
        <template slot-scope="scope">
          <span v-if="scope.row.audit_status==0">待审核</span>
          <span v-if="scope.row.audit_status==1">教研室通过</span>
          <span v-if="scope.row.audit_status==2">教研室不通过</span>
          <span v-if="scope.row.audit_status==3">分院通过</span>
          <span v-if="scope.row.audit_status==4">分院不通过</span>
        </template>
      </el-table-column>
      <el-table-column prop="file_id" align="left" label="佐证材料上交情况">
        <template slot-scope="scope">
          <span v-if="scope.row.file_id==null">无</span>
          <span v-if="scope.row.file_id!=null">已提交</span>
        </template>
      </el-table-column>
      <el-table-column prop="note" label="操作">
        <template slot-scope="scope">
          <el-button type="success" size="mini" @click="showPeddingInfo(scope.row)">查看</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- <div style="display: flex;justify-content: space-between;margin: 2px">
      <el-pagination
        background
        :page-size="10"
        :current-page="currentPage"
        @current-change="currentChange"
        layout="prev, pager, next"
        :total="totalCount"
      ></el-pagination>
    </div> -->
    <div class="result-foot">
      <ul class="ul" style="">
        <!-- 上一页 -->
        <li class="disabled" v-if="pageindex==1">
          <a href="javascript:;"><</a>
        </li>
        <li v-else @click="LoadData(pageindex-1)">
          <a href="javascript:;"><</a>
        </li>
        <!-- 页码 -->
        <li v-for="n in totalpages" :key="n" v-bind:class="pageindex==n ?'active':''" @click="LoadData(n)">
          <a href="#" v-text="n"></a>
        </li>
        <!-- 下一页 -->
        <li class="disabled" v-if="pageindex == totalpages || totalpages ==0">
          <a href="javascript:;">></a>
        </li>
        <li v-else @click="LoadData(pageindex+1)">
          <a href="javascript:;">></a></a>
        </li>
      </ul>
    </div>
    <el-dialog title="查看" :visible.sync="dialogVisible" width="70%">
      <Table v-if="hackReset" :message="message1" :msgType="type"></Table>
    </el-dialog>
  </div>
</template>
<script>
import SearchType from "./SearchType";
import Table from "../audit/Table";
export default {
  components: { SearchType, Table },
  data() {
    return {
      total: 0,
      pagesize: 10,
      pageindex: 1,
      hackReset: true,
      faangledoubleup: "fa-angle-double-up",
      faangledoubledown: "fa-angle-double-down",
      value1: "",
      keyword: "",
      disbale: false,
      dialogVisible: false,
      tableLoading: false,
      advanceSearchViewVisible: false,
      perType: [],
      type: "",
      message1: "",
      form: {
        keyword: "",
        name: "",
        username: "",
        option: "",
        time: "",
        group: "self"
      },
      tableData: [],
      tableData2:[]
    };
  },
  mounted: function() {
    this.search();
  },
computed: {
    totalpages: function() {
      return Math.ceil((this.total * 1) / this.pagesize);
    }
  },
  methods: {
    LoadData(value){
      this.pageindex = value;
      this.tableData2 = this.tableData.slice((value -1)*10,value*10)
    },
    // currentChange(currentChange) {
    //   this.currentPage = currentChange;
    //   this.search();
    // },
    //查看
    showPeddingInfo(row) {
      this.hackReset = false;
      this.$nextTick(() => {
        this.hackReset = true;
      });
      this.message1 = { state: row.table_state };
      this.dialogVisible = true;
      this.type = { message: this.message1, type: 2, tableid: row };
    },
    dateChangebirthday(val) {
      this.form.time = val;
    },
    search() {
      this.tableLoading=true;
      this.form.page = this.currentPage;
      let resform;
      let form1 = this.form;
      if (this.disbale) {
        //从子组件获取数据
        let oldProcedure = this.$refs["searchType"].getVal();
        resform = Object.assign(form1, oldProcedure);
      } else {
        resform = form1;
      }
      this.post("/searchPer", { resform: resform }).then(res => {
        this.tableLoading = false;
        this.tableData = res.data.res;
        this.total = res.data.count;
        this.LoadData(1)
      });
    },
    optionChange() {
      if (this.form.option == "") this.disbale = false;
      else {
        this.disbale = false;
        this.$nextTick(() => {
          this.disbale = true;
        });
      }
    },

    getperType() {
      this.getRequest("/getperType", { state: "" }).then(res => {
        this.perType = res.data;
      });
    },
    cancelSearch() {
      this.advanceSearchViewVisible = false;
      this.form.option = "";
      this.clear();
    },
    showAdvanceSearchView() {
      this.advanceSearchViewVisible = !this.advanceSearchViewVisible;
      if (!this.advanceSearchViewVisible) {
        this.form.option = "";
        this.clear();
      } else {
        this.$delete(this.form, "keyword");
        this.getperType();
      }
    },
    clear() {
      this.form = {
        keyword: "",
        name: "",
        username: "",
        option: "",
        time: "",
        group: "self"
      };
    }
  },
  created() {}
};
</script>
<style lang = "scss">
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}

.result-foot{
  float: right;
}
.active{ background: #2d8cf0;}
.active a{color:#fff !important;}
.ul{list-style: none;margin: 20px;}
.ul li{float: left;line-height: 28px;width: 30px;border: 1px solid #ccc;border-radius: 4px;height: 30px;text-align: center;margin: 5px;}
.ul li.disabled{color:#333}
.ul li a{color:#333}
</style>
