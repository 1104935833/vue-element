<template>
  <div id="loyout">
    <el-container>
      <layoutAside></layoutAside>
      <el-container>
          <layoutHeader></layoutHeader>
          <el-main id="elmain">
            <layoutMain></layoutMain>
          </el-main>
        <el-footer>
        <Footer></Footer>
        </el-footer>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import layoutHeader from './layout/header/header'
import Footer from './layout/footer/footer'
import layoutAside from './layout/aside/aside'
import layoutMain from './layout/main'
  export default{
    components:{
      layoutHeader,
      Footer,
      layoutAside,
      layoutMain
    }
  }
</script>

<style>
  .main-enter, .main-leave-to {
    opacity: 0;
    transform: translateY(30px);

  }
  .main-enter-active {
    transition: all 0.2s;
  }
  .main-leave-active {
    position: absolute;
    transition: all 0.3s;
  }
</style>
<style lang="scss">
  * {
    margin: 0px;
    padding: 0px;
  }

  body {
    background-color: #f2f2f2;
    font-size: 14px;
    color: #333333;
  }

  li {
    list-style: none;
  }

  a {
    text-decoration: none;
  }

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

  html, body, #loyout, .el-container, #asideNav, ul.el-menu {
    @extend %h100;
  }

  @mixin set-value($side, $value) {
    @each $prop in $leftright {
      #{$side}-#{$prop}: $value;
    }
  }

  #elmain {
    background-color: #f0f2f5;
  }

.el-main {
  padding: 0px;
  padding-bottom: 10px;
  padding-left: 20px;
  padding-right: 10px;
}
</style>
