<template>
  <div class="transferPage-container">
    <aside style="margin: 0 0 30px">{{ title }}</aside>
    <el-transfer
      v-model="targetdata"
      filterable
      :filter-method="filterMethod"
      :filter-placeholder="filterPlaceholder"
      :data="data"
      :titles="titles"
      @change="handleChange"
    />
  </div>
</template>

<script>
export default {
  name: 'TransferPage',
  props: {
    data: {
      type: Array,
      default() {
        return []
      }
    },
    targetdata: {
      type: Array,
      default() {
        return []
      }
    },
    titles: {
      type: Array,
      default() {
        return []
      }
    },
    title: {
      type: String,
      default: ''
    },
    filterPlaceholder: {
      type: String,
      default: ''
    },
    updateData: {
      type: Function,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      value: [],
      filterMethod(query, item) {
        return item.index.indexOf(query) > -1
      }
    }
  },
  methods: {
    handleChange(value, direction, movedKeys) {
      this.updateData(value)
    }
  }
}
</script>

<style lang="scss">
.transferPage {
  width: 100%;
  padding: 40px;
}
.el-transfer {
  margin-top:15px;
  min-height:300px;
}
.el-transfer-panel {
  min-width: 45%;
}
.el-transfer-panel__body {
  min-height: 450px;
}
.el-transfer-panel__list.is-filterable {
  height: 100%;
}
</style>
