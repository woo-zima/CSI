<template>
  <div>
    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button type="primary" plain size="small" @click="handleAdd">新增</el-button>
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

    <el-table :data="state.readList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="代办者ID" prop="readId" width="120" />
      <el-table-column label="代办者名称" prop="readName" show-overflow-tooltip width="150" />
      <el-table-column label="代办者部门" prop="readDept" show-overflow-tooltip width="150" />

      <el-table-column label="操作" align="center">
        <template #default="scope">
          <el-button size="small" @click="handleUpdate(scope.row)">修改</el-button>
          <el-button size="small" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 添加或修改角色配置对话框 -->
    <el-dialog
      :title="state.title"
      :model-value="state.open"
      width="500px"
      @close="state.open = false"
    >
      <input class="showRead" :value="state.treeForm.readDept" type="text" />
      <input class="showRead" :value="state.treeForm.readName" type="text" />

      <el-tree :data="data" accordion :props="defaultProps" @node-click="handleNodeClick" />
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">设为读者</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue';

const g_form = ref();
const state = reactive({
  open: false,
  title: '',
  // 非多个禁用
  multiple: true,
  // 非单个禁用
  single: true,
  readList: [
    {
      readId: 1,
      readName: 'qq',
      readDept: 'A部门',
    },
  ],
  treeForm: {
    readId: 1,
    readName: '',
    readDept: '',
  },
});
let count = 1;

interface Tree {
  label: string;
  isDept?: Boolean;
  children?: Tree[];
}
const defaultProps = {
  children: 'children',
  label: 'label',
};

const data: Tree[] = [
  {
    label: 'A公司',
    children: [
      {
        label: '研发部门',
        isDept: true,
        children: [
          {
            label: '小张',
          },
        ],
      },
      {
        label: '宣发部门',
        isDept: true,
        children: [
          {
            label: '小王',
          },
        ],
      },
    ],
  },
];

const handleAdd = () => {
  // state.getMenuTreeselect();
  state.open = true;
  state.title = '添加读者';
};
const handleDelete = (row: any) => {
  if (row) {
    state.readList.map((item, index) => {
      if ((item.readId = row.readId)) {
        state.readList.splice(index, 1);
      }
    });
  }
};
const handleUpdate = (row: any) => {
  state.open = true;
  state.title = '修改读者';
  state.treeForm = row;
};
// 多选框选中数据
const handleSelectionChange = (selection: any) => {
  // state.ids = selection.map(item => item.roleId);
  state.single = selection.length != 1;
  // state.multiple = !selection.length;
};

const cancel = () => {
  state.open = false;
  resetF();
};
const submitForm = () => {
  if (state.treeForm.readName == '' && state.treeForm.readDept == '') {
    ElMessage({
      message: '请选择后提交！',
      type: 'warning',
    });
  } else {
    if (cheackTreeForm(state.treeForm)) {
      console.log(checkTreeIndex(state.treeForm));
      let idx = checkTreeIndex(state.treeForm)[0];
      state.readList[idx] = state.treeForm;
    } else {
      state.treeForm.readId = Math.floor(Math.random() * 1000);
      state.readList.push(state.treeForm);
    }
    state.open = false;
  }
  resetF();
};

const resetF = () => {
  state.treeForm = {
    readId: 0,
    readName: '',
    readDept: '',
  };
};
const cheackTreeForm = (data: any) => {
  return state.readList.some(item => {
    return item.readId === data.readId;
  });
};

const checkTreeIndex = (data: any) => {
  let idx = state.readList.map((item, index: number) => {
    return item.readId == data.readId ? index : -1;
  });
  return idx;
};

const handleCheckChange = (data: Tree, checked: boolean, indeterminate: boolean) => {
  console.log(data, checked, indeterminate);
};
const handleNodeClick = (data: Tree) => {
  if (data.isDept) {
    state.treeForm.readDept = data.label;
  }
  if (!data.children) {
    console.log(data);
    state.treeForm.readName = data.label;
  }
};
</script>

<style scoped></style>
