<template>
  <div id="aa">
    <div class="a1 div">
      <span style="margin-left:30px;">目前业绩情况:</span>
      <el-row>
        <el-col :span="12" style="height:170px;" :offset="1">
          <el-row>
            <el-col :span="22" style="margin-bottom:10px;">
              <span>荣誉</span>
              <hr />
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="22">
              <el-table
                :data="tableData1"
                max-height="150"
                style="width: 500px"
                :show-header="false"
              >
                <el-table-column fixed prop="label" label="日期" width="200"></el-table-column>
                <el-table-column prop="create_time" label="姓名" width="150"></el-table-column>
              </el-table>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <el-row>
                <el-col :span="22"  style="margin-top:10px;">
                  科研
                  <hr />
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="22">
                  <el-table
                    :data="tableData2"
                    style="width: 500px"
                    max-height="150"
                    :show-header="false"
                  >
                    <el-table-column fixed prop="name" label="日期" width="150"></el-table-column>
                    <el-table-column prop="create_time" label="姓名" width="150"></el-table-column>
                  </el-table>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="11">
          <el-row>
            <el-col :span="22">
              教学
              <hr />
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="22">
              <el-table
                :data="tableData3"
                style="width: 500px"
                max-height="350"
                :show-header="false"
              >
                <el-table-column fixed prop="name" label="日期" width="150"></el-table-column>
                <el-table-column prop="create_time" label="姓名" width="150"></el-table-column>
              </el-table>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </div>
    <div class="a2 div">
      <el-row>
        <el-col :span="24" :offset="1">业绩申请进度：</el-col>
      </el-row>
      <el-row>
        <el-col :span="3" :offset="2" style="margin-top:50px;">
          <img src="../../assets/audit.jpg" height="50px;" />
        </el-col>
        <el-col :span="3" style="margin-top:50px;">
          {{count1}}
          <br />审核中
        </el-col>
        <el-col :span="3" :offset="1" style="margin-top:50px;">
          <img src="../../assets/audit1.jpg" height="50px;" />
        </el-col>
        <el-col :span="3" style="margin-top:50px;">
          {{count2}}
          <br />未通过
        </el-col>
        <el-col :span="3" :offset="1" style="margin-top:50px;">
          <img src="../../assets/audit2.jpg" height="50px;" />
        </el-col>
        <el-col :span="3" style="margin-top:50px;">
          {{count3}}
          <br />已通过
        </el-col>
      </el-row>
    </div>
    <div class="a3 div">
      <info></info>
    </div>
    <div class="a4 div">
      <char></char>
    </div>
  </div>
</template>
<script>
import char from "../system/centerChart/Chart";
import info from "../personalinf/selfInfo";
export default {
  components: { char, info },
  data() {
    return {
      count1: 0,
      count2: 0,
      count3: 0,
      tableData1: [],
      tableData2: [],
      tableData3: []
    };
  },
  created() {},
  mounted() {
    this.getperformance();
    this.getCountAudit();
  },
  methods: {
    getperformance() {
      this.getRequest("/center/getPerformance").then(res => {
        this.tableData1 = res.data.tableData1;
        this.tableData2 = res.data.tableData2;
        this.tableData3 = res.data.tableData3;
      });
    },

    getCountAudit() {
      this.getRequest("/center/getCountAudit").then(res => {
        this.count1 = res.data.count1;
        this.count2 = res.data.count2;
        this.count3 = res.data.count3;
      });
    }
  }
};
</script>
<style lang="scss">
.a1 {
  height: 450px;
  width: 55%;
  float: left;
  background: #fff;
}

.a2 {
  height: 250px;
  width: 30%;
  float: left;
  background: #fff;
}
.a3 {
  height: 700px;
  margin-top: 20px;
  width: 30%;
  float: left;
  background: #fff;
}
.a4 {
  margin-top: -520px;
  height: 500px;
  width: 55%;
  float: left;
  background: #fff;
}
.div {
  border-radius: 10px;
  margin-bottom: 20px;
  margin-left: 4%;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

#aa .el-table__body-wrapper::-webkit-scrollbar {
  /*width: 0;宽度为0隐藏*/
  width: 0px;
}
#aa .el-table__body-wrapper::-webkit-scrollbar-thumb {
  border-radius: 2px;
  height: 50px;
  background: #eee;
}
#aa .el-table__body-wrapper::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  border-radius: 2px;
  background: rgba(0, 0, 0, 0.4);
}
</style>
