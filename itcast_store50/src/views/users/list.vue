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
    <el-input clearable v-model="searchvalue" @change="kong" style="width:300px" placeholder="请输入内容" class="input-with-select">
      <el-button @click="handlesearch" slot="append" icon="el-icon-search"></el-button>
    </el-input>
   <el-button @click="adddialogFormVisible=true" type="success" plain>添加用户</el-button>
  </el-col>
</el-row>
 <el-table
      :data="list"
      v-loading="loading"
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
<<<<<<< HEAD
        width="70">
=======
       >
>>>>>>> dev-users
      </el-table-column>
      <el-table-column
        prop="email"
        label="邮箱"
        >
      </el-table-column>
      <el-table-column
        prop="mobile"
        label="电话"
<<<<<<< HEAD
        width="100">
      </el-table-column>
       <el-table-column
        prop="create_time"
        label="时间"
        width="150">
=======
        >
      </el-table-column>
      <el-table-column
        label="时间"
        >
        <template slot-scope="scope">
          {{ scope.row.cerate_time | formDate('YYYY-MM-DD')}}
        </template>
>>>>>>> dev-users
      </el-table-column>
       <el-table-column
        label="用户状态"
<<<<<<< HEAD
        width="100">
=======
        >
        <template slot-scope="scope">
          <el-switch
          @change="handlechange(scope.row)"
          v-model="scope.row.mg_state"
          active-color="#13ce66"
          inactive-color="#ff4949">
</el-switch>
        </template>
>>>>>>> dev-users
      </el-table-column>
      <el-table-column
        prop="mg_state"
        label="操作"
        width="200px"
      >
         <template slot-scope="scope">
        <el-button @click="handleOpenEditDialog(scope.row)" plain size="mini" type="primary" icon="el-icon-edit" >
        </el-button>
        <el-button @click="handleopenlog(scope.row)" plain size="mini" type="success" icon="el-icon-check" ></el-button>
        <el-button @click="handledelete(scope.row.id)" plain size="mini" type="danger" icon="el-icon-delete" ></el-button>
      </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
     <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pagenum"
      :page-sizes="[2, 3, 4, 5]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
    <!-- 添加用户对话框 -->
<el-dialog @close="handleclose" title="添加用户" :visible.sync="adddialogFormVisible">
  <el-form
  ref="form"
  :rules="rules"
  label-width="80px"
  :model="formDate"
  >
    <el-form-item label="用户名" prop="username">
      <el-input v-model="formDate.username" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input v-model="formDate.password" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="邮箱" prop="email">
      <el-input v-model="formDate.email" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="电话" prop="mobile">
      <el-input v-model="formDate.mobile" auto-complete="off"></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="adddialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="handleadd">确 定</el-button>
  </div>
</el-dialog>
<!-- 修改用户 -->
<el-dialog @close="handleclose" title="修改用户" :visible.sync="editdialogFormVisible">
  <el-form
  ref="form"
  :rules="rules"
  label-width="80px"
  :model="formDate"
  >
    <el-form-item  label="用户名" prop="username">
      <el-input disabled v-model="formDate.username" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="邮箱" prop="email">
      <el-input v-model="formDate.email" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="电话" prop="mobile">
      <el-input v-model="formDate.mobile" auto-complete="off"></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="editdialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="handleedit">确 定</el-button>
  </div>
</el-dialog>
<!-- 分配角色 -->
<el-dialog @close="handleclose"
    title="分配角色"
    :visible.sync="setdialogFormVisible">
  <el-form
    label-width="100px"
    :model="formDate">
    <el-form-item  label="用户名">
      {{formDate.username}}
    </el-form-item>
    <el-form-item lobel="请选择角色">
      <!-- 下拉框 -->
      <el-select v-model="currentid" placeholder="请选择">
        <el-option
          label="请选择"
          :value="-1"
          disabled>
        </el-option>
        <el-option
          v-for="item in options"
          :key="item.id"
          :lable="item.roleName"
          :value="item.id">
        </el-option>
      </el-select>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="setdialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="handlesetrole">确 定</el-button>
  </div>
</el-dialog>
</el-card>
</template>
<script>
export default {
  data() {
    return {
      list: [],
      loading : true,
      pagenum : 1,
      pagesize : 2,
      total : 0,
      searchvalue: '',
      adddialogFormVisible:false,
      editdialogFormVisible:false,
      setdialogFormVisible:false,
      currentid:-1,
      formDate:{
        username:'',
        password:'',
        email:'',
        mobile:''
      },
      rules:{
      username:[ { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }],
      password: [{ required: true, message: '请输入密码', trigger: 'blur' },
             { min: 3, max: 5, message: '长度在 3 到 8 个字符', trigger: 'blur' }
            ]
      },
      options:[]
  };
  },
created() {
  this.loadData();
},
methods:{
  async loadData(){
  this.loading = true;
  // const token = sessionStorage.getItem('token');
  // this.$http.defaults.headers.common['Authorization'] = token;
  const res = await this.$http.get(`users?pagenum=${this.pagenum}&pagesize=${this.pagesize}&query=${this.searchvalue}`);
  this.loading = false;
  const {meta:{msg,status}} = res.data;
  if(status===200){
    this.total = res.data.data.total;
    this.list = res.data.data.users;
    }else{
      this.$message.error(msg);
    }
  },
kong(){
  if(!this.searchvalue){
     this.loadData();
  }
},
handledelete(id) {
  this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(async () => {
    const res = await this.$http.delete(`users/${id}`);
    const {meta :{status,msg}} = res.data;
    if(status===200){
      this.$message.success(msg);
      if(this.pagenum > 1 && this.list.length===1){
        this.pagenum--;
      }
        this.loadData();
    }
  }).catch(() => {
    this.$message({
      type:'info',
      message:'已取消删除'
    })
  });
  },
  // 搜索功能
  handlesearch(){
    this.loadData();
  },
  // 分页方法
  handleSizeChange(val) {
    this.pagesize = val ;
    this.loadData()

    // console.log(`每页 ${val} 条`);
  },
  handleCurrentChange(val) {
    this.pagenum = val;
    this.loadData();
    // console.log(`当前页: ${val}`);
  },
  // 修改用户状态
async handlechange(user){
  const res = await  this.$http.put(`users/${user.id}/state/${user.mg_state}`);
  const {meta:{status,msg}} = res.data;
  if(status===200){
    this.$message.success(msg);
  }else{
    this.$message.error(msg);
  }
  },
  handleclose(){
    for(let key in this.formDate){
        this.formDate[key]='';
      };
    this.currentid = -1;
  },
  // 打开修改用户的对话框
  handleOpenEditDialog(user){
    this.editdialogFormVisible = true;
    this.formDate.username = user.username;
    this.formDate.email = user.email;
    this.formDate.mobile = user.mobile;
    // 点击编辑按钮时候 记录下用户的id 点击确定的时候用
    this.formDate.id = user.id;
  },
  // 点击分配角色
 async handleopenlog(user){
    this.setdialogFormVisible=true;
    this.formDate.username = user.username;
    const res = await this.$http.get('roles');
    this.options = res.data.data;
    // 设置用户默认的角色 根据用户id查询用户信息 找到对应的角色id
    const response = await this.$http.get(`users/${user.id}`);
    this.currentid = response.data.data.rid;
    // 记录用户的id
    this.formDate.id = user.id;
  },
  // 点击确定按钮 设置用户角色
async handlesetrole(){
  const res = await this.$http.put(`users/${this.formDate.id}/role`,{
    rid:this.currentid
  });
  const { meta :{status,msg}} = res.data;
  if(status===200){
    this.$message.success(msg);
    this.setdialogFormVisible = false;
  }else{
    this.$message.error(msg);
  }
  },
  // 点击确定按钮 修改用户数据
  async handleedit(){
    const res = await this.$http.put(`/users/${this.formDate.id}`,{
      email:this.formDate.email,
      mobile:this.formDate.mobile
    });
    const {meta:{status,msg}} = res.data;
    if(status===200){
      // 关闭对话框
      this.editdialogFormVisible = false;
      // 刷新数据
      this.loadData();
      // 弹出提示
      this.$message.success(msg);
    }else{
      this.$message.error(msg);
    }
  },
  // 点击确定 用户数据被添加
  handleadd(){
    this.$refs.form.validate(async (valid) => {
      if (!valid) {
        this.$message.warning('验证失败');
        return;
      }
    const res = await this.$http.post('users',this.formDate);
    const {meta:{msg,status}} = res.data;
    if(status===201){
      this.$message.success(msg);
      this.adddialogFormVisible =false;
      this.loadData();
    }else{
      this.$message.error(msg);
    }
  });
  }
}
}
</script>

<style>
.card{
    height: 100%;
}
.row{
    margin: 15px 0 15px 0;
}
</style>
