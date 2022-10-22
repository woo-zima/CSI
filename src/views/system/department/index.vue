<template>
  <div class="app-container">
    <el-form
      :model="state.queryParams"
      ref="queryForm"
      size="small"
      :inline="true"
      v-show="state.showSearch"
    >
      <el-form-item label="部门名称" prop="deptName">
        <el-input
          v-model="state.queryParams.deptName"
          placeholder="请输入部门名称"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-select v-model="state.queryParams.status" placeholder="部门状态" clearable>
          <el-option :value="1" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="small" @click="handleQuery">搜索</el-button>
        <el-button size="small" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button type="primary" plain size="small" @click="handleAdd">新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button type="info" plain size="small" @click="toggleExpandAll">展开/折叠</el-button>
      </el-col>
      <!-- <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar> -->
    </el-row>

    <el-table
      v-if="state.refreshTable"
      v-loading="state.loading"
      :data="state.deptList"
      row-key="deptId"
      :default-expand-all="state.isExpandAll"
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <el-table-column prop="deptName" label="部门名称" width="260"></el-table-column>
      <el-table-column prop="orderNum" label="排序" width="200"></el-table-column>
      <el-table-column prop="status" label="状态" width="100">
        <template #default="scope">
          <!-- <dict-tag :options="dict.type.sys_normal_disable" :value="scope.row.status" /> -->
        </template>
      </el-table-column>
      <el-table-column label="创建时间" align="center" prop="createTime" width="200">
        <template #default="scope">
          <span>{{ scope.row.createTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template #default="scope">
          <el-button size="small" type="text" icon="el-icon-edit" @click="handleUpdate(scope.row)">
            修改
          </el-button>
          <el-button size="small" type="text" icon="el-icon-plus" @click="handleAdd(scope.row)">
            新增
          </el-button>
          <el-button
            v-if="scope.row.parentId != 0"
            size="small"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 添加或修改部门对话框 -->
    <el-dialog :title="state.title" :visible.sync="state.open" width="600px" append-to-body>
      <el-form ref="form" :model="state.form" :rules="rules" label-width="80px">
        <el-row>
          <el-col :span="24" v-if="state.form.parentId !== 0">
            <el-form-item label="上级部门" prop="parentId">
              <!-- <treeselect
                v-model="state.form.parentId"
                :options="state.deptOptions"
                :normalizer="state.normalizer"
                placeholder="选择上级部门"
              /> -->
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="部门名称" prop="deptName">
              <el-input v-model="state.form.deptName" placeholder="请输入部门名称" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="显示排序" prop="orderNum">
              <el-input-number v-model="state.form.orderNum" controls-position="right" :min="0" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="负责人" prop="leader">
              <el-input v-model="state.form.leader" placeholder="请输入负责人" maxlength="20" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="联系电话" prop="phone">
              <el-input v-model="state.form.phone" placeholder="请输入联系电话" maxlength="11" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="邮箱" prop="email">
              <el-input v-model="state.form.email" placeholder="请输入邮箱" maxlength="50" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="部门状态">
              <el-radio-group v-model="state.form.status">
                <el-radio key="option1" label="option1">
                  {{ 'option1' }}
                </el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
const state = reactive({
  open: false,
  title: 'a',
  showSearch: true,
  refreshTable: true,
  loading: false,
  queryParams: {
    deptName: '',
    status: '',
  },
  deptList: [],
  isExpandAll: false,
  form: {
    deptName: '1',
    orderNum: 'asd',
    parentId: 0,
    status: 'asd',
    leader: '',
    phone: '',
    email: '',
  },
  deptOptions: '',
  normalizer: '',
});
const rules = {};
const handleQuery = () => {};
const resetQuery = () => {};
const handleAdd = (row: any) => {};
const handleDelete = (row: any) => {};
const showSearch = () => {};
const getList = () => {};
const toggleExpandAll = () => {};
const handleUpdate = (row: any) => {};
const submitForm = () => {};
const cancel = () => {};
</script>

<style lang="scss" scoped></style>
