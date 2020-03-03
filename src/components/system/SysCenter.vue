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
            <ul class="user-info1">
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
                  <el-button size="mini" type="text" @click="dialogFormVisible = true">修改密码</el-button>
                </div>
              </li>
            </ul>
          </div>
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="24" :md="16" :lg="16" :xl="19">
        <!--    用户资料    -->
        <el-card class="box-card">
          <el-tabs v-model="activeName">
            <!-- <el-tab-pane label="业绩汇总" name="first">
              <Demo></Demo>
            </el-tab-pane>-->
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
                <el-form-item label="邮箱">
                  <el-input v-model="form.email" style="width: 35%"></el-input>
                </el-form-item>
                <el-form-item label="性别">
                  <el-radio-group v-model="form.sex">
                    <el-radio label="0">男</el-radio>
                    <el-radio label="1">女</el-radio>
                  </el-radio-group>
                </el-form-item>

                <el-form-item>
                  <el-button type="primary" @click="changeInfo()">修改</el-button>
                </el-form-item>
              </el-form>
            </el-tab-pane>
          </el-tabs>
        </el-card>
      </el-col>
    </el-row>

    <el-dialog title="修改密码" :visible.sync="dialogFormVisible">
      <el-form>
        <el-form-item label="手机号">
          <el-input v-model="phone" style="width:35%" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item label="验证码">
          <el-input v-model="yzm" style="width:25%" placeholder="请输入验证码"></el-input>
          <span class="register-msg-btn" v-show="!show">{{count}} s</span>
          <el-button
            type="warning"
            size="mini"
            style="width:15%"
            v-show="show"
            @click="getYZM()"
          >获取验证码</el-button>
          <br />
          <span ref="input1" />
        </el-form-item>
        <el-form-item label="登录密码">
          <el-input v-model="newPwd" style="width:35%" placeholder="请设置6-20位密码"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelPwd()">取 消</el-button>
        <el-button type="primary" @click="editPwd()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

 <script>
import demo from "./centerChart/Chart.vue";

export default {
  components: {
    Demo: demo //将别名demo 变成 组件 Demo
  },
  data() {
    const info = JSON.parse(localStorage.getItem("user"));
    return {
      dialogFormVisible: false,
      activeName: "first",
      user: info,
      form: {
        phone: info.phone,
        email: info.email,
        sex: info.gender
      },
      disable: true,
      phone: info.phone,
      yzm: "",
      newPwd: "",
      show: true,
      count: "",
      timer: null
    };
  },
  methods: {
    changeInfo() {
      this.post("/center/changeInfo", { info: this.form }).then(res => {
        if (res.data.msg == "修改成功") {
          let info = JSON.stringify(res.data.obj);
          window.localStorage.setItem("user", info);
          this.user = JSON.parse(info);
        }
      });
    },
    cancelPwd() {
      this.dialogFormVisible = false;
      this.phone = JSON.parse(localStorage.getItem("user")).phone;
      this.yzm = "";
      this.newPwd = "";
    },
    editPwd() {
      // this.dialogFormVisible = false;
      if (!/^[1234567890]\d{6}$/.test(this.yzm)) {
        this.$message.error("验证码错误");
      } else {
        this.postRequest("/center/editPwd", {
          yzm: this.yzm,
          newPwd: this.newPwd
        }).then(res => {
          if (res.data.msg == "修改成功") {
            this.dialogFormVisible = false;
            this.phone = info.phone;
            this.yzm = "";
            this.newPwd = "";
          }
        });
      }
    },
    getYZM() {
      if (!/^1[3456789]\d{9}$/.test(this.phone)) {
        this.$message.error("请输入正确的手机号");
      } else {
        this.show = false;
        const TIME_COUNT = 10;
        if (!this.timer) {
          this.count = TIME_COUNT;
          this.show = false;

          this.getRequest("/center/getYzm", { phone: this.phone });

          this.timer = setInterval(() => {
            if (this.count > 0 && this.count <= TIME_COUNT) {
              this.count--;
            } else {
              this.show = true;
              clearInterval(this.timer);
              this.timer = null;
            }
          }, 1000);
        }
      }
    },
    handleClick(tab, event) {}
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
.user-info1 {
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