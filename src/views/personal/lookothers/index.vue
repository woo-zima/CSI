<template>
  <div class="app-container">
    <el-form
      :model="state.queryParams"
      ref="queryForm"
      size="small"
      :inline="true"
      v-show="state.showSearch"
    >
      <el-form-item label="员工姓名" prop="staffName">
        <el-input
          v-model="state.queryParams.staffName"
          placeholder="请输入员工姓名"
          clearable
          style="width: 240px"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="部门名称" prop="deptName">
        <el-input
          v-model="state.queryParams.deptName"
          placeholder="请输入部门名称"
          clearable
          style="width: 240px"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="small" @click="handleQuery">搜索</el-button>
        <el-button size="small" @click="resetQuery(queryForm)">重置</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="state.staffList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="员工姓名" prop="staffName" width="120" />
      <el-table-column label="所属部门" prop="deptName" show-overflow-tooltip width="150" />
    </el-table>

    <Pagination
      v-show="state.total > 0"
      :total="state.total"
      :page.sync="state.queryParams.pageNum"
      :limit.sync="state.queryParams.pageSize"
      @pagination="getList"
    />
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
  // 角色表格数据
  staffList: [
    {
      staffName: 'ww',
      deptName: 'qq',
      roleKey: 1231,
      roleSort: 123,
      createTime: new Date(),
    },
  ],
  // 弹出层标题
  title: '',
  // 是否显示弹出层
  open: false,
  // 是否显示弹出层（数据权限）
  openDataScope: false,
  menuExpand: false,
  menuNodeAll: false,
  deptExpand: true,
  deptNodeAll: false,
  // 日期范围
  dateRange: [],
  // 菜单列表
  menuOptions: [],
  // 部门列表
  deptOptions: [],
  // 查询参数
  queryParams: {
    staffName: '',
    pageSize: 8,
    deptName: '',
    pageNum: 0,
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
  // listRole(state.addDateRange(state.queryParams, state.dateRange)).then(response => {
  //   state.roleList = response.rows;
  //   state.total = response.total;
  //   state.loading = false;
  // });
};
// 表单重置
const reset = () => {};
/** 搜索按钮操作 */
const handleQuery = () => {
  state.queryParams.pageNum = 1;
  getList();
};
/** 重置按钮操作 */
const resetQuery = (el: any) => {
  if (!el) return;
  state.dateRange = [];
  el.resetFields();
  // handleQuery();
};
// 多选框选中数据
const handleSelectionChange = (selection: any) => {
  // state.ids = selection.map(item => item.roleId);
  state.single = selection.length != 1;
  // state.multiple = !selection.length;
};
</script>

<style lang="scss" scoped></style>
