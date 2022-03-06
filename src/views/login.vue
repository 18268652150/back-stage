<template>
  <el-form
    :model="ruleForm"
    status-icon
    :rules="rules"
    ref="ruleForm"
    label-width="100px"
    class="ruleForm"
  >
    <el-form-item label="账号" prop="username">
      <el-input v-model="ruleForm.username"
      autocomplete="off"
      >

      </el-input>
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input
        type="password"
        v-model="ruleForm.password"
        autocomplete="off"
        @keyup.enter.native="login"
      ></el-input>
    </el-form-item>
   

    <el-form-item class="bottom">
      <el-button type="primary" @click="login" style="margin-right:15px">提交</el-button>
      <el-button @click="resetForm('ruleForm')">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
// import{getMenu} from "../api/data"
export default {
  data() {
    return {
      ruleForm: {
        password: '',
        
        username: '',
      },
      rules: {
        pass: [{ required:true,message:"请输入密码", trigger: 'blur' }],
        
        id: [{ required:true,message:"请输入账号", trigger: 'blur' }],
      },
    }
  },
  methods: {
      login(){
 this.$router.push({name:'home'})
          // getMenu(this.ruleForm).then(res=>{
          //   console.log(res);
             
          //     if(res.code === 20000){
          //       this.$store.commit('setMenu',res.data.menu)
          //       this.$store.commit('setToken',res.data.token)
          //       this.$router.push({name:'home'})
                
          //     }else{
          //         this.$message.warning(res.data.message)
          //     }
          // })
      },
    // submitForm(formName) {
    //   this.$refs[formName].validate((valid) => {
    //     if (valid) {
    //       alert('submit!')
    //     } else {
    //       console.log('error submit!!')
    //       return false
    //     }
    //   })
    // },
    resetForm(ruleForm) {
        this.$refs[ruleForm].resetFields()
      // this.$refs[formName].resetFields()
    },
  },
}
</script>
<style lang="scss" scoped>
.ruleForm{
  border-radius: 20px;
  background-clip: padding-box;
    width: 350px;
    background-color: beige;
    margin: 200px auto;
    padding: 30px 30px 15px 0px;
   .bottom{
       display: flex;
       justify-content: space-between;
   }
}
</style>
