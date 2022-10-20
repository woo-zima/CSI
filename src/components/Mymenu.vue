<template>
  <div>
    <template v-for="(item, index) in menusList">
      <el-sub-menu
        :index="item.path"
        :key="item.name"
        v-if="item.children && item.children.length > 0"
        @click="saveSubMenuPath(item.path)"
      >
        <template #title>
          <span>{{ $t(`menus.${item.name}`) }}</span>
        </template>
        <Mymenu :menusList="item.children"></Mymenu>
      </el-sub-menu>
      <el-menu-item
        v-else
        :index="item.path"
        @click="savePath(item.meta ? item.meta + '/' + item.name : item.name)"
      >
        <span>{{ $t(`menus.${item.name}`) }}</span>
      </el-menu-item>
    </template>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { RoutersType } from '@/api';

const props = defineProps({
  menusList: {
    type: Array<RoutersType>,
    default: () => [],
  },
});
const myPath = ref('');
const router = useRouter();
watch(
  () => props.menusList,
  newVal => {
    console.log(newVal);
  }
);
//监听路由的变化

function savePath(x: string) {
  let RootPath = sessionStorage.getItem('path');
  sessionStorage.setItem('path', `${x}`);
  // router.currentRoute.value.path = '';

  router.push(`/${x}`);
}
const saveSubMenuPath = (path: string) => {};
</script>

<style scoped>
.bgc {
  color: #ffd04b;
}
</style>
