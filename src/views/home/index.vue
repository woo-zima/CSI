<template>
  <div>home</div>
</template>

<script setup lang="ts">
import { inject, onMounted } from 'vue';

const $api = inject('$api');

onMounted(async () => {
  // const res = await $api.user.login();
  // console.log(res);
});
</script>

<style lang="scss" scoped></style>
