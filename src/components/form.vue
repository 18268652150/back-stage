<template>
    <el-form ref="form" :model="form" label-width="80px" style="height:300px">
  <el-form-item label="姓名">
    <el-input v-model="form.name" placeholder="请输入你的名字"></el-input>
  </el-form-item>
   <el-form-item label="年龄">
    <el-input v-model="form.age" placeholder="请输入你的年龄"></el-input>
  </el-form-item>
  <el-form-item label="性别">
    <el-select v-model="form.six" placeholder="请选择你的性别">
      <el-option label="男" value="男"></el-option>
      <el-option label="女" value="女"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="入职日期"> 
      <el-date-picker type="date" placeholder="选择日期" v-model="form.birth">
      </el-date-picker>
  </el-form-item>
  <el-form-item label="地址">
    <el-input type="textarea" v-model="form.addr"></el-input>
  </el-form-item>

</el-form>
</template>

<script>
  export default {
   props: {
       form:Object
   }

  
   
  }
</script>
<style lang="scss" scoped>
.el-form{
    
    .el-form-item{
    width: 100%;
  
}

}

</style>