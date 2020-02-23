<template>
  <el-table :data="list" style="width: 100%;padding-top: 15px;">
    <el-table-column label="任务列表" width="200">
      <template slot-scope="scope">
        {{ scope.row.createdate }}
      </template>
    </el-table-column>
    <el-table-column label="任务状态" width="100" align="center">
      <template slot-scope="{row}">
        <el-tag :type="row.status | statusFilter">
          {{ row.status }}
        </el-tag>
      </template>
    </el-table-column>
    <el-table-column label="任务名称" width="195" align="center">
      <template slot-scope="scope">
        {{ scope.row.taskname }}
      </template>
    </el-table-column>
    <el-table-column label="任务类型" width="195" align="center">
      <template slot-scope="scope">
        {{ scope.row.tasktype }}
      </template>
    </el-table-column>
    <el-table-column label="创建者" width="195" align="center">
      <template slot-scope="scope">
        {{ scope.row.owner }}
      </template>
    </el-table-column>
    <el-table-column min-width="100" align="center">
      <router-link :to="'/task/tasklist/list'">
        <el-button type="success" size="small" round>
          查看
        </el-button>
      </router-link>
    </el-table-column>
  </el-table>
</template>

<script>
import { taskList } from '@/api/task'

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        运行失败: 'danger',
        已取消: 'warning',
        正在运行: 'success'
      }
      return statusMap[status]
    },
    orderNoFilter(str) {
      return str.substring(0, 30)
    }
  },
  data() {
    return {
      list: null
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      taskList().then(response => {
        this.list = response.data.items.slice(0, 8)
      })
    }
  }
}
</script>
