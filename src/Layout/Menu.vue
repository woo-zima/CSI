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
    <template v-for="(item, index) in menusList">
      <el-sub-menu
        :index="(index + 1).toString()"
        :key="index"
        v-if="item.children && item.children.length > 1"
      >
        <template #title>
          <span>{{ item.meta && item.meta.title }}</span>
        </template>
        <el-menu-item
          :index="item.path + '/' + it.path"
          v-for="(it, index) in item.children"
          :key="index"
          @click="savePath(item.path, it.path)"
        >
          <template #title>
            <span>{{ $t(`menus.${it.path}`) }}</span>
          </template>
        </el-menu-item>
      </el-sub-menu>
      <el-menu-item
        v-else
        :index="item.children[0].path"
        :class="{ bgc: myPath === '/' + item.children[0].path }"
        key="index"
        @click="savePath(item.children[0].path, '')"
      >
        <!-- <el-tooltip
          :disabled="store.sidebarType"
          class="box-item"
          effect="dark"
          placement="right"
          :offset="offsetValue"
        >
          <template #content>
            <span>{{ item.children[0].meta.title }}</span>
          </template>
        </el-tooltip> -->
        <span>{{ $t(`menus.${item.children[0].path}`) }}</span>
      </el-menu-item>
    </template>
  </el-menu>
</template>

<script setup lang="ts">
import { getRouters, RoutersType, iconType } from '@/api';
import { ref, watch, Ref } from 'vue';
import { layoutStore } from '@/store';
import { useRoute, useRouter } from 'vue-router';
const route = useRoute();

const defaultRouter = ref(sessionStorage.getItem('path') || '/tool/build');
const menusList: Ref = ref([]);
const store = layoutStore();
const router = useRouter();
const myPath = ref('');
const initMenusList = async () => {
  menusList.value = await getRouters();
  // console.log(menusList.value);
};
//监听路由的变化
watch(route, () => {
  myPath.value = route.matched && route.matched[1] && route.matched[1].path;
});
function savePath(x: string, y: string) {
  if (x && y) {
    sessionStorage.setItem('path', `${x}/${y}`);
  } else {
    sessionStorage.setItem('path', `${x}`);
    router.currentRoute.value.path = '';
    router.push(`/${x}`);
  }
}
initMenusList();
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
