<template>
  <div class="maintain">
    <div class="header">
      <h3>维护个人信息</h3>
    </div>
    <div class="contentF">
      <form>
        <input class="uname" type="text" />

        <button>保存</button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';

const state = reactive({
  personalMsg: {
    员工号: '12',
    登录密码: '123',
    姓名: 'qqq',
    性别: '女',
    年龄: '18',
    所属部门: 'A2',
    职位: '31',
    自我介绍: 'asdsa',
    兴趣爱好: '唱跳',
    联系方式: '12313434',
    系统角色: 'staff',
  },
});
</script>
<style scoped>
.maintain {
}
</style>
