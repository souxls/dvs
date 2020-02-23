<template>
  <div class="app-container components-container">
    <div class="editor-container">
      <transfer-page :targetdata="targetdata" :data="data" :titles="titles" :title="title" :filter-placeholder="filterPlaceholder" :update-data="updateData" />
    </div>
  </div>
</template>

<script>
import TransferPage from '@/components/TransferPage'
import { groupDetail, fetchList } from '@/api/host'

export default {
  components: { TransferPage },
  data() {
    return {
      data: [],
      targetdata: [],
      titles: ['主机列表', '拥有主机'],
      title: '',
      filterPlaceholder: '请输入主机名称'
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
            label: item.hostname + ' [' + item.lanip + ']',
            index: item.hostname
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
