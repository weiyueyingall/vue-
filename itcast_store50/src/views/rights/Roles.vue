<template>
  <el-card class="card">
  <my-breadcrumb level="权限管理" level2="角色列表"></my-breadcrumb>
  <el-button style="margin-top:10px; margin-bottom=10px">添加角色</el-button>
<!-- 表格 -->
 <el-table
      border
      stripe
      :data="tableData"
      style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="scope">
          <el-row v-for="level1 in scope.row.chidren" :key="level1.id">
            <el-col :span="4">
              <el-tag closable @close="handleClose(scope.row,level1.id)">
                {{ level1.authName }}
              </el-tag>
            </el-col>
            <el-col :span="20">
              <el-row v-for="level2 in level1.chidren" :key="level2.id">
                <el-col :span="4">
                  <el-tag closable @close="handleClose(scope.row,level2.id)" type="success">
                    {{level2.authName}}
                  </el-tag>
                </el-col>
                <el-col :span="20">
                  <el-tag @close="handleClose(scope.row,level3.id)"
                  class="level3"
                  closable
                  typs="warning"
                  v-for="level3 in level2" :key="level3.id">
                  {{level3.authName}}
                  </el-tag>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
          <el-row v-if="scope.row.chidren.length===0">
            <el-col :span="24">未分配权限</el-col>
          </el-row>
        </template>
      </el-table-column>
      <el-table-column
        type="index"
        width="60">
      </el-table-column>
       <el-table-column
        prop="roleName"
        label="角色名称"
        width="300">
      </el-table-column>
      <el-table-column
        prop="roleDesc"
        label="角色描述"
        width="300">
      </el-table-column>
      <el-table-column
        label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" icon="el-icon-edit" plain></el-button>
          <el-button size="mini" type="danger" icon="el-icon-delete" plain></el-button>
          <el-button @click="handleOpenDialog(scope.row)" size="mini" type="success" icon="el-icon-check" plain></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 对话框 -->
    <el-dialog
     title="权限分配"
     :visible.sync="dialogVisible">
     <el-tree
      ref="tree"
      default-expand-all
      show-checkbox
      node-key="id"
      :default-check-keys="checkedkeys"
      :data="data"
      :props="defaultProps">
     </el-tree>
     <span slot="footer" class="dialog-footer">
       <el-button @click="dialogVisible = false">取消</el-button>
       <el-button type="primary" @click="handlesetRights">确定</el-button>
     </span>
    </el-dialog>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      tableData:[],
      dialogVisible:false,
      data:[],
      defaultProps:{
        label:'authName',
        children:'children'
      },
      checkedkeys:[],
      currentRoleId:-1
    };
  },
  created() {
    this.loadData();
  },
  methods:{
    // 加载表格数据
   async loadData(){
     const res = await this.$http.get('roles');
     const{meta:{status,msg}} = res.data;
     if(status===200){
       this.tableData = res.data.data
     }else{
       this.$message.error(msg)
     }
    },
    // 删除当前角色对应的权限
    async handleClose(role,rightId){
      const res = await this.$http.delete(`roles/${role.id}/rights/${rightId}`);
      const {meta:{msg,status}} = res.data;
      if(status===200){
        this.$message.success(msg);
        role.children = res.data.data;
      }else{
        this.$message.error(msg);
      }
    },
    // 点击分配权限  显示对话框
    async handleOpenDialog(role){
      this.dialogVisible = true;
      const res = await this.$http.get('rights/tree');
      this.data = res.data.data;
      const arr = [];
      role.children.forEach(level1 => {
        level1.children.forEach(level2=>{
          level2.children.forEach(level3=>{
            arr.push(level3.id);
          })
        })
      });
      this.checkedkeys = arr;
      this.currentRoleId = role.id;
    },
    // 点击确定按钮 给当前角色设置权限
    async handlesetRights(){
      const arr1 = this.$refs.tree.getCheckedKeys();
      const arr2 = this.$refs.tree.getHalfCheckedKeys();
      // 数组合并  解构
      const arr = [...arr1,...arr2];
      const rids = arr.join(',');
      // 发送请求
      const res = await this.$http.post(`roles/${this.currentRoleId}/rights`,{
        rids:rids
      });
      const {meta:{msg,meta}} = res.data;
      if(status===200){
        this.$http.success(msg);
        this.dialogVisible = false;
        this.loadData();
      }else{
        this.$message.error(msg);
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
.level3{
  margin-top: 5px;
  margin-bottom: 5px;
}
</style>
