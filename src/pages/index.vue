<script setup lang="ts">
import { ref } from 'vue'
import { showToast } from 'vant'

// 搜索关键词
const searchValue = ref('')

// 当前选中的分类
const activeCategory = ref(0)

// 分类列表
const categories = ['1~1000元', '1001~2000元', '2001~3000元', '3001~4000元', '4001~5000元']

// 轮播图数据
const banners = [
  {
    id: 1,
    image: 'https://wuliuqi-1318477772.cos.ap-guangzhou.myqcloud.com/231535-1511018135206b.jpg',
    title: '运营商官方正品',
  },
  {
    id: 2,
    image: 'https://wuliuqi-1318477772.cos.ap-guangzhou.myqcloud.com/231535-1511018135206b.jpg',
    title: '遥遥领先',
  },
]

// 产品列表
const products = [
  {
    id: 1,
    name: '王者荣耀-满V账号',
    price: 888,
    image: 'https://wuliuqi-1318477772.cos.ap-guangzhou.myqcloud.com/231535-1511018135206b.jpg',
  },
  {
    id: 2,
    name: '原神-五星账号',
    price: 1288,
    image: 'https://wuliuqi-1318477772.cos.ap-guangzhou.myqcloud.com/231535-1511018135206b.jpg',
  },
  {
    id: 3,
    name: '和平精英-稀有皮肤',
    price: 666,
    image: 'https://wuliuqi-1318477772.cos.ap-guangzhou.myqcloud.com/231535-1511018135206b.jpg',
  },
  {
    id: 4,
    name: '英雄联盟-黑金号',
    price: 2588,
    image: 'https://wuliuqi-1318477772.cos.ap-guangzhou.myqcloud.com/231535-1511018135206b.jpg',
  },
  {
    id: 5,
    name: '崩坏星穹铁道',
    price: 1688,
    image: 'https://wuliuqi-1318477772.cos.ap-guangzhou.myqcloud.com/231535-1511018135206b.jpg',
  },
  {
    id: 6,
    name: 'DNF-天空套装',
    price: 3288,
    image: 'https://wuliuqi-1318477772.cos.ap-guangzhou.myqcloud.com/231535-1511018135206b.jpg',
  },
  {
    id: 7,
    name: '使命召唤-满级号',
    price: 1888,
    image: 'https://wuliuqi-1318477772.cos.ap-guangzhou.myqcloud.com/231535-1511018135206b.jpg',
  },
  {
    id: 8,
    name: 'CF穿越火线-神器',
    price: 999,
    image: 'https://wuliuqi-1318477772.cos.ap-guangzhou.myqcloud.com/231535-1511018135206b.jpg',
  },
  {
    id: 9,
    name: 'CF穿越火线-神器',
    price: 999,
    image: 'https://wuliuqi-1318477772.cos.ap-guangzhou.myqcloud.com/231535-1511018135206b.jpg',
  },
  {
    id: 10,
    name: 'CF穿越火线-神器',
    price: 999,
    image: 'https://wuliuqi-1318477772.cos.ap-guangzhou.myqcloud.com/231535-1511018135206b.jpg',
  },
  {
    id: 11,
    name: 'CF穿越火线-神器',
    price: 999,
    image: 'https://wuliuqi-1318477772.cos.ap-guangzhou.myqcloud.com/231535-1511018135206b.jpg',
  },
]

// 搜索处理
function onSearch() {
  showToast(`搜索：${searchValue.value}`)
}

// 产品点击
function onProductClick() {
  showToast('立即开通')
}
</script>

<template>
  <div class="home-page">
    <!-- 轮播图 -->
    <van-swipe class="banner-swipe" :autoplay="3000" indicator-color="#fff" lazy-render>
      <van-swipe-item v-for="banner in banners" :key="banner.id">
        <img :src="banner.image">
      </van-swipe-item>
    </van-swipe>

    <!-- 分类标签 -->
    <van-tabs v-model:active="activeCategory" class="category-tabs" color="#1989fa" swipeable :ellipsis="false">
      <van-tab v-for="(category, index) in categories" :key="index" :title="category" />
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
      <div class="products-grid">
        <div v-for="product in products" :key="product.id" class="product-card" @click="onProductClick">
          <div class="product-image">
            <van-image
              :src="product.image"
              :alt="product.name"
              fit="cover"
            />
          </div>
          <div class="product-info">
            <div class="product-name">
              {{ product.name }}
            </div>
            <div class="product-price">
              <span class="price-symbol">¥</span>
              <span class="price-value">{{ product.price }}</span>
            </div>
          </div>
        </div>
      </div>
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

  .product-card {
    background: #fff;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    cursor: pointer;
    transition: all 0.3s ease;

    &:active {
      transform: scale(0.98);
      box-shadow: 0 1px 4px rgba(0, 0, 0, 0.12);
    }

    .product-image {
      width: 100%;
      aspect-ratio: 1;
      overflow: hidden;
      background: #f7f8fa;

      :deep(.van-image) {
        width: 100%;
        height: 100%;
        display: block;
      }

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    .product-info {
      padding: 12px;

      .product-name {
        font-size: 14px;
        color: #323233;
        margin-bottom: 8px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        line-clamp: 2;
        -webkit-box-orient: vertical;
        line-height: 1.4;
        min-height: 40px;
      }

      .product-price {
        display: flex;
        align-items: baseline;
        color: #ee0a24;
        font-weight: bold;

        .price-symbol {
          font-size: 14px;
          margin-right: 2px;
        }

        .price-value {
          font-size: 20px;
        }
      }
    }
  }
}
</style>

<route lang="json5">
{
  name: 'Home'
}
</route>
