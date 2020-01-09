<template>
    <div>
        <el-aside id="asideNav">
        <div class="logo-name">
            <p v-if="$store.getters.logoShow">业绩</p>
            <p v-else>教师业绩管理系统</p>
        </div>
        <el-menu class="el-menu-vertical"
            background-color="#03152A"
            text-color="rgba(255,255,255,.7)"
            active-text-color="#ffffff"
            :collapse="$store.getters.isCollapse"
            :collapse-transition="true"
            unique-opened router>
            <el-menu-item index="/home">
              <i class="el-icon-menu"></i>
              <span slot="title">首页</span>
            </el-menu-item>
            <template v-for="(item,index) in this.routes" v-if="!item.hidden">
              <el-submenu :key="index" :index="index+''">
              <template slot="title">
                <svg-icon :icon-class="item.iconCls" style="height: 30px;width: 30px;" />
                  <i :class="item.iconCls" style="color: #20a0ff;width: 14px;">
                    
                  </i>
                  <span slot="title">{{item.name}}</span>
              </template>
              <el-menu-item width="180px"
                              style="padding-left: 30px;padding-right:0px;margin-left: 0px;width: 170px;text-align: left"
                              v-for="child in item.children"
                              :index="child.path"
                              :key="child.path">{{child.name}}
              </el-menu-item>
              </el-submenu>
            </template>
        </el-menu>
      </el-aside>
    </div>
</template>
<script>

  export default{
    name: 'asideNav',
    computed: {
      routes(){
        return this.$store.state.routes
      }
    }
  }
</script>

<style lang="scss">
  $top: top;
  $bottom: bottom;
  $left: left;
  $right: right;
  %w100 {
    width: 100%;
  }

  %h100 {
    height: 100%;
  }

  %cursor {
    cursor: pointer;
  }

  @mixin set-value($side, $value) {
    @each $prop in $leftright {
      #{$side}-#{$prop}: $value;
    }
  }

  #asideNav {
    width: auto !important;
    display: flex;
    flex-direction: column;
    border-right: solid 1px #e6e6e6;
    .logo-name {
      background-color: #03152A !important;
      @extend %w100;
      font-weight: 300;
      z-index: 999;
      p {
        height: 50px;
        line-height: 50px;
        text-align: center;
        font-size: 16px;
        color: #5e6d82;
      }
    }
    .el-menu-vertical:not(.el-menu--collapse) {
      width: 200px;
      @extend %h100;
      overflow-y: scroll;
    }
    .el-menu {
      flex: 1;
      overflow: inherit;
      border-right: none;
      &::-webkit-scrollbar {
        display: none;
      }
      .fa {
        vertical-align: middle;
        margin-right: 5px;
        width: 24px;
        text-align: center;
        font-size: 18px;
      }
      .el-menu-item {
        background-color: #020f1d !important;
        border-bottom: 1px solid #020f1d;
        &:hover {
          color: #ffffff !important;
          background-color: #375573 !important;
        }
      }
      .el-menu-item.is-active {
        background-color: #56a9ff !important
      }
      .is-opened > .el-submenu__title > .el-icon-arrow-down {
        color: #ffffff;
        font-weight: 500;
        font-size: 18px;
      }
    }

  }
</style>
