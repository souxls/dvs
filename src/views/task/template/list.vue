<template>
  <div class="Task">
    <table-form
      :list="list"
      :total="total"
      :list-query="listQuery"
      :place-holder="placeHolder"
      :importance-options="importanceOptions"
      :calendar-type-options="calendarTypeOptions"
      :create-type-options="createTypeOptions"
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
import { taskList, createTask, updateTask, deleteTask } from '@/api/task'
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
        title: '请输入任务名称',
        create: '任务类型'
      },
      importanceOptions: [1, 2, 3],
      calendarTypeOptions: [
        { key: 'CN', display_name: 'China' },
        { key: 'US', display_name: 'USA' },
        { key: 'JP', display_name: 'Japan' },
        { key: 'EU', display_name: 'Eurozone' }
      ],
      statusOptions: ['正在运行', '运行失败'],
      createTypeOptions: [
        { key: 'Install', display_name: '安装程序' },
        { key: 'Deployment', display_name: '发布' },
        { key: 'Excute', display_name: '执行命令' },
        { key: 'Resource', display_name: '资源申请' }
      ],
      tableData: [
        {
          label: '任务名称',
          width: '110px',
          align: 'center',
          value: 'taskname'
        },
        {
          label: '描述',
          width: '150px',
          align: 'left',
          value: 'description'
        },
        {
          label: '任务类型',
          width: '150px',
          align: 'center',
          value: 'tasktype'
        },
        {
          label: '任务状态',
          width: '100px',
          align: 'center',
          value: 'status'
        },
        {
          label: '创建日期',
          width: '160px',
          align: 'center',
          value: 'createdate'
        },
        {
          label: '创建者',
          width: '95px',
          align: 'center',
          value: 'owner'
        }
      ],
      tableAction: '查看详情',
      actionLink: '/task/tasklist/info/',
      formData: [
        {
          label: '任务名称',
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
          label: '任务类型',
          vmodel: 'status',
          eltype: 'select',
          placeholder: '选择任务类型'
        }
      ],
      exportExcel: false,
      temp: {
        id: undefined,
        taskname: '',
        description: '',
        tasktype: '',
        status: '新建'
      },
      rules: {
        groupname: [{ required: true, message: '请输入主机组名称', trigger: 'blur' }],
        description: [{ required: true, message: '请输入描述信息', trigger: 'blur' }]
      }
    }
  },
  methods: {
    createTarget(data) {
      createTask(data).then(response => {
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
      updateTask(data).then(response => {
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
      deleteTask(data).then(response => {
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
      const { data } = await taskList(query)
      this.total = data.total
      const items = data.items
      this.list = items.map(v => {
        this.$set(v, 'editAction', false)
        return v
      })
    },
    resetTemp() {
      this.temp = {
        id: undefined,
        taskname: '',
        description: '',
        tasktype: '',
        status: '新建'
      }
    }
  }
}

</script>
