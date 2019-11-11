<template>
  <el-table
    :data="tableData"
    style="width: 100%">
    <el-table-column
      label="监控内容"
      width="180">
      <template slot-scope="scope">
        <i class="el-icon-view"/>
        <span style="margin-left: 10px">{{ scope.row.topic }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="告警收件人"
      width="180">
      <template slot-scope="scope">
        <i class="el-icon-star-on"/>
        <span style="margin-left: 10px">{{ scope.row.reciver }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="账号"
      width="180">
      <template slot-scope="scope">
        <el-popover trigger="hover" placement="top">
          <p>账号: {{ scope.row.name }}</p>
          <p>密码: {{ scope.row.password }}</p>
          <div slot="reference" class="name-wrapper">
            <el-tag size="medium">{{ scope.row.name }}</el-tag>
          </div>
        </el-popover>
      </template>
    </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  data() {
    return {
      tableData: [{
        topic: 'onError',
        reciver: 'xxxxxx@qq.com',
        name: 'xxxxxxxx',
        password: 'xxxxxxxx'
      }]
    }
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row)
    },
    handleDelete(index, row) {
      console.log(index, row)
    }
  }
}
</script>
