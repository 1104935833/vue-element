<template>
  <el-form
    :rules="rules"
    class="login-container"
    label-position="left"
    :model="loginForm"
    label-width="0px"
    ref="loginForm"
    v-loading="loading"
  >
    <h3 class="login_title">系统登录</h3>
    <el-form-item prop="username">
      <el-input type="text" v-model="loginForm.username" auto-complete="off" placeholder="账号"></el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input type="password" v-model="loginForm.password" auto-complete="off" placeholder="密码"></el-input>
    </el-form-item>
    <el-form-item prop="code">
      <el-input v-model="loginForm.code" auto-complete="off" placeholder="验证码" style="width: 63%">
        <svg-icon slot="prefix" icon-class="validCode" class="el-input__icon input-icon" />
      </el-input>
      <div class="login-code">
        <img :src="codeUrl" @click="getCode" />
      </div>
    </el-form-item>
    <!-- <el-checkbox class="login_remember" v-model="checked" label-position="left">记住密码</el-checkbox> -->
    <el-form-item style="width: 100%">
      <el-button type="primary" style="width: 100%" @click.native.prevent="submitClick">登录</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
import { isNotNullORBlank } from "../utils/utils";
export default {
  data() {
    return {
      codeUrl: "",
      res: "",
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        code: [{ required: true, trigger: "blur", message: "验证码不能为空" }]
      },
      checked: true,
      loginForm: {
        username: "00000003",
        password: "123456",
        code: "2"
      },
      loading: false
    };
  },
  methods: {
    isCode() {
      if (this.loginForm.code != this.res) return false;
      else return true;
    },
    getCode() {
      this.getRequest("/config/code").then(res => {
        this.codeUrl = res.data.img;
        this.res = res.data.res;
      });
    },
    submitClick: function() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          if(this.isCode()){
          var _this = this;
          this.loading = true;
          this.postRequest("/login", {
            username: this.loginForm.username,
            password: this.loginForm.password
          }).then(resp => {
            _this.loading = false;
            if (resp && resp.status == 200) {
              var data = resp.data;
              _this.$store.commit("login", data.obj);
              var path = _this.$route.query.redirect;
              _this.$router.replace({
                path: path == "/" || path == undefined ? "/home" : path
              });
            }
          });
        }else{
          this.$message.error('验证码错误！');
        }
        }
      });
    }
  },
  created() {
    this.getCode();
  }
};
</script>
<style rel="stylesheet/scss" lang="scss">
body{
  background:#E1F8FF;
}
.login-code {
  width: 33%;
  display: inline-block;
  height: 38px;
  float: right;
  img {
    cursor: pointer;
    vertical-align: middle;
  }
}
.login-container {
  border-radius: 15px;
  background-clip: padding-box;
  margin: 180px auto;
  width: 350px;
  padding: 35px 35px 15px 35px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
}
.login_title {
  margin: 0px auto 40px auto;
  text-align: center;
  color: #505458;
}
.login_remember {
  margin: 0px 0px 35px 0px;
  text-align: left;
}
</style>
