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
import { getRouters } from '@/api';
import { ref, watch, Ref, onMounted, inject } from 'vue';
import { layoutStore } from '@/store';
import { useRoute, useRouter } from 'vue-router';
import Mymenu from '@/components/Mymenu.vue';
import { loginStore } from '@/store';
const route = useRoute();

const defaultRouter = ref(sessionStorage.getItem('path') || '/tool/build');
const menusList: Ref = ref([]);
const store = layoutStore();
const router = useRouter();
const myPath = ref('');
const $api: any = inject('$api');
const loginstore = loginStore();

onMounted(() => {
  initMenusList();

  // menusList.value = getRouters();
});
const initMenusList = async () => {
  const res = await $api.user.getAllMenu(loginstore.getUser.empl_id);
  menusList.value = res!.data;
  // console.log(menusList.value);
  // menusList.value = await getRouters();
};
//监听路由的变化
watch(route, () => {
  myPath.value = route?.path;
});
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
