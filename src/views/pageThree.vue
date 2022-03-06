
<template>
    <div>
        <div>
        <el-form :inline="true" :model="fromData" >
 
  <el-form-item label="公司名称">
    <el-select clearable v-model="fromData.companyId" placeholder="请选择" @visible-change="getCompanyId">
      <el-option :label="item.companyName" :value="item.siteId" v-for="item in companyList" :key="item.id"></el-option>
      
    </el-select>
  </el-form-item>
   <el-form-item label="部门名称">
    <el-input v-model="fromData.deptName" placeholder="请输入"></el-input>
  </el-form-item>
    <el-form-item label="人员名称">
    <el-input v-model="fromData.personName" placeholder="请输入"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="onSubmit">提交</el-button>
  </el-form-item>
</el-form>
</div>
<div>
    <el-table
    
    :data="tableData"
    tooltip-effect="dark"
    style="width: 100%"
    @selection-change="handleSelectionChange">
    <el-table-column
      type="selection"
      width="55">
    </el-table-column>
     <el-table-column
      prop="personName"
      label="人员名称"
      >
    </el-table-column>
     <el-table-column
      prop="job"
      label="人员职称"
      >
    </el-table-column>
    <el-table-column
    prop="companyName"
      label="所属公司"
      >
      
    </el-table-column>
    <el-table-column
      prop="deptName"
      label="部门名称"
      >
    </el-table-column>
    <el-table-column
      prop="statusLabel"
      label="同步状态">
    </el-table-column>
 <el-table-column label="操作">
      <template slot-scope="scope">
          <el-popconfirm
  title="确定是否需要同步"
>
        <el-button
        type="text"
          size="mini"
          @click="clickLong(scope.row)" slot="reference">同步</el-button>
          </el-popconfirm>
        <el-button
          size="mini"
          type="text"
          @click="clickDept(scope.row)">详情</el-button>
      </template>
    </el-table-column>
  </el-table>
</div>
<div class="block" style="">
      <el-pagination
        @size-change="onSubmit"
        @current-change="onSubmit"
        :page-sizes="[3, 10, 20, 30, 40]"
        :current-page.sync="pageQuery.pageNum"
        :page-size.sync="pageQuery.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        style="text-align: center;"
      >
      </el-pagination>
    </div>
    <div>
      <el-dialog title="门禁配置" :visible.sync="dialogFormVisible"  top="50px"  width="800px" >
        <el-container style="text-align:center">
          
             <el-scrollbar style="height:500px">
               <h3>部门名称：</h3>
               <h4>{{from.deptName}}</h4>
               <h2>区域选择</h2>
            <el-tree
              :data="treeData"
              
              @node-click="clickTree"
              style="width:150px"
            ></el-tree>
            
             </el-scrollbar>
          
          <div style="width:100%;height:50px;">
            <el-form
              :inline="true"
            >
              <el-input
                v-model="query.entranceName"
                placeholder="请输入"
                style="width:50%"
              ></el-input>

              <el-form-item style="margin-left:30px">
                <el-button type="primary" @click="searchButton">搜索</el-button>
                <el-button type="primary" @click="clickAll">全选</el-button>
              </el-form-item>
            </el-form>
            
<div>
              <span  v-for="(item,index) in entrance" :key="index" class="entrance" @click="clickEntrance(item)" :style="{backgroundColor: item.status==1?'#66b1ff6b':'#fff'}">{{item.entranceName}}</span>
           </div>
            </div>
         <el-button round class="close" @click="close">关闭</el-button>
        </el-container>
      </el-dialog>
    </div>
    </div>
</template>
<script>
import {getPersonGateList,getFirm,getTree,getCompanyEntranceList,postCompanyEntranceChoice} from "../api/data"
export default {
    data(){

        return{
 
            entrance:"",
            query:{
                entranceName:""
            },
            treeData:[],
            from:"",
            dialogFormVisible:false,
            fromData:{
                companyId:"",
                deptName:"",
                personName:""
            },
            companyList:"",
            tableData:[],
            pageQuery:{
                pageNum:0,
                pageSize:0
            },
            total:0
        }
    },
    mounted(){
        getTree().then((res) => {
      this.treeData = res.rows
    
    })
this.onSubmit()
    },
    methods:{
            close(){
this.dialogFormVisible = false
    },
            clickEntrance(item){
     if(item.status==1){
 
       item.status = 0
     }else if(item.status==0){
     
        item.status = 1
     }
     this.$message({
          message: '操作成功！',
          type: 'success'
        });

postCompanyEntranceChoice(item).then(()=>{
  
})
    },
            clickAll(){
this.entrance.forEach(item=>{
item.status = 1
})
    },
    searchButton(){
      getCompanyEntranceList(this.query).then((res) => {
        this.entrance= res.rows
      })
    },
        clickTree(node) {
      
      // let query = {
      //   regionId: node.value,
      //   companyId: this.from.id,
      //   entranceName:this.search
      // }
      this.query.regionId = node.value
      this.query.companyId = this.from.id

      getCompanyEntranceList(this.query).then((res) => {
        this.entrance= res.rows
        console.log(this.query);
      //  console.log(this.entrance);
      })
    },
        getCompanyId(){
                getFirm().then(res=>{
                    this.companyList = res.rows
                    console.log(this.companyList);
                })
        },
        onSubmit(){
            getPersonGateList(this.pageQuery,this.fromData).then(res=>{
                this.total = res.total
                this.tableData = res.rows
                console.log(this.tableData);
            })
        },
        clickLong(){

        },
        clickDept(row){
            this.dialogFormVisible=true
            this.from = row
        },
        handleSelectionChange(){

        }
    }

}
</script>
<style lang="scss" scoped>


/deep/.entrance{
  border:cadetblue solid 1px;
  border-radius: 5px;
  display:inline-block;
  width: 60px;
  height: 30px;
  line-height: 30px;
  // width: 50px;
  // height: 30px;
  margin: 10px;
  // padding: 10px;
}
.close{
    position:absolute;
    bottom:20px;
    right:20px
  }
</style>