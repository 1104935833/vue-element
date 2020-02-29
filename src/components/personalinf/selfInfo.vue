<template>
  <div>
    <el-row>
      <el-col :span="24" style="text-align:center;padding: 10px 0;">
        <h1>个人信息</h1>
      </el-col>
    </el-row>
    <div>
      <ul class="user-info">
        <li>
          <div style="height: 100%;">
            <svg-icon icon-class="login" />姓名
            <div class="user-right">{{form.name}}</div>
          </div>
        </li>
        <li>
          <svg-icon icon-class="user1" />性别
          <div class="user-right" v-if="form.gender==1">男</div>
          <div class="user-right" v-if="form.gender!=1">女</div>
        </li>
        <li>
          <svg-icon icon-class="phone" />工号
          <div class="user-right">{{form.workID}}</div>
        </li>
        <li>
          <svg-icon icon-class="dept" />联系电话
          <div class="user-right">{{form.phone}}</div>
        </li>
        <li>
          <svg-icon icon-class="dept" />邮箱
          <div class="user-right">{{form.email}}</div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      office: [],
      form: {
        name: "",
        gender: "",
        workID: "",
        office_id: "",
        phone: "",
        email: "",
        note: ""
      },
      a: ""
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      this.getRequest("/base/userInfo").then(res => {
        this.form = res.data.details;
        this.form.office_id = this.form.office_id.toString();
        this.office = res.data.office;
      });
    },

    onSubmit() {
      console.log(this.form);
      this.post("/base/changeInfo", { info: this.form }).then(res => {
        if (res.data.msg == "修改成功") {
          let info = JSON.stringify(res.data.obj);
          window.localStorage.setItem("user", info);
        }
        this.init();
      });
    }
  }
};
</script>
<style rel="stylesheet/scss" lang="scss">
.avatar-uploader-icon {
  font-size: 28px;
  width: 12px;
  height: 120px;
  line-height: 120px;
  text-align: center;
}
.avatar {
  width: 12px;
  height: 120px;
  display: block;
  border-radius: 50%;
}
.user-info {
  margin-left: 25%;
  padding-left: 0;
  list-style: none;
  li {
    width: 70%;
    border-bottom: 1px solid #f0f3f4;
    padding: 30px 0;
    font-size: 13px;
  }
  .user-right {
    float: right;
    a {
      color: #317ef3;
    }
  }
}
</style>
