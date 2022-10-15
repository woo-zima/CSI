<template>
  <div class="demo-type">
    <div>
      <el-dropdown>
        <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="layout">退出</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>
<script setup lang="ts">
import { layoutStore } from '@/store';
import { useRoute, useRouter } from 'vue-router';
const store = layoutStore();
const router = useRouter();
const layout = () => {
  // store.dispatch('LayOut');
  router.push({
    path: '/',
  });
};
</script>

<style lang="scss" scoped>
.demo-type {
  display: flex;
}
.demo-type > div {
  flex: 1;
  text-align: center;
}
.demo-type > div:not(:last-child) {
  border-right: 1px solid var(--el-border-color);
}
</style>
