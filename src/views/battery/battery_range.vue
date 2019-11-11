<template>
  <div>
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="battery_min"
        label="最小值"
        width="180"/>
      <el-table-column
        prop="battery_max"
        label="最大值"
        width="180"/>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            type="primary"
            size="mini"
            @click="handleEdit(scope.$index, scope.row);dialogFormVisible =true">编辑</el-button>
            <!-- <el-button size="mini" type="primary" @click="Test()">测试拦截器</el-button>
          <el-button size="mini" type="primary" @click="Test1()">确 定</el-button> -->
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :visible.sync="dialogFormVisible" title="阈值详情">
      <el-form :model="form">
        <el-form-item :label-width="formLabelWidth" label="阈值最小值">
          <el-input v-model="form.battery_min" auto-complete="off"/>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="阈值最大值">
          <el-input v-model="form.battery_max" auto-complete="off"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false;updateBattery(form.battery_min,form.battery_max)">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { testGet, testPost } from '@/test/testapi'
export default {
  data() {
    return {
      tableData: [],
      dialogFormVisible: false,
      formLabelWidth: '120px',
      form: {}
    }
  },
  created() {
    this.$ajax.get('http://localhost:3000/getbatteryRange')
      .then((response) => {
        console.log(response.data)
        this.tableData = response.data
      })
      .catch(function(error) {
        console.log(error)
      })
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row)
      this.form = row
    },
    updateBattery(min, max) {
      this.$ajax({
        url: 'http://localhost:3000/getSetRange',
        method: 'post',
        data: {
          'battery_min': min,
          'battery_max': max
        }
      }
      ).then((response) => {
      })
        .catch(function(error) {
          console.log(error)
        })
    },
    Test() {
      testPost('aaa', 'bbb').then((response) => {
        console.log(response.data)
      })
        .catch(function(error) {
          console.log(error)
        })
    },
    Test1() {
      testGet('userid').then((response) => {
      })
        .catch(function(error) {
          console.log(error)
        })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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

