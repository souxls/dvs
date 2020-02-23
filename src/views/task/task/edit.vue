<template>
  <div class="TaskInfo">
    <aside style="margin: 0 0 30px">任务状态</aside>
    <el-steps :active="2" align-center>
      <el-step title="步骤1" description="这是一段很长很长很长的描述性文字" />
      <el-step title="步骤2" description="这是一段很长很长很长的描述性文字" />
      <el-step title="步骤3" description="这是一段很长很长很长的描述性文字" />
      <el-step title="步骤4" description="这是一段很长很长很长的描述性文字" />
    </el-steps>
    <aside style="margin-top: 30px">详情</aside>
    <el-card class="box-card">
      <div v-for="o in 4" :key="o" class="text item">
        {{ '列表内容 ' + o }}
      </div>
    </el-card>
  </div>
</template>

<style scoped>
.TaskInfo {
  width: 100%;
  padding: 40px;
}
.text {
  font-size: 14px;
}
.item {
  padding: 5px 0;
}
</style>
