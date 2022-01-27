<template>
  <div class="new">
    <el-card class="card-ctrl">
      <el-form :inline="true" :model="state.searchForm" class="demo-form-inline">
        <el-form-item label="标签名">
          <el-input v-model="state.searchForm.bindName" placeholder="标签名"></el-input>
        </el-form-item>
        <el-form-item label="标签状态">
          <el-select v-model="state.searchForm.bindStatus" placeholder="标签状态">
            <el-option label="全部" :value="null"></el-option>
            <el-option label="开启" :value="1"></el-option>
            <el-option label="关闭" :value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSearch">搜索</el-button>
        </el-form-item>
      </el-form>
      <el-row>
        <el-col>
          <el-col>
            <el-button type="primary" icon="el-icon-plus" size="small" @click="onCreate">新增</el-button>
            <el-button type="success" icon="el-icon-refresh" size="small" @click="onRefresh">刷新</el-button>
          </el-col>
          <el-table v-loading="loading" :data="state.tableData" stripe border>
            <el-table-column prop="name" label="标签名称" align="center" />
            <el-table-column prop="createdAt" label="创建时间" align="center" />
            <el-table-column prop="status" label="标签状态" align="center">
              <template #default="scope">
                <span v-if="scope.row.status == 1">开启</span>
                <span v-else-if="scope.row.status == 0">关闭</span>
              </template>
            </el-table-column>
            <el-table-column label="操作">
              <template #default="scope">
                <el-button v-if="scope.row.status == 0" size="small" type="primary" @click="editStatus(scope.row)">开启</el-button>
                <el-button v-else-if="scope.row.status == 1" size="small" type="danger" @click="editStatus(scope.row)">关闭</el-button>
                <el-button size="small" type="primary" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)">修改</el-button>
                <el-button size="small" type="danger" icon="el-icon-delete" @click="handleDelete(scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <div class="pagination">
            <el-pagination
              :current-page="state.page.pageNo"
              :page-size="state.page.pageSize"
              layout="sizes,prev,pager,next,total"
              :page-sizes="[5, 10, 20]"
              :total="state.page.total"
              background
              @current-change="onCurrentChange"
              @size-change="onSizeChange"
            >
            </el-pagination>
          </div>
        </el-col>
      </el-row>
    </el-card>
    <el-dialog v-model="addVisible" width="632px" title="新增菜单">
      <LabelAdd @success="onAddSuccess"></LabelAdd>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref, toRefs, toRef, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import Service from '@/api/label'
import { stateTypes } from './types'
import LabelAdd from './labelAdd.vue'

const state = reactive<stateTypes>({
  tableData: [],
  page: {
    pageNo: 1,
    pageSize: 10,
    total: 10
  },
  searchForm: {
    bindName: '',
    bindStatus: '',
    name: '',
    status: null
  }
})
const loading = ref<boolean>(true)
const addVisible = ref<boolean>(false)
const getList = (): void => {
  Service.labelList({
    name: state.searchForm.name,
    status: state.searchForm.status,
    pageNo: state.page.pageNo,
    pageSize: state.page.pageSize
  }).then((res) => {
    loading.value = false
    if (res.code === 200) {
      state.tableData = res.data.list
      state.page.total = res.data.count
    }
  })
}
onMounted(() => {
  getList()
})
// 刷新
const onRefresh = (): void => {
  state.page.pageNo = 1
  state.searchForm = {
    bindName: '',
    bindStatus: '',
    name: '',
    status: null
  }
  getList()
}

// 搜索
const onSearch = () => {
  state.searchForm.status = state.searchForm.bindStatus
  state.searchForm.name = state.searchForm.bindName
  state.page.pageNo = 1
  getList()
}

const onCurrentChange = (val: any) => {
  state.page.pageNo = val
  getList()
}
const onSizeChange = (val: any) => {
  state.page.pageSize = val
  getList()
}
// 新建
const onCreate = () => {
  addVisible.value = true
}
// 修改
const handleEdit = (index: any, row: { _id: any }) => {
  Service.labelFind(row._id).then((res) => {
    if (res.code === 200) {
      console.log(res)
    }
  })
}
// 删除
const handleDelete = (row: any) => {
  Service.labelRemove(row._id).then((res) => {
    if (res.code === 200) {
      ElMessage.success('删除成功')
      onRefresh()
    }
  })
}
// 修改状态
const editStatus = (row: any) => {
  Service.labelEditStatus(row._id, { status: row.status === 1 ? 0 : 1 }).then((res) => {
    if (res.code === 200) {
      if (row.status === 0) {
        ElMessage.success('开启成功')
      } else {
        ElMessage.success('关闭成功')
      }
      onRefresh()
    }
  })
}

// 新建成功触发
const onAddSuccess = () => {
  addVisible.value = false
}
</script>

<style scoped></style>
