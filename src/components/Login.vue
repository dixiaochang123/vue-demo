
<template>
  <div class="login">
      登录
  </div>
</template>

<script>
import { login, deptList } from '@/axios/modules/index'

export default {
  name: 'Login',
  data () {
    return {
      name: '',
      password: ''
    }
  },
  mounted () {
    login({
      mobile: '',
      password: '',
      validateCode: ''
    }).then(res => console.log(res))
    deptList({
      'deptName': '',
      'pid': '',
      'viewerUid': '',
      'leaderUid': '',
      'sort': 'ASC'
    }).then(res => console.log(res))
  }
}
</script>

<style scoped>

</style>
