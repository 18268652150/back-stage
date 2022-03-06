<template>
  <div>
    <el-dialog :title="titleName==='add'?'增加用户':'修改用户'" 
    :visible.sync="isShow"
     width="30%">
      <com-form :form="form"
      ref="form"
      ></com-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isShow = false">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
      </span>
    </el-dialog>
    <el-form :inline="true" class="user-head"> 
      <el-form-item>
        <el-button type="primary" @click="addUser">新增</el-button>
     </el-form-item>
        <el-form-item>
          <el-select
            v-model="search"
            multiple
            filterable
            remote
            reserve-keyword
            placeholder="请输入关键词"
            
            style="margin-right:20px"
          >
          
          </el-select>
        
          <el-button type="primary" @click="isSearch">搜索</el-button>
        </el-form-item>
     
    </el-form>
    <div>
        <com-table
         :table="table"
         @edit="editUser"
         @delete="delUser"
         @changePage="getList"
          :tableListTotal="tableListTotal"
         >


        </com-table>
    </div>
  </div>

</template>
<script>
import comForm from '../components/form.vue'
import comTable from '../components/table.vue'
import {getUser} from '../api/data'
export default {
  data() {
    return {
        tableListTotal:0,
         titleName:'',
         isShow: false,
         form: {
                name: '',
                age: '',
                six: '',
                birth: '',
                addr: '' 
                },
         table: [
                
                
            
        ],
            search:[]
    }
  },
  components: {
    comForm,
    comTable
  },
  methods: {
      confirm(){
          if(this.titleName === 'edit'){
              this.$http.post('/user/edit',this.form).then(()=>{
                            this.isShow = false
                            this.getList()
                           
                           
              })
          }
        
              else{
                    this.$http.post('/user/add',this.form).then(()=>{
                            this.isShow = false
                            this.getList()
                            
              })
              }
              
              
        
          
      },
       addUser(){
          this.isShow = true
          this.titleName = 'add'
          this.form = {
          name: '',
          age: '',
          six: '',
          date: '',
          addr: ''      
         }
      },
      editUser(row){
           this.isShow = true
          this.titleName = 'edit'
          this.form = row
         
      },
      delUser(row){
         this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          const id =row.id
           this.$http.post('/user/del',{params:{id}})}).then(()=>{
             this.getList()
            //   this.$message({
            // type: 'success',
            // message: '删除成功!'
          // });
           })
         
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });

      },
      getList(){
        getUser().then(res=>{
          
          this.table = res.list
          this.tableListTotal = res.count
        })

      },
      isSearch(){

      }
  },
  created(){
    this.getList()
  }
}
</script>
<style lang="scss" scoped>
.user-head{
    margin-top: 50px;
    display: flex;
    justify-content:space-between;
    align-items:center

}
</style>
