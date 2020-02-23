<template>
  <div class="HostGroup">
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
      :reset-temp="resetTemp"
    />
  </div>
</template>

<script>
import { groupList, createGroup, updateGroup, deleteGroup } from '@/api/host'
import TableForm from '@/components/TableForm'

export default {
  components: { TableForm },
  data() {
    return {
      list: [],
      total: 0,
      listQuery: {
        page: 1,
        limit: 20,
        groupname: undefined,
        sort: '-id'
      },
      placeHolder: {
        title: '请输入主机组名称',
        type: '区域'
      },
      importanceOptions: [1, 2, 3],
      calendarTypeOptions: [
        { key: 'CN', display_name: 'China' },
        { key: 'US', display_name: 'USA' },
        { key: 'JP', display_name: 'Japan' },
        { key: 'EU', display_name: 'Eurozone' }
      ],
      statusOptions: ['启用', '禁用'],
      tableData: [
        {
          label: '主机组名称',
          width: '110px',
          align: 'center',
          value: 'groupname'
        },
        {
          label: '描述',
          width: '160px',
          align: 'left',
          value: 'description'
        },
        {
          label: '创建时间',
          width: '110px',
          align: 'center',
          value: 'createdate'
        }
      ],
      tableAction: '添加主机',
      actionLink: '/cmdb/group/edit/',
      formData: [
        {
          label: '主机组名称',
          prop: 'groupname',
          vmodel: 'groupname',
          eltype: 'input',
          placeholder: '输入主机组名称'
        },
        {
          label: '描述',
          prop: 'description',
          vmodel: 'description',
          eltype: 'textarea',
          placeholder: '描述'
        },
        {
          label: '状态',
          vmodel: 'status',
          eltype: 'select',
          placeholder: '选择状态'
        }
      ],
      exportExcel: false,
      temp: {
        id: undefined,
        groupname: '',
        description: '',
        status: '启用'
      },
      rules: {
        groupname: [{ required: true, message: '请输入主机组名称', trigger: 'blur' }],
        description: [{ required: true, message: '请输入描述信息', trigger: 'blur' }]
      }
    }
  },
  methods: {
    createTarget(data) {
      createGroup(data).then(response => {
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
        } else {
          this.$notify({
            title: 'Fail',
            message: response.message,
            type: 'error',
            duration: 2000
          })
        }
      })
    },
    updateTarget(data) {
      updateGroup(data).then(response => {
        if (response.code === 20000) {
          this.$notify({
            title: 'Success',
            message: response.message,
            type: 'success',
            duration: 2000
          })
        } else {
          this.$notify({
            title: 'Fail',
            message: response.message,
            type: 'error',
            duration: 2000
          })
        }
      })
    },
    deleteTarget(data) {
      deleteGroup(data).then(response => {
        if (response.code === 20000) {
          this.$notify({
            title: 'Success',
            message: response.message,
            type: 'success',
            duration: 2000
          })
        } else {
          this.$notify({
            title: 'Fail',
            message: response.message,
            type: 'error',
            duration: 2000
          })
        }
      })
    },
    async fetchList(query) {
      const { data } = await groupList(query)
      this.total = data.total
      const items = data.items
      this.list = items.map(v => {
        this.$set(v, 'edit', false)
        return v
      })
    },
    resetTemp() {
      this.temp = {
        id: undefined,
        groupname: '',
        description: '',
        status: '启用'
      }
    }
  }
}

</script>
