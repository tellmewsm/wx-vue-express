<template>
  <div>
    <div>
      <el-form
        :inline="true"
        :model="others"
        class="demo-form-inline">
        <el-form-item label="UserName">
          <el-input
            v-model="others.search1"
            style="width:230px"
            placeholder="如：E0000000018150020121" />
        </el-form-item>
        <el-form-item label="Id">
          <el-input
            v-model="others.search"
            placeholder="如：d0d05c23-db56-446a-b0e8-3e1bbfe175f9" />
        </el-form-item>
        <el-form-item
          label="Time"
          required="required">
          <el-date-picker
            v-model="visitDate"
            type="datetimerange"
            range-separator="To"
            start-placeholder="开始日期"
            end-placeholder="结束日期"/>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="searchDevice()">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button
            type="success"
            @click="exportExcel()">导出</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div>
      <el-table
        id="devices"
        ref="filterTable"
        :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
        :header-cell-style="getRowClass"
        style="width: 100%"
        height="650"
        border
        stripe>
        <!-- 默认的暂无数据更换成图片 -->
        <template slot="empty">
          <img
            class="data-pic"
            src="#"
            alt="无数据" >
        </template>
        <!-- fixed导致excel 第一种方法导出2份 -->
        <el-table-column
          label="Time"
          width="200"
          align="center">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.ts| formatDate }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="id"
          prop="id"
          width="300"
          align="center"/>
        <el-table-column
          label="username"
          prop="username"
          width="200"
          align="center"/>
        <el-table-column
          label="Pid"
          prop="pid"
          width="150"
          align="center"/>
        <el-table-column
          label="Td"
          prop="td"
          width="150"
          align="center"/>
        <el-table-column
          label="AuthOk"
          prop="authOk"
          width="150"
          align="center"/>
        <el-table-column
          label="Ip"
          prop="IP"
          width="200"
          align="center"/>
        <el-table-column
          :filters="[{ text: 'ONLINE', value: 'ONLINE' }, { text: 'OFFLINE', value: 'OFFLINE' }]"
          :filter-method="filterTag"
          prop="evt"
          label="ON OR OFF"
          width="150"
          filter-placement="bottom-end"
          align="center">
          <template slot-scope="scope">
            <el-tag
              :type="scope.row.evt === 'ONLINE' ? 'primary' : 'success'"
              disable-transitions>{{ scope.row.evt }}</el-tag>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div
      id="page"
      class="block">
      <!-- <span class="demonstration">显示总数</span> -->
      <el-pagination
        :current-page="currentPage"
        :page-sizes="[5, 10, 20, 40,100]"
        :page-size="pagesize"
        :total="tableData.length"
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"/>
    </div>
  </div>
  <!-- <div style="margin-bottom:10px;">设下边距为10像素</div>
<div style="margin-top:10px;">设上边距为10像素</div> -->
</template>

<script>
import { formatDate } from '@/api/date.js'
import { uniqDevice } from '@/api/uniq.js'
import FileSaver from 'file-saver'
import XLSX from 'xlsx'
export default {
  name: 'Device',
  filters: {
    formatDate(time) {
      const date = new Date(time)
      return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
    }
  },
  data() {
    return {
      tableData: [],
      others: {
        search: '',
        search1: ''
      },
      visitDate: [],
      loading: '',
      currentPage: 1, //   初始页
      pagesize: 10 //   每页的数据
    }
  },
  created() {
    this.getTodayDevices()
  },
  mounted() {
    var sd = require('silly-datetime')
    this.visitDate = [sd.format(new Date().getTime() - 1000 * 60 * 60 * 2, 'YYYY-MM-DD HH:mm'), sd.format(new Date(), 'YYYY-MM-DD HH:mm')]
  },
  methods: {
    getRowClass({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 0) {
        return 'background:#FFFFFF'
      } else {
        return ''
      }
    },
    filterTag(value, row) {
      return row.evt === value
    },
    filterHandler(value, row, column) {
      const property = column['property']
      return row[property] === value
    },
    fetchDevices() {
      this.$ajax.get('http://localhost:3033/device2')
        .then((response) => {
          console.log(response.data)
          this.tableData = response.data
        })
    },
    getTodayDevices() {
      var sd = require('silly-datetime')
      var today = sd.format(new Date(), 'YYYY-MM-DD HH:mm')
      var yestoday = sd.format(new Date().getTime() - 1000 * 60 * 60 * 2, 'YYYY-MM-DD HH:mm')

      this.$ajax({
        method: 'post',
        url: 'http://localhost:3033/device',
        headers: {
          'Content-type': 'application/json'
        },
        data: {
          before: yestoday,
          after: today
        }
      }).then((response) => {
        console.log(response.data)
        this.tableData = response.data
        this.uniqdevice(this.tableData)
      })
    },
    searchDevice() {
      var sd = require('silly-datetime')
      var yestoday = sd.format(this.visitDate[0])
      var today = sd.format(this.visitDate[1])
      if (this.others.search === '' && this.others.search1 === '') {
        alert('请输入设备id或者username')
        return false
      } else {
        this.onSearch(true)
        this.$ajax({
          method: 'post',
          url: 'http://localhost:3033/deviceID',
          headers: {
            'Content-type': 'application/json'
          },
          data: {
            before: yestoday,
            after: today,
            id: this.others.search,
            username: this.others.search1
          }
        }).then((response) => {
          console.log(response.data)
          this.loading.close()
          this.tableData = response.data
          this.uniqdevice(this.tableData)
        })
      }
    },
    onSearch(turn) {
      this.loading = this.$loading({
        lock: turn,
        text: 'loading',
        // spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.8)',
        target: document.querySelector('.div1')
      })
      // setTimeout(() => {
      //   loading.close()
      // }, 10000)
    },
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
      var wb = XLSX.utils.table_to_book(document.querySelector('#devices'))

      var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'array' })
      try {
        FileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), 'Devices.xlsx')
      } catch (e) { if (typeof console !== 'undefined') console.log(e, wbout) }

      return wbout
    },
    uniqdevice(table) {
      this.tableData = uniqDevice(table, function(item) {
        return item.ts + item.id + item.username + item.pid + item.td + item.authOk + item.ip + item.evt
      })
      console.log(this.tableData)
    }

  }
}
</script>

<style  scoped>
.el-input {
  width: 330px;
}
#page {
  margin-top: 20px;
}
</style>
