<template>
  <header class="header">
    <div class="left">
      <el-button icon="el-icon-menu" size="mini" @click="clickTeb"></el-button>
      
        <el-breadcrumb separator="/" >
            <el-breadcrumb-item style="width:90px" v-for="(item,index) in  tebList" :key="index" :to="{ path: item.path }">{{item.label}}</el-breadcrumb-item>
            
          </el-breadcrumb>
     
    </div>
    <div class="right">
      <el-dropdown size="mini" trigger="click">
        <span class="el-dropdown-link">
          <img class="author" :src="author" />
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>个人中心</el-dropdown-item>
          <el-dropdown-item  @click.native="out">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </header>
</template>
<script>

export default {
  name: 'Header',
  data() {
    return {
      author: require('../assets/img/user.png'),
    }
  },
  methods: {
    clickTeb() {
      this.$store.commit('CollapseMenu')
    },
    out() {
       this.$store.commit('clearMenu')
      this.$store.commit('clearToken')
      this.$router.push({name:'login'})
     
    }
  },
   computed: {
     tebList(){
       return this.$store.state.teb.tebList
     }

   }
    
      
        
      
      // // ...mapState({
      // //   teb: state => state.teb.tabsList
      // })
      // ...mapState({ teb: 'tabsList' })
    ,
    
  
}
</script>
<style lang="scss" scoped>
.header {
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .left {
    width: 120px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .el-button {
      margin-left: 20px;
    }
    .text {
      color: #fff;
     

    }
    .el-breadcrumb{
      display: flex;
      align-items:center;
      height: 30px;
      line-height: 30px;
    
    /deep/ .el-breadcrumb__inner,.el-breadcrumb__separator{
       color: #fff;
     };
     /deep/ .el-breadcrumb__inner:hover{
       color: blue;
     
    }
    }
  }

  .right {
    width: 40px;
    height: 40px;
    margin-right: 20px;
    .author {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      margin: 0 auto;
    }
  }
}
</style>
