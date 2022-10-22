<template>
  <div class="nav">
    <bread-crumb />
    <div class="nav-right">
      <div @click="switchLang">change</div>
      <!-- <screenful style="margin-right: 20px" /> -->
      <avatar />
    </div>
  </div>
</template>

<script setup lang="ts">
import Hamburger from './comps/hamburger.vue';
import BreadCrumb from './comps/breadCrumb.vue';
import avatar from './comps/avatar.vue';
// import Screenful from './comps/screenful.vue';
import { getCurrentInstance } from 'vue';
import useLanguage from '@/utils/useLanguage';

const {
  i18n: { t }, // 解构实例用具t 访问语言变量
  currentLocale, //当前国际化
  changeLocale, // 修改国际化
} = useLanguage();

// 切换语言
const switchLang = (): MouseEvent | undefined => {
  console.log(currentLocale.value);

  if (currentLocale.value == 'zh-CN') {
    changeLocale('en-US');
  } else {
    changeLocale('zh-CN');
  }
  return;
};
</script>

<style lang="scss" scoped>
.nav {
  height: 50px;
  line-height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  .nav-right {
    flex: 1;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
}
</style>
