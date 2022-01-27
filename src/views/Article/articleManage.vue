<template>
  <div class="new">
    <el-card class="card-ctrl">
      <el-row>
        <el-col>
          <el-col>
            <!-- <el-button type="primary" icon="el-icon-plus" size="small" @click="onCreate">新增</el-button>
          <el-button type="success" icon="el-icon-refresh" size="small" @click="onRefresh">刷新</el-button> -->
          </el-col>
          <el-table v-loading="loading" :data="tableData" stripe border>
            <el-table-column prop="date" label="Date" align="center" />
            <el-table-column prop="name" label="Name" align="center" />
            <el-table-column prop="address" label="Address" align="center" />
          </el-table>
          <div class="pagination">
            <el-pagination
              :current-page="page.pageNo"
              :page-size="page.limit"
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
import { reactive, ref, toRefs, toRef } from 'vue'

const tableData = reactive([
  {
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  }
])
const page = reactive({
  pageNo: 1,
  limit: 10,
  total: 10
})
const loading = ref(false)
const onCurrentChange = (val: any) => {}
const onSizeChange = (val: any) => {
  page.limit = val
}
</script>

<style scoped></style>
