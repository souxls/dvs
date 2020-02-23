<template>
  <div class="app-container components-container">
    <div class="editor-container">
      <transfer-page :targetdata="targetdata" :data="data" :titles="titles" :title="title" :filter-placeholder="filterPlaceholder" :update-data="updateData" />
    </div>
  </div>
</template>

<script>
import TransferPage from '@/components/TransferPage'
import { roleDetail, updateRole } from '@/api/user'
import { groupList } from '@/api/application'

export default {
  components: { TransferPage },
  data() {
    return {
      name: 'editRole',
      data: [],
      targetdata: [],
      titles: ['应用组列表', '拥有应用'],
      title: '',
      filterPlaceholder: '请输入应用组名称'
    }
  },
  created() {
    const id = this.$route.params && this.$route.params.id
    this.getData(id)
    this.getDetail()
  },
  methods: {
    getData(id) {
      roleDetail(id).then(res => {
        this.title = res.data.rolename
      })
    },
    getDetail() {
      groupList().then(res => {
        res.data.items.forEach(item => {
          this.data.push({
            key: item.id.toString(),
            label: item.groupname,
            index: item.cname
          })
        })
      })
    },
    updateData(data) {
      updateRole(data)
      console.log(data)
    }
  }
}
</script>
