<template>
  <div>
      <el-container>
        <el-header
          style="padding: 0px;display:flex;justify-content:space-between;align-items: center"
        >
          <div style="display: inline">
            <el-input
              placeholder="输入业绩名称"
              clearable
              style="width: 300px;margin: 0px;padding: 0px;"
              size="mini"
              :disabled="advanceSearchViewVisible"
              prefix-icon="el-icon-search"
            ></el-input>
            <el-button type="primary" size="mini" style="margin-left: 5px" icon="el-icon-search" @click="handleEdit">搜索</el-button>
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
                  <el-col :span="4" style="padding-top:10px;">
                    业绩名称:
                    <el-input style="width: 130px" size="mini" placeholder="工号"></el-input>
                  </el-col>
                  <el-col :span="4" style="padding-top:10px;">
                    申请人:
                    <el-input style="width: 130px" size="mini" placeholder="姓名"></el-input>
                  </el-col>
                  <el-col :span="5">
                    业绩类型:
                    <el-select
                      style="width: 200px;"
                      v-model="option"
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
                  <el-col :span="4" style="padding-top:10px;">
                    个人/集体:
                    <el-radio-group>
                      <el-radio :label="1">个人</el-radio>
                      <el-radio :label="0">集体</el-radio>
                    </el-radio-group>
                  </el-col>
                  <el-col :span="7">
                    申请时间:
                    <el-date-picker
                      v-model="value1"
                      type="daterange"
                      range-separator="至"
                      start-placeholder="开始日期"
                      end-placeholder="结束日期"
                    ></el-date-picker>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="24">
                    <SearchType ref="searchType" :type="option" v-if="disbale"></SearchType>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="3" :offset="18" style="padding:5px;">
                    <el-button size="mini" @click="cancelSearch">取消</el-button>
                    <el-button icon="el-icon-search" type="primary" size="mini" @click="test">搜索</el-button>
                  </el-col>
                </el-row>
              </div>
            </transition>
            <!-- 表格 -->
          </div>
        </el-main>
      </el-container>
     <el-table
            :data="emps"
            v-loading="tableLoading"
            border
            stripe
            size="mini"
            style="width: 100%"
          >
            <el-table-column prop="id" align="left" fixed label="序号"></el-table-column>
            <el-table-column prop="name"  align="left" label="业绩名称"></el-table-column>
            <el-table-column prop="table_name" label="业绩类别" ></el-table-column>
            <el-table-column  align="left" label="申请时间" prop="create_time"></el-table-column>
            <el-table-column prop="audit_status"  align="left" label="审核状态"></el-table-column>
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
  </div>
</template>
<script>
import SearchType from "./SearchType";
export default {
  components: { SearchType },
  data() {
    return {
      faangledoubleup: "fa-angle-double-up",
      faangledoubledown: "fa-angle-double-down",
      value1: "",
      option: "",
      disbale: false,
      dialogVisible: false,
      tableLoading: false,
      advanceSearchViewVisible: false,
      perType: [],
      tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }]
    };
  },
  mounted: function() {},

  methods: {
    optionChange() {
      if (this.option == "") this.disbale = false;
      else {
        this.disbale = false;
        this.$nextTick(() => {
          this.disbale = true;
        });
      }
    },
    //从子组件获取数据
    handleEdit() {
      let oldProcedure = this.$refs["searchType"].getVal();
      console.log(oldProcedure);
    },
    getperType() {
      this.getRequest("/getperType").then(res => {
        this.perType = res.data;
      });
    },
    test() {
      const target = { a: 1, b: 2 };
      const source = { d: 4, c: 5 };

      const returnedTarget = Object.assign(target, source);

      console.log(target);
      // expected output: Object { a: 1, b: 4, c: 5 }

      console.log(returnedTarget);
      // expected output: Object { a: 1, b: 4, c: 5 }
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
       this.option=[]
      } else {
        this.getperType();
      }
    }
  },
  created() {}
};
</script>
<style>
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
</style>
