<template>
  <el-container>
  <el-aside width="auto">
       <Aside></Aside>
  </el-aside>
  <el-container>
     <el-header><Header></Header></el-header>
     <el-main>
       <Tags></Tags>
       <router-view/>
     </el-main>
  </el-container>
</el-container>   
</template>
<script>
import Aside from '../components/Aside.vue'
import Header from '../components/Header.vue'
import Tags from '../components/tags.vue'
export default { 
 components: {
     Aside,
     Header,
     Tags
 }
}
</script>
<style lang="scss" scoped>
.el-container{
   height: 100%;

 .el-header, .el-footer {
    background-color: #333;
    color: #fff;
    text-align: center;
    line-height: 60px;
  }
  
  .el-aside {
    height: 100%;
    background-color: #333;
    color: #fff;
    text-align: center;
    line-height: 200px;
  }
  
  .el-main {
    background-color: #fff;
    color: #333;
    // text-align: center;
    // line-height: 160px;
  }
  


}
</style>
