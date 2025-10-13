import watermark from 'watermarkjs'

/**
 * 水印配置选项
 */
export interface WatermarkOptions {
  /** 水印文字 */
  text?: string
  /** 水印位置：'lowerRight' | 'lowerLeft' | 'upperRight' | 'upperLeft' | 'center' */
  position?: 'lowerRight' | 'lowerLeft' | 'upperRight' | 'upperLeft' | 'center'
  /** 字体大小，如 '48px' */
  fontSize?: string
  /** 字体样式，如 'sans-serif' */
  fontFamily?: string
  /** 文字颜色，如 '#fff' */
  color?: string
  /** 透明度，0-1之间 */
  opacity?: number
}

/**
 * 为图片URL添加水印
 * @param imageUrl 图片URL地址
 * @param options 水印配置选项
 * @returns Promise<string> 返回添加水印后的图片base64数据
 */
export async function addWatermarkToImage(
  imageUrl: string,
  options: WatermarkOptions = {},
): Promise<string> {
  const {
    text = '© 物流骑商城',
    position = 'lowerRight',
    fontSize = '48px',
    fontFamily = 'sans-serif',
    color = '#fff',
    opacity = 0.5,
  } = options

  return new Promise((resolve, reject) => {
    // 创建图片元素
    const img = new Image()
    img.crossOrigin = 'anonymous'

    img.onload = async () => {
      try {
        // 根据位置选择对应的水印方法
        const positionMethod = watermark.text[position]
        const fontStyle = `${fontSize} ${fontFamily}`

        // 添加水印
        const result = await watermark([img])
          .image(positionMethod(text, fontStyle, color, opacity))
          .then((resultImg: HTMLImageElement) => resultImg.src)

        resolve(result)
      }
      catch {
        reject(new Error('添加水印失败'))
      }
    }

    img.onerror = () => {
      reject(new Error('图片加载失败，请检查URL是否正确或图片是否支持跨域访问'))
    }

    img.src = imageUrl
  })
}

/**
 * 下载带水印的图片
 * @param imageUrl 图片URL地址
 * @param options 水印配置选项
 * @param filename 下载的文件名（可选）
 * @returns Promise<string> 返回添加水印后的图片base64数据
 */
export async function downloadImageWithWatermark(
  imageUrl: string,
  options: WatermarkOptions = {},
  filename?: string,
): Promise<string> {
  // 添加水印
  const watermarkedImageData = await addWatermarkToImage(imageUrl, options)

  // 创建下载链接
  const link = document.createElement('a')
  link.href = watermarkedImageData
  link.download = filename || `watermarked-${Date.now()}.png`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)

  return watermarkedImageData
}

/**
 * 为多张图片批量添加水印
 * @param imageUrls 图片URL数组
 * @param options 水印配置选项
 * @returns Promise<string[]> 返回添加水印后的图片base64数据数组
 */
export async function addWatermarkToMultipleImages(
  imageUrls: string[],
  options: WatermarkOptions = {},
): Promise<string[]> {
  const promises = imageUrls.map(url => addWatermarkToImage(url, options))
  return await Promise.all(promises)
}
