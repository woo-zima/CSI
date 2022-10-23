<template>
  <div>home</div>
</template>

<script setup lang="ts">
import { inject, onMounted } from 'vue';
import { loginStore } from '@/store';

const $api: any = inject('$api');
const store = loginStore();

onMounted(async () => {
  // const res = await $api.user.getAllMenu(store.getUser.empl_id);
  // console.log(res);
});
</script>

<style lang="scss" scoped></style>
