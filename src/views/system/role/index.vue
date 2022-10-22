<template>
  <div class="app-container">
    <el-form
      :model="state.queryParams"
      ref="queryForm"
      size="small"
      :inline="true"
      v-show="state.showSearch"
    >
      <el-form-item label="角色名称" prop="roleName">
        <el-input
          v-model="state.queryParams.roleName"
          placeholder="请输入角色名称"
          clearable
          style="width: 240px"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="权限字符" prop="roleKey">
        <el-input
          v-model="state.queryParams.roleKey"
          placeholder="请输入权限字符"
          clearable
          style="width: 240px"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-select
          v-model="state.queryParams.status"
          placeholder="角色状态"
          clearable
          style="width: 240px"
        >
          <el-option :value="1" />
          <el-option :value="2" />
        </el-select>
      </el-form-item>
      <el-form-item label="创建时间">
        <el-date-picker
          v-model="state.dateRange"
          style="width: 240px"
          value-format="yyyy-MM-dd"
          type="daterange"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="small" @click="handleQuery">搜索</el-button>
        <el-button size="small" @click="resetQuery(queryForm)">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button type="primary" plain size="small" @click="handleAdd">新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button type="success" plain size="small" :disabled="state.single" @click="handleUpdate">
          修改
        </el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          plain
          size="small"
          :disabled="state.multiple"
          @click="handleDelete"
        >
          删除
        </el-button>
      </el-col>
    </el-row>

    <el-table :data="state.roleList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="角色编号" prop="roleId" width="120" />
      <el-table-column label="角色名称" prop="roleName" show-overflow-tooltip width="150" />
      <el-table-column label="权限字符" prop="roleKey" show-overflow-tooltip width="150" />
      <el-table-column label="显示顺序" prop="roleSort" width="100" />
      <el-table-column label="状态" prop="status" align="center" width="100">
        <template #default="scope">
          <el-switch
            v-model="scope.row.status"
            active-value="0"
            inactive-value="1"
            @change="handleStatusChange(scope.row)"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" align="center" prop="createTime" width="180">
        <template #default="scope">
          <span>{{ scope.row.createTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template #default="scope">
          <el-button size="small" @click="handleUpdate(scope.row)">修改</el-button>
          <el-button size="small" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <Pagination
      v-show="state.total > 0"
      :total="state.total"
      :page.sync="state.queryParams.pageNum"
      :limit.sync="state.queryParams.pageSize"
      @pagination="getList"
    />

    <!-- 添加或修改角色配置对话框 -->
    <el-dialog
      :title="state.title"
      :model-value="state.open"
      width="500px"
      @close="state.open = false"
    >
      <el-form ref="g_form" :model="state.form" :rules="state.rules" label-width="100px">
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="state.form.roleName" placeholder="请输入角色名称" />
        </el-form-item>
        <el-form-item label="角色顺序" prop="roleSort">
          <el-input-number v-model="state.form.roleSort" controls-position="right" :min="0" />
        </el-form-item>
        <el-form-item label="状态">
          <el-radio-group v-model="state.form.status">
            <el-radio label="1" size="large">启用</el-radio>
            <el-radio label="2" size="large">禁用</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="菜单权限">
          <el-checkbox
            v-model="state.form.menuCheckStrictly"
            @change="handleCheckedTreeConnect($event, 'menu')"
          >
            null
          </el-checkbox>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm(g_form)">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue';

const queryForm = ref();
const g_form = ref();
// 遮罩层
const state = reactive({
  loading: true,
  // 选中数组
  ids: [],
  // 非单个禁用
  single: true,
  // 非多个禁用
  multiple: true,
  // 显示搜索条件
  showSearch: true,
  // 总条数
  total: 10,
  roleList: [
    {
      roleId: 1,
      roleName: 'qq',
      roleKey: 1231,
      roleSort: 123,
      createTime: new Date(),
    },
  ],
  title: '',
  open: false,

  openDataScope: false,
  menuExpand: false,
  menuNodeAll: false,
  deptExpand: true,
  deptNodeAll: false,
  dateRange: [],

  // 查询参数
  queryParams: {
    pageNum: 1,
    pageSize: 8,
    roleName: undefined,
    roleKey: undefined,
    status: undefined,
  },
  // 表单参数
  form: {
    roleName: '1',
    roleKey: 21,
    roleSort: 12,
    status: 'asd',
    menuCheckStrictly: 'adad',
    remark: '2',
  },
  defaultProps: {
    children: 'children',
    label: 'label',
  },
  // 表单校验
  rules: {
    roleName: [{ required: true, message: '角色名称不能为空', trigger: 'blur' }],
    roleKey: [{ required: true, message: '权限字符不能为空', trigger: 'blur' }],
    roleSort: [{ required: true, message: '角色顺序不能为空', trigger: 'blur' }],
  },
});
onMounted(() => {
  // state.getList();
});

/** 查询角色列表 */
const getList = () => {
  state.loading = true;
};

// 角色状态修改
const handleStatusChange = (row: any) => {
  console.log(row);
  ElMessageBox.confirm(`确认要${row.status == '1' ? '启用' : '停用'}该角色吗?`, '提示', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning',
  })
    .then(() => {
      state.roleList.map((item, index) => {
        if (item.roleId === row.roleId) {
          state.roleList.splice(index, 1);
        }
      });
      ElMessage({
        type: 'success',
        message: '操作成功！',
      });
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '操作取消！',
      });
    });
};
// 取消按钮
const cancel = () => {
  state.open = false;
  reset();
};
// 取消按钮（数据权限）
const cancelDataScope = () => {
  state.openDataScope = false;
  reset();
};
// 表单重置
const reset = () => {};

const handleQuery = () => {
  state.queryParams.pageNum = 1;
  getList();
};

const resetQuery = (el: any) => {
  if (!el) return;
  state.dateRange = [];
  el.resetFields();
};
// 多选框选中数据
const handleSelectionChange = (selection: any) => {
  // state.ids = selection.map(item => item.roleId);
  state.single = selection.length != 1;
  // state.multiple = !selection.length;
};
const handleCheckedTreeConnect = (value: any, type: any) => {};
const handleAdd = () => {
  reset();
  state.open = true;
  state.title = '添加角色';
};

const handleUpdate = (row: any) => {
  reset();
  console.log(row);

  state.form = row;
  state.open = true;
};
/** 提交按钮 */
const submitForm = (el: any) => {
  el.validate((valid: any) => {
    if (valid) {
      state.roleList.push({
        roleId: 2,
        roleName: state.form.roleName,
        roleKey: state.form.roleKey,
        roleSort: state.form.roleSort,
        createTime: new Date(),
      });
    }
  });
  state.open = false;
};

/** 删除按钮操作 */
const handleDelete = (row: any) => {
  ElMessageBox.confirm('确认删除?', '提示', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning',
  })
    .then(() => {
      state.roleList.map((item, index) => {
        if (item.roleId === row.roleId) {
          state.roleList.splice(index, 1);
        }
      });
      ElMessage({
        type: 'success',
        message: '删除完成！',
      });
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '操作取消！',
      });
    });
};
</script>

<style lang="scss" scoped></style>
