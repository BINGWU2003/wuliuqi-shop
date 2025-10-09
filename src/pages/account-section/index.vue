<script setup lang="ts">
interface GameItem {
  id: number
  name: string
  icon: string
  color: string
}

const gameList = ref<GameItem[]>([
  { id: 1, name: '王者荣耀', icon: '👑', color: '#FF6B6B' },
  { id: 2, name: '和平精英', icon: '🎮', color: '#4ECDC4' },
  { id: 3, name: '原神', icon: '⚔️', color: '#95E1D3' },
  { id: 4, name: '英雄联盟', icon: '🎯', color: '#FFE66D' },
  { id: 5, name: '穿越火线', icon: '🔫', color: '#FF8C42' },
  { id: 6, name: '梦幻西游', icon: '🐉', color: '#A8E6CF' },
  { id: 7, name: 'DNF', icon: '⚡', color: '#FFD93D' },
  { id: 8, name: '绝地求生', icon: '🏆', color: '#6BCF7F' },
])

function handleGameClick(_game: GameItem) {
  // 跳转功能待实现
  // TODO: 实现游戏详情页跳转
}
</script>

<template>
  <div class="account-section">
    <div class="page-title">
      游戏账号专区
    </div>

    <div class="game-grid">
      <div
        v-for="game in gameList"
        :key="game.id"
        class="game-item"
        :style="{ '--game-color': game.color }"
        @click="handleGameClick(game)"
      >
        <div class="game-icon">
          {{ game.icon }}
        </div>
        <div class="game-name">
          {{ game.name }}
        </div>
      </div>
    </div>
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

.game-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
  padding: 0;
}

.game-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: white;
  border-radius: 12px;
  padding: 16px 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
  }

  &:active {
    transform: translateY(-2px);
  }
}

.game-icon {
  font-size: 36px;
  margin-bottom: 8px;
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--game-color);
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.game-name {
  font-size: 12px;
  color: #646566;
  text-align: center;
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
}

/* 响应式设计 - 移动端优化 */
@media (max-width: 768px) {
  .game-grid {
    gap: 10px;
  }

  .game-item {
    padding: 12px 6px;
  }

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

  .game-grid {
    gap: 8px;
  }

  .game-item {
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
