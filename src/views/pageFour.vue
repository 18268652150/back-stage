<template>
  <div>
   
    <div>
      <el-form :inline="true" :model="from" class="demo-form-inline">
        <el-form-item label="公司名称">
          <el-select v-model="from.companyId" placeholder="请选择" @change="changeCompany" class="input">
            <el-option
              :label="item.companyName"
              :value="item.id"
              v-for="item in companyList"
              :key="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="部门名称">
          <el-select v-model="from.deptId" placeholder="请选择" class="input">
            <el-option
              :label="item.name"
              :value="item.id"
              v-for="item in deptList"
              :key="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button @click="onSubmit">提交</el-button>
        </el-form-item>
      </el-form>
      <div class="addLIne">
        <el-button type="primary" plain @click="add">增加</el-button>
      </div>
    </div>
    <div>
      <el-dialog
        :title="dialogName === 'add' ? '新增被访配置' : '被访配置编辑'"
        :visible.sync="onDialog"
        width="500px"
      >
        <el-form :model="onFrom" :ref="onFrom" label-width="50%" :rules="rules" >
          <el-form-item label="公司名称" prop="props">
            <el-select
              placeholder="请选择"
              v-model="onFrom.companyId"
              @change="dialogChangeCompany"
              class="input"
            >
              <el-option
                :label="item.companyName"
                :value="item.id"
                v-for="item in companyList"
                :key="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="部门名称" prop="props">
            <el-select
              placeholder="请选择"
              v-model="onFrom.deptId"
              @change="changeDept"
              class="input"
            >
              <el-option
                :label="item.name"
                :value="item.id"
                v-for="item in dialogDeptList"
                :key="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="是否启用人脸" prop="props">
            <el-radio-group v-model="onFrom.faceFlag">
              <el-radio :label="1">是</el-radio>
              <el-radio :label="0">否</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="是否二维码入园" prop="props">
            <el-radio-group v-model="onFrom.qrcodeFlag">
              <el-radio :label="1">是</el-radio>
              <el-radio :label="0">否</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="是否开启预约须知" prop="props">
            <el-radio-group v-model="onFrom.statementFlag">
              <el-radio :label="1">是</el-radio>
              <el-radio :label="0">否</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="是否公司可被预约" prop="props">
            <el-radio-group v-model="onFrom.companyFlag">
              <el-radio :label="1">是</el-radio>
              <el-radio :label="0">否</el-radio>
            </el-radio-group>
          </el-form-item>
          <div v-show="onFrom.companyFlag">
            <el-form-item label="是否部门可被预约" prop="props">
              <el-radio-group v-model="onFrom.deptFlag">
                <el-radio :label="1">是</el-radio>
                <el-radio :label="0">否</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="选择可被预约人员" prop="props">
              <el-select :multiple="true" placeholder="请选择" v-model="onFrom.userIds" size="small">
                <el-option
                  :label="item.name"
                  :value="item.id"
                  v-for="item in dialogUserList"
                  :key="item.id"
                ></el-option>
              </el-select>
          </el-form-item>
          </div>
            
            <el-form-item style="display:flex;justify-content:flex-end">
              <el-button round  @click="cancel" size="small">取消</el-button>
              <el-button round type="primary" @click="sure" size="small">确定</el-button>
            </el-form-item>
        </el-form>
      </el-dialog>
    </div>
    <div>
      <el-table
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column label="公司">
          <template slot-scope="scope">
            <!-- {{scope.row.companyId==1?'是':'否'}} -->
            {{ getCompanyNameById(scope.row.companyId) }}
          </template>
        </el-table-column>
        <el-table-column label="部门">
          <template slot-scope="scope">
            <!-- {{scope.row.companyId==1?'是':'否'}} -->
            {{ getDeptNameById(scope.row.deptId) }}
          </template>
        </el-table-column>
        <el-table-column label="是否启用人脸">
          <template slot-scope="scope">
            {{ scope.row.faceFlag == 1 ? '是' : '否' }}
          </template>
        </el-table-column>

        <el-table-column label="是否二维码进园">
          <template slot-scope="scope">
            {{ scope.row.qrcodeFlag == 1 ? '是' : '否' }}
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button @click="edit(scope.row)" type="text" size="small"
              >详情</el-button
            >
            <el-button @click="del(scope.$index, tableData)" type="text" size="small"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 分页 -->
    <el-pagination
    small
      @size-change="onSubmit"
      @current-change="onSubmit"
      :current-page.sync="from.pageNum"
      :page-size.sync="from.pageSize"
      :page-sizes="[2, 4, 6, 8]"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>
  </div>
</template>
<script>
import {
  getAllDeptList,
  postCompanyAllList,
  getVisitList,
  getAllUserList,
  postVisitAdd,
  postVisitEdit
} from '../api/data'
export default {
  data() {
    return {
       rules: {
          props: [
            { required: true, message: '存在必填选项未填选！' }  
          ]
          },
      dialogName: '',
      onDialog: false,
     
      total: 0,
      companyList: [],
      deptList: [],
      dialogDeptList: [],
      dialogUserList:[],
      tableData: [],
      onFrom: {
        companyId: null,
        deptId: null,
        faceFlag: null,
        qrcodeFlag: null,
        statementFlag: null,
        companyFlag: null,
        deptFlag: null,
        userIds: null,
      },
      from: {
        companyId: '',
        deptId: '',
        
      },
      page:{

pageNum: 1,
        pageSize: 2,
      }
    }
  },
  mounted() {
    this.onSubmit()
    this.changeCompany()
    
    postCompanyAllList().then((res) => {
      this.companyList = res.rows
     
    })
  },
  methods: {
    del(index,rows){
       rows.splice(index, 1);
    },
    // dialog里的方法
    cancel(){
      this.onDialog=false
      if(this.dialogName ==='add'){
        this.onFrom = {}
      }

    },
    sure(){
     this.onFrom.userIds= this.onFrom.userIds.join("")
     if(this.dialogName==="add"){
         postVisitAdd(this.onFrom).then(()=>{
        
      })
     }else{
       postVisitEdit(this.onFrom).then(()=>{
         
       })
     }
     
    },
    changeDept() {
      let user = {
        companyId : this.onFrom.companyId,
      deptId :this.onFrom.deptId
      }
      
      getAllUserList(user).then(res => {
        this.dialogUserList = res.data
       
      })
    },

    changeCompany() {
      let dept= {
        companyId : this.from.companyId,
      }
      getAllDeptList(dept).then(res => {
        this.deptList = res.data
      
      })
    },
    dialogChangeCompany() {
      let dialogDept = {
  companyId : this.onFrom.companyId,
      
      }
      getAllDeptList(dialogDept).then(res => {
        this.dialogDeptList = res.data
      
      })
    },
   
    getDeptNameById(id) {
      let result = '未知部门'
      this.deptList.forEach((item) => {
        if (item.id == id) {
          result = item.name
        }
      })
      return result
    },
    //根据公司id获取公司名称
    getCompanyNameById(id) {
      let result = '未知公司'
      this.companyList.forEach((item) => {
        if (item.id == id) {
          result = item.companyName
        }
      })
      return result
    },
    edit(rows) {
      this.onDialog = true
      this.dialogName = 'edit'
     
      this.onFrom ={ ...rows }
      this.onFrom.userIds = this.strToArr(this.onFrom.userIds)
      this.changeDept()
      // this.onFrom.userIds = this.companyList.forEach((item) => {
      //   if (item.id == this.onFrom.userIds) {
      //     return item.companyName
      //   }
      // })

    },
    
    strToArr(str){
      let result = []
      let arr = str.split(',')
      arr.forEach(item=>{
        result.push(Number(item))
      })
      return result
    },
    add() {
      this.onDialog = true
      this.dialogName = 'add'
      this.onFrom = {}
      this.dialogChangeCompany()
    },
    onSubmit() {
      let query = {...this.page}
      query.companyId = this.from.companyId
      query.deptId = this.from.deptId
      getVisitList(query).then(res => {
        this.tableData = res.rows
        console.log( this.tableData);
        this.total = res.total
         this.$message({
          showClose: true,
          message: '获取用户信息成功！',
          type: 'success'
        });
        
      })
    },
    handleSelectionChange() {},
    handleClick() {},
  },
}
</script>
<style lang="scss" scoped>
.addLIne {
  display: flex;
  justify-content: end;
}
/deep/.el-dialog{
  border-radius: 15px;
}
  /deep/.el-dialog__header{
    background: linear-gradient(to right,#37D7FF,#0096FF,#132CAB);
    border-radius: 15px 15px 0 0;
  }
   /deep/.el-dialog__body{
    padding:10px;
 

  }
  /deep/.el-form-item {
    margin-bottom: 10px;
    height: 30px;
    line-height: 30px;
  }
  /deep/.input{
    width: 160px;
    height: 35px;
  }
/deep/.el-button {
  padding: 10px 18px;
}
.el-pagination{
  display: flex;
  justify-content: center;
}
</style>
