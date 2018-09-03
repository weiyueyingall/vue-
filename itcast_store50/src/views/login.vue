<template>
     <div class="login-wrap">
    <el-form class="login-form" label-position="top" label-width="80px" :model="formData">
         <h2>用户登录</h2>
      <el-form-item label="用户名">
        <el-input v-model="formData.username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input @keyup.enter.native="handlelogin" v-model="formData.password"></el-input>
      </el-form-item>
      <el-button @click.prevent="handlelogin" class="login-button" type="primary">登录</el-button>
    </el-form>
  </div>
</template>

<script>
export default {
  data(){
    return{
        formData:{
            username:'',
            password:''
        }
    };
  },
  methods:{
      handlelogin(){
          this.$http.post('login',this.formData)
            .then((response)=>{
              const {meta:{msg,status}} = response.data;
              if(status===200){
                this.$message.success(msg);
                sessionStorage.setItem('token',response.data.data.token);
                this.$router.push('home');
              }else{
                this.$message.error(msg)
              }
            })
            .catch((err)=>{
              console.log(err);
              
            });
      }
  }

};
</script>

<style>
  .login-wrap{
      background:  #324152;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
  }
  .login-wrap .login-form{
      background: #fff;
      width: 400px;
      padding: 30px;
      border-radius: 5px;
  }
  .login-button{
      width: 100%;
  }

</style>
