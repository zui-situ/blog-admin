<template>
  <div>
    <div class="add-top">
      <el-form ref="formRef" :inline="true" :model="form" class="demo-form-inline" :rules="rules">
        <el-form-item label="" prop="title">
          <el-input v-model="form.title" placeholder="文章标题" class="title-input"></el-input>
        </el-form-item>
        <el-form-item label="" prop="description">
          <el-input v-model="form.description" placeholder="文章描述" class="title-input"></el-input>
        </el-form-item>
        <div>
          <el-form-item label="分类" prop="category">
            <el-select v-model="form.category" placeholder="选择分类" class="select-mini">
              <el-option v-for="item in options.categoryList" :key="item._id" :label="item.name" :value="item._id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="标签" prop="tag">
            <el-select v-model="form.tag" placeholder="选择标签" multiple class="select-mini">
              <el-option v-for="item in options.tagList" :key="item._id" :label="item.name" :value="item._id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="封面" prop="cover">
            <el-upload class="avatar-uploader" action="/api/upload" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload" :headers="headers">
              <img v-if="form.cover" :src="form.cover" class="avatar" />
              <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
            </el-upload>
          </el-form-item>
        </div>
      </el-form>
      <el-button type="primary" size="default" class="btn-class" @click="submitForm">保存</el-button>
    </div>
    <el-dialog v-model="dialogVisible">
      <img width="100%" :src="form.cover" alt="" />
    </el-dialog>
    <!-- <v-md-editor v-model="state.content" height="400px"></v-md-editor> -->
    <md-editor v-model="form.content" class="md-editor" @onUploadImg="onUploadImg"></md-editor>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, toRefs, toRef, onMounted, defineEmits } from 'vue'
import { ElMessage } from 'element-plus'
import { Delete, Download, Plus, ZoomIn } from '@element-plus/icons-vue'
import type { UploadProps } from 'element-plus'
import tagService from '@/api/tag'
import CategoryService from '@/api/category'
import ArticleService from '@/api/article'
import FileService from '@/api/file'
import MdEditor from 'md-editor-v3'
import { useRouter, useRoute, LocationQueryValue } from 'vue-router'
import { getToken } from '@/utils/auth'
import { articleAddTypes, optionListTypes } from './types'
import 'md-editor-v3/lib/style.css'

const rules = {
  title: [
    { required: true, message: '请输入文章标题', trigger: 'blur' }
    // { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
  ],
  category: [{ required: true, message: '请选择分类', trigger: 'change' }],
  tag: [{ required: true, message: '请选择分类', trigger: 'change' }],
  description: [{ required: true, message: '请输入文章描述', trigger: 'blur' }]
}

const formRef = ref()

const router = useRouter()

const headers = {
  Authorization: `Bearer ${getToken()}`
}

const route = useRoute()

const form = reactive<articleAddTypes>({
  category: '',
  tag: '',
  title: '',
  content: '',
  description: '',
  cover: ''
})

const disabled = ref(false)

const dialogVisible = ref(false)

const options = reactive<optionListTypes>({
  tagList: [],
  categoryList: []
})

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

const onUploadImg = async (files: FileList, callback: (urls: string[]) => void) => {
  const res = await Promise.all(
    Array.from(files).map(
      (file) =>
        new Promise((rev, rej) => {
          const formFile = new FormData()
          formFile.append('file', file)
          FileService.postUpload(formFile)
            .then((response: any) => {
              rev(response)
            })
            .catch((error) => rej(error))
        })
    )
  )
  callback(res.map((item: any) => item.url))
}

const getCategoryList = (): void => {
  CategoryService.categoryList({
    status: 1
  }).then((res) => {
    if (res.code === 200) {
      options.categoryList = res.data.list
    }
  })
}

const getInfo = (id: LocationQueryValue | LocationQueryValue[]) => {
  console.log(id)
  if (!id) {
    return
  }
  ArticleService.articleFind(id).then((res) => {
    if (res.code === 200) {
      const { category, tag, title, content, cover, description } = res.data
      Object.assign(form, {
        category,
        tag,
        title,
        content,
        description,
        cover
      })
    }
  })
}

const getTagList = (): void => {
  tagService
    .tagList({
      status: 1
    })
    .then((res) => {
      if (res.code === 200) {
        options.tagList = res.data.list
      }
    })
}

onMounted(() => {
  getTagList()
  getCategoryList()
  getInfo(route.query.id)
})

const submitForm = () => {
  formRef.value.validate(
    async (valid: any): Promise<boolean> => {
      if (valid) {
        const { id } = route.query
        if (id) {
          const res = await ArticleService.articleUpdate(form, id)
          if (res.code === 200) {
            ElMessage.success('修改成功')
            router.go(-1)
          }
        } else {
          const res = await ArticleService.articleCreate(form)
          if (res.code === 200) {
            ElMessage.success('新建成功')
            router.go(-1)
          }
        }
        // 此处暂时省去异步接口处理
        return true
      }
      return false
    }
  )
}
</script>

<style scoped lang="scss">
.btn-class {
  height: 40px;
}
.add-top {
  padding-left: 20px;
  // height: 40px;
  margin-bottom: 20px;
  display: flex;
}
.select-mini {
  width: 300px;
}
.title-input {
  width: 600px;
}
.md-editor {
  height: 800px;
}
</style>
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
