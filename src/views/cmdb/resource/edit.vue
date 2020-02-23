<template>
  <div class="app-container components-container">
    <div class="editor-container">
      <transfer-page :targetdata="targetdata" :data="data" :titles="titles" :title="title" :filter-placeholder="filterPlaceholder" :update-data="updateData" />
    </div>
  </div>
</template>

<script>
import TransferPage from '@/components/TransferPage'
import { userDetail, roleList, updateRole } from '@/api/user'

export default {
  components: { TransferPage },
  data() {
    return {
      name: 'editRole',
      data: [],
      targetdata: [],
      titles: ['角色列表', '拥有角色'],
      title: '',
      filterPlaceholder: '请输入角色名称'
    }
  },
  created() {
    const id = this.$route.params && this.$route.params.id
    this.getData(id)
    this.getDetail()
  },
  methods: {
    getData(id) {
      userDetail(id).then(res => {
        this.title = res.data.username
      })
    },
    getDetail() {
      roleList().then(res => {
        res.data.items.forEach(item => {
          this.data.push({
            key: item.id.toString(),
            label: item.rolename,
            index: item.cname
          })
        })
      })
    },
    updateData(data) {
      console.log(data)
    }
  }
}
</script>
