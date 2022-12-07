<template>
  <el-config-provider :locale="locale">
    <keep-alive>
      <router-view />
    </keep-alive>
  </el-config-provider>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import en from 'element-plus/dist/locale/en.mjs'

const lang = ref('zh-cn')
const locale = computed(() => (lang.value === 'zh-cn' ? zhCn : en))
</script>

<style></style>
