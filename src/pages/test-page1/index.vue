<script setup lang="ts">
import { useImagePreview } from '@/components/ImagePreview/useImagePreview'
import { showToast } from 'vant'

const images = [
  'https://wuliuqi-1318477772.cos.ap-guangzhou.myqcloud.com/231535-1511018135206b.jpg',
  'https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg',
  'https://fastly.jsdelivr.net/npm/@vant/assets/apple-1.jpeg',
]

const { show, showActionSheet, actionSheetActions, onActionSelect } = useImagePreview({
  images,
  startPosition: 1,
  enableLongPress: true,
  longPressActions: [
    {
      name: '保存图片',
      callback: (_image, index) => {
        showToast(`保存图片 ${index + 1}`)
      },
    },
    {
      name: '分享图片',
      callback: (_image, index) => {
        showToast(`分享图片 ${index + 1}`)
      },
    },
  ],
  onChange: (index) => {
    // eslint-disable-next-line no-console
    console.log('当前图片索引:', index)
  },
})

function handlePreview() {
  show()
}
</script>

<template>
  <div class="test-page">
    <div class="header">
      <h2>图片预览组件测试</h2>
      <p>长按图片可以显示操作菜单</p>
    </div>

    <div class="image-list">
      <div v-for="(image, index) in images" :key="index" class="image-item" @click="handlePreview">
        <img :src="image" alt="预览图片">
      </div>
    </div>

    <van-button type="primary" block @click="handlePreview">
      预览图片
    </van-button>

    <van-action-sheet
      v-model:show="showActionSheet"
      :actions="actionSheetActions"
      cancel-text="取消"
      @select="onActionSelect"
    />
  </div>
</template>

<style scoped lang="less">
.test-page {
  padding: 16px;
  min-height: 100vh;
  background-color: #f7f8fa;
}

.header {
  margin-bottom: 20px;
  text-align: center;

  h2 {
    font-size: 20px;
    margin-bottom: 8px;
  }

  p {
    font-size: 14px;
    color: #969799;
  }
}

.image-list {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  margin-bottom: 20px;
}

.image-item {
  aspect-ratio: 1;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
</style>
