<template>
  <div class="resource-container">
    <el-card class="box-card">
      <el-button v-for="item in software" :key="item" class="pan-btn green-btn resource-button" @click="getSoftware(item.name)">{{ item.name }} ({{ item.total }})</el-button>
      <el-button class="pan-btn green-btn resource-button" size="mini" @click="test">Tomcat (5)</el-button>
      <el-button class="pan-btn green-btn resource-button" size="mini" @click="test">Nginx (5)</el-button>
      <el-button class="pan-btn green-btn resource-button" size="mini" @click="test">memcache(5)</el-button>
      <el-button class="pan-btn green-btn resource-button" size="mini" @click="test">Redis (5)</el-button>
      <el-button class="pan-btn green-btn resource-button" size="mini" @click="test">Flume (5)</el-button>
      <el-button class="pan-btn green-btn resource-button" size="mini" @click="test">MySQL (5)</el-button>
      <el-button class="pan-btn green-btn resource-button" size="mini" @click="test">MySQL (5)</el-button>
      <el-button class="pan-btn green-btn resource-button" size="mini" @click="test">MySQL (5)</el-button>
      <el-button class="pan-btn green-btn resource-button" size="mini" @click="test">MySQL (5)</el-button>
      <el-button class="pan-btn green-btn resource-button" size="mini" @click="test">MySQL (5)</el-button>
      <el-button class="pan-btn green-btn resource-button" size="mini" @click="test">MySQL (5)</el-button>
    </el-card>
    <el-card class="box-card">
      <table-form
        :list="list"
        :total="total"
        :list-query="listQuery"
        :place-holder="placeHolder"
        :importance-options="importanceOptions"
        :calendar-type-options="calendarTypeOptions"
        :status-options="statusOptions"
        :table-data="tableData"
        :table-action="tableAction"
        :action-link="actionLink"
        :form-data="formData"
        :export-excel="exportExcel"
        :temp="temp"
        :rules="rules"
        :create-target="createTarget"
        :update-target="updateTarget"
        :delete-target="deleteTarget"
        :fetch-list="fetchList"
        :fetch-target-detail="fetchTargetDetail"
        :reset-temp="resetTemp"
      />
    </el-card>
  </div>
</template>

<script>
import TableForm from '@/components/TableForm'
import { resourceList, resourceDetail, deleteResource, createResource, updateResource } from '@/api/resource'

export default {
  components: { TableForm },
  data() {
    return {
      software: [
        {
          name: 'MySQL',
          total: 200
        },
        {
          name: 'Nginx',
          total: 100
        },
        {
          name: 'Tomcat',
          total: 300
        }
      ],
      list: [],
      total: 0,
      listQuery: {
        page: 1,
        limit: 20,
        hostname: undefined,
        wanip: undefined,
        lanip: undefined,
        sort: '-id'
      },
      placeHolder: {
        title: '请输入主机名称',
        type: '区域'
      },
      importanceOptions: [1, 2, 3],
      calendarTypeOptions: [
        { key: 'CN', display_name: 'China' },
        { key: 'US', display_name: 'USA' },
        { key: 'JP', display_name: 'Japan' },
        { key: 'EU', display_name: 'Eurozone' }
      ],
      statusOptions: ['正常', '已下架', '故障'],
      tableData: [
        {
          label: '主机名',
          width: '90px',
          align: 'center',
          value: 'hostname'
        },
        {
          label: '内网IP',
          width: '130px',
          align: 'center',
          value: 'lanip'
        },
        {
          label: '版本',
          width: '70px',
          align: 'center',
          value: 'version'
        },
        {
          label: '端口',
          width: '70px',
          align: 'center',
          value: 'port'
        },
        {
          label: '备注',
          width: '120px',
          align: 'center',
          value: 'note'
        }
      ],
      formData: [
        {
          label: '内网IP',
          prop: 'lanip',
          vmodel: 'lanip',
          eltype: 'input',
          placeholder: '输入内网IP'
        },
        {
          label: '端口',
          prop: 'port',
          vmodel: 'port',
          eltype: 'select',
          placeholder: '选择端口'
        },
        {
          label: 'IDC机房',
          prop: 'idc',
          vmodel: 'idc',
          eltype: 'select',
          placeholder: '选择机房位置'
        },
        {
          label: '状态',
          vmodel: 'status',
          eltype: 'select',
          selectOptions: ['新建', '正在运行', '未运行'],
          placeholder: '选择状态'
        },
        {
          label: '备注',
          vmodel: 'note',
          eltype: 'textarea',
          placeholder: '备注'
        }
      ],
      exportExcel: false,
      temp: {
        id: undefined,
        hostname: '',
        wanip: '',
        lanip: '',
        idc: '',
        owner: '',
        status: '正常'
      },
      rules: {
        hostname: [{ required: true, message: '请输入主机名称', trigger: 'blur' }],
        lanip: [{ required: true, message: '输入外网IP', trigger: 'blur' }]
      }
    }
  },
  methods: {
    createTarget(data) {
      createResource(data).then(response => {
        if (response.code === 20000) {
          data.id = response.data.id
          data.createdate = response.data.createdate
          this.$set(data, 'edit', false)
          this.list.unshift(data)
          this.$notify({
            title: 'Success',
            message: response.message,
            type: 'success',
            duration: 2000
          })
        }
      })
    },
    updateTarget(data) {
      updateResource(data).then(response => {
        this.$notify({
          title: 'Success',
          message: response.message,
          type: 'success',
          duration: 2000
        })
      })
    },
    deleteTarget(data) {
      deleteResource(data).then(response => {
        this.$notify({
          title: 'Success',
          message: response.message,
          type: 'success',
          duration: 2000
        })
      })
    },
    async fetchList(query) {
      const { data } = await resourceList(query)
      this.total = data.total
      const items = data.items
      this.list = items.map(v => {
        this.$set(v, 'edit', false)
        return v
      })
    },
    fetchTargetDetail(id) {
      resourceDetail(id).then(response => {
        this.detailData = response.data
      })
    },
    resetTemp() {
      this.temp = {
        id: undefined,
        hostname: '',
        wanip: '',
        lanip: '',
        idc: '',
        owner: '',
        status: '正常'
      }
    },
    getSoftware(data) {
      this.fetchSoftware(data).then(response => {
        this.list = response.items
      })
    }
  }
}
</script>

<style scoped>
.resource-container {
  background-color: #f0f2f5;
  padding: 30px;
  min-height: calc(100vh - 84px);
}
.resource-button {
  margin-bottom: 10px;
}

.el-button {
  margin-left: 2px;
}
</style>
