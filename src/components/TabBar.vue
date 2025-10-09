<script setup lang="ts">
import { rootRouteList } from '@/config/routes'

const active = ref(0)
const route = useRoute()

const show = computed(() => {
  if (route.name && typeof route.name === 'string' && rootRouteList.includes(route.name)) {
    return true
  }
  return false
})
</script>

<template>
  <van-tabbar v-if="show" v-model="active" route placeholder>
    <van-tabbar-item replace to="/">
      {{ $t('tabbar.home') }}
      <template #icon>
        <div class="i-carbon:home" />
      </template>
    </van-tabbar-item>
    <van-tabbar-item replace to="/account-section">
      {{ $t('tabbar.accountSection') }}
      <template #icon>
        <div class="i-carbon:game-console" />
      </template>
    </van-tabbar-item>
  </van-tabbar>
</template>
