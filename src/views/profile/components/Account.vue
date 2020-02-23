<template>
  <div class="EditForm">
    <edit-form
      :form="form"
      :form-data="formData"
      :rules="rules"
      :fetch-detail="fetchDetail"
      :update-target="updateTarget"
    />
  </div>
</template>

<script>
import EditForm from '@/components/EditForm'
import { userDetail, updateUser } from '@/api/user'

export default {
  components: { EditForm },
  data() {
    return {
      form: [],
      formData: [
        {
          label: '登录名称：',
          eltype: 'input',
          vmodel: 'account',
          value: 'account'
        },
        {
          label: '用户名：',
          eltype: 'input',
          vmodel: 'username',
          value: 'username'
        },
        {
          label: '电话：',
          eltype: 'input',
          vmodel: 'phonenumber',
          value: 'phonenumber'
        },
        {
          label: '邮箱：',
          eltype: 'input',
          vmodel: 'email',
          value: 'email'
        }
      ],
      rules: {
        hostname: [{ required: true, message: '应用名称', trigger: blur }],
        wanip: [{ required: true, message: '输入IP', trigger: blur }],
        lanip: [{ required: true, message: '输入IP', trigger: blur }]
      }
    }
  },
  methods: {
    fetchDetail(id) {
      userDetail(id).then(response => {
        this.form = response.data
        this.$set(this.form, 'edit', false)
      })
    },
    updateTarget(data) {
      updateUser(data).then((
        this.$message({
          message: '信息已更新',
          type: 'success',
          duration: 2000
        })
      ))
    }
  }
}

</script>
