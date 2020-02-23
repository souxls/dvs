<template>
  <div class="jenkins-container">
    <el-form ref="form" :model="form" label-width="120px" :rules="rules">
      <el-form-item align="right">
        <template>
          <el-button
            v-if="form.edit"
            type="success"
            icon="el-icon-circle-check-outline"
            size="medium"
            @click="updateData()"
          >
            完成
          </el-button>
          <el-button
            v-if="form.edit"
            type="warning"
            icon="el-icon-refresh"
            size="medium"
            @click="cancelEdit(form)"
          >
            取消
          </el-button>
          <el-button
            v-else
            type="primary"
            size="medium"
            icon="el-icon-edit"
            @click="form.edit=!form.edit"
          >
            编辑
          </el-button>
        </template>
      </el-form-item>
      <el-form-item label="Jenkins地址：">
        <template>
          <template v-if="form.edit">
            <el-input v-model="form.source" />
          </template>
          <span v-else>{{ form.source }}</span>
        </template>
      </el-form-item>
      <el-form-item label="用户名：">
        <template>
          <template v-if="form.edit">
            <el-input v-model="form.account" />
          </template>
          <span v-else>{{ form.account }}</span>
        </template>
      </el-form-item>
      <el-form-item label="密码：">
        <template>
          <template v-if="form.edit">
            <el-input v-model="form.password" />
          </template>
          <span v-else>{{ form.password }}</span>
        </template>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { fetchJenkins } from '@/api/system'
const defaultForm = {
  id: undefined,
  hostname: ''
}

export default {
  data() {
    return {
      form: Object.assign({}, defaultForm),
      rules: ''
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      fetchJenkins().then(response => {
        this.form = response.data
        this.$set(this.form, 'edit', false)
      })
    },
    confirmEdit(form) {
      form.edit = false
      this.$message({
        message: '主机信息已经更新！',
        type: 'success'
      })
    },
    cancelEdit(form) {
      form.edit = false
      this.$message({
        message: '已放弃修改',
        type: 'warning'
      })
    },
    updateData() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.form)
          updateHost(tempData).then(() => {
            this.form.edit = false
            this.$message({
              message: '主机信息已更新',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    }
  }
}
</script>

<style scoped>
.line{
  text-align: center;
}
</style>
