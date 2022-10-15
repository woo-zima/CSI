<template>
  <el-breadcrumb separator="/">
    <el-breadcrumb-item v-for="(item, index) in breadCrumbList" key="index">
      <span v-if="index === breadCrumbList.length - 1" class="noRedirect">
        {{ $t(`menus.${String(item.name)}`) }}
      </span>
      <span v-else class="redirect" @click:="handleRedirect(item.path)">
        {{ $t(`menus.${!String(item.name) ? '/' : String(item.name)}`) }}
      </span>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>
<script setup lang="ts">
import { useRoute, useRouter, RouteLocationMatched } from 'vue-router';
import { watch, ref, Ref } from 'vue';
const breadCrumbList: Ref<RouteLocationMatched[]> = ref([]);
const route = useRoute();
const router = useRouter();
const initBreadCrumb = () => {
  // console.log(route.matched);

  breadCrumbList.value = route.matched;
};
watch(
  route,
  () => {
    initBreadCrumb();
  },
  { deep: true, immediate: true }
);
const handleRedirect = (path: string): MouseEvent | undefined => {
  router.push(path);
  return;
};
</script>

<style lang="scss" scoped>
.noRedirect {
  color: #97a8be;
  cursor: text;
}
.redirect {
  color: #666;
  font-weight: 600;
  cursor: pointer;
  &:hover {
    color: $menuBg;
  }
}
</style>
