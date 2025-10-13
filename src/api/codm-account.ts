import request from '@/utils/request'

export interface CodmAccount {
  id: number
  serial_number: string
  images: string[]
  price: number
  title: string
  describe: string
  xianyu_url: string
  email: string
  status: number // 1:上架, 2:下架
  created_at?: string
  updated_at?: string
}

export interface CreateCodmAccountData {
  images: string[]
  price: number
  title: string
  describe: string
  xianyu_url: string
  email: string
  status: number
}

// 获取账号列表
export function getCodmAccountList(params?: {
  page?: number
  limit?: number
  keyword?: string
  status?: number
  min_price?: number
  max_price?: number
}): Promise<any> {
  return request.get('/api/codm-accounts', { params })
}

// 获取账号列表
export function getCodmAccountInfo(id: number): Promise<any> {
  return request.get(`/api/codm-accounts/${id}`)
}
