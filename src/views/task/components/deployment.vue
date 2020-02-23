<template>
  <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="90px" style="width: 400px; margin-left:50px;">
    <el-form-item label="任务名称" prop="taskname">
      <el-input v-model="temp.taskname" />
    </el-form-item>
    <el-form-item label="描述" prop="description">
      <el-input v-model="temp.description" type="textarea" />
    </el-form-item>
    <el-form-item label="应用名称" prop="appname">
      <el-input v-model="temp.appname" />
    </el-form-item>
    <el-form-item label="资源信息" prop="resource">
      <el-input v-model="temp.resource" />
    </el-form-item>
    <el-form-item label="发布类型" prop="deploytype">
      <el-input v-model="temp.deploytype" />
    </el-form-item>
    <el-form-item label="创建日期">
      <span> {{ temp.createdate }} </span>
    </el-form-item>
    <el-form-item label="创建者">
      <span>{{ temp.owner }}</span>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  props: {
    temp: {
      type: Object,
      default: () => {
        return {
          appname: '',
          description: '',
          repo: '',
          apptype: ''
        }
      }
    }
  }
}
</script>
