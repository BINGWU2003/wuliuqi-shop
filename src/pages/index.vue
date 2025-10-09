<script setup lang="ts">
import { getUserList } from '@/api/user'
import { showToast } from 'vant'

onMounted(() => {
  getUserList().then(() => {
    showToast('服务器连接成功')
  })
})
</script>

<template>
  <div>
    首页
  </div>
</template>

<route lang="json5">
{
  name: 'Home'
}
</route>
