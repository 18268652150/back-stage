<template>
    <el-menu default-active="1-4-1"
     class="el-menu-vertical-demo"
     background-color="#333"
     text-color="#fff"
     active-text-color="#ffd04b"
    
      :collapse="isCollapse">
     <h3 class="text">{{isCollapse?"后台":"通用后台系统"}}</h3> 
  <el-menu-item @click="clickMenu(item)" v-for="item in noChildren " :index="item.path" :key="item.path">
    <i :class="'el-icon-'+item.icon"></i>
    <span slot="title">{{item.label}}</span>
  </el-menu-item>
  <el-submenu  v-for="item in isChildren" :index="item.name" :key="item.name">
    <template slot="title">
      <i :class="'el-icon-'+item.icon"></i>
      <span slot="title">{{item.label}}</span>
    </template>
    <el-menu-item-group>
      <el-menu-item @click="clickMenu(sun)" v-for="sun in item.children" :index="sun.path" :key="sun.path">
        {{sun.label}}
        </el-menu-item>
    </el-menu-item-group>  
  </el-submenu>
 
</el-menu>
</template>
<script>
  export default {
    name:"Aside",
    data() {
      return {
        
        
        menu: [
            {
                path: '/',
                name: 'home',
                label: '首页',
                icon: 's-home',
                url: 'Home/Home'
            },
            {
                path: '/mall',
                name: 'mall',
                label: '商品管理',
                icon: 'video-play',
                url: 'MallManage/MallManage'
            },
            {
                path: '/user',
                name: 'user',
                label: '用户管理',
                icon: 'user',
                url: 'UserManage/UserManage'
            },
            {
                label: '门禁',
                icon: 'location',
                name:'other',
                children: [
                     {
                        path: '/pageOne',
                        name: 'pageOne',
                        label: '公司门禁管理',
                        icon: 'setting',
                        url: 'Other/PageOne'
                     },
                     {
                        path: '/pageTwo',
                        name: 'pageTwo',
                        label: '部门公司门禁管理',
                        icon: 'setting',
                        url: 'Other/PageTwo'
                     },
                     {
                        path: '/pageThree',
                        name: 'pageThree',
                        label: '人员门禁管理',
                        icon: 'setting',
                        url: 'Other/pageThree'
                     },
                     {
                        path: '/pageFour',
                        name: 'pageFour',
                        label: '公司车辆管理',
                        icon: 'setting',
                        url: 'Other/pageFour'
                     },{
                        path: '/pageFive',
                        name: 'pageFive',
                        label: '人员车位管理',
                        icon: 'setting',
                        url: 'Other/pageFive'
                     }
                ]
            }
        ]
      };
    },
    methods: {
      
      clickMenu(item){
        this.$router.push({name:item.name}),
        this.$store.commit('selectMenu',item)
       
      }
    },
    computed: {
        noChildren() {
            return this.menu.filter(item => !item.children)            
        },
        isChildren() {
         
            return this.menu.filter(item => item.children)            
        },
        isCollapse() {
            return this.$store.state.teb.isCollapse
        },
        //  menu() {
        //     return this.$store.state.teb.menu
        // }
    }
  }
</script>
<style lang="scss" scoped>
  .el-menu{
    height: 100%;
    text-align: left;
    border: none;
    .text{
      height: 30px;
      line-height: 30px;
      text-align: center ;
    }
  }
   .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
  
</style>
