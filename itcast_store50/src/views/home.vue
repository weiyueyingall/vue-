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
    <!-- 侧边栏 -->
 <el-menu class="aside-menu" :unique-opened="true"
  default-active="0" :router="true">
  <el-submenu v-for="level1 in menus" :key="level1.id" :index="level1.path">
    <template slot="title">
      <i class="el-icon-location"></i>
      <span>{{ level1.authName }}</span>
    </template>
    <el-menu-item v-for="level2 in level1.children" :key="level2.id" :index="'/'+level2.path">
    <i class="el-icon-location"></i>
    {{ level2.authName }}
    </el-menu-item>
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
  data() {
    return {
      menus: []
    };
  },
  created() {
    this.loadMenus();
  },
  beforeCreate() {
    const token = sessionStorage.getItem('token');
    if (!token) {
      this.$router.push('login');
      this.$message.warning('请先登录');
    }
  },
  methods: {
    handleexit() {
      sessionStorage.clear();
      this.$router.push('login');
      this.$message.success('退出成功');
    },
    // 加载左菜单栏的数据
    async loadMenus() {
      const res = await this.$http.get('menus');
      const {meta: {msg, status}} = res.data;
      if (status === 200) {
        this.menus = res.data.data;
        // console.log(this.menus);
      } else {
        this.$message.error(msg);
      }
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
  height: 100%;
  background-color: #e9eef3;

}
</style>
