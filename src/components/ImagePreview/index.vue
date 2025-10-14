<script setup lang="ts">
import { computed, ref } from 'vue'

interface ImagePreviewProps {
  images: string[]
  startPosition?: number
  closeable?: boolean
  showIndex?: boolean
  enableLongPress?: boolean
  longPressActions?: Array<{
    name: string
    icon?: string
    callback: (image: string, index: number) => void
  }>
}

const props = withDefaults(defineProps<ImagePreviewProps>(), {
  startPosition: 0,
  closeable: true,
  showIndex: true,
  enableLongPress: true,
  longPressActions: () => [
    {
      name: '保存图片',
      icon: 'download-o',
      callback: (_image: string, _index: number) => {
        // Default action
      },
    },
  ],
})

const emit = defineEmits<{
  change: [index: number]
  close: []
  longPress: [image: string, index: number]
}>()

const visible = ref(false)
const currentIndex = ref(props.startPosition)
const showActionSheet = ref(false)
const actionSheetActions = ref<Array<{ name: string, icon?: string }>>([])

// 触摸相关
let longPressTimer: NodeJS.Timeout | null = null
let startX = 0
let startY = 0
let isDragging = false

// 缩放相关
const scale = ref(1)
const translateX = ref(0)
const translateY = ref(0)
let lastDistance = 0

const currentImage = computed(() => props.images[currentIndex.value])
const imageCount = computed(() => props.images.length)

function show(index: number = props.startPosition) {
  currentIndex.value = index
  visible.value = true
  resetTransform()
}

function close() {
  visible.value = false
  emit('close')
  resetTransform()
}

function resetTransform() {
  scale.value = 1
  translateX.value = 0
  translateY.value = 0
}

function prevImage() {
  if (currentIndex.value > 0) {
    currentIndex.value--
    emit('change', currentIndex.value)
    resetTransform()
  }
}

function nextImage() {
  if (currentIndex.value < props.images.length - 1) {
    currentIndex.value++
    emit('change', currentIndex.value)
    resetTransform()
  }
}

// 触摸开始
function handleTouchStart(e: TouchEvent) {
  if (e.touches.length === 1) {
    // 单指触摸
    startX = e.touches[0].clientX
    startY = e.touches[0].clientY
    isDragging = false

    // 长按检测
    if (props.enableLongPress) {
      longPressTimer = setTimeout(() => {
        triggerLongPress()
      }, 500)
    }
  }
  else if (e.touches.length === 2) {
    // 双指触摸 - 缩放
    clearLongPressTimer()
    const touch1 = e.touches[0]
    const touch2 = e.touches[1]
    lastDistance = getDistance(touch1, touch2)
  }
}

// 触摸移动
function handleTouchMove(e: TouchEvent) {
  clearLongPressTimer()

  if (e.touches.length === 1 && scale.value === 1) {
    // 单指滑动切换图片
    const deltaX = e.touches[0].clientX - startX
    const deltaY = Math.abs(e.touches[0].clientY - startY)

    if (Math.abs(deltaX) > 10 || deltaY > 10) {
      isDragging = true
    }
  }
  else if (e.touches.length === 2) {
    // 双指缩放
    e.preventDefault()
    const touch1 = e.touches[0]
    const touch2 = e.touches[1]
    const distance = getDistance(touch1, touch2)
    const scaleChange = distance / lastDistance
    scale.value = Math.max(0.5, Math.min(3, scale.value * scaleChange))
    lastDistance = distance
  }
}

// 触摸结束
function handleTouchEnd(e: TouchEvent) {
  clearLongPressTimer()

  if (e.changedTouches.length === 1 && scale.value === 1 && isDragging) {
    const deltaX = e.changedTouches[0].clientX - startX

    // 滑动切换图片
    if (deltaX > 50) {
      prevImage()
    }
    else if (deltaX < -50) {
      nextImage()
    }
  }

  isDragging = false
}

// 鼠标滚轮缩放
function handleWheel(e: WheelEvent) {
  e.preventDefault()
  const delta = e.deltaY > 0 ? 0.9 : 1.1
  scale.value = Math.max(0.5, Math.min(3, scale.value * delta))
}

// 计算两点距离
function getDistance(touch1: Touch, touch2: Touch) {
  const dx = touch1.clientX - touch2.clientX
  const dy = touch1.clientY - touch2.clientY
  return Math.sqrt(dx * dx + dy * dy)
}

// 清除长按定时器
function clearLongPressTimer() {
  if (longPressTimer) {
    clearTimeout(longPressTimer)
    longPressTimer = null
  }
}

// 触发长按
function triggerLongPress() {
  if (!props.enableLongPress)
    return

  actionSheetActions.value = props.longPressActions.map(action => ({
    name: action.name,
    icon: action.icon,
  }))
  showActionSheet.value = true
  emit('longPress', currentImage.value, currentIndex.value)
}

// ActionSheet 选择
function onActionSelect(_item, index: number) {
  const action = props.longPressActions[index]
  if (action) {
    action.callback(currentImage.value, currentIndex.value)
  }
  showActionSheet.value = false
}

defineExpose({
  show,
  close,
})
</script>

<template>
  <teleport to="body">
    <!-- 预览遮罩层 -->
    <transition name="fade">
      <div v-if="visible" class="image-preview-overlay">
        <!-- 关闭按钮 -->
        <div v-if="closeable" class="close-btn" @click.stop="close">
          <van-icon name="cross" size="24" color="#fff" />
        </div>

        <!-- 图片索引 -->
        <div v-if="showIndex && imageCount > 1" class="image-index">
          {{ currentIndex + 1 }} / {{ imageCount }}
        </div>

        <!-- 图片容器 -->
        <div
          class="image-container"
          @click.stop="close"
          @touchstart="handleTouchStart"
          @touchmove="handleTouchMove"
          @touchend="handleTouchEnd"
          @wheel="handleWheel"
        >
          <img
            :src="currentImage"
            :style="{
              transform: `scale(${scale}) translate(${translateX}px, ${translateY}px)`,
            }"
            class="preview-image"
            alt="预览图片"
          >
        </div>

        <!-- 左右切换按钮 (桌面端) -->
        <div v-if="imageCount > 1" class="nav-buttons">
          <div
            v-if="currentIndex > 0"
            class="nav-btn nav-prev"
            @click.stop="prevImage"
          >
            <van-icon name="arrow-left" size="32" color="#fff" />
          </div>
          <div
            v-if="currentIndex < imageCount - 1"
            class="nav-btn nav-next"
            @click.stop="nextImage"
          >
            <van-icon name="arrow" size="32" color="#fff" />
          </div>
        </div>
      </div>
    </transition>

    <!-- ActionSheet -->
    <van-action-sheet
      v-model:show="showActionSheet"
      :actions="actionSheetActions"
      cancel-text="取消"
      @select="onActionSelect"
    />
  </teleport>
</template>

<style scoped lang="less">
.image-preview-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.9);
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: center;

  .close-btn {
    position: absolute;
    top: 20px;
    right: 20px;
    width: 44px;
    height: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    z-index: 10001;
    background: rgba(0, 0, 0, 0.3);
    border-radius: 50%;
    transition: background 0.3s;

    &:hover {
      background: rgba(0, 0, 0, 0.5);
    }
  }

  .image-index {
    position: absolute;
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
    color: #fff;
    font-size: 16px;
    background: rgba(0, 0, 0, 0.3);
    padding: 8px 16px;
    border-radius: 20px;
    z-index: 10001;
  }

  .image-container {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    touch-action: none;

    .preview-image {
      max-width: 90%;
      max-height: 90%;
      object-fit: contain;
      transition: transform 0.3s ease;
      user-select: none;
      -webkit-user-drag: none;
    }
  }

  .nav-buttons {
    .nav-btn {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      width: 50px;
      height: 50px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(0, 0, 0, 0.3);
      border-radius: 50%;
      cursor: pointer;
      transition: background 0.3s;
      z-index: 10001;

      &:hover {
        background: rgba(0, 0, 0, 0.5);
      }

      &.nav-prev {
        left: 20px;
      }

      &.nav-next {
        right: 20px;
      }
    }
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@media (max-width: 768px) {
  .image-preview-overlay {
    .nav-buttons {
      display: none;
    }

    .close-btn {
      top: 10px;
      right: 10px;
    }

    .image-index {
      top: 10px;
    }
  }
}
</style>
