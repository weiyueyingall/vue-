<template>
 <el-card class="card">
   <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>活动管理</el-breadcrumb-item>
    <el-breadcrumb-item>活动列表</el-breadcrumb-item>
    <el-breadcrumb-item>活动详情</el-breadcrumb-item>
   </el-breadcrumb>
<el-row class="row">
  <el-col :span="24">
    <el-input style="width:300px" placeholder="请输入内容" class="input-with-select">
      <el-button slot="append" icon="el-icon-search"></el-button>
    </el-input>
   <el-button type="success" plain>添加用户</el-button>
  </el-col>
</el-row>
 <el-table
      :data="list"
      border
      stripe
      style="width: 100%">
        <el-table-column
      type="index"
      >
    </el-table-column>
     <el-table-column
        prop="username"
        label="姓名"
       >
      </el-table-column>
      <el-table-column
        prop="email"
        label="邮箱"
        >
      </el-table-column>
      <el-table-column
        prop="mobile"
        label="电话"
        >
      </el-table-column>
       <el-table-column
        label="用户状态"
        >
        <template slot-scope="scope">
          <el-switch
          v-model="scope.row.mr_state"
          active-color="#13ce66"
          inactive-color="#ff4949">
</el-switch>
        </template>
      </el-table-column>
      <el-table-column
        prop="mg_state"
        label="操作"
      >
         <template slot-scope="scope">
        <el-button plain size="mini" type="primary" icon="el-icon-edit" circle></el-button>
        <el-button plain size="mini" type="success" icon="el-icon-check" circle></el-button>
        <el-button plain size="mini" type="danger" icon="el-icon-delete" circle></el-button>
      </template>
      </el-table-column>
    </el-table>
</el-card>
</template>

<script>
export default {
  data() {
    return {
      list: [],

  };
  },
  created() {
    this.loadData();
  },
  methods:{
    loadData(){
      this.$http.get('users',{
        headers:{
          Authorization:window.sessionStorage.getItem('token')
        },
        params:{
          pagenum:1,
          pagesize:10
        }
      })
        .then((res)=>{
         const{data,meta} = res.data;
          if(meta.status===200){
          this.list = data.users;
          }
        })
        .catch((err)=>{
          console.log(this.$message.error(mete.msg));
        })
    }
  }
};
</script>

<style>
  .card{
      height: 100%;
  }
  .row{
      margin: 15px 0 15px 0;
  }
</style>
