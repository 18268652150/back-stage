<template>
  <div>
    <div>
        {{dialogForm.crossDept}}
      <el-form :inline="true" :model="formInline">
        <el-form-item label="公司">
          <el-select v-model="formInline.companyId" placeholder="请选择">
            <el-option
              :label="item.companyName"
              :value="item.id"
              v-for="item in companyList"
              :key="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="部门">
          <el-select v-model="formInline.depIds" placeholder="请选择">
            <el-option
              :label="item.name"
              :value="item.id"
              v-for="item in deptList"
              :key="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button size="small" @click="onSubmit">提交</el-button>
        </el-form-item>
      </el-form>
      <div class="add" style="display: flex; justify-content: end">
        <el-button size="small" @click="onAdd">增加</el-button>
      </div>
    </div>
    <div>
      <!-- 表格   -->
      <el-table
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="clickSelect"
      >
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column label="公司名称">
          <template slot-scope="scope">{{
            companyName(scope.row.companyId)
          }}</template>
        </el-table-column>
        <el-table-column label="部门名称">
          <template slot-scope="scope">{{
            deptName(scope.row.depIds)
          }}</template>
        </el-table-column>
        <el-table-column label="流程名称">
          <template slot-scope="scope">{{
            levelName(scope.row.level)
          }}</template>
        </el-table-column>
        <el-table-column
          prop="auditUserNames"
          label="审批领导"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button @click="onCheck(scope.row)" type="text" size="small"
              >查看</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 分页 -->
    <div style="display: flex; justify-content: center">
      <el-pagination
        size="small"
        @size-change="onSubmit"
        @current-change="onSubmit"
        :current-page="listInfo.pageNum"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="listInfo.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </div>
    <!-- 对话框 -->
    <div>
      <el-dialog
        :title="dialogName == 'add' ? '增加流程' : '查看流程'"
        :visible.sync="dialogVisible"
        width="500px"
        :before-close="clickFalse"
      >
        <el-form ref="dialogForm" :model="dialogForm" label-width="200px">
          <el-form-item label="公司">
            <el-select
              v-model="dialogForm.companyId"
              placeholder="请选择公司"
              @change="dialogChangeDept"
            >
              <el-option
                :label="item.companyName"
                :value="item.id"
                v-for="item in dialogCompanyList"
                :key="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="部门">
            <el-select
              v-model="dialogForm.depIds"
              placeholder="请选择部门"
              @change="dialogChangeUsers"
            >
              <el-option
                :label="item.name"
                :value="item.id"
                v-for="item in dialogDeptList"
                :key="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="流程">
            <el-select
              v-model="dialogForm.level"
              clearable
              placeholder="请选择流程"
            >
              <el-option
                :label="item.label"
                :value="item.value"
                v-for="item in dialogLevelList"
                :key="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <div class="oneLevel" v-if="dialogForm.level !== 0">
            <el-form-item label="是否跨部门审批">
              <el-radio-group v-model="dialogForm.crossDept" @change="change">
                <el-radio :label="1">是</el-radio>
                <el-radio :label="0">否</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="跨部门审批领导" v-if="dialogForm.crossDept">
              <el-cascader
                v-model="dialogForm.otherUserIds"
                placeholder="请选择跨部门审批领导"
                :options="dialogTreeUserList"
                :props="dialogProps"
                clearable
                :show-all-levels="false"
                collapse-tags
              ></el-cascader>
            </el-form-item>
            <el-form-item label="审批领导" v-if="!dialogForm.crossDept">
              <el-select
                placeholder="请选择审批领导"
                v-model="dialogForm.userIds"
                clearable
                multiple
                collapse-tags
              >
                <el-option
                  :label="item.name"
                  :value="item.id"
                  v-for="item in dialogUserList"
                  :key="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </div>
          <div class="twoLevel" v-if="dialogForm.level == 2">
            <el-form-item label="是否跨部门审批">
              <el-radio-group v-model="dialogForm.isCrossDept" @change="change">
                <el-radio :label="1">是</el-radio>
                <el-radio :label="0">否</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="跨部门审批领导" v-if="dialogForm.isCrossDept">
              <el-cascader
                v-model="dialogForm.isOtherUserIds"
                placeholder="请选择跨部门审批领导"
                :options="dialogTreeUserList"
                :props="dialogProps"
                clearable
                :show-all-levels="false"
                collapse-tags
              ></el-cascader>
            </el-form-item>
            <el-form-item label="审批领导" v-if="!dialogForm.isCrossDept">
              <el-select
                placeholder="请选择审批领导"
                v-model="dialogForm.IsUserIds"
                clearable
                multiple
                collapse-tags
              >
                <el-option
                  :label="item.name"
                  :value="item.id"
                  v-for="item in dialogUserList"
                  :key="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </div>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="clickFalse">取 消</el-button>
          <el-button type="primary" @click="processAdd">提 交</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import {
  postCompanyAllList,
  getAllDeptList,
  getAllUserList,
  getAuditList,
  getTreeDeptUserList,
  postProcessAdd,
  putProcessAdd,
  getProcessInfo,
} from '../api/data'
export default {
  data() {
    return {
      formInline: {
        companyId: '',
        depIds: '',
      },
      listInfo: {
        pageNum: 1,
        pageSize: 10,
      },
      total: 0,
      companyList: [],
      deptList: [],
      tableData: [],
      //   弹窗data

      dialogName: '',
      dialogVisible: false,
      dialogCompanyList: [],
      dialogDeptList: [],
      dialogTreeUserList: [],
      dialogUserList: [],
      dialogProps: {
        multiple: true,
      },

      dialogForm: {
        companyId: '',
        depIds: '',
        level: 1,
        id: null,
        auditUsers:[

        ],
        crossDept: 0,
        otherUserIds: [],
        userIds: [],
        isCrossDept: 0,
        isOtherUserIds: [],
        IsUserIds: [],
      },
      dialogLevelList: [
        {
          value: 0,
          label: '无需审批',
        },
        {
          value: 1,
          label: '二级审批',
        },
        {
          value: 2,
          label: '三级审批',
        },
      ],
    }
  },
  mounted() {
    postCompanyAllList().then((res) => {
      this.companyList = res.rows
      this.dialogCompanyList = res.rows
    }),
      getAllDeptList().then((res) => {
        this.deptList = res.data
        this.dialogDeptList = res.data
      }),
      this.onSubmit()
  },
  methods: {
    change() {
      console.log('我是帅哥')
    },
    companyName(id) {
      let result = '未知公司'
      this.companyList.forEach((item) => {
        if (item.id == id) {
          result = item.companyName
        }
      })
      return result
    },

    deptName(id) {
      let result = '未知部门'
      this.deptList.forEach((item) => {
        if (item.id == id) {
          result = item.name
        }
      })
      return result
    },
    levelName(id) {
      let result = ''
      this.dialogLevelList.forEach((item) => {
        if (item.value == id) {
          result = item.label
        }
      })
      return result
    },
    onSubmit() {
      let listInfo = this.listInfo

      ;(listInfo.companyId = this.formInline.companyId),
        (listInfo.depIds = this.formInline.depIds)

      getAuditList(listInfo).then((res) => {
        this.tableData = res.rows
        this.total = res.total
      })
    },
    onAdd() {
      this.dialogName = 'add'
      this.dialogVisible = true
    },
    // userIdToName(id){
    //     getAllUserList().then((as) => {
    //     as.data.forEach(item=>{
    //               if(item.id==id){
    //                   return item.name
    //               }

    //           })

    //   })

    //       },
    arrString(as) {
      let arr = []
      as.forEach((item) => {
        arr.push(Number(item))
      })
      return arr
    },
    onCheck(row) {
      this.dialogName = 'check'
      this.dialogVisible = true
      //   this.dialogForm.id = row.id
      //   this.dialogForm.companyId = row.companyId

      //   this.dialogForm = { ...row }
      //   this.dialogForm.depIds = this.deptName(Number(this.dialogForm.depIds))
      getProcessInfo({ id: row.id }).then((res) => {
        this.dialogForm = JSON.parse(JSON.stringify(res.data))
        let user = res.data.auditUsers
        this.dialogForm.depIds = this.deptName(Number(res.data.depIds))
        if (this.dialogForm.level == 1) {
          if (user[0].isCrossDept == 1) {
            this.dialogForm.crossDept = 1
            this.dialogForm.otherUserIds = this.arrString(
              user[0].userIds.split(',')
            )
          } else {
            this.dialogForm.crossDept = 0
            this.dialogForm.userIds = this.arrString(user[0].userIds.split(','))
          }
        }
        if (this.dialogForm.level == 2) {
          if (user[0].isCrossDept == 1) {
            this.dialogForm.crossDept = 1
            this.dialogForm.otherUserIds = this.arrString(
              user[0].userIds.split(',')
            )
          } else {
            this.dialogForm.crossDept = 0
            this.dialogForm.userIds = this.arrString(user[0].userIds.split(','))
          }
          if (user[1].isCrossDept == 1) {
            this.dialogForm.isCrossDept = 1
            this.dialogForm.isOtherUserIds = this.arrString(
              user[1].userIds.split(',')
            )
          } else {
            this.dialogForm.isCrossDept = 0
            this.dialogForm.IsUserIds = this.arrString(
              user[1].userIds.split(',')
            )
          }
        }

        // if (user[0].level == 1 && user[0].isCrossDept == 1) {
        //   this.dialogForm.otherUserIds = user[0].userIds,
        //     this.dialogForm.crossDept = 1
        // }
        // if (user[0].level == 1 && user[0].isCrossDept == 0) {
        //   this.dialogForm.userIds = user[0].userIds,
        //     this.dialogForm.crossDept = 0
        // }
        // if (user[1].level == 2 && user[1].isCrossDept == 1) {
        //   this.dialogForm.isOtherUserIds = user[1].userIds,
        //     this.dialogForm.isCrossDept = 1
        // }
        // if (user[1].level == 2 && user[1].isCrossDept == 0) {
        //   this.dialogForm.IsUserIds = user[1].userIds,
        //     this.dialogForm.isCrossDept = 0
        // }

        this.dialogChangeDept()
        this.dialogChangeUsers()
      })

      this.dialogForm = {
        companyId: '',
        depIds: '',
        level: 1,
        id: null,

        crossDept: 0,
        otherUserIds: [],
        userIds: [],
        isCrossDept: 0,
        isOtherUserIds: [],
        IsUserIds: [],
      }
    },

    clickSelect() {},
    dialogChangeDept() {
      getAllDeptList({ companyId: this.dialogForm.companyId }).then((res) => {
        this.dialogDeptList = res.data
      })
      getTreeDeptUserList({ companyId: this.dialogForm.companyId }).then(
        (res) => {
          this.dialogTreeUserList = res.data
        }
      )
      this.otherUserIds = []
      this.userIds = []
      this.isOtherUserIds = []
      this.IsUserIds = []
    },
    dialogChangeUsers() {
      getAllUserList().then((res) => {
        this.dialogUserList = res.data
      })
      this.otherUserIds = []
      this.userIds = []
      this.isOtherUserIds = []
      this.IsUserIds = []
    },
    processAdd() {
      this.onSubmit()
      let dialogForm = {
        companyId: this.dialogForm.companyId,
        depIds: this.dialogForm.depIds,
        level: this.dialogForm.level,
        id: this.dialogForm.id,
        auditUsers: [],
      }

      if (this.dialogForm.level !== 0) {
        if (this.dialogForm.crossDept) {
          dialogForm.auditUsers.push({
            isCrossDept: this.dialogForm.crossDept,
            userIds: this.dialogForm.otherUserIds.join(','),
            level: 1,
          })
        } else {
          dialogForm.auditUsers.push({
            isCrossDept: this.dialogForm.crossDept,
            userIds: this.dialogForm.userIds.join(','),
            level: 1,
          })
        }
      }
      if (this.dialogForm.level == 2) {
        if (this.dialogForm.isCrossDept) {
          dialogForm.auditUsers.push({
            isisCrossDept: this.dialogForm.isCrossDept,
            userIds: this.dialogForm.isOtherUserIds.join(','),
            level: 2,
          })
        } else {
          dialogForm.auditUsers.push({
            isisCrossDept: this.dialogForm.isCrossDept,
            userIds: this.dialogForm.IsUserIds.join(','),
            level: 2,
          })
        }
      }
      if (this.dialogName == 'add') {
        postProcessAdd(dialogForm).then(() => {})
      } else {
        putProcessAdd(dialogForm).then(() => {})
      }

      this.dialogVisible = false

      this.dialogForm = {
        companyId: '',
        depIds: '',
        level: 1,
        id: null,

        crossDept: 0,
        otherUserIds: [],
        userIds: [],
        isCrossDept: 0,
        isOtherUserIds: [],
        IsUserIds: [],
      }
    },
    clickFalse() {
      this.dialogVisible = false
      this.dialogForm = {
        companyId: '',
        depIds: '',
        level: 1,
        id: null,

        crossDept: 0,
        otherUserIds: [],
        userIds: [],
        isCrossDept: 0,
        isOtherUserIds: [],
        IsUserIds: [],
      }
    },
    handleCheckChange() {},
    //   弹窗方法
  },
}
</script>
<style lang="scss" scoped>
/deep/.el-dialog__wrapper{

    /deep/ .el-dialog__header {
    background-color: yellowgreen !important;
  }
.el-dialog {
  border-radius: 15px;

  
  /deep/.el-dialog__body {
    padding: 0 20px;
    /deep/.el-form-item {
      margin-bottom: 5px;
     /deep/ .el-input__inner {
        height: 30px;
        line-height: 30px;
      }
    }
  }
}
}

</style>
