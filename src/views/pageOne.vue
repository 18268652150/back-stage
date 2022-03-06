<template>
  <div>
    <div>
      <el-form
        :inline="true"
        :model="firm"
        class="firm-inquire"
        style="text-align: left; margin-top: 30px"
      >
        <el-form-item label="公司名称">
          <el-input
            placeholder="请输入公司名称"
            v-model="pageQuery.companyName"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleCurrentChange"
            >查询</el-button
          >
        </el-form-item>
      </el-form>
    </div>
    <div>
      <el-table
        ref="firmList"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        highlight-current-row
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" align="center"> </el-table-column>
        <el-table-column prop="companyName" label="公司" align="center">
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button type="text" size="mini" @click="handleEdit(scope.row)"
              >编辑</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div>
      <el-dialog title="门禁配置" :visible.sync="dialogFormVisible"  top="50px"  width="800px" >
        <el-container>
          
             <el-scrollbar style="height:500px;">
               <h3>公司名称：{{from.companyName}}</h3>
               <h2>区域选择</h2>
            <el-tree
              :data="treeData"
              :props="treeProps"
              @node-click="clickTree"
              style="width:150px"
            ></el-tree>
            
             </el-scrollbar>
          
          <div style="width:100%;height:100px;">
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
              <span v-for="(item,index) in entrance" :key="index" class="entrance" @click="clickEntrance(item)" :style="{backgroundColor: item.status==1?'#66b1ff6b':'#fff'}">{{item.entranceName}}</span>
           </div>
            </div>
         <el-button round class="close" @click="close">关闭</el-button>
        </el-container>
      </el-dialog>
    </div>
    <div class="block" style="position: fixed; bottom: 50px; right: 50px">
      <el-pagination
        @size-change="handleCurrentChange"
        @current-change="handleCurrentChange"
        :page-sizes="[3, 10, 20, 30, 40]"
        :current-page.sync="pageQuery.pageNum"
        :page-size.sync="pageQuery.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </div>
  </div>
</template>
<script>
import { getFirm, getTree, getCompanyEntranceList,postCompanyEntranceChoice } from '../api/data'
export default {
  data() {
    return {
      entrance:[],
    color:"",
     from:{},
      treeData: [],
      treeProps: {
        children: 'children',
        label: 'label',
      },
      dialogFormVisible: false,
      total: 0,
      firm: {
        name: '',
      },
      query:{
        entranceName:undefined
      },


      tableData: [],
      multipleSelection: [],
      pageQuery: {
        pageSize: 10,
        pageNum: 1,
        companyName: '',
      },
      
    }
  },

  mounted() {
    getTree().then((res) => {
      this.treeData = res.rows
    
    })
    this.handleCurrentChange()
  },

  methods: {
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


    handleEdit(row) {
      this.dialogFormVisible = true
      this.from = row
    },
    close(){
this.dialogFormVisible = false
    },

    handleSelectionChange(val) {
      this.multipleSelection = val
    },

    handleCurrentChange() {
      getFirm(this.pageQuery).then((res) => {
        this.total = res.total
        this.tableData = res.rows
        // [{
        //   id: 1,
        //   name: '111',
        // },{
        //   id: 2,
        //   name: '222',
        // },{
        //   id: 3,
        //   name: '333',
        // }]
        
      })
    },
  },
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

.el-dialog{
  .el-container{
    text-align: center;
  }
  position: relative;
  .close{
    position:absolute;
    bottom:20px;
    right:20px
  }
 border-radius: 50px;
/deep/.el-dialog__header{

  display: flex;
  align-items: left;
  justify-content: flex-start;

  background-color: darkblue;
  // text-align: left;
  .el-dialog__title {
    text-align: left;
  }
}
.el-dialog__body{
.el-scrollbar__wrap {
    overflow: scroll;
    height: 100%;
    overflow-x: hidden;
    
}   
}
}
  </style>
