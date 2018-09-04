<template>
  <el-container class="container">
    <el-header class="header">
      <el-row>
        <el-col :span="4">
          <img src="@/assets/logo.png">
        </el-col>
        <el-col :span="18">
          电商后端管理平台
        </el-col>
        <el-col :span="2">
          <a href="#" @click="handleexit">退出</a>
        </el-col>
    </el-row>
    </el-header>
    <el-container>
  <el-aside  class="aside" width="200px">
 <el-menu class="aside-menu" :unique-opened="true"
  default-active="0" :router="true">
  <el-submenu index="1">
    <template slot="title">
    <i class="el-icon-location"></i>
    <span>用户管理</span>
  </template>
    <el-menu-item index="users">
    用户列表
    </el-menu-item>
  </el-submenu>
  <el-submenu index="2">
    <template slot="title">
      <i class="el-icon-location"></i>
      <span>权限管理</span>
    </template>
      <el-menu-item index="2-1">角色列表</el-menu-item>
      <el-menu-item index="2-1">权限列表</el-menu-item>
  </el-submenu>
  <el-submenu index="3">
    <template slot="title">
      <i class="el-icon-location"></i>
      <span>商品管理</span>
    </template>
      <el-menu-item index="3-1">商品列表</el-menu-item>
      <el-menu-item index="3-2">分类参数</el-menu-item>
      <el-menu-item index="3-3">商品分类</el-menu-item>
  </el-submenu>
</el-menu>
</el-aside>
<el-main class="main">
  <!-- 主题部分的占位 -->
  <router-view></router-view>
</el-main>
</el-container>
</el-container>
</template>

<script>
export default {
  beforeCreate() {
    const token = sessionStorage.getItem('token');
    if(!token){
      this.$router.push('login');
      this.$message.warning('请先登录');
    }
  },
methods:{
  handleexit(){
    sessionStorage.clear();
    this.$router.push('login');
    this.$message.success('退出成功');
  }
}
};
</script>

<style>
.container {
  height: 100%;
}

.header {
  background-color: #b3c0d1;
  line-height: 60px;
  text-align: center;
  font-size: 24px;
  color: #fff;

}

.header a{
   text-decoration: none;
   color: red;

}

.aside {
  height: 100%;
  background-color: #d3dce6;
}

.main {
  background-color: #e9eef3;

}
</style>
