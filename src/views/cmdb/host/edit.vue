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
import { hostDetail, updateHost } from '@/api/host'

export default {
  components: { EditForm },
  data() {
    return {
      form: [],
      formData: [
        {
          label: '主机名：',
          eltype: 'input',
          vmodel: 'hostname',
          value: 'hostname'
        },
        {
          label: '外网IP：',
          eltype: 'input',
          vmodel: 'wanip',
          value: 'wanip'
        },
        {
          label: '内网IP：',
          eltype: 'input',
          vmodel: 'lanip',
          value: 'lanip'
        },
        {
          label: '远控IP：',
          eltype: 'input',
          vmodel: 'idracip',
          value: 'idracip'
        },
        {
          label: '系统类型：',
          eltype: 'input',
          vmodel: 'systemtype',
          value: 'systemtype'
        },
        {
          label: '主机类型：',
          eltype: 'input',
          vmodel: 'hosttype',
          value: 'hosttype'
        },
        {
          label: '服务器型号：',
          eltype: 'input',
          vmodel: 'productname',
          value: 'productname'
        },
        {
          label: 'SN：',
          eltype: 'input',
          vmodel: 'sn',
          value: 'sn'
        },
        {
          label: 'Raid类型：',
          eltype: 'select',
          selectOptions: ['raid0', 'raid5', 'raid10'],
          vmodel: 'raid',
          value: 'raid'
        },
        {
          label: 'IDC机房：',
          eltype: 'input',
          vmodel: 'idc',
          value: 'idc'
        },
        {
          label: '机柜：',
          eltype: 'input',
          vmodel: 'cabinet',
          value: 'cabinet'
        },
        {
          label: '资产归属：',
          eltype: 'input',
          vmodel: 'owner',
          value: 'owner'
        },
        {
          label: '过保时间：',
          eltype: 'date-picker',
          vmodel: 'expired',
          value: 'expired'
        },
        {
          label: '状态：',
          eltype: 'select',
          selectOptions: ['正常', '故障', '已下线'],
          vmodel: 'status',
          value: 'status'
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
      hostDetail(id).then(response => {
        this.form = response.data
        this.$set(this.form, 'edit', false)
      })
    },
    updateTarget(data) {
      updateHost(data).then((
        this.$message({
          message: '主机信息已更新',
          type: 'success',
          duration: 2000
        })
      ))
    }
  }
}

</script>
