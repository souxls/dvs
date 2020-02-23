<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.title" placeholder="用户名" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-select v-model="listQuery.importance" placeholder="Imp" clearable style="width: 90px" class="filter-item">
        <el-option v-for="item in importanceOptions" :key="item" :label="item" :value="item" />
      </el-select>
      <el-select v-model="listQuery.type" placeholder="区域" clearable class="filter-item" style="width: 130px">
        <el-option v-for="item in idcTypeOptions" :key="item.key" :label="item.display_name+'('+item.key+')'" :value="item.key" />
      </el-select>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        搜索
      </el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate">
        添加用户
      </el-button>
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
      <el-table-column label="ID" prop="id" sortable="custom" align="center" width="70" :class-name="getSortClass('id')">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="用户名" width="90px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.username }}</span>
        </template>
      </el-table-column>
      <el-table-column label="账户" width="100px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.account }}</span>
        </template>
      </el-table-column>
      <el-table-column label="部门" width="130px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.department }}</span>
        </template>
      </el-table-column>
      <el-table-column label="职位" width="100px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.job }}</span>
        </template>
      </el-table-column>
      <el-table-column label="角色" width="120px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.rolename }}</span>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" width="120px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.createdate }}</span>
        </template>
      </el-table-column>
      <el-table-column label="状态" width="105" align="center">
        <template slot-scope="{row}">
          <template v-if="row.edit">
            <el-select v-model="row.status" size="mini">
              <el-option v-for="item in statusOptions" :key="item" :label="item" :value="item" />
            </el-select>
          </template>
          <span v-else>{{ row.status }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" min-width="240px" class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <router-link :to="'/user/permissions/edit/'+row.id">
            <el-button type="primary" size="mini">
              分配角色
            </el-button>
          </router-link>
          <el-button
            v-if="row.edit"
            type="success"
            size="mini"
            @click="confirmEdit(row)"
          >
            完成
          </el-button>
          <el-button
            v-else
            type="primary"
            size="mini"
            @click="row.edit=!row.edit"
          >
            编辑
          </el-button>
          <el-button v-if="row.status!='deleted'" size="mini" type="danger" @click="handleDelete(row)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

    <el-dialog title="新建用户" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="70px" style="width: 400px; margin-left:50px;">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="temp.username" />
        </el-form-item>
        <el-form-item label="账户" prop="account">
          <el-input v-model="temp.account" />
        </el-form-item>
        <el-form-item label="部门" prop="department">
          <el-input v-model="temp.department" />
        </el-form-item>
        <el-form-item label="职位" prop="job">
          <el-input v-model="temp.job" />
        </el-form-item>
        <el-form-item label="角色" prop="rolename">
          <el-input v-model="temp.rolname" />
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="temp.status" class="filter-item" placeholder="请选择">
            <el-option v-for="item in statusOptions" :key="item" :label="item" :value="item" />
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          取消
        </el-button>
        <el-button type="primary" @click="createData()">
          确认
        </el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import { fetchList, createUser, updateUser, deleteUser } from '@/api/user'
import waves from '@/directive/waves' // waves directive
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

const idcTypeOptions = [
  { key: 'aliyun', display_name: '阿里云' },
  { key: 'wx', display_name: '无锡' },
  { key: 'cd', display_name: '成都' },
  { key: 'yz', display_name: '亦庄' }
]

export default {
  name: 'ComplexTable',
  components: { Pagination },
  directives: { waves },
  data() {
    return {
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        username: undefined,
        account: undefined,
        department: undefined,
        job: undefined,
        rolename: undefined,
        status: undefined,
        sort: '+id'
      },
      importanceOptions: [1, 2, 3],
      idcTypeOptions,
      sortOptions: [{ label: 'ID Ascending', key: '+id' }, { label: 'ID Descending', key: '-id' }],
      statusOptions: ['禁用', '启用'],
      showReviewer: false,
      temp: {
        username: undefined,
        account: undefined,
        department: undefined,
        job: undefined,
        rolename: undefined,
        status: undefined
      },
      dialogFormVisible: false,
      dialogStatus: '',
      rules: {
        username: [{ required: true, message: 'username is required', trigger: 'blur' }],
        account: [{ required: true, message: 'account is required', trigger: 'blur' }]
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      fetchList(this.listQuery).then(response => {
        this.list = response.data.items
        this.total = response.data.total

        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
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
    resetTemp() {
      this.temp = {
        id: undefined,
        username: '',
        account: '',
        department: '',
        job: '',
        status: '正常',
        rolename: ''
      }
    },
    handleCreate() {
      this.resetTemp()
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          createUser(this.temp).then(() => {
            this.list.unshift(this.temp)
            this.dialogFormVisible = false
            this.$notify({
              title: 'Success',
              message: 'Created Successfully',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    handleUpdate(row) {
      this.temp = Object.assign({}, row) // copy obj
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.temp)
          updateUser(tempData).then(() => {
            for (const v of this.list) {
              if (v.id === this.temp.id) {
                const index = this.list.indexOf(v)
                this.list.splice(index, 1, this.temp)
                break
              }
            }
            this.dialogFormVisible = false
            this.$notify({
              title: 'Success',
              message: 'Update Successfully',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    handleDelete(row) {
      deleteUser(row.id).then(res => {
        if (res.status === 200) {
          this.$notify({
            title: 'Success',
            message: 'Delete Successfully',
            type: 'success',
            duration: 2000
          })
          const index = this.list.indexOf(row)
          this.list.splice(index, 1)
        } else {
          this.$notify({
            title: 'Failed',
            message: 'Delete Failed',
            type: 'error',
            duration: 2000
          })
        }
      })
    },
    confirmEdit(row) {
      row.edit = false
      updateUser(row).then(res => {
        if (res.status === 200) {
          this.$message({
            message: 'The status has been edited',
            type: 'success'
          })
        } else {
          this.$message({
            message: 'Edit failed',
            type: 'danger'
          })
        }
      })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => {
        if (j === 'timestamp') {
          return parseTime(v[j])
        } else {
          return v[j]
        }
      }))
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

<style scoped>
.cancel-btn {
  position: absolute;
  right: 15px;
  top: 10px;
}
</style>
