<template>
  <div class="new">
    <el-card class="card-ctrl">
      <el-form :inline="true" :model="state.searchForm" class="demo-form-inline">
        <el-form-item label="文章关键词">
          <el-input v-model="state.searchForm.bindTitle" placeholder="文章关键词" clearable></el-input>
        </el-form-item>
        <el-form-item label="文章状态">
          <el-select v-model="state.searchForm.bindStatus" placeholder="文章状态" clearable>
            <el-option label="全部" :value="null"></el-option>
            <el-option label="已发布" :value="1"></el-option>
            <el-option label="未发布" :value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="分类" prop="category">
          <el-select v-model="state.searchForm.bindCategory" placeholder="选择分类" class="select-mini" clearable>
            <el-option label="全部" :value="null"></el-option>
            <el-option v-for="item in state.options" :key="item._id" :label="item.name" :value="item._id"></el-option>
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
            <el-table-column prop="title" label="文章标题名称" align="center" />
            <el-table-column prop="category" label="分类" align="center">
              <template #default="{ row }">
                {{ row.category.name }}
              </template>
            </el-table-column>
            <el-table-column prop="createdAt" label="创建时间" align="center" />
            <el-table-column prop="status" label="发布状态" align="center">
              <template #default="scope">
                <span v-if="scope.row.status == 1">已发布</span>
                <span v-else-if="scope.row.status == 0">未发布</span>
              </template>
            </el-table-column>
            <el-table-column label="操作">
              <template #default="scope">
                <el-button v-if="scope.row.status == 0" size="small" type="primary" @click="editStatus(scope.row)">发布</el-button>
                <el-button v-else-if="scope.row.status == 1" size="small" type="danger" @click="editStatus(scope.row)">关闭</el-button>
                <el-button size="small" type="primary" icon="el-icon-edit" @click="handleEdit(scope.row)">修改</el-button>
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
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref, toRefs, toRef, onMounted } from 'vue'
import { pageTypes } from '@/types/index'
import ArticleService from '@/api/article'
import CategoryService from '@/api/category'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { stateTypes } from './types'

const state = reactive<stateTypes>({
  tableData: [],
  options: [],
  searchForm: {
    bindTitle: null,
    title: null,
    bindStatus: null,
    status: null,
    category: null,
    bindCategory: null
  }
})

const page = reactive<pageTypes>({
  pageNo: 1,
  pageSize: 10,
  total: 10
})

const loading = ref<boolean>(true)
const router = useRouter()
const getList = (): void => {
  ArticleService.articleList({
    keyword: state.searchForm.title,
    status: state.searchForm.status,
    category: state.searchForm.bindCategory,
    pageNo: page.pageNo,
    pageSize: page.pageSize
  }).then((res) => {
    loading.value = false
    if (res.code === 200) {
      state.tableData = res.data.list
      page.total = res.data.pagination.count
    }
  })
}

const getCategoryList = (): void => {
  CategoryService.categoryList({
    status: 1
  }).then((res) => {
    if (res.code === 200) {
      state.options = res.data.list
    }
  })
}

onMounted(() => {
  getCategoryList()
  getList()
})

// 刷新
const onRefresh = (): void => {
  page.pageNo = 1
  state.searchForm = {
    bindTitle: null,
    title: null,
    bindStatus: null,
    status: null,
    category: null,
    bindCategory: null
  }
  getList()
}

// 新增
const onCreate = (): void => {
  router.push({
    path: '/Article/articleAdd'
  })
}

// 修改
const handleEdit = ({ _id }: { _id: string }) => {
  router.push({
    path: '/Article/articleAdd',
    query: {
      id: _id
    }
  })
}
// 删除
const handleDelete = (row: any) => {
  ArticleService.articleRemove(row._id).then((res) => {
    if (res.code === 200) {
      ElMessage.success('删除成功')
      onRefresh()
    }
  })
}
// 修改状态
const editStatus = (row: any) => {
  ArticleService.articleEditStatus(row._id, { status: row.status === 1 ? 0 : 1 }).then((res) => {
    if (res.code === 200) {
      if (row.status === 0) {
        ElMessage.success('发布成功')
      } else {
        ElMessage.success('关闭成功')
      }
      onRefresh()
    }
  })
}

const onCurrentChange = (val: any) => {}
const onSizeChange = (val: any) => {
  page.pageSize = val
}
// 搜索
const onSearch = () => {
  state.searchForm.title = state.searchForm.bindTitle ? state.searchForm.bindTitle : null
  state.searchForm.status = state.searchForm.bindStatus
  page.pageNo = 1
  getList()
}
</script>

<style scoped></style>
