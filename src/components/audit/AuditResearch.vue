<template>
  <div>
    <div style="margin-bottom: 10px;">
      申请人：
      <el-input
        style="width:200px;"
        placeholder="请输入内容"
        clearable
        prefix-icon="el-icon-search"
        @clear="getpeddingList"
        v-model="proposer_id"
      ></el-input>审核状态：
      <el-select v-model="audit_status" clearable @change="getpeddingList" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <el-button icon="el-icon-search" type="primary" size="mini" @click="searchEmp">搜索</el-button>
    </div>
    <el-table :data="peddingList" stripe style="width: 100%" height="650">
      <el-table-column prop="id" label="序号" width="180"></el-table-column>
      <el-table-column prop="proposer_name" label="申请人" width="180"></el-table-column>
      <el-table-column prop="proposer_type" label="申请类型"></el-table-column>
      <el-table-column prop="proposer_time" label="申请时间"></el-table-column>
      <el-table-column prop="auditor_research_name" label="教研室审核人"></el-table-column>
      <el-table-column prop="auditor_research_time" label="教研室审核时间"></el-table-column>
      <el-table-column prop="auditor_court_name" label="分院审核人"></el-table-column>
      <el-table-column prop="audtior_court_time" label="分院审核时间"></el-table-column>
      <el-table-column prop="audit_status" label="审核状态">
        <template slot-scope="scope">
          <span v-if="scope.row.audit_status==0">待审核</span>
          <span v-else-if="scope.row.audit_status==1">教研室通过</span>
          <span v-else-if="scope.row.audit_status==2">教研室未通过</span>
          <span v-else-if="scope.row.audit_status==3">分院通过</span>
          <span v-else-if="scope.row.audit_status==4">分院未通过</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="success" size="mini" @click="showPeddingInfo(scope.row)">查看</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      style="float:right;"
      background
      :page-size="10"
      :current-page="currentPage"
      @current-change="currentChange"
      layout="prev, pager, next"
      :total="totalCount"
    ></el-pagination>
    <el-dialog title="审核" :visible.sync="dialogVisible" width="70%">
      <Table :message="message1" :msgType="type"></Table>
    </el-dialog>
  </div>
</template>
<script>
import Table from "./Table";
export default {
  components: {
    Table: Table
  },
  data() {
    return {
      dialogVisible: false,
      options: [
        {
          value: "0",
          label: "待审核"
        },
        {
          value: "1",
          label: "教研室通过"
        },
        {
          value: "2",
          label: "教研室未通过"
        },
        {
          value: "3",
          label: "分院通过"
        },
        {
          value: "4",
          label: "分院未通过"
        }
      ],
      audit_status: "",
      proposer_id: "",
      message1: [],
      peddingList: [],
      totalCount: -1,
      currentPage: 1,
      type: ""
    };
  },
  created() {
    this.getpeddingList();
  },
  methods: {
    searchEmp() {
      this.getRequest("/getAllAudit", {
        proposer_id: this.proposer_id,
        audit_status: this.audit_status,
        page: this.currentPage,
        size: 10
      }).then(res => {
        this.totalCount = res.data.count;
        this.peddingList = res.data.audits;
      });
    },

    currentChange(currentChange) {
      this.currentPage = currentChange;
      this.getpeddingList();
    },
    //查看
    showPeddingInfo(row) {
      this.getRequest("/getTableName", { tableId: row.table_id }).then(res => {
        this.message1 = res.data.tableName;
        this.dialogVisible = true;
        this.type = {message:this.message1,type:1,tableid:row.table_id};
      });
    },
    getpeddingList() {
      this.getRequest("/getAllAudit", {
        proposer_id: "",
        audit_status: "",
        page: this.currentPage,
        size: 10
      }).then(res => {
        this.totalCount = res.data.count;
        this.peddingList = res.data.audits;
      });
    }
  }
};
</script>