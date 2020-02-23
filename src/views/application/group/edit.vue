<template>
  <div class="app-container components-container">
    <div class="editor-container">
      <transfer-page :targetdata="targetdata" :data="data" :titles="titles" :title="title" :filter-placeholder="filterPlaceholder" :update-data="updateData" />
    </div>
  </div>
</template>

<script>
import TransferPage from '@/components/TransferPage'
import { groupDetail, fetchList, updateGroup } from '@/api/application'

export default {
  components: { TransferPage },
  data() {
    return {
      name: 'AppGroup',
      data: [],
      targetdata: [],
      titles: ['全部应用', '拥有应用'],
      title: 'test',
      filterPlaceholder: '请输入应用名称'
    }
  },
  created() {
    const id = this.$route.params && this.$route.params.id
    this.getData(id)
    this.getDetail()
  },
  methods: {
    getData(id) {
      groupDetail(id).then(res => {
        this.title = res.data.groupname
      })
    },
    getDetail() {
      fetchList().then(res => {
        res.data.items.forEach(item => {
          this.data.push({
            key: item.id.toString(),
            label: item.nickname,
            index: item.appname
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
