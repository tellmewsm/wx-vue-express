<template>
  <div >
    <div align="left">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="用户名" required="required">
          <el-input v-model="formInline.user" placeholder="输入用户名"/>
        </el-form-item>
        <el-form-item label="密码" required="required">
          <el-input v-model="formInline.password" placeholder="输入密码"/>
        </el-form-item>
        <el-form-item label="告警条件" required="required">
          <el-select v-model="formInline.controller" placeholder="请选择告警条件">
            <el-option label="onError" value="onError"/>
          </el-select>
        </el-form-item>
        <el-form-item label="告警收件人" required="required">
          <el-input v-model="formInline.receiver" placeholder="可以同时发送多个,逗号隔开"/>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="searchDevice(formInline.user,formInline.password,formInline.controller,formInline.receiver)">开启监控</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="closeDevice(formInline.user,formInline.password)">关闭监控</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table :data="mydevices" style="width: 100%">
      <el-table-column label="设备序列号" width="330">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.did }}</span>
        </template>
      </el-table-column>
      <el-table-column label="设备name" width="330">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="设备mid" width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.class }}</span>
        </template>
      </el-table-column>
      <el-table-column label="设备resource" width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.resource }}</span>
        </template>
      </el-table-column>
      <el-table-column label="状态" width="180">
        <template slot-scope="scope">
          <el-button v-if="show" :loading="true" type="danger" plain @click="handleDelete(scope.$index, scope.row)">监控中</el-button>
          <el-button v-if="show1" type="success" plain @click="handleDelete(scope.$index, scope.row)">监控已关闭</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作设备">
        <template slot-scope="scope">
          <el-input-number v-model="num" :min="1" :max="10" controls-position="right" @change="handleChange"/>
          <el-button circle type="warning" icon="el-icon-position" @click="handleDelete(scope.$index, scope.row)">清扫</el-button>
          <el-button circle type="warning" icon="el-icon-switch-buttonh" @click="handleDelete(scope.$index, scope.row)">暂停</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
var rp = require('request-promise')
const axios = require('axios')

export default {
  name: 'Device',
  data() {
    return {
      formInline: {
        user: 'xxxxxxxx',
        password: 'xxxxxxxx',
        controller: 'onError',
        receiver: 'xxxxxx@qq.com'
      },
      mydevices: [],
      show: true,
      show1: false,
      num: 1
    }
  },
  methods: {
    handleChange(value) {
      console.log(value)
    },
    searchDevice(user, password, controller, receiver) {
      var self = this
      if (user === '' || password === '' || controller === '' || receiver === '') {
        alert('请填写完整')
        return false
      } else {
        axios.post('http://localhost:3000/playDevices', {
          'username': user,
          'password': password,
          'controller': controller,
          'receiver': receiver
        })
          .then(function(response) {
            console.log(response.data.mydevice)
            self.show1 = false
            self.show = true
            self.mydevices = response.data.mydevice
            alert('开始监控～～～')
          })
          .catch(function(error) {
            console.log(error)
          })
      }
    },
    searchDevice1(user, password) {
      axios.post('http://localhost:3000/playDevices', {
        'username': user,
        'password': password
      })
        .then((response) => {
          console.log(response.data.mydevice)
          this.mydevices = response.data.mydevice
        })
        .catch(function(error) {
          console.log(error)
        })
    },
    searchDevice2(user, password) {
      rp({
        method: 'POST',
        uri: 'http://localhost:3000/playDevices',
        body: {
          'username': user,
          'password': password
        },
        json: true
      })
        .then((loginBody) => {
          console.log(loginBody.mydevice)
          this.mydevices = loginBody.mydevice
        })
    },
    closeDevice() {
      axios.get('http://localhost:3000/closeDevices')
        .then((response) => {
          console.log('close mqtt client')
          this.show = false
          this.show1 = true
        })
        .catch(function(error) {
          console.log(error)
        })
    },
    handleDelete(index, row) {
      console.log(index, row)
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
