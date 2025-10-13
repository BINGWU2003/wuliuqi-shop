<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { showToast } from 'vant'
import ProductCard from '@/components/ProductCard/index.vue'
import { getCarousel } from '@/api/carousel'
import { getCodmAccountList } from '@/api/codm-account'
import type { CodmAccount } from '@/api/codm-account'

interface Product {
  id: number
  name: string
  price: number
  image: string
}

interface ImageItem {
  sort_order: number
  url: string
  link_url?: string
}

const CAROUSEL_NAME = 'home_ads'

// 搜索关键词
const searchValue = ref('')

// 当前选中的分类
const activeCategory = ref(0)

// 分类列表 - 价格区间
const priceRanges = [
  { label: '全部', min: 0, max: 0 },
  { label: '0~500元', min: 0, max: 500 },
  { label: '501~1000元', min: 501, max: 1000 },
  { label: '1001~2000元', min: 1001, max: 2000 },
  { label: '2001~5000元', min: 2001, max: 5000 },
  { label: '5000元以上', min: 5001, max: 999999 },
]

// 轮播图数据
const banners = ref<ImageItem[]>([])

// 产品列表
const products = ref<Product[]>([])
const loading = ref(false)
const finished = ref(false)
const refreshing = ref(false)

// 分页信息
const currentPage = ref(1)
const pageSize = ref(10)
const totalPages = ref(0)

// 转换 CODM 账号数据为产品格式
function convertToProduct(account: CodmAccount): Product {
  return {
    id: account.id,
    name: account.title,
    price: account.price,
    image: account.images?.[0] || '',
  }
}

// 加载产品数据
async function onLoad() {
  try {
    const selectedRange = priceRanges[activeCategory.value]
    const params: any = {
      page: currentPage.value,
      limit: pageSize.value,
      status: 1, // 只显示上架的商品
    }

    // 添加搜索关键词
    if (searchValue.value.trim()) {
      params.keyword = searchValue.value.trim()
    }

    // 添加价格区间筛选（全部分类除外）
    if (selectedRange.min > 0 || selectedRange.max > 0) {
      params.min_price = selectedRange.min
      params.max_price = selectedRange.max
    }

    const res = await getCodmAccountList(params)

    if (res?.data?.list && Array.isArray(res.data.list)) {
      const newProducts = res.data.list.map(convertToProduct)

      if (currentPage.value === 1) {
        products.value = newProducts
      }
      else {
        products.value.push(...newProducts)
      }

      // 更新分页信息
      if (res.data.pagination) {
        totalPages.value = res.data.pagination.totalPages
        currentPage.value = res.data.pagination.page
      }

      // 判断是否加载完成
      if (currentPage.value >= totalPages.value) {
        finished.value = true
      }
      else {
        currentPage.value++
      }
    }
    else {
      finished.value = true
    }
  }
  catch (error) {
    console.error('加载产品失败:', error)
    showToast('加载失败，请稍后重试')
    finished.value = true
  }
}

// 下拉刷新
async function onRefresh() {
  finished.value = false
  currentPage.value = 1
  products.value = []
  await onLoad()
  refreshing.value = false
}

// 搜索处理
async function onSearch() {
  if (!searchValue.value.trim()) {
    showToast('请输入搜索关键词')
    return
  }

  // 重置列表
  currentPage.value = 1
  products.value = []
  finished.value = false

  await onLoad()
}

// 产品点击
function onProductClick(product: Product) {
  showToast(`查看：${product.name}`)
  // TODO: 跳转到产品详情页
}

// 监听分类切换
watch(activeCategory, () => {
  currentPage.value = 1
  products.value = []
  finished.value = false
  onLoad()
})

onMounted(async () => {
  // 加载轮播图
  const res = await getCarousel(CAROUSEL_NAME)
  if (res?.data?.items && Array.isArray(res.data.items)) {
    banners.value = res.data.items.sort((a: ImageItem, b: ImageItem) => a.sort_order - b.sort_order)
  }
})
</script>

<template>
  <div class="home-page">
    <!-- 轮播图 -->
    <van-swipe class="banner-swipe" :autoplay="3000" indicator-color="#fff" lazy-render>
      <van-swipe-item v-for="banner in banners" :key="banner.url">
        <img :src="banner.url">
      </van-swipe-item>
    </van-swipe>

    <!-- 分类标签 -->
    <van-tabs v-model:active="activeCategory" class="category-tabs" color="#1989fa" swipeable :ellipsis="false">
      <van-tab v-for="(range, index) in priceRanges" :key="index" :title="range.label" />
    </van-tabs>

    <!-- 搜索框 -->
    <div class="search-section">
      <van-search
        v-model="searchValue"
        shape="round"
        background="transparent"
        placeholder="输入产品名称"
        @search="onSearch"
      >
        <template #action>
          <van-button type="primary" size="small" round @click="onSearch">
            搜索
          </van-button>
        </template>
      </van-search>
    </div>

    <!-- 产品列表 -->
    <div class="products-section">
      <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
        <van-list
          v-model:loading="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
        >
          <div class="products-grid">
            <ProductCard
              v-for="product in products"
              :key="product.id"
              :product="product"
              @click="onProductClick"
            />
          </div>
        </van-list>
      </van-pull-refresh>
    </div>
    <van-back-top right="10vw" bottom="10vh" />
  </div>
</template>

<style scoped lang="less">
.home-page {
  min-height: 100vh;
  background-color: #f7f8fa;
  padding-bottom: 60px;
}

.banner-swipe {
  border-radius: 8px;
  width: 100%;
  height: 150px;
}

.category-tabs {
  margin-top: 8px;
  background: #fff;

  .tab-badge {
    display: inline-block;
    color: #fff;
    padding: 2px 8px;
    border-radius: 10px;
    font-size: 11px;
    margin-left: 4px;
  }

  .tab-subtitle {
    font-size: 11px;
    color: #969799;
    margin-top: 2px;
  }
}

.search-section {
  background: #fff;
}

.products-section {
  margin-top: 12px;
  background: #f7f8fa;

  .products-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
  }
}
</style>

<route lang="json5">
{
  name: 'Home'
}
</route>
