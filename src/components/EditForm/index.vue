<template>
  <div class="app-container edit-container">
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
            @click="cancelUpdate(form)"
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
      <el-form-item label="ID：">
        <span>{{ form.id }}</span>
      </el-form-item>
      <template v-for="(item, index) in formData">
        <el-form-item :key="index" :label="item.label" :prop="item.prop">
          <template v-if="form.edit">
            <el-select v-if="item.eltype === 'select'" v-model="form[item.vmodel]" class="filter-item" :placeholder="item.placeholder">
              <el-option v-for="items in item.selectOptions" :key="items" :label="items" :value="items" />
            </el-select>
            <el-date-picker v-else-if="item.eltype === 'date-picker'" v-model="form[item.vmodel]" type="date" :placeholder="item.placeholder" style="width: 100%;" />
            <el-input v-else-if="item.eltype === 'textarea'" v-model="form[item.vmodel]" type="textarea" />
            <el-input v-else v-model="form[item.vmodel]" type="medium" />
          </template>
          <span v-else>{{ form[item.value] }}</span>
        </el-form-item>
      </template>
    </el-form>
  </div>
</template>

<script>

export default {
  name: 'EditForm',
  props: {
    form: {
      type: Array,
      default() {
        return []
      }
    },
    formData: {
      type: Array,
      default() {
        return []
      }
    },
    rules: {
      type: Object,
      default() {
        return {}
      }
    },
    fetchDetail: {
      type: Function,
      default() {
        return {}
      }
    },
    updateTarget: {
      type: Function,
      default() {
        return {}
      }
    }
  },
  created() {
    const id = this.$route.params && this.$route.params.id
    this.fetchData(id)
  },
  methods: {
    fetchData(id) {
      this.fetchDetail(id)
    },
    cancelUpdate(form) {
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
          this.updateTarget(tempData)
          this.form.edit = false
        }
      })
    }
  }
}
</script>
