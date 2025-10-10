<script setup lang="ts">
import { ref } from 'vue'
import { showToast } from 'vant'
import { downloadImageWithWatermark } from '@/utils/watermark'
import type { WatermarkOptions } from '@/utils/watermark'

const imageUrl = ref<string>('')
const watermarkedImage = ref<string>('')
const isProcessing = ref(false)

// 水印配置
const watermarkOptions: WatermarkOptions = {
  text: '© 唐B黄毛爱上了水印',
  position: 'lowerRight',
  fontSize: '48px',
  fontFamily: 'sans-serif',
  color: '#fff',
  opacity: 0.5,
}

// 下载图片并添加水印
async function downloadWithWatermark() {
  if (!imageUrl.value) {
    showToast('请输入图片URL')
    return
  }

  isProcessing.value = true

  try {
    // 使用工具函数添加水印并下载
    const result = await downloadImageWithWatermark(
      imageUrl.value,
      watermarkOptions,
    )

    // 保存预览图片
    watermarkedImage.value = result

    showToast('下载成功')
  }
  catch (error) {
    console.error('处理失败:', error)
    showToast(error instanceof Error ? error.message : '处理失败')
  }
  finally {
    isProcessing.value = false
  }
}

// 测试图片URL
const testImageUrl = 'https://picsum.photos/800/600'

// 使用测试图片
function useTestImage() {
  imageUrl.value = testImageUrl
}

// 重置
function reset() {
  imageUrl.value = ''
  watermarkedImage.value = ''
}
</script>

<template>
  <div class="watermark-page">
    <div class="page-header">
      <h2>图片水印下载工具</h2>
      <p>输入图片URL，自动添加水印并下载</p>
    </div>

    <div class="content">
      <!-- 输入图片URL -->
      <van-cell-group inset>
        <van-field
          v-model="imageUrl"
          label="图片URL"
          placeholder="请输入图片链接"
          clearable
        />
      </van-cell-group>

      <!-- 操作按钮 -->
      <div class="button-group">
        <van-button
          type="primary"
          block
          :loading="isProcessing"
          :disabled="!imageUrl"
          @click="downloadWithWatermark"
        >
          {{ isProcessing ? '处理中...' : '添加水印并下载' }}
        </van-button>

        <van-button
          type="default"
          block
          @click="useTestImage"
        >
          使用测试图片
        </van-button>

        <van-button
          type="default"
          block
          :disabled="!imageUrl && !watermarkedImage"
          @click="reset"
        >
          重置
        </van-button>
      </div>

      <!-- 预览区域 -->
      <div v-if="watermarkedImage" class="preview-area">
        <div class="preview-item">
          <h3>处理后的图片预览</h3>
          <img :src="watermarkedImage" alt="水印图片">
        </div>
      </div>

      <!-- 使用说明 -->
      <div class="tips">
        <h3>使用说明：</h3>
        <ol>
          <li>输入图片URL地址</li>
          <li>点击"添加水印并下载"按钮</li>
          <li>系统会自动添加水印并下载图片到本地</li>
          <li>水印默认添加在图片右下角</li>
        </ol>
        <div class="note">
          <strong>注意：</strong>图片URL需要支持跨域访问（CORS），否则可能无法加载。可以点击"使用测试图片"来测试功能。
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.watermark-page {
  min-height: 100vh;
  background: #f5f5f5;
  padding: 20px;

  .page-header {
    text-align: center;
    margin-bottom: 30px;

    h2 {
      font-size: 24px;
      color: #333;
      margin-bottom: 10px;
    }

    p {
      font-size: 14px;
      color: #666;
    }
  }

  .content {
    max-width: 800px;
    margin: 0 auto;

    .button-group {
      display: flex;
      flex-direction: column;
      gap: 12px;
      margin: 20px 0 30px;
    }

    .preview-area {
      margin-bottom: 30px;

      .preview-item {
        background: white;
        border-radius: 8px;
        padding: 16px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

        h3 {
          font-size: 16px;
          color: #333;
          margin-bottom: 12px;
        }

        img {
          width: 100%;
          height: auto;
          border-radius: 4px;
          display: block;
        }
      }
    }

    .tips {
      background: white;
      border-radius: 8px;
      padding: 16px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

      h3 {
        font-size: 16px;
        color: #333;
        margin-bottom: 12px;
      }

      ol {
        padding-left: 20px;
        margin-bottom: 16px;

        li {
          font-size: 14px;
          color: #666;
          line-height: 1.8;
          margin-bottom: 8px;
        }
      }

      .note {
        padding: 12px;
        background: #fff7e6;
        border-left: 3px solid #ffa940;
        border-radius: 4px;
        font-size: 14px;
        color: #666;
        line-height: 1.6;

        strong {
          color: #ff6b00;
        }
      }
    }
  }
}
</style>
