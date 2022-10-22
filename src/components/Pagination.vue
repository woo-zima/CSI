<template>
  <div>
    <el-pagination
      :currentPage="1"
      v-model:page-size="props.limit"
      layout="prev, pager, next, jumper"
      :total="props.total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  total: {
    type: Number,
    default: () => 0,
  },
  limit: {
    type: Number,
    default: () => 0,
  },
  page: {
    type: Number,
    default: () => 0,
  },
});

const emits = defineEmits(['pagination']);

const handleSizeChange = (val: number) => {
  console.log(`${val} items per page`);
};
const handleCurrentChange = (val: number) => {
  console.log(`current page: ${val}`);
};
</script>

<style scoped></style>
