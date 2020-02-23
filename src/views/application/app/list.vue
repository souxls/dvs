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
      :detail-table-data="detailTableData"
      :detail-data="detailData"
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
  </div>
</template>

<script>
import { appList, appDetail, createApp, updateApp, deleteApp } from '@/api/application'
import TableForm from '@/components/TableForm'

export default {
  components: { TableForm },
  data() {
    return {
      list: [],
      detailData: {},
      total: 0,
      listQuery: {
        page: 1,
        limit: 20,
        appname: undefined,
        nickname: undefined,
        domain: undefined,
        apptype: undefined,
        sort: '-id'
      },
      placeHolder: {
        title: '请输入应用名称',
        type: '区域'
      },
      importanceOptions: [1, 2, 3],
      calendarTypeOptions: [
        { key: 'CN', display_name: 'China' },
        { key: 'US', display_name: 'USA' },
        { key: 'JP', display_name: 'Japan' },
        { key: 'EU', display_name: 'Eurozone' }
      ],
      statusOptions: ['新建', '正常', '已下限'],
      tableData: [
        {
          label: '应用名称',
          width: '90px',
          align: 'center',
          value: 'appname',
          detailInfo: true
        },
        {
          label: '应用别名',
          width: '90px',
          align: 'center',
          value: 'nickname'
        },
        {
          label: '描述',
          width: '150px',
          align: 'center',
          value: 'description'
        },
        {
          label: '域名',
          width: '110px',
          align: 'center',
          value: 'domain'
        },
        {
          label: '创建日期',
          width: '110px',
          align: 'center',
          value: 'createdate'
        },
        {
          label: '项目负责人',
          width: '100px',
          align: 'center',
          value: 'owner'
        }
      ],
      detailTableData: [
        {
          label: 'ID',
          value: 'id',
          prop: 'id'
        },
        {
          label: '应用名称',
          prop: 'appname',
          value: 'appname'
        },
        {
          label: '应用别名',
          prop: 'nickname',
          value: 'nickname'
        },
        {
          label: '描述',
          prop: 'description',
          value: 'description'
        },
        {
          label: '域名',
          prop: 'domain',
          value: 'domain'
        },
        {
          label: '应用类型',
          prop: 'apptype',
          value: 'apptype'
        },
        {
          label: '创建日期',
          prop: 'createdate',
          value: 'createdate'
        },
        {
          label: '项目负责人',
          prop: 'owner',
          value: 'owner'
        }
      ],
      tableAction: '更新应用',
      actionLink: '/app/edit/',
      formData: [
        {
          label: '应用名称',
          prop: 'appname',
          vmodel: 'appname',
          eltype: 'input',
          placeholder: '应用名称'
        },
        {
          label: '应用别名',
          prop: 'nickname',
          vmodel: 'nickname',
          eltype: 'input',
          placeholder: '应用名称'
        },
        {
          label: '描述',
          prop: 'description',
          vmodel: 'description',
          eltype: 'textarea',
          placeholder: '描述信息'
        },
        {
          label: '仓库地址',
          prop: 'repo',
          vmodel: 'repo',
          eltype: 'input',
          placeholder: '仓库地址'
        },
        {
          label: '域名',
          prop: 'domain',
          vmodel: 'domain',
          eltype: 'input',
          placeholder: '域名'
        },
        {
          label: '应用类型',
          prop: 'apptype',
          vmodel: 'apptype',
          eltype: 'select',
          selectOption: ['java', 'php'],
          placeholder: '应用类型'
        },
        {
          label: '应用分组',
          prop: 'appgroup',
          vmodel: 'appgroup',
          eltype: 'select',
          selectOption: ['test1', 'test2'],
          placeholder: '选择分组'
        },
        {
          label: '项目负责人',
          prop: 'owner',
          vmodel: 'owner',
          eltype: 'select',
          selectOption: ['aaaa', 'bbbb'],
          placeholder: '选择成员'
        },
        {
          label: '状态',
          vmodel: 'status',
          eltype: 'select',
          selectOptions: ['正常', '已下架', '故障'],
          placeholder: '选择状态'
        }
      ],
      exportExcel: true,
      temp: {
        id: undefined,
        appname: '',
        nickname: '',
        description: '',
        repo: '',
        domain: '',
        apptype: '',
        appgroup: '',
        owner: '',
        status: '新建'
      },
      rules: {
        appname: [{ required: true, message: '应用名称', trigger: 'blur' }],
        nickname: [{ required: true, message: '应用别名', trigger: 'blur' }],
        description: [{ required: true, message: '描述', trigger: 'blur' }]
      }
    }
  },
  methods: {
    createTarget(data) {
      createApp(data).then(response => {
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
      updateApp(data).then(response => {
        this.$notify({
          title: 'Success',
          message: response.message,
          type: 'success',
          duration: 2000
        })
      })
    },
    deleteTarget(data) {
      deleteApp(data).then(response => {
        this.$notify({
          title: 'Success',
          message: response.message,
          type: 'success',
          duration: 2000
        })
      })
    },
    async fetchList(query) {
      const { data } = await appList(query)
      this.total = data.total
      const items = data.items
      this.list = items.map(v => {
        this.$set(v, 'edit', false)
        return v
      })
    },
    fetchTargetDetail(id) {
      appDetail(id).then(response => {
        this.detailData = response.data
      })
    },
    resetTemp() {
      this.temp = {
        id: undefined,
        appname: '',
        nickname: '',
        description: '',
        repo: '',
        domain: '',
        apptype: '',
        appgroup: '',
        owner: '',
        status: '新建'
      }
    }
  }
}

</script>
