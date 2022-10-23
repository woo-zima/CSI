<template>
  <div class="maintain">
    <el-row>
      <el-col :span="6" :offset="2">
        <el-card shadow="hover">
          <template #header>
            <div class="card-header">
              <span>个人信息</span>
            </div>
          </template>

          <div class="leftM">
            <div class="msgItem">
              <span>姓名:</span>
              {{ personalMsg.username }}
            </div>
            <div class="msgItem">
              <span>员工号:</span>
              {{ personalMsg.staffId }}
            </div>
            <div class="msgItem">
              <span>性别:</span>
              {{ personalMsg.gender }}
            </div>
            <div class="msgItem">
              <span>年龄:</span>
              {{ personalMsg.age }}
            </div>
            <div class="msgItem">
              <span>所属部门:</span>
              {{ personalMsg.department }}
            </div>
            <div class="msgItem">
              <span>职位:</span>
              {{ personalMsg.job }}
            </div>
          </div>
        </el-card>
      </el-col>

      <el-col :span="12" :offset="2">
        <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
          <el-tab-pane label="基本资料" name="first">
            <div class="rightM">
              <div class="msgItem">
                <div>
                  <label>兴趣爱好:</label>
                </div>

                <textarea
                  type="text"
                  :value="personalMsg.hobby"
                  :placeholder="personalMsg.hobby"
                ></textarea>
              </div>
              <div class="msgItem">
                <div>
                  <label>自我介绍:</label>
                </div>

                <textarea
                  type="text"
                  :value="personalMsg.self_introduction"
                  :placeholder="personalMsg.self_introduction"
                ></textarea>
              </div>
            </div>
            <button>保存</button>
          </el-tab-pane>

          <el-tab-pane label="修改密码" name="second">
            <div class="msgItem">
              <div>
                <label>旧密码:</label>
              </div>

              <input type="text" :value="passFrom.oldpass" placeholder="请输入旧密码" />
            </div>
            <div class="msgItem">
              <div>
                <label>新密码:</label>
              </div>

              <input type="text" :value="passFrom.newPass" placeholder="请输入新密码" />
            </div>
            <div class="msgItem">
              <div>
                <label>确认密码:</label>
              </div>

              <input type="text" :value="passFrom.checkPass" placeholder="请确认密码" />
            </div>
            <button>确认</button>
          </el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { loginStore } from '@/store';
import { reactive, toRefs, ref, onMounted } from 'vue';
const store = loginStore();

onMounted(() => {
  const user = store.getUser;
  console.log(user);
  state.personalMsg.username = user.username;
});
const state = reactive({
  personalMsg: {
    staffId: '12',
    password: '123',
    username: 'qqq',
    gender: '女',
    age: '18',
    department: 'A2',
    job: '31',
    self_introduction: 'asdsa',
    hobby: '唱跳',
    contact: '12313434',
    systemRole: 'staff',
  },
  passFrom: {
    oldpass: '',
    newPass: '',
    checkPass: '',
  },
});
const activeName = ref('first');
const handleClick = () => {};
const { personalMsg, passFrom } = toRefs(state);
</script>
<style scoped>
.maintain {
}
.leftM {
  position: relative;
}
.msgItem {
  text-align: start;
  background-color: inherit;
  border: 1px solid #e7eaec;
  display: block;
  margin-bottom: -1px;
  padding: 10px 15px;
}
.msgItem div {
  padding-bottom: 5px;
}
</style>
