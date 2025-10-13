import request from '@/utils/request'

// 获取轮播图
export function getCarousel(name: string): Promise<any> {
  return request.get(`/api/carousels/name/${name}`)
}

