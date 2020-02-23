<template>
  <div class="app-container">
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
      <el-form-item label="ID：">
        <span>{{ form.id }}</span>
      </el-form-item>
      <el-form-item label="主机名：">
        <template>
          <template v-if="form.edit">
            <el-input v-model="form.hostname" />
          </template>
          <span v-else>{{ form.hostname }}</span>
        </template>
      </el-form-item>
      <el-form-item label="外网IP：">
        <template>
          <template v-if="form.edit">
            <el-input v-model="form.wanip" />
          </template>
          <span v-else>{{ form.wanip }}</span>
        </template>
      </el-form-item>
      <el-form-item label="内网IP：">
        <template>
          <template v-if="form.edit">
            <el-input v-model="form.lanip" />
          </template>
          <span v-else>{{ form.lanip }}</span>
        </template>
      </el-form-item>
      <el-form-item label="远控IP：">
        <template>
          <template v-if="form.edit">
            <el-input v-model="form.idracip" />
          </template>
          <span v-else>{{ form.idracip }}</span>
        </template>
      </el-form-item>
      <el-form-item label="系统类型：">
        <template>
          <template v-if="form.edit">
            <el-select v-model="form.systemtype" placeholder="please select your zone">
              <el-option label="Zone one" value="shanghai" />
              <el-option label="Zone two" value="beijing" />
            </el-select>
          </template>
          <span v-else>{{ form.systemtype }}</span>
        </template>
      </el-form-item>
      <el-form-item label="主机类型：">
        <template>
          <template v-if="form.edit">
            <el-select v-model="form.hosttype" placeholder="please select your zone">
              <el-option label="Zone one" value="shanghai" />
              <el-option label="Zone two" value="beijing" />
            </el-select>
          </template>
          <span v-else>{{ form.hosttype }}</span>
        </template>
      </el-form-item>
      <el-form-item label="服务器型号：">
        <template>
          <template v-if="form.edit">
            <el-input v-model="form.productname" />
          </template>
          <span v-else>{{ form.productname }}</span>
        </template>
      </el-form-item>
      <el-form-item label="SN：">
        <template>
          <template v-if="form.edit">
            <el-input v-model="form.sn" />
          </template>
          <span v-else>{{ form.sn }}</span>
        </template>
      </el-form-item>
      <el-form-item label="Raid类型：">
        <template>
          <template v-if="form.edit">
            <el-select v-model="form.raid" placeholder="请输入Raid类型">
              <el-option label="Zone one" value="shanghai" />
              <el-option label="Zone two" value="beijing" />
            </el-select>
          </template>
          <span v-else>{{ form.raid }}</span>
        </template>
      </el-form-item>
      <el-form-item label="IDC机房：">
        <template>
          <template v-if="form.edit">
            <el-input v-model="form.idc" />
          </template>
          <span v-else>{{ form.idc }}</span>
        </template>
      </el-form-item>
      <el-form-item label="机柜：">
        <template>
          <template v-if="form.edit">
            <el-input v-model="form.cabinet" />
          </template>
          <span v-else>{{ form.cabinet }}</span>
        </template>
      </el-form-item>
      <el-form-item label="资产归属：">
        <template>
          <template v-if="form.edit">
            <el-input v-model="form.owner" />
          </template>
          <span v-else>{{ form.owner }}</span>
        </template>
      </el-form-item>
      <el-form-item label="过保日期：">
        <template>
          <template v-if="form.edit">
            <el-date-picker v-model="form.expired" type="date" placeholder="选择过保日期" style="width: 100%;" />
          </template>
          <span v-else>{{ form.expired }}</span>
        </template>
      </el-form-item>
      <el-form-item label="状态：">
        <template>
          <template v-if="form.edit">
            <el-select v-model="form.status" placeholder="please select your zone">
              <el-option label="Zone one" value="shanghai" />
              <el-option label="Zone two" value="beijing" />
            </el-select>
          </template>
          <span v-else>{{ form.status }}</span>
        </template>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { fetchDetail, updateHost } from '@/api/host'
const defaultForm = {
  id: undefined,
  hostname: ''
}

export default {
  name: 'Editcmdb',
  data() {
    return {
      form: Object.assign({}, defaultForm),
      rules: ''
    }
  },
  created() {
    const id = this.$route.params && this.$route.params.id
    this.fetchData(id)
  },
  methods: {
    fetchData(id) {
      fetchDetail(id).then(response => {
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

