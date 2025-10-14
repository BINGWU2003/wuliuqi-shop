<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import ImagePreview from '@/components/ImagePreview/index.vue'
import { getCodmAccountInfo } from '@/api/codm-account'
import type { CodmAccount } from '@/api/codm-account'
import { downloadImageWithWatermark } from '@/utils/watermark'
import type { WatermarkOptions } from '@/utils/watermark'

const route = useRoute()
const loading = ref(false)
const error = ref('')
const accountInfo = ref<CodmAccount | null>(null)
const imagePreviewRef = ref()
// 水印配置
const watermarkOptions: WatermarkOptions = {
  text: '© 567手游店',
  position: 'center',
  fontSize: '100px',
  fontFamily: 'sans-serif',
  color: '#fff',
  opacity: 0.5,
}
async function fetchAccountInfo() {
  const id = Number(route?.query.id)
  if (!id) {
    error.value = '无效的账号ID'
    return
  }

  loading.value = true
  error.value = ''

  try {
    const response = await getCodmAccountInfo(id)
    accountInfo.value = response.data || response
  }
  catch (err: any) {
    error.value = err.message || '获取账号信息失败'
  }
  finally {
    loading.value = false
  }
}

function formatDate(dateString?: string) {
  if (!dateString)
    return '-'
  return new Date(dateString).toLocaleString('zh-CN')
}

function previewImages(startIndex: number = 0) {
  if (accountInfo.value?.images && imagePreviewRef.value) {
    imagePreviewRef.value.show(startIndex)
  }
}

function handleSaveImage(image: string) {
  // 这里可以添加保存图片的逻辑
  downloadImageWithWatermark(image, watermarkOptions)
}

async function handleSaveAllImages() {
  // 这里可以添加保存全部图片的逻辑
  const promises = []
  accountInfo.value?.images.forEach((image) => {
    promises.push(downloadImageWithWatermark(image, watermarkOptions))
  })
  await Promise.all(promises)
}

onMounted(() => {
  fetchAccountInfo()
})
</script>

<template>
  <div class="codm-account-info-page">
    <div v-if="loading" class="loading">
      加载中...
    </div>

    <div v-else-if="error" class="error">
      {{ error }}
    </div>

    <div v-else-if="accountInfo" class="account-detail">
      <!-- 账号标题 -->
      <div class="account-header">
        <h1 class="title">
          {{ accountInfo.title }}
        </h1>
        <div class="serial-number">
          编号: {{ accountInfo.serial_number }}
        </div>
      </div>

      <!-- 账号信息 -->
      <div class="account-info">
        <div class="info-item">
          <label>价格:</label>
          <span class="price">¥{{ accountInfo.price }}</span>
        </div>

        <div v-if="accountInfo.xianyu_url" class="info-item">
          <label>闲鱼链接:</label>
          <a :href="accountInfo.xianyu_url" target="_blank" class="xianyu-link">
            查看闲鱼商品
          </a>
        </div>

        <div class="info-item description">
          <label>描述:</label>
          <p class="describe">
            {{ accountInfo.describe }}
          </p>
        </div>

        <div class="info-item">
          <label>更新时间:</label>
          <span>{{ formatDate(accountInfo.updated_at) }}</span>
        </div>
      </div>
      <!-- 图片展示 -->
      <div v-if="accountInfo.images && accountInfo.images.length > 0" class="images-section">
        <h3 class="section-title">
          账号截图
        </h3>
        <div class="images-grid">
          <div
            v-for="(image, index) in accountInfo.images"
            :key="index"
            class="image-wrapper"
            @click="previewImages(index)"
          >
            <van-image
              width="100%"
              height="10rem"
              fit="cover"
              :src="image"
              alt="账号图片"
              lazy-load
            />
          </div>
        </div>
      </div>

      <!-- 免责声明 -->
      <div class="disclaimer-section">
        <h3 class="disclaimer-title">
          ⚠️ 重要提示
        </h3>
        <div class="disclaimer-content">
          <p>1. 购买可以点击链接跳入咸鱼app直接联系（认准店铺：567手游店），私下购买认准微信号：wlq16680802181，防止被骗，如走其他被骗概不负责！</p>
          <p>2. 购买账号支持分期（首付50%以上，不换绑先上号游玩），预定服务等。</p>
          <p>3. 国家法律规定，未成年人不能参与虚拟物品交易。</p>
          <p>4. 平台提供的数字化商品根据商品性质不支持七天无理由退货及三包服务。</p>
        </div>
      </div>

      <!-- 图片预览组件 -->
      <ImagePreview
        v-if="accountInfo.images && accountInfo.images.length > 0"
        ref="imagePreviewRef"
        :images="accountInfo.images"
        :enable-long-press="true"
        :long-press-actions="[
          {
            name: '保存当前图片',
            icon: 'download-o',
            callback: handleSaveImage,
          },
          {
            name: '保存全部图片',
            icon: 'download-o',
            callback: handleSaveAllImages,
          },
        ]"
      />
    </div>
  </div>
</template>

<style scoped lang="less">
.codm-account-info-page {
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;

  .loading,
  .error {
    text-align: center;
    padding: 40px;
    font-size: 16px;
  }

  .error {
    color: #f56565;
  }

  .account-detail {
    .account-header {
      margin-bottom: 20px;
      padding-bottom: 10px;
      border-bottom: 1px solid #e2e8f0;

      .title {
        font-size: 24px;
        font-weight: bold;
        margin-bottom: 10px;
        color: #2d3748;
      }

      .serial-number {
        font-size: 14px;
        color: #718096;
        margin-bottom: 10px;
      }
    }

    .images-section {
      margin-bottom: 30px;

      .section-title {
        font-size: 18px;
        font-weight: 600;
        color: #2d3748;
        margin-bottom: 15px;
      }

      .images-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 15px;

        .image-wrapper {
          position: relative;
          cursor: pointer;
          border-radius: 8px;
          overflow: hidden;
          border: 1px solid #e2e8f0;
          transition:
            transform 0.2s,
            box-shadow 0.2s;

          .account-image {
            width: 100%;
            height: 200px;
            object-fit: cover;
            display: block;
          }
        }
      }
    }

    .account-info {
      .info-item {
        display: flex;
        margin-bottom: 15px;
        align-items: center;
        justify-content: space-between;
        &.description {
          flex-direction: column;
          align-items: stretch;
        }

        label {
          font-weight: 500;
          color: #4a5568;
          min-width: 80px;
          margin-right: 15px;
        }

        .price {
          font-size: 20px;
          font-weight: bold;
          color: #e53e3e;
        }

        .xianyu-link {
          color: #3182ce;
          text-decoration: none;

          &:hover {
            text-decoration: underline;
          }
        }

        .describe {
          margin-top: 8px;
          line-height: 1.6;
          color: #2d3748;
          background-color: #f7fafc;
          padding: 15px;
          border-radius: 6px;
          border-left: 4px solid #3182ce;
          word-break: break-all;
          word-wrap: break-word;
          overflow-wrap: break-word;
        }
      }
    }

    .disclaimer-section {
      margin-top: 30px;
      padding: 20px;
      background: linear-gradient(135deg, #fff5f5 0%, #fff 100%);
      border-radius: 8px;
      border: 1px solid #feb2b2;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);

      .disclaimer-title {
        font-size: 16px;
        font-weight: 600;
        color: #c53030;
        margin-bottom: 15px;
        display: flex;
        align-items: center;
        gap: 8px;
      }

      .disclaimer-content {
        p {
          font-size: 14px;
          line-height: 1.8;
          color: #4a5568;
          margin-bottom: 10px;
          padding-left: 8px;

          &:last-child {
            margin-bottom: 0;
          }
        }
      }
    }
  }
}
</style>

<route lang="json5">
  {
    name: 'CodmAccountInfo'
  }
  </route>
