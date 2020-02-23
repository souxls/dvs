<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.input" :placeholder="placeHolder.title" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-select v-if="placeHolder.imp" v-model="listQuery.importance" :placeholder="placeHolder.Imp" clearable style="width: 120px" class="filter-item">
        <el-option v-for="item in importanceOptions" :key="item" :label="item" :value="item" />
      </el-select>
      <el-select v-if="listQuery.type" v-model="listQuery.type" :placeholder="placeHolder.type" clearable class="filter-item" style="width: 130px">
        <el-option v-for="item in calendarTypeOptions" :key="item.key" :label="item.display_name+'('+item.key+')'" :value="item.key" />
      </el-select>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        搜索
      </el-button>
      <el-select v-if="createTypeOptions" v-model="createType" :placeholder="placeHolder.create" clearable class="filter-item" style="width: 160px; margin-left: 20px;">
        <el-option v-for="item in createTypeOptions" :key="item.key" :label="item.display_name+'('+item.key+')'" :value="item.key" />
      </el-select>
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate">
        新建
      </el-button>
      <el-button v-if="exportExcel" v-waves :loading="downloadLoading" class="filter-item" type="primary" icon="el-icon-download" @click="handleDownload">
        导出
      </el-button>
      <el-checkbox v-model="showReviewer" class="filter-item" style="margin-left:15px;" @change="tableKey=tableKey+1">
        reviewer
      </el-checkbox>
    </div>

    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;"
      @sort-change="sortChange"
    >
      <el-table-column label="ID" prop="id" sortable="custom" align="center" min-width="70" :class-name="getSortClass('id')">
        <template slot-scope="{row}">
          <span>{{ row.id }}</span>
        </template>
      </el-table-column>
      <template v-for="(item,index) in tableData">
        <el-table-column v-if="item.detailInfo" :key="index" :label="item.label" :align="item.align" :min-width="item.width">
          <template slot-scope="{row}">
            <span class="link-type" @click="fetchDetail(row.id)">{{ row[item.value] }}</span>
          </template>
        </el-table-column>
        <el-table-column v-else-if="item.value==='status'" :key="index" :label="item.label" :align="item.align" :min-width="item.width" class-name="status-col">
          <template slot-scope="{row}">
            <el-tag :type="row.status | statusFilter">{{ row[item.value] }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column v-else :key="index" :label="item.label" :align="item.align" :min-width="item.width">
          <template slot-scope="scope">
            <span>{{ scope.row[item.value] }}</span>
          </template>
        </el-table-column>
      </template>

      <el-table-column label="操作" align="center" min-width="235px" class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <el-button-group>
            <router-link v-if="tableAction" :to="actionLink + row.id">
              <el-button type="primary" size="mini">
                {{ tableAction }}
              </el-button>
            </router-link>
            <el-button
              v-if="row.editAction==='start'"
              type="success"
              size="mini"
              @click="changeStatus(row)"
            >
              开始
            </el-button>
            <el-button
              v-else-if="row.editAction==='stop'"
              type="success"
              size="mini"
              @click="changeStatus(row)"
            >
              停止
            </el-button>
            <el-dropdown v-else trigger="click" @command="handleCommand(row)">
              <el-button size="mini" type="primary">
                操作<i class="el-icon-arrow-down el-icon--right" />
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="start">开始</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <el-button v-if="row.status!='已删除'" size="mini" type="danger" @click="handleModifyStatus(row, '已删除')">
              删除
            </el-button>
            <el-button v-else size="mini" type="warning" @click="handleModifyStatus(row, '启用')">
              撤销
            </el-button>
          </el-button-group>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="110px" style="width: 400px; margin-left:50px;">
        <template v-for="(item, index) in formData">
          <el-form-item :key="index" :label="item.label" :prop="item.prop">
            <el-select v-if="item.eltype === 'select'" v-model="temp[item.vmodel]" class="filter-item" :placeholder="item.placeholder">
              <el-option v-for="items in item.selectOptions" :key="items" :label="items" :value="items" />
            </el-select>
            <el-date-picker v-else-if="item.eltype === 'date-picker'" v-model="temp[item.vmodel]" type="date" :placeholder="item.placeholder" style="width: 100%;" />
            <el-input v-else-if="item.eltype === 'textarea'" v-model="temp[item.vmodel]" type="textarea" />
            <el-input v-else v-model="temp[item.vmodel]" />
          </el-form-item>
        </template>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          取消
        </el-button>
        <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">
          确认
        </el-button>
      </div>
    </el-dialog>

    <el-dialog :visible.sync="dialogDetailVisible" title="详细信息">
      <el-form :model="detailData" label-position="left" label-width="100px" style="width: 400px; margin-left:50px;">
        <template v-for="(item,index) in detailTableData">
          <el-form-item :key="index" :label="item.label" :prop="item.prop">
            <span>{{ detailData[item.value] }}</span>
          </el-form-item>
        </template>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogDetailVisible = false">确认</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import waves from '@/directive/waves' // waves directive
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

export default {
  name: 'TableForm',
  components: { Pagination },
  directives: { waves },
  filters: {
    statusFilter(status) {
      const statusMap = {
        执行成功: 'success',
        已取消: 'warning',
        运行失败: 'danger'
      }
      return statusMap[status]
    }
  },
  props: {
    listQuery: {
      type: Object,
      default() {
        return {}
      }
    },
    placeHolder: {
      type: Object,
      default() {
        return {}
      }
    },
    calendarTypeOptions: {
      type: Array,
      default() {
        return []
      }
    },
    createTypeOptions: {
      type: Array,
      default() {
        return []
      }
    },
    statusOptions: {
      type: Array,
      default() {
        return []
      }
    },
    importanceOptions: {
      type: Array,
      default() {
        return []
      }
    },
    exportExcel: {
      type: Boolean,
      default: false
    },
    list: {
      type: Array,
      default() {
        return []
      }
    },
    detailData: {
      type: Object,
      default() {
        return {}
      }
    },
    total: {
      type: Number,
      default: 0
    },
    detailInfo: {
      type: Boolean,
      default: false
    },
    tableData: {
      type: Array,
      default() {
        return []
      }
    },
    detailTableData: {
      type: Array,
      default() {
        return []
      }
    },
    tableAction: {
      type: String,
      default: ''
    },
    actionLink: {
      type: String,
      default: ''
    },
    formData: {
      type: Array,
      default() {
        return []
      }
    },
    tHeader: {
      type: Array,
      default() {
        return []
      }
    },
    temp: {
      type: Object,
      default() {
        return {}
      }
    },
    rules: {
      type: Object,
      default() {
        return {}
      }
    },
    createTarget: {
      type: Function,
      default() {
        return {}
      }
    },
    updateTarget: {
      type: Function,
      default() {
        return {}
      }
    },
    deleteTarget: {
      type: Function,
      default() {
        return {}
      }
    },
    fetchList: {
      type: Function,
      default() {
        return {}
      }
    },
    fetchTargetDetail: {
      type: Function,
      default() {
        return {}
      }
    },
    resetTemp: {
      type: Function,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      tableKey: 0,
      listLoading: true,
      showReviewer: false,
      createType: '',
      editAction: '操作',
      dialogFormVisible: false,
      dialogDetailVisible: false,
      dialogStatus: '',
      textMap: {
        update: '编辑',
        create: '创建'
      },
      downloadLoading: false
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      this.fetchList(this.listQuery)
      this.listLoading = false
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    confirmEdit(row) {
      row.edit = false
      this.updateTarget(row)
    },
    handleModifyStatus(row, status) {
      this.updateTarget(row)
      row.status = status
    },
    sortChange(data) {
      const { prop, order } = data
      if (prop === 'id') {
        this.sortByID(order)
      }
    },
    sortByID(order) {
      if (order === 'ascending') {
        this.listQuery.sort = '+id'
      } else {
        this.listQuery.sort = '-id'
      }
      this.handleFilter()
    },
    handleCreate() {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.createTarget(this.temp)
          this.dialogFormVisible = false
        }
      })
    },
    handleUpdate(row) {
      this.temp = Object.assign({}, row) // copy obj
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.temp)
          this.updateTarget(tempData)
        }
      })
    },
    handleDelete(row) {
      this.deleteTarget(row)
      const index = this.list.indexOf(row)
      this.list.splice(index, 1)
    },
    fetchDetail(id) {
      this.fetchTargetDetail(id)
      this.dialogDetailVisible = true
    },
    changeStatus(row) {
      if (row.editAction === 'start') {
        row.status = '正在运行'
        row.editAction = 'stop'
      } else if (row.editAction === 'stop') {
        row.status = '已取消'
        row.editAction = false
      }
      console.log(row)
    },
    handleCommand(row) {
      row.status = '开始'
      row.editAction = 'start'
    },
    handleDownload() {
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = this.tHeader
        const data = this.list
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: 'table-list'
        })
        this.downloadLoading = false
      })
    },
    getSortClass: function(key) {
      const sort = this.listQuery.sort
      return sort === `+${key}`
        ? 'ascending'
        : sort === `-${key}`
          ? 'descending'
          : ''
    }
  }
}
</script>
