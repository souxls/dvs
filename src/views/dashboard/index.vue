<template>
  <div class="dashboard-editor-container">

    <panel-group @handleSetLineChartData="handleSetLineChartData" />

    <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
      <line-chart :chart-data="lineChartData" />
    </el-row>

    <el-row :gutter="32">
      <el-col :xs="36" :sm="36" :lg="12">
        <div class="chart-wrapper">
          <idc-chart />
        </div>
      </el-col>
      <el-col :xs="36" :sm="36" :lg="12">
        <div class="chart-wrapper">
          <host-chart />
        </div>
      </el-col>
    </el-row>
    <el-row style="padding-right:8px;margin-bottom:30px;">
      <transaction-table />
    </el-row>
  </div>
</template>

<script>
import PanelGroup from './components/PanelGroup'
import HostChart from './components/HostChart'
import IdcChart from './components/IdcChart'
import TransactionTable from './components/TransactionTable'

export default {
  name: 'DashboardAdmin',
  components: {
    PanelGroup,
    IdcChart,
    HostChart,
    TransactionTable
  }
}
</script>

<style lang="scss" scoped>
.dashboard-editor-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  position: relative;

  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
}

@media (max-width:1024px) {
  .chart-wrapper {
    padding: 8px;
  }
}
</style>
