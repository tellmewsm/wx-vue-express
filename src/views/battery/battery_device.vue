<template>
  <div>
    <div align="left">
      <el-form
        :inline="true"
        :model="formInline"
        class="demo-form-inline">
        <el-form-item
          label="选择环境"
          required="required">
          <el-select
            v-model="formInline.enviriment"
            placeholder="请选择设备环境">
            <el-option
              label="国内正式"
              value="cn" />
            <el-option
              label="国际正式"
              value="na" />
          </el-select>
        </el-form-item>
        <el-form-item
          label="用户名"
          required="required">
          <el-input
            v-model="formInline.user"
            placeholder="输入用户名" />
        </el-form-item>
        <el-form-item
          label="密码"
          required="required">
          <el-input
            v-model="formInline.password"
            placeholder="输入密码" />
        </el-form-item>
        <el-form-item
          label="告警条件"
          required="required">
          <el-select
            v-model="formInline.controller"
            placeholder="请选择告警条件">
            <el-option
              label="onError"
              value="onError" />
          </el-select>
        </el-form-item>
        <el-form-item
          label="告警收件人"
          required="required">
          <el-input
            v-model="formInline.receiver"
            placeholder="可以同时发送多个,逗号隔开" />
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="searchDevice(formInline.enviriment,formInline.user,formInline.password,formInline.controller,formInline.receiver)">查看设备</el-button>
        </el-form-item>
        <!-- <el-form-item>
          <el-button
            type="success"
            @click="searchDevice(formInline.enviriment,formInline.user,formInline.password,formInline.controller,formInline.receiver)">开启监控</el-button>
        </el-form-item> -->
        <el-form-item>
          <el-button
            type="warning"
            @click="closeDevice(formInline.user,formInline.password)">关闭监控</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table
      :data="mydevices"
      style="width: 100%">
      <el-table-column
        label="设备信息"
        width="230">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.nick }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="设备序列号"
        width="350">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.did }}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column
        label="设备name"
        width="200">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="设备mid"
        width="100">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.class }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="设备resource"
        width="120">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.resource }}</span>
        </template>
      </el-table-column> -->
      <el-table-column label="状态" width="150">
        <template slot-scope="scope">
          <el-button
            v-if="show"
            :loading="true"
            type="danger"
            plain
            @click="handleDelete(scope.$index, scope.row)">监控中</el-button>
          <el-button
            v-if="show1"
            type="success"
            plain
            @click="handleDelete(scope.$index, scope.row)">监控已关闭</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作设备">
        <template slot-scope="scope">
          <!-- <el-input-number v-model="num" :min="1" :max="20000" controls-position="right" @change="handleChange"/> -->
          <el-button
            circle
            type="primary"
            icon="el-icon-position"
            @click="handleClean(scope.$index, scope.row)">清扫</el-button>
          <el-button circle type="primary" icon="el-icon-switch-buttonh" @click="handleStop(scope.$index, scope.row)">暂停</el-button>
          <el-button circle type="warning" icon="el-icon-switch-buttonh" @click="handleCharge(scope.$index, scope.row)">回充</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
// var rp = require('request-promise')
// const axios = require('axios')
export default {
  name: 'Device',
  data() {
    return {
      formInline: {
        enviriment: 'cn',
        user: 'xxxxxxxx',
        password: 'xxxxxxxx',
        controller: 'onError',
        receiver: 'xxxxxx@qq.com'
      },
      myauthor: [],
      mydevices: [],
      num: [],
      show: true,
      show1: false
    }
  },
  created() {
    this.searchDevice(this.formInline.enviriment, this.formInline.user, this.formInline.password, this.formInline.controller, this.formInline.receiver)
  },
  methods: {
    handleChange(value) {
      console.log(value)
    },
    searchDevice(enviriment, user, password, controller, receiver) {
      console.log(this.formInline.enviriment)
      var self = this
      if (user === '' || password === '' || controller === '' || receiver === '') {
        alert('请填写完整')
        return false
      } else {
        this.$ajax.post('http://localhost:3000/batterySub', {
          'enviriment': enviriment,
          'username': user,
          'password': password,
          'controller': controller,
          'receiver': receiver
        })
          .then(function(response) {
            console.log(response.data.mydevice)
            self.mydevices = response.data.mydevice
            self.myauthor = response.data.myauthor
            self.show1 = false
            self.show = true
          })
          .catch(function(error) {
            console.log(error)
          })
      }
    },
    closeDevice() {
      var self = this
      this.$ajax.get('http://localhost:3000/closeBatteryDevices')
        .then((response) => {
          self.show1 = true
          self.show = false
        })
        .catch(function(error) {
          console.log(error)
        })
    },
    handleClean(index, row) {
      console.log(this.myauthor.token)
      this.$ajax({
        url: 'http://localhost:3000/batteryPlayClean',
        method: 'post',
        data: {
          'didclass': row.class,
          'didresource': row.resource,
          'diddid': row.did,
          'token': this.myauthor.token,
          'resources': this.myauthor.resource,
          'userId': this.myauthor.userId
        }
      }
      ).then((response) => {
        alert('开始清扫～～～')
      })
        .catch(function(error) {
          console.log(error)
        })
    },
    handleStop(index, row) {
      console.log(this.myauthor.token)
      this.$ajax({
        url: 'http://localhost:3000/batteryStopClean',
        method: 'post',
        data: {
          'didclass': row.class,
          'didresource': row.resource,
          'diddid': row.did,
          'token': this.myauthor.token,
          'resources': this.myauthor.resource,
          'userId': this.myauthor.userId
        }
      }
      ).then((response) => {
        alert('暂停清扫～～～')
      })
        .catch(function(error) {
          console.log(error)
        })
    },
    handleCharge(index, row) {
      console.log(this.myauthor.token)
      this.$ajax({
        url: 'http://localhost:3000/batteryStartCharge',
        method: 'post',
        data: {
          'didclass': row.class,
          'didresource': row.resource,
          'diddid': row.did,
          'token': this.myauthor.token,
          'resources': this.myauthor.resource,
          'userId': this.myauthor.userId
        }
      }
      ).then((response) => {
        alert('开始充电～～～')
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
