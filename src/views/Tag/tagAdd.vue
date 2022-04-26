<template>
  <div v-loading="loading" class="new">
    <el-form ref="formRef" :model="form" :rules="rules" label-position="right" label-width="100px">
      <el-form-item label="标签名称" prop="name">
        <el-input v-model="form.name" placeholder="请输入标签名称"></el-input>
      </el-form-item>
      <el-form-item label="标签图标" prop="icon">
        <icon-input :icon-code="form.icon" @success="successIcon"></icon-input>
      </el-form-item>
      <el-form-item label="封面" prop="cover">
        <el-upload class="avatar-uploader" action="/api/upload" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload" :headers="headers">
          <img v-if="form.cover" :src="form.cover" class="avatar" />
          <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
        </el-upload>
      </el-form-item>
      <el-row class="btn-container">
        <el-button size="mini" type="primary" @click="submitForm()"> <i class="fa fa-plus"> </i> 确认 </el-button>
      </el-row>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref, toRefs, defineEmits, defineExpose, component, defineProps } from 'vue'
import { ElMessage } from 'element-plus'
import Service from '@/api/tag'
import iconInput from '@/components/icon.vue'
import type { UploadProps } from 'element-plus'
import { getToken } from '@/utils/auth'
import { formTypes } from './types'

const rules = {
  name: [
    { required: true, message: '请输入标签名称', trigger: 'blur' },
    { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
  ],
  icon: [{ required: true, message: '请输入标签图标', trigger: 'change' }]
}
const emit = defineEmits<{
  (e: 'success'): void
}>()

const form = reactive<formTypes>({
  name: '',
  icon: '',
  cover: ''
})
const labelId = ref('')
const loading = ref(false)
const formRef = ref()
const initInfo = () => {
  form.name = ''
  form.icon = ''
  labelId.value = ''
  form.cover = ''
}

const headers = {
  Authorization: `Bearer ${getToken()}`
}

const handleAvatarSuccess: UploadProps['onSuccess'] = (response: any, uploadFile: any) => {
  console.log(response)
  form.cover = response.url
}

const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile: any) => {
  if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error('Avatar picture size can not exceed 2MB!')
    return false
  }
  return true
}

const getInfo = (id: string) => {
  Service.tagFind(id).then((res) => {
    if (res.code === 200) {
      const { name, _id, icon, cover } = res.data
      form.name = name
      form.icon = icon
      form.cover = cover
      labelId.value = _id
    }
  })
}

const successIcon = (val: string) => {
  form.icon = val
}

defineExpose({ getInfo, initInfo })
const submitForm = () => {
  formRef.value.validate(
    async (valid: any): Promise<boolean> => {
      if (valid) {
        if (labelId.value !== '') {
          await Service.tagUpdate(form, labelId.value)
          ElMessage.success('修改成功')
        } else {
          await Service.tagCreate(form)
          ElMessage.success('新建成功')
        }
        emit('success')
        // 此处暂时省去异步接口处理
        return true
      }
      return false
    }
  )
}
</script>

<style scoped>
.avatar-uploader .avatar {
  width: 189px;
  height: 118px;
  display: block;
}
</style>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 189px;
  height: 118px;
  text-align: center;
}
</style>
