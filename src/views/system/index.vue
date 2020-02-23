<template>
  <div class="app-container">
    <el-tabs v-model="activeName" style="margin-top:15px;" type="border-card">
      <el-tab-pane v-for="item in tabMapOptions" :key="item.key" :label="item.label" :name="item.key">
        <keep-alive>
          <smtp v-if="activeName=='SMTP'" :type="SMTP" @create="showCreatedTimes" />
          <System v-else-if="activeName=='SYSTEM'" :type="SYSTEM" />
          <Git v-else-if="activeName=='GIT'" :type="GIT" />
          <jenkins v-else-if="activeName=='JENKINS'" :type="JENKINS" />
        </keep-alive>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import Smtp from './components/smtp'
import System from './components/system'
import Git from './components/git'
import Jenkins from './components/jenkins'

export default {
  components: { Smtp, System, Git, Jenkins },
  data() {
    return {
      tabMapOptions: [
        { label: '系统设置', key: 'SYSTEM' },
        { label: '邮件设置', key: 'SMTP' },
        { label: 'Git设置', key: 'GIT' },
        { label: 'Jenkins设置', key: 'JENKINS' }
      ],
      activeName: 'SYSTEM'
    }
  },
  watch: {
    activeName(val) {
      this.$router.push(`${this.$route.path}?tab=${val}`)
    }
  },
  created() {
    // init the default  selected tab
    const tab = this.$route.query.tab
    if (tab) {
      this.activeName = tab
    }
  }
}
</script>

<style scoped>
  .system-container {
    margin: 30px;
  }
</style>
