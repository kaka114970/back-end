<template>
  <div id="app">
    <img src="./assets/logo.png">
    用户名<input type="text" v-model="userName">
    年龄<input type="text" v-model="age">
    密码<input type="text" v-model="password">

    用户id<input type="text" v-model="userID">
    日期<input type="text" v-model="datetime">
    评论<input type="text" v-model="remark">
    星级<input type="text" v-model="grade">

    <button @click="addRemark">添加</button>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      userName: '',
      age: '',
      password: '',
      userID: '',
      datetime: '',
      remark: '',
      grade: ''
    }
  },
  methods: {
    addUser () {
      var name = this.userName
      var age = this.age
      var password = this.password
      this.$http.post('/api/user/addUser', {
        username: name,
        age: age,
        password: password
      }, {}).then((response) => {
        console.log(response)
      })
    },
    addRemark () {
      var userID = this.userID
      var datetime = this.datetime
      var remark = this.remark
      var grade = this.grade
      this.$http.post('/api/user/addRemark', {
        userID: userID,
        datetime: datetime,
        remark: remark,
        grade: grade
      }, {}).then((response) => {
        console.log(response)
      })
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
