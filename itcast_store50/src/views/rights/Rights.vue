<template>
<el-card class="card">
  <my-breadcrumb level="权限管理" level2="权限列表"></my-breadcrumb>
  <el-table
   border
   stripe
   :data="tableData"
   style="width:100% mafgin-top=10px">
   <el-table-column
    type="index"
    width="60">
   </el-table-column>
   <el-table-column
    prop="authName"
    lable="权限名称"
    width="180">
   </el-table-column>
   <el-table-column
    prop="path"
    lable="路径"
    width="180">
   </el-table-column>
   <el-table-column
    prop="level"
    lable="层级">
    <template slot-scope="scope">
      <span v-if="scope.row.level==='0'">一级</span>
      <span v-if="scope.row.level==='1'">二级</span>
      <span v-if="scope.row.level==='2'">三级</span>
    </template>
   </el-table-column>
  </el-table>
</el-card>
</template>

<script>
export default {
  data(){
    return{
      tableDate:[]
    }
  },
  created() {
    this.loadDate();
  },
  methods:{
    async loadDate(){
      const res = await this.$http.get('rights/list');
      const {meta:{status,msg}} = res.data;
      if(status===200){
        this.tableDate = res.data;
      }else{
        this.$http.error(msg);
      }
    }
  }
}
</script>

<style>
  .card{
    height: 100%;
    overflow: auto;
  }
</style>
