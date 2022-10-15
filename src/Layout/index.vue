<template>
  <el-container class="app-wrapper">
    <el-aside :width="asideWidth" class="sidebar-container">
      <div class="app_banner">
        <div v-if="store.sidebarType" style="margin-left: 10px">后台管理系统</div>
      </div>
      <Menu></Menu>
    </el-aside>
    <el-container class="container" :class="{ hidderContainer: !store.sidebarType }">
      <el-header class="header-container">
        <Header></Header>
      </el-header>
      <el-main style="background: #fff; margin: 0 15px">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import Menu from './Menu.vue';
import { computed, ref } from 'vue';
import Header from './Header/index.vue';
import { layoutStore } from '@/store';
const store = layoutStore();

const asideWidth = computed(() => {
  return store.sidebarType === true ? '180px' : '67px';
});
</script>

<style lang="scss" scoped>
.app-wrapper {
  width: 100vw;
  height: 100vh;
  background: #f5f5f5;
  margin: unset;
  .app_banner {
    text-align: center;
    line-height: 80px;
    color: #ffffff;
    width: 100%;
    height: 80px;
  }
}
.app-container {
  position: relative;
  width: 100%;
  height: 100%;
}
.container {
  width: calc(100% - $sideBarWidth);
  height: 100%;

  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  transition: all 0.28s;
  .header-container {
    height: 50px;
    line-height: 50px;
    background: #fff;
    margin-bottom: 15px;
    padding: 0 10px;
  }
  &.hidderContainer {
    width: calc(100% - $hideSideBarWidth);
  }
}

.el-aside {
  height: 100vh;
  overflow-y: auto;
  -ms-overflow-style: none; /* Edge */
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none; /* WebKit */
  }
}
</style>
