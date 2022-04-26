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
            <el-table-column prop="icon" label="标签图标" align="center">
              <template #default="scope">
                <i :class="scope.row.icon" class="iconfont"></i>
              </template>
            </el-table-column>
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
                <el-popconfirm title="你确定要删除它吗?" @confirm="handleDelete(scope.row)">
                  <template #reference>
                    <el-button size="small" type="danger" icon="el-icon-delete">删除</el-button>
                  </template>
                </el-popconfirm>
              </template>
            </el-table-column>
          </el-table>
          <div class="pagination">
            <el-pagination
              :current-page="page.pageNo"
              :page-size="page.pageSize"
              layout="sizes,prev,pager,next,total"
              :page-sizes="[5, 10, 20]"
              :total="page.total"
              background
              @current-change="onCurrentChange"
              @size-change="onSizeChange"
            >
            </el-pagination>
          </div>
        </el-col>
      </el-row>
    </el-card>
    <el-dialog v-model="addVisible" width="632px" title="新增标签">
      <TagAdd ref="tagAddRef" @success="onAddSuccess"></TagAdd>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref, toRefs, toRef, onMounted, nextTick } from 'vue'
import { ElMessage } from 'element-plus'
import Service from '@/api/tag'
import { pageTypes } from '@/types/index'
import { stateTypes } from './types'
import TagAdd from './tagAdd.vue'

const state = reactive<stateTypes>({
  tableData: [],
  searchForm: {
    bindName: '',
    bindStatus: '',
    name: '',
    status: null
  }
})

const page = reactive<pageTypes>({
  pageNo: 1,
  pageSize: 10,
  total: 10
})

const loading = ref<boolean>(true)
const addVisible = ref<boolean>(false)
const getList = (): void => {
  Service.tagList({
    name: state.searchForm.name,
    status: state.searchForm.status,
    pageNo: page.pageNo,
    pageSize: page.pageSize
  }).then((res) => {
    loading.value = false
    if (res.code === 200) {
      state.tableData = res.data.list
      page.total = res.data.count
    }
  })
}
onMounted(() => {
  getList()
})
// 刷新
const onRefresh = (): void => {
  page.pageNo = 1
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
  page.pageNo = 1
  getList()
}

const onCurrentChange = (val: any) => {
  page.pageNo = val
  getList()
}
const onSizeChange = (val: any) => {
  page.pageSize = val
  getList()
}

const tagAddRef = ref()

// 新建
const onCreate = () => {
  addVisible.value = true
  nextTick(() => {
    tagAddRef.value.initInfo()
  })
}

// 修改
const handleEdit = (index: any, row: { _id: any }) => {
  addVisible.value = true
  nextTick(() => {
    tagAddRef.value.getInfo(row._id)
  })
}
// 删除
const handleDelete = (row: any) => {
  Service.tagRemove(row._id).then((res) => {
    if (res.code === 200) {
      ElMessage.success('删除成功')
      onRefresh()
    }
  })
}
// 修改状态
const editStatus = (row: any) => {
  Service.tagEditStatus(row._id, { status: row.status === 1 ? 0 : 1 }).then((res) => {
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
  onRefresh()
}
</script>

<style scoped></style>
