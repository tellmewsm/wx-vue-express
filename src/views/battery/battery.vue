<template>
  <div>
    <div>
      <el-form
        :inline="true"
        class="demo-form-inline">
        <el-form-item>
          <el-button
            type="success"
            @click="exportExcel()">导出EXCEL</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div>
      <!-- fixed -->
      <el-table
        id="battery"
        :data="tableData3.slice((currentPage-1)*pagesize,currentPage*pagesize)"
        style="width: 100%"
        height="700">
        <el-table-column

          prop="MTime"
          label="日期"
          width="200"/>
        <el-table-column
          prop="Mobile"
          label="账号"
          width="150"/>
        <el-table-column
          prop="DeebotName"
          label="昵称"
          width="200"/>
        <el-table-column
          prop="DeebotId"
          label="设备"
          width="300"/>
        <el-table-column
          prop="Battery"
          label="剩余属性"
          width="100"/>
        <el-table-column
          prop="IsLow"
          label="是否低电"
          width="100"/>
      </el-table>
    </div>
    <div
      id="page"
      style="margin-top:10px;text-align: center;width: 1280px;">
      <!-- <span class="demonstration">显示总数</span> -->
      <el-pagination
        :current-page="currentPage"
        :page-sizes="[5, 10, 20, 40,100]"
        :page-size="pagesize"
        :total="tableData3.length"
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"/>
    </div>
  </div>
</template>

<script>
import FileSaver from 'file-saver'
import XLSX from 'xlsx'
const axios = require('axios')
export default {
  data() {
    return {
      tableData3: [],
      currentPage: 1, //  el-pagination 初始页
      pagesize: 10 //  el-pagination 每页的数据
    }
  },
  created() {
    axios.get('http://localhost:3000/getBatteryDetails')
      .then((response) => {
        console.log(response.data)
        this.tableData3 = response.data
      })
      .catch(function(error) {
        console.log(error)
      })
  },
  methods: {
    // 初始页currentPage、初始每页数据数pagesize和数据data
    handleSizeChange: function(size) {
      this.pagesize = size
      console.log(this.pagesize) // 每页下拉显示数据
    },
    handleCurrentChange: function(currentPage) {
      this.currentPage = currentPage
      console.log(this.currentPage) // 点击第几页
    },
    exportExcel() {
      var wb = XLSX.utils.table_to_book(document.querySelector('#battery'))

      var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'array' })
      try {
        FileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), 'Battery.xlsx')
      } catch (e) { if (typeof console !== 'undefined') console.log(e, wbout) }

      return wbout
    }
  }
}
</script>
<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
