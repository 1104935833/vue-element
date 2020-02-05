<template>
  <div class="app-container">
    <el-row :gutter="20">
      <el-col :xs="24" :sm="24" :md="8" :lg="6" :xl="5" style="margin-bottom: 10px">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>个人信息</span>
          </div>
          <div>
            <div style="text-align: center"></div>
            <ul class="user-info">
              <li>
                <div style="height: 100%">
                  <svg-icon icon-class="login" />登录账号
                  <div class="user-right">{{user.workID}}</div>
                </div>
              </li>
              <li>
                <svg-icon icon-class="user1" />用户名
                <div class="user-right">{{user.name}}</div>
              </li>
              <li>
                <svg-icon icon-class="phone" />手机号码
                <div class="user-right">{{user.phone}}</div>
              </li>
              <li>
                <svg-icon icon-class="email" />用户邮箱
                <div class="user-right">{{user.email}}</div>
              </li>
              <li>
                <svg-icon icon-class="dept" />所属部门
                <div class="user-right">{{user.department}}</div>
              </li>
              <li>
                <svg-icon icon-class="anq" />安全设置
                <div class="user-right">
                  <a>修改密码</a>
                  <a>修改邮箱</a>
                </div>
              </li>
            </ul>
          </div>
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="24" :md="16" :lg="18" :xl="19">
        <!--    用户资料    -->
        <el-card class="box-card">
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="用户资料" name="first">
              <el-form
                ref="form"
                :model="form"
                style="margin-top: 10px;"
                size="small"
                label-width="80px"
              >
                <el-form-item label="手机号码">
                  <el-input v-model="form.phone" style="width: 35%"></el-input>
                </el-form-item>

                <el-form-item label="性别">
                  <el-radio-group v-model="form.sex">
                    <el-radio label="男">男</el-radio>
                    <el-radio label="女">女</el-radio>
                  </el-radio-group>
                </el-form-item>
               
                <el-form-item>
                  <el-button type="primary" >立即创建</el-button>
                  <el-button>取消</el-button>
                </el-form-item>
              </el-form>
            </el-tab-pane>

            <el-tab-pane label="业绩汇总" name="second">fdfs</el-tab-pane>
          </el-tabs>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

 <script>
export default {
  data() {
    const info=JSON.parse(localStorage.getItem("user"));
    return {
      activeName: "first",
      user: info,
      form: {
        phone:info.phone,
        sex: info.gender,
      }
    };
  },
  methods: {
    handleClick(tab, event) {
      // console.log(tab, event);
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss">
.avatar-uploader-icon {
  font-size: 28px;
  width: 120px;
  height: 120px;
  line-height: 120px;
  text-align: center;
}
.avatar {
  width: 120px;
  height: 120px;
  display: block;
  border-radius: 50%;
}
.user-info {
  padding-left: 0;
  list-style: none;
  li {
    border-bottom: 1px solid #f0f3f4;
    padding: 11px 0;
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