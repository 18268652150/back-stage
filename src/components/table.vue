<template>
<div>
  <el-table
    :data="table"
    stripe
    border
    height="600"
    style="width: 90%; margin: 0 auto"
  >
    <el-table-column fixed prop="birth" label="入职日期" width="150" >
    </el-table-column>
    <el-table-column prop="name" label="姓名" width="150"> </el-table-column>
    <el-table-column prop="age" label="年龄" width="150"> </el-table-column>
    <el-table-column prop="six" label="性别" width="150"> </el-table-column>
    <el-table-column prop="addr" label="地址" width="600"> </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button
        >
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-pagination
  class="page"
  layout="prev, pager, next"
  :total="tableListTotal"
  :page-size="10"
  :pager-count="11"
  @current-change="changePage">
</el-pagination>
 
</div>  
</template>

<script>
export default {
  props: {
    table: Array,
    tableListTotal:Number
  },
  methods: {
    handleEdit(row) {
      this.$emit('edit',row)
    },
    handleDelete(row) {
      this.$emit('delete',row)
    },
    changePage(page) {
      this.$emit('changePage',page)
    },
  },
  data() {
    return {}
  },
}
</script>
<style lang="scss" scoped>
.pager{
    position: fixed;
    bottom: 50px;
    right: 50px;
}
    
    </style>
