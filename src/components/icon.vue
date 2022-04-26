<template>
  <div class="icon-panel">
    <el-input :value="iconCode" placeholder="搜索图标" @input="search">
      <el-button icon="el-icon-search" @click="search()"></el-button>
    </el-input>
    <section>
      <span v-for="ic in data" :key="ic" class="icon-items" @click="selected(ic)"> <i :class="ic" class="iconfont"></i><br /> </span>
    </section>
  </div>
</template>
<script lang="ts">
import { ref, defineComponent, reactive, toRefs, onMounted } from 'vue'

export default defineComponent({
  name: 'Icon',
  props: {
    msg: {
      type: String,
      required: false,
      default: ''
    },
    iconCode: {
      type: String,
      required: false,
      default: ''
    }
  },
  emits: ['success'],
  setup: (props, { emit }) => {
    const state = reactive({
      icons: [
        'icon-html',
        'icon-home',
        'icon-vue',
        'icon-server',
        'icon-css',
        'icon-js',
        'icon-nodejs',
        'icon-history',
        'icon-mongoDB',
        'icon-project',
        'icon-ts',
        'icon-nestjs',
        'icon-websocket',
        'icon-web'
      ],
      data: [''],
      key: ''
    })
    const count = ref(0)
    const createFilter = (key: string) => (icon: string) => icon.toLowerCase().indexOf(key.toLowerCase()) > 0
    const search = () => {
      const { key } = state
      const { icons } = state
      state.data = key ? icons.filter(createFilter(key)) : icons
    }
    const loadAll = () => state.icons
    const selected = (icon: any) => {
      // state.key = icon
      // console.log(key)
      emit('success', icon)
    }
    onMounted(() => {
      state.data = loadAll()
    })

    return { count, ...toRefs(state), search, selected }
  }
})
</script>

<style lang="scss" scoped>
.icon-panel {
  // padding: 1rem;
  user-select: none;
}

.icon-items {
  display: inline-block;
  padding: 0 0.4rem;
  border: 1px solid #efefef;
  margin: 0.2rem;
  color: #6f7180;
  border-radius: 0.3rem;
  transition: all 0.3s;
  &:hover {
    background: #1daaef;
    color: white;
  }
}
</style>
