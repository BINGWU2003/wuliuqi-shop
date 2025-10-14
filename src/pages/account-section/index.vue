<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

interface GameItem {
  id: number
  name: string
  icon: string
  color: string
  path: string
}

const gameList = ref<GameItem[]>([
  // { id: 1, name: '王者荣耀', icon: '👑', color: '#FF6B6B' },
  // { id: 2, name: '和平精英', icon: '🎮', color: '#4ECDC4' },
  // { id: 3, name: '原神', icon: '⚔️', color: '#95E1D3' },
  // { id: 4, name: '英雄联盟', icon: '🎯', color: '#FFE66D' },
  { id: 5, name: 'CODM', icon: '🔫', color: '#FF8C42', path: '/codm-account-page' },
  // { id: 6, name: '梦幻西游', icon: '🐉', color: '#A8E6CF' },
  // { id: 7, name: 'DNF', icon: '⚡', color: '#FFD93D' },
  // { id: 8, name: '绝地求生', icon: '🏆', color: '#6BCF7F' },
])

function handleGameClick(path: string) {
  // 跳转功能待实现
  router.push(path)
}
</script>

<template>
  <div class="account-section">
    <div class="page-title">
      游戏账号专区
    </div>

    <van-grid :column-num="4" :border="false" :gutter="12" style="padding-left: 0;">
      <van-grid-item
        v-for="game in gameList"
        :key="game.id"
        @click="handleGameClick(game.path)"
      >
        <template #icon>
          <div class="game-icon" :style="{ background: game.color }">
            {{ game.icon }}
          </div>
        </template>
        <template #text>
          <span class="game-name">{{ game.name }}</span>
        </template>
      </van-grid-item>
    </van-grid>
  </div>
</template>

<route lang="json5">
{
  name: 'AccountSection'
}
</route>

<style scoped lang="less">
.account-section {
  padding: 16px;
  background: #f7f8fa;
}

.page-title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
  color: #323233;
}

:deep(.van-grid-item__content) {
  padding: 16px 8px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;

  &:active {
    transform: scale(0.95);
  }
}

.game-icon {
  font-size: 36px;
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin: 0 auto 8px;
}

.game-name {
  font-size: 12px;
  color: #646566;
  font-weight: 500;
}

/* 响应式设计 - 移动端优化 */
@media (max-width: 768px) {
  .game-icon {
    font-size: 28px;
    width: 50px;
    height: 50px;
  }

  .game-name {
    font-size: 11px;
  }
}

@media (max-width: 480px) {
  .account-section {
    padding: 12px;
  }

  .page-title {
    font-size: 20px;
    margin-bottom: 16px;
  }

  :deep(.van-grid-item__content) {
    padding: 10px 4px;
    border-radius: 8px;
  }

  .game-icon {
    font-size: 24px;
    width: 45px;
    height: 45px;
    border-radius: 8px;
  }

  .game-name {
    font-size: 10px;
  }
}
</style>
