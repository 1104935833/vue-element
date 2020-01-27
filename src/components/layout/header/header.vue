<template>
  <div>
    <el-header id="header">
      <div style="float:left;">
        <span class="hideAside" @click="collapse">
          <i class="fa fa-indent fa-lg"></i>
        </span>
        <el-breadcrumb separator-class="el-icon-arrow-right" class="breadcrumb">
          <el-breadcrumb-item>首页</el-breadcrumb-item>
          <el-breadcrumb-item v-if="menuName!='主页' && menuName!=''">{{menuName}}</el-breadcrumb-item>
          <el-breadcrumb-item>{{routername}}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>

      <ul class="personal">
        <li>
          <el-dropdown @command="handleCommand">
            <el-badge :is-dot="isDotCount">
              <i class="fa fa-bell-o" style="cursor: pointer"></i>
              <!-- 提醒 -->
            </el-badge>
            <el-dropdown-menu slot="dropdown">
              <template >
                <el-dropdown-item v-for="(i) in [{id:1,path:'/sys/1'}]" v-bind:key="i.id" :command="i.path">{{i.id}}</el-dropdown-item>
              </template>
            </el-dropdown-menu>
          </el-dropdown>
        </li>
        <li>
          <el-dropdown @command="handleCommand">
            <span class="el-dropdown-link">
              {{user.name}}
              <i class="el-icon-arrow-down el-icon--right"></i>
              <!-- <i><img v-if="user.userface!=''" :src="user.userface"
              style="width: 40px;height: 40px;margin-right: 5px;margin-left: 5px;border-radius: 40px"/></i>-->
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="/sys/center">个人中心</el-dropdown-item>
              <el-dropdown-item command="/sys/setting">设置</el-dropdown-item>
              <el-dropdown-item command="logout" divided>注销</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </li>
      </ul>
    </el-header>
    <tabNav></tabNav>
  </div>
</template>
<script>
import tabNav from "./tabNav";
export default {
  data() {
    return {
      routername: "主页",
      menuName: "",
      isDotCount: false,
      o:'/sys/center'
    };
  },
  components: { tabNav },
  created() {
    var _this = this;
    if (
      this.$store.state.user.name == undefined ||
      this.$store.state.user.name == null
    ) {
      _this.getRequest("/logout");
      _this.$store.commit("logout");
      location.reload();
      _this.$router.replace({ path: "/" });
    }
  },
  // mounted() {
  //   this.intervalid1 = setInterval(() => {
  //     this.isDotCount = !this.isDotCount;
  //     console.log(this.isDotCount);
  //   }, 2000);
  // },
  methods: {
    collapse() {
      this.$store.dispatch("collapse");
    },
    handleCommand(cmd) {
      var _this = this;
      if (cmd == "logout") {
        this.$confirm("注销登录, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            _this.getRequest("/logout");
            _this.$store.commit("logout");
            _this.$router.replace({ path: "/" });
            location.reload();
          })
          .catch(() => {
            _this.$message({
              type: "info",
              message: "取消"
            });
          });
      } else {
        this.$router.replace({ path: cmd });
      }
    }
  },

  created: function() {
    this.routername = this.$route.name;
  },
  watch: {
    $route(to, from) {
      this.path = this.$route.path;
      this.menuName = this.$route.matched[0].name;
      this.routername = this.$route.name;
    }
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
    routes() {
      return this.$store.state.routes;
    }
  }
};
</script>
<style lang="scss">
$top: top;
$bottom: bottom;
$left: left;
$right: right;
$leftright: ($left, $right);
%w100 {
  width: 100%;
}

%h100 {
  height: 100%;
}

%cursor {
  cursor: pointer;
}

html,
body,
#app,
.el-container,
#asideNav,
ul.el-menu {
  @extend %h100;
}

@mixin set-value($side, $value) {
  @each $prop in $leftright {
    #{$side}-#{$prop}: $value;
  }
}

#header {
  max-height: 35px;
  line-height: 40px;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  display: flex;
  justify-content: space-between;
  .hideAside {
    float: left;
    @extend %cursor;
  }
  .personal {
    list-style-type: none;
    display: flex;
    flex-direction: row;
    li {
      @include set-value(margin, 13px);
      font-size: 12px;
    }
    .fullScreen {
      @extend %cursor;
    }
    .el-dropdown-link {
      @extend %cursor;
    }
    .icon img {
      margin-#{$top}: 7px;
      -webkit-border-radius: 5px;
      -moz-border-radius: 5px;
      border-radius: 5px;
      width: 40px;
      height: 40px;
    }
  }
}
.el-badge__content.is-fixed.is-dot {
  right: 5px;
  top: 5px;
}
.breadcrumb {
  float: left;
  margin-top: 12px;
  margin-left: 20px;
}
</style>
