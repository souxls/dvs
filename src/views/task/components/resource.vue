<template>
  <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="90px" style="width: 400px; margin-left:50px;">
    <el-form-item label="任务名称" prop="taskname">
      <el-input v-model="temp.appname" />
    </el-form-item>
    <el-form-item label="描述" prop="description">
      <el-input v-model="temp.descrition" type="textarea" placeholder="请描述项目用途和功能等" autosize />
    </el-form-item>
    <el-form-item label="资源类型" prop="resoucetype">
      <el-input v-model="temp.resourcetype" />
    </el-form-item>
    <el-form-item label="申请日期">
      <span> {{ temp.createdate }} </span>
    </el-form-item>
    <el-form-item label="申请人">
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
