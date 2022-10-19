<template>
  <el-menu
    active-text-color="#ffd04b"
    background-color="#545c64"
    class="el-menu-vertical"
    :default-active="myPath || defaultRouter"
    text-color="#fff"
    router
    unique-opened
    :collapse="!store.sidebarType"
  >
    <Mymenu :menusList="menusList"></Mymenu>
  </el-menu>
</template>

<script setup lang="ts">
import { getRouters, RoutersType, iconType } from '@/api';
import { ref, watch, Ref, onMounted } from 'vue';
import { layoutStore } from '@/store';
import { useRoute, useRouter } from 'vue-router';
import Mymenu from '@/components/Mymenu.vue';
const route = useRoute();

const defaultRouter = ref(sessionStorage.getItem('path') || '/tool/build');
const menusList: Ref = ref([]);
const store = layoutStore();
const router = useRouter();
const myPath = ref('');

onMounted(() => {
  initMenusList();

  // menusList.value = getRouters();
});
const initMenusList = async () => {
  menusList.value = await getRouters();
  // console.log(menusList.value);
};
//监听路由的变化
watch(route, () => {
  myPath.value = route?.path;
});
// function savePath(x: string, y: string) {
//   if (x && y) {
//     sessionStorage.setItem('path', `${x}/${y}`);
//   } else {
//     sessionStorage.setItem('path', `${x}`);
//     router.currentRoute.value.path = '';
//     router.push(`/${x}`);
//   }
// }
</script>

<style lang="scss">
.bgc {
  color: #ffd04b;
}
.el-menu-vertical {
  height: calc(100% - 80px);
  width: 100%;
  border: none;
}
</style>
