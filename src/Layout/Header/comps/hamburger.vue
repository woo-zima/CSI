<template>
  <div class="ham-content" @click="handleClick">
    <el-icon color="#000" v-if="icon">open</el-icon>
    <el-icon color="#000" v-else>close</el-icon>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
//   import IconHomeJiHua from '';
//   import IconHomeClose from '~icons/home/zhankai';
import { layoutStore } from '@/store';
const store = layoutStore();
const handleClick = (): undefined => {
  store.CHANGE_SIDERTYPE;
  return;
};
const icon = computed(() => {
  return store.sidebarType == true ? true : false;
});
</script>

<style lang="scss" scoped>
.ham-content {
  margin: 0 15px;
  font-size: 22px;
  & ::v-deep .el-icon {
    vertical-align: -4px;
  }
}
</style>
