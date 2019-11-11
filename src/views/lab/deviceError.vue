<template>
  <div >
    <div>
      <!-- <height="700"> -->
      <!-- :data="tableData3" -->
      <el-table
        :data="tableData3.slice((currentPage-1)*pagesize,currentPage*pagesize)"
        style="width: 100%"
        height="700"
      ><el-table-column
        fixed
        prop="MTime"
        label="日期"
        width="200"/>
        <el-table-column
          prop="Mobile"
          label="账号"
          width="150"/>
        <el-table-column
          prop="Nick"
          label="昵称"
          width="200"/>
        <el-table-column
          prop="Deebot"
          label="设备"
          width="300"/>
        <el-table-column
          prop="Message"
          label="报错信息"
          width="500"/>
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
    axios.get('http://localhost:3000/getErrorDetails')
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

.Mpage{
	width: 1280px;
	text-align: center;
}
.M-box2 {
	display:inline-block;
}
</style>
