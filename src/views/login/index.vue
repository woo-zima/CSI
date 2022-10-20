<template>
  <div class="app-container">
    <div class="app-content">
      <div class="app-image">{{ $t('login.title') }}</div>
      <el-form
        ref="ruleFormRef"
        :model="ruleForm"
        status-icon
        :rules="rules"
        label-width="90px"
        class="demo-ruleForm"
      >
        <el-form-item label="用户账号" prop="username">
          <el-input v-model="ruleForm.username" type="username" autocomplete="off" />
        </el-form-item>
        <el-form-item label="用户密码" prop="password">
          <el-input v-model="ruleForm.password" type="password" autocomplete="off" />
        </el-form-item>
        <el-form-item label="验证码" prop="code">
          <el-input v-model="ruleForm.code" />
        </el-form-item>
        <el-form-item prop="remember">
          <el-checkbox v-model="ruleForm.remember">记住密码</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm(ruleFormRef)">
            {{ $t('login.btnTitle') }}
          </el-button>
          <el-button @click="resetForm(ruleFormRef)">{{ $t('login.register') }}</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script setup lang="ts">
import { toRefs, getCurrentInstance, reactive, ref, inject } from 'vue';
import { loginStore } from '@/store';
import { useRouter } from 'vue-router';
import type { FormInstance, FormRules } from 'element-plus';
import { es } from 'element-plus/es/locale';
// import Cookies from 'js-cookie';
// import { encrypt } from '@/utils/passencrypt';
const title = ref('用户登录');
const store = loginStore();
const router = useRouter();
const ruleFormRef = ref();

const $api: any = inject('$api');
const data = reactive({
  ruleForm: {
    username: '',
    password: '',
    code: '',
    uuid: 1,
    remember: false,
  },
  rules: {
    username: [{ required: true, trigger: 'blur', message: '请输入您的账号' }],
    password: [{ required: true, trigger: 'blur', message: '请输入您的密码' }],
  },
});
const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate(valid => {
    if (valid) {
      // ruleForm.value.password = encrypt(ruleForm.value.password);
      //调用 store里面actions登录方法
      login();
    }
  });
};
function resetForm(formEl: FormInstance | undefined) {
  if (!formEl) return;
  formEl.resetFields();
}
const login = async () => {
  const res = await $api.user.login(data.ruleForm.username, data.ruleForm.password);
  if (res) {
    console.log(res);
    if (res.data.status === '200') {
      console.log(1);

      store.setUserInfo(res.data);
      localStorage.setItem('jwt', res.data.jwt);
      router.push({
        path: '/home',
      });
    } else {
      router.push({
        path: '/login',
      });
    }
  }
};

const { rules, ruleForm } = toRefs(data);
</script>

<style lang="scss" scoped>
.app-container {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  .app-content {
    position: relative;
    margin: 0 auto;
    .app-image {
      width: 100%;
      height: 50px;
      font-weight: 700;
      color: #abc;
      text-align: center;
    }
  }
}
</style>
