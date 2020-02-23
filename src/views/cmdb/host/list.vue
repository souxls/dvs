<template>
  <div class="HostGroup">
    <table-form
      :list="list"
      :total="total"
      :detail-info="detailInfo"
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
import { hostList, hostDetail, createHost, updateHost, deleteHost } from '@/api/host'
import TableForm from '@/components/TableForm'

export default {
  components: { TableForm },
  data() {
    return {
      list: [],
      detailData: {},
      total: 0,
      detailInfo: true,
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
          label: '主机名', width: '90px',
          align: 'center',
          value: 'hostname',
          detailInfo: true
        },
        {
          label: '外网IP',
          width: '130px',
          align: 'center',
          value: 'wanip'
        },
        {
          label: '内网IP',
          width: '130px',
          align: 'center',
          value: 'lanip'
        },
        {
          label: '硬盘',
          width: '70px',
          align: 'center',
          value: 'disk'
        },
        {
          label: '内存',
          width: '70px',
          align: 'center',
          value: 'memory'
        },
        {
          label: '系统类型',
          width: '100px',
          align: 'center',
          value: 'systemtype'
        },
        {
          label: '主机类型',
          width: '100px',
          align: 'center',
          value: 'hosttype'
        }
      ],
      detailTableData: [
        {
          label: 'ID',
          value: 'id',
          prop: 'id'
        },
        {
          label: '主机名',
          value: 'hostname',
          prop: 'hostname'
        },
        {
          label: '外网IP',
          value: 'wanip',
          prop: 'wanip'
        },
        {
          label: '内网IP',
          value: 'lanip',
          prop: 'lanip'
        },
        {
          label: '远控IP',
          value: 'idracip',
          prop: 'idracip'
        },
        {
          label: '系统类型',
          value: 'systemtype',
          prop: 'systemtype'
        },
        {
          label: '主机类型',
          value: 'hosttype',
          prop: 'hosttype'
        },
        {
          label: '服务器型号',
          value: 'productname',
          prop: 'productname'
        },
        {
          label: 'SN',
          value: 'sn',
          prop: 'sn'
        },
        {
          label: 'Raid类型',
          value: 'raid',
          prop: 'raid'
        },
        {
          label: 'IDC',
          value: 'idc',
          prop: 'idc'
        },
        {
          label: '机柜',
          value: 'cabinet',
          prop: 'id'
        },
        {
          label: '资产归属',
          value: 'owner',
          prop: 'owner'
        },
        {
          label: '过保时间',
          value: 'expired',
          prop: 'expired'
        }
      ],
      tableAction: '更新主机',
      actionLink: '/cmdb/host/edit/',
      formData: [
        {
          label: '主机名',
          prop: 'hostname',
          vmodel: 'hostname',
          eltype: 'input',
          placeholder: '输入主机名'
        },
        {
          label: '外网IP',
          prop: 'wanip',
          vmodel: 'wanip',
          eltype: 'input',
          placeholder: '输入外网IP'
        },
        {
          label: '内网IP',
          prop: 'lanip',
          vmodel: 'lanip',
          eltype: 'input',
          placeholder: '输入内网IP'
        },
        {
          label: 'IDC机房',
          prop: 'idc',
          vmodel: 'idc',
          eltype: 'select',
          placeholder: '选择机房位置'
        },
        {
          label: '资产归属',
          prop: 'owner',
          vmodel: 'owner',
          eltype: 'select',
          placeholder: '选择资产归属'
        },

        {
          label: '过保日期',
          prop: 'expired',
          vmodel: 'expired',
          eltype: 'textarea',
          placeholder: '选择过保日期'
        },
        {
          label: '状态',
          vmodel: 'status',
          eltype: 'select',
          selectOptions: ['正常', '已下架', '故障'],
          placeholder: '选择状态'
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
      createHost(data).then(response => {
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
      updateHost(data).then(response => {
        this.$notify({
          title: 'Success',
          message: response.message,
          type: 'success',
          duration: 2000
        })
      })
    },
    deleteTarget(data) {
      deleteHost(data).then(response => {
        this.$notify({
          title: 'Success',
          message: response.message,
          type: 'success',
          duration: 2000
        })
      })
    },
    async fetchList(query) {
      const { data } = await hostList(query)
      this.total = data.total
      const items = data.items
      this.list = items.map(v => {
        this.$set(v, 'edit', false)
        return v
      })
    },
    fetchTargetDetail(id) {
      hostDetail(id).then(response => {
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
    }
  }
}

</script>
