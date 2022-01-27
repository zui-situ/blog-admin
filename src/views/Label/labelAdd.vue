<template>
  <div v-loading="loading" class="new">
    <el-form ref="formRef" :model="form" :rules="rules" label-position="right" label-width="100px">
      <el-form-item label="菜单名称" prop="name">
        <el-input v-model="form.name" placeholder="请输入菜单名称"></el-input>
      </el-form-item>
      <el-row class="btn-container">
        <el-button size="mini" type="primary" @click="submitForm()"> <i class="fa fa-plus"> </i> 确认修改 </el-button>
      </el-row>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref, toRefs, defineEmits } from 'vue'
import { ElMessage } from 'element-plus'
import Service from '@/api/label'
import { formTypes } from './types'

const rules = {
  name: [
    { required: true, message: '请输入标签名称', trigger: 'blur' },
    { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
  ]
}
const emit = defineEmits<{
  (e: 'success'): void
}>()
const form = reactive<formTypes>({
  name: ''
})
const loading = ref(false)
const formRef = ref()

const submitForm = () => {
  formRef.value.validate(
    async (valid: any): Promise<boolean> => {
      if (valid) {
        await Service.labelCreate(form)
        ElMessage.success('新建成功')
        emit('success')
        // 此处暂时省去异步接口处理
        return true
      }
      return false
    }
  )
}
</script>

<style scoped></style>
